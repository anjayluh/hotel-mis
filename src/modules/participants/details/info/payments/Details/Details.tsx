import React, { useEffect } from "react";
import Loading from "../../../../../../components/Loading";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { IPayment } from "../../../../types";
import Typography from "@material-ui/core/Typography";
import Summary from "./Summary";
// import WorkflowView from "./WorkflowView";
import { put, search } from "../../../../../../utils/ajax";
import { remoteRoutes } from "../../../../../../data/constants";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";
import { IState } from "../../../../../../data/types";
import { fakePaymentDetails } from "../../../../fakeData";

interface IProps {
  closeSlideOut?: () => any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
      padding: theme.spacing(1),
      position: "relative",
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

const tempPaymentDetails: IPayment = fakePaymentDetails();

const Details = (props: IProps) => {
  const dispatch: Dispatch<any> = useDispatch();
  const classes = useStyles();
  const { paymentDetails, paymentsDetailsLoading } = useSelector(
    (state: IState) => state.participants
  );

  useEffect(() => {
    dispatch({
      type: participantsConstants.paymentsDetailsFetchAllLoading,
      payload: true,
    });
    search(
      remoteRoutes.contacts,
      "filter",
      (resp) => {
        dispatch({
          type: participantsConstants.paymentsDetailsFetchAll,
          payload: tempPaymentDetails,
        });
      },
      undefined,
      () => {
        dispatch({
          type: participantsConstants.paymentsDetailsFetchAll,
          payload: tempPaymentDetails,
        });
      }
    );
  }, []);

  return (
    <div>
      {paymentsDetailsLoading ? (
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
              <Box display="flex" py={1}>
                <Box flexGrow={1} pt={1}>
                  <Typography variant="h5">
                    Payment ID:{" "}
                    {paymentDetails ? paymentDetails.paymentId : "loading"}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box pt={1}>
                {paymentDetails && <Summary data={paymentDetails} />}
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Details;
