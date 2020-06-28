import axios from "axios";

//esta funcion debe realizar el login a la API
export const loginApp = async () => {
  let token = localStorage.getItem("accessToken");
  if (!token || token === "undefined") {
    // const response = await axios.get(`${base_url}${RESTactions.login}=1`)
    const response = await axios.get(`${process.env.REACT_APP_URL_LOGIN}`, {
      headers: {
        "content-type": "application/json",
        "X-ApiKey": process.env.REACT_APP_X_API_KEY,
        "X-ClientId": process.env.REACT_APP_X_CLIENT_ID,
        passKey: process.env.REACT_APP_PASSKEY,
      },
    });
    const values = response.data ? response.data : false;
    if (values && (values.code == "00" || values.code == "01")) {
      localStorage.setItem("accessToken", values.data[0].accessToken);
      localStorage.setItem("expiration", values.data[0].tokenSecExpiration); // segundos de expiracion del token
      localStorage.setItem("dateLogin", new Date());
      token = values.data[0].accessToken;
      return true;
    }
    return false;
  }
};

// aqui verificamos que la fecha de ultimo login no supere la expiracion dada en el ultimo login
export const refreshToken = () => {
  const expiration = localStorage.getItem("expiration") * 1000; // lo multiplico por mil porque la resta de fechas en javascript devuelve el tiempo en milisegundos
  const dateLogin = localStorage.getItem("dateLogin");
  if (!expiration || !dateLogin || new Date() - dateLogin > expiration) {
    return true;
  }
  return false;
};

// consultamos una ruta entre dos direcciones

export const planTravel = (A, B) => {
  const main = async () => {
    //verifico que se haya iniciado sesión
    if (refreshToken()) {
      await loginApp();
    }
    const stopsA = await seekStops(A.street, A.number);
    const stopsB = await seekStops(B.street, B.number);
    // busco las paradas cercanas a ambas direcciones indicadas y me quedo con la primera de cada una que es la mas cercana
    // estos parametros se los paso a seektrip que consultara por el recorrido

    const trip = await seekTrip(
      A.street + " " + A.number,
      A.lng /* long */,
      A.lat /* lat */,
      B.street + " " + B.number,
      B.lng,
      B.lat
    );
    return { trip, stopsA, stopsB };
  };

  //buscamos las paradas cercanas a una direccion
  const seekStops = async (street, number) => {
    if (refreshToken()) {
      await loginApp();
    }
    let token = localStorage.getItem("accessToken");
    if (!token) {
      return "error";
    }

    const response = await axios.get(
      `${process.env.REACT_APP_URL_STOPS}arroundstreet/${street}/${number}/400/`,
      {
        headers: {
          accessToken: token,
        },
      }
    );
    if (response.data.code == "00") {
      return response.data.data;
    }
    return "no hay paradas";
  };

  const seekTrip = async (
    originName,
    xFrom,
    yFrom,
    destinationName,
    xTo,
    yTo
  ) => {
    if (refreshToken()) {
      await loginApp();
    }

    let token = localStorage.getItem("accessToken");

    if (token) {
      let date = new Date();
      let data = {
        routeType: "P",
        itinerary: true,
        coordinateXFrom: xFrom,
        coordinateYFrom: yFrom,
        coordinateXTo: xTo,
        coordinateYTo: yTo,
        originName: originName,
        destinationName: destinationName,
        polygon: null,
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        culture: "ES",
        allowBus: true,
        allowBike: false,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_URL_TRAVELPLAN}`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            accessToken: token,
          },
        }
      );

      return response.data;
    }
    return "error";
  };

  return main();
};
