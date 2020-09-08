import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import XTable from "../../components/table/XTable";
import Grid from "@material-ui/core/Grid";
import Filter from "./Filter";
import Typography from "@material-ui/core/Typography";
import { search } from "../../utils/ajax";
import { remoteRoutes } from "../../data/constants";
import { wfInitialSort, ninVerificationHeadCells } from "./config";
import Box from "@material-ui/core/Box";
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import {
  verificationRequestConstants,
  IVerificationRequestState,
} from "../../data/redux/ninVerification/reducer";
import Loading from "../../components/Loading";
import NinVerificationForm from "./forms/NinVerificationForm";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import { IState } from "../../data/types";
import Details from "./details/Details";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import AddButton from "../../components/AddButton";
import snackbarMessages from "../../data/snackbarMessages";
import {printDateTime} from "../../utils/dateHelpers"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
    drawer: {
      borderRadius: 0,
    },
    content: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },

    rowHover: {
      "&:hover": {
        cursor: "pointer",
      },
    },
    close: {
      position: "fixed",
      bottom: "30px",
    },
    closeButton: {
      padding: "4px 30px",
      backgroundColor: "rgba(38, 50, 56, 0.04)",
    },

    pageHeading: {
      display: "flex",
    },
    
    niraApiOffline: {
      border: "5px solid red",
      color: "red"
    },
    niraApiOfflineInfo: {
      borderTop: "5px solid red",
      borderBottom: "5px solid red",
      color: "red"
    },
    niraApiOnline: {
      border: "5px solid green",
      color: "green"
    },
    niraApiOnlineInfo: {
      borderTop: "5px solid green",
      borderBottom: "5px solid green",
      color: "green"
    },
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

const NinVerifications = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [loadingNew, setLoadingNew] = useState(false);
  const {
    data,
    loading,
    turnOnSlideOut,
  }: IVerificationRequestState = useSelector(
    (state: IState) => state.verificationRequests
  );
  const [rowsPerPage, setRowsPerPage] = useState({
    page: 1,
    itemsPerPage: 5,
    totalItems: 10,
  });
  const [viewDetails, setViewDetails] = useState<any | null>(null);
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [filter, setFilter] = useState<any>({});

  useEffect(() => {
    dispatch({
      type: verificationRequestConstants.RequestsFetchLoading,
      payload: true,
    });

    search(
      remoteRoutes.ninVerificationRequests,
      filter,
      (resp) => {
        setRowsPerPage(resp.pagination);
        dispatch({
          type: verificationRequestConstants.RequestsFetchAll,
          payload: [...resp.requests],
        });
      },
      () => {
        enqueueSnackbar(snackbarMessages.default.fail, {
          variant: "error",
        });
      },
      () => {
        dispatch({
          type: verificationRequestConstants.RequestsFetchLoading,
          payload: false,
        });
      }
    );
  }, [filter, dispatch]);

  function addNewRequest() {
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: true,
    });
  }

  function handleToggleDrawer(id?: any) {
    if (id) {
      setViewDetails(id);
      const requestDetails = data.filter((requestDetails) => {
        return requestDetails.id === id;
      });
      dispatch({
        type: verificationRequestConstants.RequestDetails,
        payload: requestDetails[0],
      });
    } else {
      setViewDetails(null);
    }
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: !turnOnSlideOut,
    });
    setAnchor("right");
  }
  function handleClose() {
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: !turnOnSlideOut,
    });
    setViewDetails(null);
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: false,
    });
  }
  function handleFilter(values: any) {
    setFilter({ ...filter, ...values });
  }
  return (
    <Navigation>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box pb={2}>
            <Grid container>
              <Grid item sm={3} className={classes.pageHeading}>
                <Typography variant="h4">ID Verification Requests</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box p={1} className={classes.root}>
            {loading ? (
              <Loading />
            ) : (
              <Grid item xs={12}>
                <ErrorBoundary>
                  <XTable
                    loading={loadingNew}
                    headCells={ninVerificationHeadCells}
                    data={data}
                    initialRowsPerPage={10}
                    usePagination={true}
                    initialSortBy={"createdAt"}
                    initialOrder="desc"
                    handleSelection={handleToggleDrawer}
                    hoverClass={classes.rowHover}
                  />
                </ErrorBoundary>
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={3} style={{ display: open ? "block" : "none" }}>
          <Box pt={1}>
            <Paper className={classes.filterPaper} elevation={0}>
              <ErrorBoundary>
                <Filter onFilter={handleFilter} loading={loading} />
              </ErrorBoundary>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <SlideOutDrawer
        handleToggleDrawer={handleToggleDrawer}
        open={turnOnSlideOut}
        anchor={anchor}
        title={viewDetails ? null : "New ID Verification Request"}
      >
        {viewDetails ? (
          <div>
            <ErrorBoundary>
              <Details closeSlideOut={handleToggleDrawer}></Details>
            </ErrorBoundary>
            <Grid item xs={12} className={classes.close}>
              <Button
                className={classes.closeButton}
                onClick={handleClose}
                size="small"
              >
                Close
              </Button>
            </Grid>
          </div>
        ) : (
          <ErrorBoundary>
            <NinVerificationForm
              closeSlideOut={handleToggleDrawer}
            ></NinVerificationForm>
          </ErrorBoundary>
        )}
      </SlideOutDrawer>
    </Navigation>
  );
};

export default NinVerifications;
