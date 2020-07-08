import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Layout from "../../../components/Layout";
import { getRouteParam } from "../../../utils/routHelpers";
import { useHistory } from "react-router";
import { IParticipant } from "../types";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import ParticipantSummary from "./info/participantsOverview/ParticipantSummary";
import DetailsHeading from "./DetailsHeading";
import ParticipantsOverview from "./info/participantsOverview/ParticipantOverview";
import Subscriptions from "./info/participantsOverview/overview/subscriptions/Subscriptions";
import { useDispatch, useSelector } from "react-redux";
import Billings from "./info/billing/Billings";
import Payments from "./info/payments/Payments";
import AccountStatement from "./info/accountStatement/AccountStatement";
import {IParticipantsState, participantsConstants} from "../../../data/redux/participants/reducer";
import {localRoutes, remoteRoutes} from "../../../data/constants";
import {get, search} from "../../../utils/ajax";
import { useSnackbar } from "notistack";
import {IState} from "../../../data/types";

interface IProps extends RouteComponentProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      borderRadius: 0,
      minHeight: "100%",
      overflowX: "hidden",
    },
    divider: {
      marginTop: theme.spacing(2),
    },
    noPadding: {
      padding: 0,
    },
    tableRoot: {
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
    addNewButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: 12,
      lineHeight: 0.75,
      marginBottom: -5,
      marginLeft: 5,
      fontWeight: "normal",
    },
  })
);

const Details = (props: IProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const participantId = getRouteParam(props, "participantId");
  const currentView = getRouteParam(props, "currentView");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showParticipantsOverview, setShowParticipantsOverview] = useState<
    boolean
  >(currentView === "participantsOverview" ? true : false);
  const [showBillingsView, setShowBillingsView] = useState<boolean>(currentView === "billing" ? true : false);
  const [showPaymentsView, setShowPaymentsView] = useState<boolean>(currentView === "payments" ? true : false);
  const [showAccountStatementView, setShowAccountStatementView] = useState<
    boolean
  >(currentView === "accountStatement" ? true : false);

  const data: IParticipant = useSelector(
    (state: any) => state.participants.selected
  );

  const allData: IParticipant[] = useSelector(
    (state: any) => state.participants.data
  );
  const [headings, setHeadings] = useState([
    { text: "Participants Overview", status: currentView === "participantsOverview" ? true : false },
    { text: "Billing", status: currentView === "billing" ? true : false },
    { text: "Payments", status: currentView === "payments" ? true : false },
    { text: "Account Statement", status: currentView === "accountStatement" ? true : false },
  ]);

  useEffect(() => {
    dispatch({
      type: participantsConstants.getParticipantDetails,
      payload: { participantId },
    });
    // This is fetching subscriptions for a participant
    get(
      remoteRoutes.subscriptions + `?companyIds=${participantId}`,
      (resp) => {
        dispatch({
          type: participantsConstants.participantSubscriptionsFetchAll,
          payload: resp,
        });
        // setLoading(false);
      },
      () => {
        // setLoading(false);
      }
    );
    // This code below runs when the page has refreshed and we don't have the participants list data

    if (allData.length === 0) {
      get(
        remoteRoutes.participants + `/${participantId}`,
        (resp) => {
          dispatch({
            type: participantsConstants.participantsFetchOne,
            payload: resp,
          });
        },
        () => {
          // Toast.error("Operation failed");
          enqueueSnackbar("Operation failed", {
            variant: "error",
          });
        }
      );
    }


  }, [participantId, dispatch]);

  const handleClick = (value: any) => {
    setHeadings(
      [...headings].map((heading) => {
        if (heading.text === value) {
          heading.status = true;
          if (heading.text === "Participants Overview") {
            setShowParticipantsOverview(true);
            history.push(`${localRoutes.participants}/${participantId}/participantsOverview`);

          } else setShowParticipantsOverview(false);

          if (heading.text === "Billing") {
            setShowBillingsView(true);
            history.push(`${localRoutes.participants}/${participantId}/billing`);

          } else setShowBillingsView(false);

          if (heading.text === "Payments") {
            setShowPaymentsView(true);
            history.push(`${localRoutes.participants}/${participantId}/payments`);
          } else setShowPaymentsView(false);

          if (heading.text === "Account Statement") {
            setShowAccountStatementView(true);
            history.push(`${localRoutes.participants}/${participantId}/accountStatement`);
          } else setShowAccountStatementView(false);

          return {
            ...heading,
            text: heading.text,
            status: true,
          };
        } else {
          return {
            ...heading,
            text: heading.text,
            status: false,
          };
        }
      })
    );
  };

  const loading = participantId && data ? false : true;
  const hasError = !loading && !data;

  if (data && !data.subscriptions) {
    data.subscriptions = [];
  }

  return (
    <Layout>
      {loading && <Loading />}
      {hasError && <Error text="Failed load contact" />}
      {data && (
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{ paddingBottom: 25 }}>
              <ParticipantSummary data={data} />
            </Grid>
            <DetailsHeading
              data={headings}
              handleClickedItem={handleClick}
            ></DetailsHeading>
            {showParticipantsOverview && (
              <ParticipantsOverview
                data={{ ...data }}
                participantId={participantId}
              ></ParticipantsOverview>
            )}
          </Grid>
          {showParticipantsOverview && (
            <Subscriptions participantId={participantId} />
          )}
          {showBillingsView && (
            <Billings
              subscriptionId={data.subscriptions[0] && data.subscriptions[0].id}
            />
          )}
          {showPaymentsView && (
            <Payments
              subscriptionId={data.subscriptions[0] && data.subscriptions[0].id}
            ></Payments>
          )}
          {showAccountStatementView && <AccountStatement></AccountStatement>}
        </div>
      )}
    </Layout>
  );
};

export default withRouter(Details);
