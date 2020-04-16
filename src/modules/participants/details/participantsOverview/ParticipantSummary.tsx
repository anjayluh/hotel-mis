import React from "react";
import Grid from "@material-ui/core/Grid";
import { Chip } from "@material-ui/core";
import { IParticipant } from "../../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

interface IProps {
  data: IParticipant;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      borderRadius: 0
    },

    image: {
      height: 60,
      width: 60,
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    nameHolder: {
      paddingTop: theme.spacing(1)
    },
    summaryChip: {
      backgroundColor: "#4bb050",
      marginTop: "4px",
      padding: "0px 5px",
      borderRadius: "3px",
      textTransform: "capitalize",
      height: "18px",
      fontSize: "0.75rem"
    }
  })
);

const ParticipantSummary = ({ data }: IProps) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item sm={6}>
        <Grid container justify="flex-start" alignItems="flex-start">
          <Avatar className={classes.image}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Grid item className={classes.nameHolder}>
            <Typography variant="h5">{data.category}</Typography>
            <Typography variant="body2">{data.company.name}</Typography>
            <Chip
              size="small"
              variant="default"
              color="primary"
              className={classes.summaryChip}
              label={data.subscriptions[0].subscriptionStatus}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ParticipantSummary;
