import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExpansionCard from "../../components/ExpansionCard";
import AccountSettings from "./details/accountSettings/AccountSettings";
import ParticipantType from "./details/participantType/ParticipantType";
import PaymentType from "./details/paymentType/PaymentType";
import ContactPersonRole from "./details/contactPersonRole/ContactPersonRole";
import ServiceCategory from "./details/serviceCategory/ServiceCategory";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import NiraPasswordStatus from "./details/NiraPasswordStatus/NiraPasswordStatus";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    pageHeading: {
      display: "flex",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

const Settings = () => {
  const classes = useStyles();

  return (
    <Navigation>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box p={1} className={classes.root}>
            <Box pb={2}>
              <Grid container>
                <Grid item sm={12} className={classes.pageHeading}>
                  <Typography variant="h4">Settings</Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid item xs={12}>
              <ErrorBoundary><AccountSettings /></ErrorBoundary>
              <ErrorBoundary><NiraPasswordStatus /></ErrorBoundary>
              <ErrorBoundary><ParticipantType /></ErrorBoundary>
              <ErrorBoundary><PaymentType /></ErrorBoundary>
              <ErrorBoundary><ContactPersonRole /></ErrorBoundary>
              <ErrorBoundary><ServiceCategory /></ErrorBoundary>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Navigation>
  );
};

export default Settings;
