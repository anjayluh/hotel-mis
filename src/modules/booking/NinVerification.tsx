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
import { ninVerificationHeadCells } from "./config";
import Box from "@material-ui/core/Box";
import NinVerificationForm from "./forms/NinVerificationForm";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import { IState } from "../../data/types";
import Details from "./details/Details";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import snackbarMessages from "../../data/snackbarMessages";
import { printStdDatetimeSeconds } from "../../utils/dateHelpers";

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
      color: "#e53935",
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
  const [data, setData]: any = useState([]);
  const [loading, setLoading]: any = useState(false);
  const [turnOnSlideOut, setTurnOnSlideOut]: any = useState(false);
  const [addNew, setaddNew]: any = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState({
    page: 1,
    itemsPerPage: 0,
    totalItems: 0,
  });
  const [viewDetails, setViewDetails] = useState<any | null>(null);
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [filter, setFilter] = useState<any>({});
  const [exportValues, setExportValues] = useState<any>({});

  useEffect(() => {
    const addNewPersist = localStorage.getItem('isFormOpen')
    if (addNewPersist && JSON.parse(addNewPersist)) {
      localStorage.removeItem('isFormOpen')

    }

  }, [filter, dispatch]);


  function handleToggleDrawer(id?: any) {
    setAnchor("right");
  }
  function handleClose() {
    setViewDetails(null);
  }

  function updateExport(values: any) {
    setExportValues({ ...filter, ...values });
    setExportLoading(false)
    setIsError(false)
    if (values.form !== null && values.to !== null) {
      if ((!!values.from && values.from) >= (!!values.to && values.to)) {
        setIsError(true)
      }
      setShowExportInformationMessage(false)
    }

  }
  function handleFilter(values: any) {
    setFilter({ ...filter, ...values });
  }
  const initiateExport = () => {
    if (exportValues.from && exportValues.to) {
      setShowExportInformationMessage(false);
      setExportLoading(true);

      let matchStatus = null
      if (exportValues.matchingStatus === "Match") {
        matchStatus = true
      }
      else if (exportValues.matchingStatus === "Mismatch") {
        matchStatus = false
      } else {
        matchStatus = null
      }

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
        matchingStatus: matchStatus
      };

    } else setShowExportInformationMessage(true); //Turns on warning message if no date values selected
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
            <Grid item xs={12}>
              <ErrorBoundary>
                <XTable
                  loading={loading}
                  emptyTableMessage={"No results found"}
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

                {isExport && showExportInformationMessage ? (
                  <Typography variant="body2" className={classes.information}>
                    Please select start and end date in the filter
                  </Typography>
                ) : ''}
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
        ) : addNew && (
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
