import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import XTable from "../../components/table/XTable";
import Grid from "@material-ui/core/Grid";
import { IWorkflowFilter } from "./types";
import Filter from "./Filter";
import Typography from "@material-ui/core/Typography";
import {search} from "../../utils/ajax";
import { remoteRoutes } from "../../data/constants";
import {
  wfInitialSort,
  ninVerificationHeadCells,
  workflowTypes
} from "./config";
import Box from "@material-ui/core/Box";
import {
  verificationRequestConstants,
  IVerificationRequestState
} from "../../data/redux/ninVerification/reducer";
import Loading from "../../components/Loading";
import NinVerificationForm from "./forms/NinVerificationForm";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import { IState } from "../../data/types";
import Details from "./details/Details";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2)
    },
    drawer: {
      borderRadius: 0
    },
    content: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      })
    },

    rowHover: {
      "&:hover": {
        cursor: "pointer"
      }
    },
    close: {
      position: "fixed",
      bottom: "30px"
    },
    closeButton: {
      padding: "4px 30px",
      backgroundColor: "rgba(38, 50, 56, 0.04)"
    },

    pageHeading: {
      display: "flex"
    },
    addNewButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: "12px",
      lineHeight: "0.5",
      marginBottom: "-5px",
      marginLeft: "8px",
      marginTop: "-6px",
      fontWeight: "normal"
    },
    addIcon: {
      marginLeft: "-5px",
      marginRight: "-10px",
      height: "0.7em",
      fontSize: "13px"
    }
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

const NinVerifications = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [loadingNew, setLoadingNew] = useState(false);
  const {
    data,
    loading,
    turnOnSlideOut
  }: IVerificationRequestState = useSelector(
    (state: IState) => state.verificationRequests
  );
  const [rowsPerPage, setRowsPerPage] = useState({
    "page":1,
    "itemsPerPage":5,
    "totalItems":10
  },);
  const [viewDetails, setViewDetails] = useState<any | null>(null);
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [filter, setFilter] = useState<IWorkflowFilter>({
    workflowTypes: workflowTypes,
    showNew: false,
    showAssigned: true
  });

  useEffect(() => {
    dispatch({
      type: verificationRequestConstants.RequestsFetchLoading,
      payload: true
    });

    search(
        remoteRoutes.ninVerificationRequests,'filter',
        (resp) => {
          setRowsPerPage(resp.pagination)
          dispatch({
            type: verificationRequestConstants.RequestsFetchAll,
            payload: [...resp.requests]
          })
        },
        undefined,
        () => {
          console.log('failed to access')
          dispatch({
            type: verificationRequestConstants.RequestsFetchLoading,
            payload: false
          })
        })
  }, [filter, dispatch]);



  function addNewRequest() {
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: true
    });
  }

  function handleToggleDrawer(id?: any) {
    if (id) {
      setViewDetails(id);
      const requestDetails = data.filter((requestDetails) => {
        return requestDetails.id === id
      })
      dispatch({
        type: verificationRequestConstants.RequestDetails,
        payload: requestDetails[0]
      });
    } else {
      setViewDetails(null);
    }
    dispatch({
      type: verificationRequestConstants.RequestsAddNew,
      payload: !turnOnSlideOut
    });
    setAnchor("right");
  }

  function handleFilter(f: IWorkflowFilter) {
    setFilter({ ...filter, ...f });
  }
  return (
    <Navigation hideRequestButton={true}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box p={1} className={classes.root}>
            <Box pb={2}>
              <Grid container>
                <Grid item sm={12} className={classes.pageHeading}>
                  <Typography variant="h4">
                    NIN Verification Requests
                  </Typography>
                  <Button
                    className={classes.addNewButton}
                    startIcon={<AddIcon className={classes.addIcon} />}
                    variant="text"
                    onClick={addNewRequest}
                  >
                    New Request
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {loading ? (
              <Loading />
            ) : (
              <Grid item xs={12}>
                <XTable
                  loading={loadingNew}
                  headCells={ninVerificationHeadCells}
                  data={data}
                  initialRowsPerPage={10}
                  usePagination={true}
                  initialSortBy={wfInitialSort}
                  initialOrder="desc"
                  handleSelection={handleToggleDrawer}
                  hoverClass={classes.rowHover}
                />
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={3} style={{ display: open ? "block" : "none" }}>
          <Box pt={6}>
            <Paper className={classes.filterPaper} elevation={0}>
              <Filter onFilter={handleFilter} loading={loading} />
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <SlideOutDrawer
        handleToggleDrawer={handleToggleDrawer}
        open={turnOnSlideOut}
        anchor={anchor}
        title={viewDetails ? null : "New NIN Verification Request"}
      >
        {viewDetails ? (
          <div>
            <Details closeSlideOut={handleToggleDrawer}></Details>
            <Grid item xs={12} className={classes.close}>
              <Button
                className={classes.closeButton}
                onClick={handleToggleDrawer}
                size="small"
              >
                Close
              </Button>
            </Grid>
          </div>
        ) : (
          <NinVerificationForm
            closeSlideOut={handleToggleDrawer}
          ></NinVerificationForm>
        )}
      </SlideOutDrawer>
    </Navigation>
  );
};

export default NinVerifications;
