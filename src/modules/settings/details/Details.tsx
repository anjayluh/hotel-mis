import React, { useEffect, useState } from "react";
import { getRouteParam } from "../../../utils/routHelpers";
import Loading from "../../../components/Loading";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";

import { IRequestDetails } from "../types";
import Typography from "@material-ui/core/Typography";
import Summary from "./Summary";
import { put, search } from "../../../utils/ajax";
import { remoteRoutes } from "../../../data/constants";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { successColor } from "../../../theme/custom-colors";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { fakeRequestDetails } from "../fakeData";
import { IState } from "../../../data/types";

interface IProps {
  closeSlideOut?: () => any;
}

const useWfStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      backgroundColor: "transparent"
    },
    stepPaper: {
      borderRadius: 0
    },
    stepLabel: {
      padding: theme.spacing(1)
    },
    stepContent: {
      paddingRight: 0,
      paddingBottom: theme.spacing(1)
    },
    taskIcon: {
      marginTop: 1
    },
    successIcon: {
      color: successColor
    }
  })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
      padding: theme.spacing(1)
    },
    divider: {
      marginTop: theme.spacing(2)
    },
    noPaddingLeft: {
      paddingLeft: 0
    },
    loading: {
      position: "absolute",
      top: 300
    }
  })
);

const Details = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLoading(true);


    }
  }, );

  function handleClose() {
    if (props.closeSlideOut) {
      props.closeSlideOut();
    }
  }
  return (
    <div>
        <div className={classes.root}>

        </div>
    </div>
  );
};

export default Details;
