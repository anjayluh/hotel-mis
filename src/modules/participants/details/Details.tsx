import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Layout from "../../../components/Layout";
import { getRouteParam } from "../../../utils/routHelpers";
import { IParticipant } from "../types";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import ParticipantSummary from "./participantsOverview/ParticipantSummary";
import DetailsHeading from "./DetailsHeading";
import ParticipantsOverview from "./ParticipantOverview";
import Subscriptions from "./info/overview/Subscriptions";
import { useDispatch, useSelector } from "react-redux";
import Billings from "./info/billing/Billings";
import Payments from "./info/payments/Payments";
import AccountStatement from "./info/accountStatement/AccountStatement";

interface IProps extends RouteComponentProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
      borderRadius: 0,
      minHeight: "100%",
      overflowX: "hidden"
    },
    divider: {
      marginTop: theme.spacing(2)
    },
    noPadding: {
      padding: 0
    },
    tableRoot: {
      flexGrow: 1
    },
    filterPaper: {
      borderRadius: 0,
      padding: theme.spacing(2)
    },
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    pageHeading: {
      display: "flex"
    },
    addNewButton: {
      color: "#428BCA",
      textTransform: "capitalize",
      fontStyle: "italic",
      fontSize: "12px",
      lineHeight: "0.75",
      marginBottom: "-5px",
      marginLeft: "5px",
      fontWeight: "normal"
    }
  })
);

const Details = (props: IProps) => {
  const participantId = getRouteParam(props, "participantId");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showParticipantsOverview, setShowParticipantsOverview] = useState<
    boolean
  >(true);
  const [showBillingsView, setShowBillingsView] = useState<boolean>(false);
  const [showPaymentsView, setShowPaymentsView] = useState<boolean>(false);
  const [showAccountStatementView, setShowAccountStatementView] = useState<
    boolean
  >(false);
  const data: IParticipant = useSelector(
    (state: any) => state.participants.selected
  );
  const [headings, setHeadings] = useState([
    { text: "Participants Overview", status: true },
    { text: "Billing", status: false },
    { text: "Payments", status: false },
    { text: "Account Statement", status: false }
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  // const data: IParticipant = tempParticipant;
  useEffect(() => {
    if (participantId) {
      setLoading(false);
    }
  }, [dispatch, participantId, data]);

  const hasError = !loading && !data;

  const handleClick = (value: any) => {
    setHeadings(
      [...headings].map(heading => {
        if (heading.text === value) {
          heading.status = true;
          if (heading.text === "Participants Overview") {
            setShowParticipantsOverview(true);
          } else setShowParticipantsOverview(false);

          if (heading.text === "Billing") {
            setShowBillingsView(true);
          } else setShowBillingsView(false);

          if (heading.text === "Payments") {
            setShowPaymentsView(true);
          } else setShowPaymentsView(false);

          if (heading.text === "Account Statement") {
            setShowAccountStatementView(true);
          } else setShowAccountStatementView(false);

          return {
            ...heading,
            text: heading.text,
            status: true
          };
        } else {
          return {
            ...heading,
            text: heading.text,
            status: false
          };
        }
      })
    );
  };
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
              <ParticipantsOverview data={{ ...data }}></ParticipantsOverview>
            )}
          </Grid>
          {showParticipantsOverview && <Subscriptions></Subscriptions>}
          {showBillingsView && <Billings></Billings>}
          {showPaymentsView && <Payments></Payments>}
          {showAccountStatementView && <AccountStatement></AccountStatement>}
        </div>
      )}
    </Layout>
  );
};

export default withRouter(Details);
