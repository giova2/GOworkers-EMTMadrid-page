import { createStyles, makeStyles } from "@material-ui/core/styles";
import { theme } from "./style";

export const useStyles = makeStyles(() =>
  createStyles({
    hide: {
      display: "none",
    },
    root: {
      flexGrow: 1,
      background: theme.palette.primary.main,
    },
    backButton: {
      padding: "10px",
      color: theme.palette.primary.contrastText,
      cursor: "pointer",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menu: {
      marginTop: "30px",
    },
    title: {
      flexGrow: 1,
    },
    welcome: {
      height: "20vh",
      marginTop: "1vh",
      marginBottom: "1vh",
      color: theme.palette.primary.contrastText,
    },
    dontbelate: {
      margin: "15px",
      fontSize: "2rem",
      fontWeight: 800,
    },
    containerSearch: {
      position: "relative",
      textAlign: "center",
    },
    inputsearch: {
      marginRight: "2vw",
      textAlign: "center",
      color: theme.palette.primary.contrastText,
      "&::before": {
        borderBottom: "1px solid rgba(255, 255, 255, 0.42)",
      },
      "&::placeholder": {
        color: "white !important",
      },
      "&:focused": {
        backgroundColor: "#fff",
      },
    },
    searchIcon: {
      position: "absolute",
      right: "2  vw",
      top: "5px",
    },
    map: {
      width: "100%",
    },
    results: {
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.down("sm")]: {
        height: "calc(100vh - 48px)",
      },
      [theme.breakpoints.up("md")]: {
        height: "calc(100vh - 64px)",
      },
    },
  })
);
