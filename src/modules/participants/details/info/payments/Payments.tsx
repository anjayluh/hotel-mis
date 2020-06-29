import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import XTable from "../../../../../components/table/XTable";
import { XHeadCell } from "../../../../../components/table/XTableHead";
import Grid from "@material-ui/core/Grid";
import { search, get } from "../../../../../utils/ajax";
import Loading from "../../../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { IState, Anchor } from "../../../../../data/types";
import { columns } from "./PaymentsConfig";
import { participantsConstants } from "../../../../../data/redux/participants/reducer";
import { remoteRoutes } from "../../../../../data/constants";
import Details from "./Details/Details";
import SlideOutDrawer from "../../../../../components/SlideOutDrawer";
import PaymentForm from "./forms/PaymentForm";
import Toast from "../../../../../utils/Toast";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2),
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    pageHeading: {
      display: "flex",
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
    addNewButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: "12px",
      lineHeight: "0.5",
      marginBottom: "-5px",
      marginLeft: "8px",
      marginTop: "-6px",
      fontWeight: "normal",
    },
    addIcon: {
      marginLeft: "-5px",
      marginRight: "-10px",
      height: "0.7em",
      fontSize: "13px",
    },
    helperText: {
      marginLeft: 15,
      marginTop: 2,
      fontStyle: "italic",
      fontSize: 11,
    },
  })
);

const headCells: XHeadCell[] = [...columns];
interface IProps {
  subscriptionId: string | undefined;
}
const Payments = (props: IProps) => {
  const {enqueueSnackbar} = useSnackbar();
  const dispatch = useDispatch();
  const { selected } = useSelector((state: IState) => state.participants);
  const loading = useSelector(
    (state: IState) => state.participants.paymentsLoading
  );
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [openSlideOut, setOpenSlideOut] = useState(false);
  const classes = useStyles();
  const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(false);
  const [showPaymentForm, setShowPaymentForm] = useState<boolean>(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string>("");
  const baseUrl = remoteRoutes.participantsBilling.split("bills")[0];
  const paymentsUrl = baseUrl + "payments";
  useEffect(() => {
    dispatch({
      type: participantsConstants.participantsPaymentsFetchLoading,
      payload: true,
    });
    if (props.subscriptionId) {
      search(
        paymentsUrl,
        { SubscriptionIds: props.subscriptionId },
        (data) => {
          dispatch({
            type: participantsConstants.participantsPaymentsFetchAll,
            payload: data,
          });
        },
        () => {
          dispatch({
            type: participantsConstants.participantsPaymentsFetchLoading,
            payload: false,
          });
          // Toast.error("Operation failed");
          enqueueSnackbar('Operation failed', {
            variant: 'error',
          });
        }
      );
    } else {
      dispatch({
        type: participantsConstants.participantsPaymentsFetchLoading,
        payload: false,
      });
    }
  }, []);

  function handleToggleDrawer(id?: any) {
    setOpenSlideOut(!openSlideOut);
    setAnchor("right");
  }

  function handleNewPayment() {
    setShowPaymentDetails(false);
    setShowPaymentForm(true);
    handleToggleDrawer();
  }
  function handlePaymentDetails(id?: any) {
    setSelectedPaymentId(id);
    setShowPaymentForm(false);
    setShowPaymentDetails(true);
    handleToggleDrawer();
  }
  if (selected && !selected.payments) {
    selected.payments = [];
  }
  const showPagination =
    selected && selected.payments && selected.payments.length > 5
      ? true
      : false;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box p={2} className={classes.root}>
          <Box pb={2}>
            <Grid container>
              <Grid item sm={12} className={classes.pageHeading}>
                <Typography variant="h5">Payments</Typography>
                {props.subscriptionId ? (
                  <Button
                    className={classes.addNewButton}
                    startIcon={<AddIcon className={classes.addIcon} />}
                    variant="text"
                    onClick={handleNewPayment}
                  >
                    Add New
                  </Button>
                ) : (
                  <Typography variant="body2" className={classes.helperText}>
                    * Please first create a subscription
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
          {loading ? (
            <Loading />
          ) : (
            selected && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <XTable
                    headCells={headCells}
                    data={selected.payments}
                    initialRowsPerPage={5}
                    usePagination={showPagination}
                    handleSelection={handlePaymentDetails}
                    hoverClass={classes.rowHover}
                  />
                </Grid>
              </Grid>
            )
          )}
        </Box>
      </Grid>
      <SlideOutDrawer
        handleToggleDrawer={handlePaymentDetails}
        open={openSlideOut}
        anchor={anchor}
        title={showPaymentForm ? "Add new Payment" : ""}
      >
        {showPaymentDetails && (
          <div>
            <Details
              closeSlideOut={handlePaymentDetails}
              paymentId={selectedPaymentId}
            ></Details>
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
        )}

        {showPaymentForm && (
          <PaymentForm
            closeSlideOut={handleNewPayment}
            subscriptionId={props.subscriptionId && props.subscriptionId}
          ></PaymentForm>
        )}
      </SlideOutDrawer>
    </Grid>
  );
};

export default Payments;
