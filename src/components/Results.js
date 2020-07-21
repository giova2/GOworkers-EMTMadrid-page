import React from "react";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import Typography from "@material-ui/core/Typography";
import { theme } from "../assets/style";
import { useStyles } from "../assets/styleResults";

const Results = ({ trip, selectStop, stopSelected }) => {
  const classes = useStyles(theme);

  const busSections = trip.data
    ? trip.data.sections.filter((elem) => elem.type == "Bus")
    : [];
  return (
    <Grid className={classes.containerResults} container>
      {busSections.map((segment) => {
        return (
          <React.Fragment key={segment.order}>
            <Grid item xs={12}>
              <h3 className={classes.titleResults}>
                <DirectionsBusIcon className={classes.busIcon} /> Línea{" "}
                {segment.idLine}
              </h3>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card
                className={`${classes.root} ${
                  stopSelected === segment.source.properties.idStop
                    ? classes.selected
                    : ""
                }`}
                onClick={() => selectStop(segment.source.properties.idStop)}
              >
                <CardContent>
                  <Grid item xs={2}>
                    <Typography className={classes.title}>
                      {segment.source.properties.idStop}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.pos}>
                      {segment.source.properties.name}
                    </Typography>
                    <Typography>
                      {segment.source.properties.description}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <Card
                className={`${classes.root} ${
                  stopSelected === segment.destination.properties.idStop
                    ? classes.selected
                    : ""
                }`}
                onClick={() =>
                  selectStop(segment.destination.properties.idStop)
                }
              >
                <CardContent>
                  <Grid item xs={2}>
                    <Typography className={classes.title}>
                      {segment.destination.properties.idStop}
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography className={classes.pos}>
                      {segment.destination.properties.name}
                    </Typography>
                    <Typography>
                      {segment.destination.properties.description}
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default Results;
