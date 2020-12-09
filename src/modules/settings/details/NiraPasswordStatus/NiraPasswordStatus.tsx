import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ExpansionCard from "../../../../components/ExpansionCard";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";
import NiraPasswordDetails from "./NiraPasswordDetails";

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

// type Anchor = "top" | "left" | "bottom" | "right";

const NiraPasswordStatus = () => {
  const classes = useStyles();
  return (
    <ErrorBoundary>
      <ExpansionCard
        title={"NIRA Credentials"}
        children={
          <NiraPasswordDetails/>
        }
      />
    </ErrorBoundary>
  );
};

export default NiraPasswordStatus;
