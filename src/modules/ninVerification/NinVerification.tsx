import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import XTable from "../../components/table/XTable";
import Grid from "@material-ui/core/Grid";
import Filter from "./Filter";
import Typography from "@material-ui/core/Typography";
import { search, get, post, downLoad } from "../../utils/ajax";
import { remoteRoutes } from "../../data/constants";
import { ninVerificationHeadCells } from "./config";
import Box from "@material-ui/core/Box";
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
import snackbarMessages from "../../data/snackbarMessages";
import { isEmpty } from "lodash";

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
      color: "red",
    },
    niraApiOfflineInfo: {
      borderTop: "5px solid red",
      borderBottom: "5px solid red",
      color: "red",
    },
    niraApiOnline: {
      border: "5px solid green",
      color: "green",
    },
    niraApiOnlineInfo: {
      borderTop: "5px solid green",
      borderBottom: "5px solid green",
      color: "green",
    },
    exportPaper: {
      borderRadius: 0,
      padding: "20px 16px",
    },
    information: {
      color: "#546e7a",
      fontSize: 12,
      fontWeight: 400,
      paddingLeft: 15,
      paddingTop: 10,
      letterSpacing: -0.04,
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
  const [exportLoading, setExportLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isExport, setIsExport] = useState(true); //Saving filter items for export since the page upload on filter change
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [
    showExportInformationMessage,
    setShowExportInformationMessage,
  ] = useState(false);
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
  const [exportValues, setExportValues] = useState<any>({});
  const [requestStatus, setRequestStatus] = useState<string>("Processing");
  // const [requestId, setRequestId] = useState<string>("");

  useEffect(() => {
    if(isEmpty(filter)) {
      addNewRequest();
    }
    
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

  function updateExport(values: any) {
    setExportValues({ ...filter, ...values });
    setExportLoading(false)
    setIsError(false)
  }
  function handleFilter(values: any) {
    setFilter({ ...filter, ...values });
  }
  function initiateExport() {
    if (exportValues.from && exportValues.to) {
      setShowExportInformationMessage(false);
      setExportLoading(true);
      let toSave = {
        dateRange: {
          from: exportValues.from,
          to: exportValues.to,
        },
        nin: exportValues.nin ? exportValues.nin : null,
        cardNumber: exportValues.cardNumber ? exportValues.cardNumber : null,
        requestStatus:
          exportValues.requestStatus !== ""
            ? [exportValues.requestStatus]
            : null,
        ninValidity: exportValues.ninValidity ? exportValues.ninValidity : null,
        matchingStatus: exportValues.matchingStatus ? exportValues.matchingStatus : null,
      };
      
      post(
        remoteRoutes.niraExport,
        toSave,
        (data) => {
          setRequestStatus(requestStatus);
          if (requestStatus.toLowerCase() === "processing") {
            checkStatus(data.id);
          } else if(requestStatus.toLowerCase() === "complete") {
              download(data.id)
              setExportLoading(false);
          }
          if (data.error !== null) {
            console.log(data.error, 'errror')
            enqueueSnackbar(data.error, {
              variant: "error",
            });
          }
        },
        (error) => {
          if(error.response.body.errors["DateRange.To"]) {
            setIsError(true)
            setExportLoading(false)
            enqueueSnackbar(error.response.body.errors["DateRange.To"], {
              variant: "error",
            });
          } else {
            enqueueSnackbar(error.response.body.title, {
              variant: "error",
            });
          }
          
        }
      );
    } else setShowExportInformationMessage(true); //Turns on warning message if no date values selected
  }

  function getFileStatus(id: string) {
    get(
      remoteRoutes.niraExport + `${id}/status`,
      (res) => {
        setRequestStatus(res.status);
        if (res.status.toLowerCase() === "complete") {
          setExportLoading(false);
          setIsExport(false);
          // setRequestId(res.id);
          download(res.id)
        }
        if (res.error !== null) {
          enqueueSnackbar(res.error, {
            variant: "error",
          });
          setExportLoading(false);
        }
      },
      (error) => {
        enqueueSnackbar(error.response.body.title, {
          variant: "error",
        });
        setExportLoading(false);
      },
      () => {
        setExportLoading(false);
      }
    );
  }

  function checkStatus(id: string) {
    //Initial request
    getFileStatus(id);
    //If status is still Processing, retry every 10 seconds
    const interval = setInterval(function () {
      if (requestStatus.toLowerCase() === "processing") {
        getFileStatus(id);
      }
    }, 10000);

    clearInterval(interval);
  }
  function download(requestId: string) {
    downLoad(
      remoteRoutes.niraExport + requestId + "/download",
      (res) => {
        const data = new Blob([res], {type: 'octet/stream'});
        const csvURL = window.URL.createObjectURL(data);
        const fileName = `Report-${requestId}.zip`;
        let tempLink = document.createElement('a');

        tempLink.href = csvURL;
        tempLink.setAttribute('download', fileName);
        tempLink.click();

        enqueueSnackbar('Report Downloaded successfully', {
          variant: "success",
        });
      },
      (error) => {
        enqueueSnackbar(error.response.body.title, {
          variant: "error",
        });
        setDownloadLoading(false);
      },
      () => {
        setDownloadLoading(false);
      }
    );
    setDownloadLoading(true);
    setIsExport(true); //At the end, show export button
  }
  return (
    <Navigation>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box p={1} className={classes.root}>
            <Box pb={2}>
              <Grid container>
                <Grid item sm={12} className={classes.pageHeading}>
                  <Typography variant="h4">ID Verification Requests</Typography>
                </Grid>
              </Grid>
            </Box>
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
          <Box pt={6}>
            <Paper className={classes.filterPaper} elevation={0}>
              <ErrorBoundary>
                <Filter
                  onFilter={handleFilter}
                  loading={loading}
                  onFilterChange={updateExport}
                />
              </ErrorBoundary>
            </Paper>
          </Box>
          <Box pt={3}>
            <Paper className={classes.exportPaper} elevation={0}>
              <ErrorBoundary>
                  <Button
                    disabled={isError ? isError : exportLoading}
                    variant="outlined"
                    color="primary"
                    onClick={initiateExport}
                    style={{ width: '100%' }}
                  >
                    {exportLoading
                      ? "Processing data for export ..."
                      : "Export data to excel"}
                  </Button>
                {/* {isExport && (
                  <Button
                    disabled={exportLoading}
                    variant="outlined"
                    color="primary"
                    onClick={initiateExport}
                    size="small"
                    style={{ width: 267 }}
                  >
                    {exportLoading
                      ? "Processing data for export ..."
                      : "Export data to excel"}
                  </Button>
                )} */}
                {/* {!isExport && (
                  <Button
                    disabled={downloadLoading}
                    variant="outlined"
                    color="primary"
                    onClick={download}
                    size="small"
                    style={{ width: 267 }}
                  >
                    {downloadLoading
                      ? "Downloading excel ..."
                      : "Download excel"}
                  </Button>
                )} */}
                {isExport && showExportInformationMessage && (
                  <Typography variant="body2" className={classes.information}>
                    Please select start and end date in the filter
                  </Typography>
                )}
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
