import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Summary from "./Summary";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { successColor } from "../../../theme/custom-colors";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { IState } from "../../../data/types";
import ErrorBoundary from "../../../components/ErrorBoundary/ErrorBoundary";

interface IProps {
  closeSlideOut?: () => any;
}

const useWfStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      backgroundColor: "transparent",
    },
    stepPaper: {
      borderRadius: 0,
    },
    stepLabel: {
      padding: theme.spacing(1),
    },
    stepContent: {
      paddingRight: 0,
      paddingBottom: theme.spacing(1),
    },
    taskIcon: {
      marginTop: 1,
    },
    successIcon: {
      color: successColor,
    },
  })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
      padding: theme.spacing(1),
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    noPaddingLeft: {
      paddingLeft: 0,
    },
    loading: {
      position: "absolute",
      top: 300,
    },
  })
);

const Details = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();
  const [requestData, setRequestData]: any = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setLoading(true);
      if (requestData) {
        setLoading(false);
      }
    }
  }, [requestData]);

  function contactFullName() {
    const thirdName = requestData && requestData.otherNames ? requestData.otherNames : '';
    let fullName = requestData ? ` ${requestData.surname} ${requestData.givenNames} ${thirdName}` : '';
    if (fullName === "   ") fullName = 'Name not provided';
    return fullName;
  }

  function handleClose() {
    if (props.closeSlideOut) {
      props.closeSlideOut();
    }
  }
  return (
    <div>
      {loading ? (
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box>
                <Loading loaderClass={classes.loading} />
              </Box>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" py={1}>
                <Box flexGrow={1} pt={1}>
                  <Typography variant="h5">
                    {contactFullName()}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box pt={1}>{requestData && <ErrorBoundary><Summary data={requestData} /></ErrorBoundary>}</Box>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Details;
