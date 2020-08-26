import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  settingsConstants,
  ISettingsState,
} from "../../../../data/redux/settings/reducer";
import { get } from "../../../../utils/ajax";
import { remoteRoutes } from "../../../../data/constants";
import { IState } from "../../../../data/types";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ExpansionCard from "../../../../components/ExpansionCard";
import Category from "./Category";
import Loading from "../../../../components/Loading";
import ErrorBoundary from "../../../../components/ErrorBoundary/ErrorBoundary";

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

const fakeServiceCategories = [
  {
    name: "Standard",
    rates: [
      {
        from: 0,
        to: 100,
        unitPrice: 1000,
      },
      {
        from: 101,
        to: 200,
        unitPrice: 2000,
      },
    ],
  },
  {
    name: "Premium",
    rates: [
      {
        from: 0,
        to: 100,
        unitPrice: 1000,
      },
      {
        from: 101,
        to: 200,
        unitPrice: 2000,
      },
    ],
  },
  {
    name: "Forex Bureaus Only",
    rates: [
      {
        from: 0,
        to: 100,
        unitPrice: 1000,
      },
      {
        from: 101,
        to: 200,
        unitPrice: 2000,
      },
    ],
  },
];
const ServiceCategory = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { serviceCategories, loading }: ISettingsState = useSelector(
    (state: IState) => state.settings
  );

  useEffect(() => {
    dispatch({
      type: settingsConstants.settingsFetchLoading,
      payload: fakeServiceCategories,
    });
    /* get(
      "",
      (resp) => {
        dispatch({
          type: settingsConstants.serviceCategoriesFetchAll,
          payload: resp,
        });
      },
      undefined,
      () => {
        dispatch({
          type: settingsConstants.serviceCategoriesFetchAll,
          payload: fakeServiceCategories,
        });
        dispatch({
          type: settingsConstants.settingsFetchLoading,
          payload: false,
        });
      }
    ); */
  }, [dispatch]);

  return (
    <ExpansionCard title={"Services Categories"}>
      {loading ? (
        <Loading />
      ) : (
        <ErrorBoundary>
          <Category serviceCategories={serviceCategories} />
        </ErrorBoundary>
      )}
    </ExpansionCard>
  );
};

export default ServiceCategory;
