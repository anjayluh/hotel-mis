import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Layout from "../../../components/Layout";
import { getRouteParam } from "../../../utils/routHelpers";
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
import { participantsConstants } from "../../../data/redux/participants/reducer";
import { remoteRoutes } from "../../../data/constants";
import { get } from "../../../utils/ajax";

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

const fakeSelected: IParticipant = {
  category: "Company",
  person: null,
  subscriptions: [],
  contactPersons: [],
  company: {
    name: "Stanbic Bank Uganda Limited",
    id: "994712fb-593d-432d-2d2c-08d7daebc584",
    createdAt: new Date(),
    lastUpdated: null,
    isDeleted: false
  },
  identifications: [
    {
      category: "Nin",
      contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
      value: "DE128398323",
      cardNumber: null,
      issuingCountry: null,
      issueDate: new Date(),
      expiryDate: new Date(),
      isPrimary: true,
      id: "3994b03c-0e22-4e9c-8ce1-08d7daebc586",
      createdAt: new Date(),
      lastUpdated: null,
      isDeleted: false
    }
  ],
  phones: [
    {
      category: "Mobile",
      contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
      value: "0414100100",
      isPrimary: true,
      id: "5d66befc-cfab-417c-654c-08d7daebc587",
      createdAt: new Date(),
      lastUpdated: null,
      isDeleted: false
    }
  ],
  emails: [
    {
      category: "Personal",
      contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
      value: "reach_out@stanbic.co.ug",
      isPrimary: true,
      id: "f365d61a-827e-4f86-ab0e-08d7daebc585",
      createdAt: new Date(),
      lastUpdated: null,
      isDeleted: false
    }
  ],
  addresses: [],
  tags: null,
  id: "04c8a212-3b79-44c5-6649-08d7daebc579",
  createdAt: new Date(),
  lastUpdated: null,
  isDeleted: false
};
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
  const allData: IParticipant[] = useSelector(
    (state: any) => state.participants.data
  );
  const [headings, setHeadings] = useState([
    { text: "Participants Overview", status: true },
    { text: "Billing", status: false },
    { text: "Payments", status: false },
    { text: "Account Statement", status: false }
  ]);

  useEffect(() => {
    dispatch({
      type: participantsConstants.getParticipantDetails,
      payload: { participantId }
    });
    // This code below runs when the page has refreshed and we don't have the participants list data
    if (allData.length === 0) {
      get(
        remoteRoutes.participants + `/${participantId}`,
        resp => {
          dispatch({
            type: participantsConstants.participantsFetchOne,
            payload: fakeSelected
          });
        },
        () => {
          // This is temporal until the endpoint is functioning
          dispatch({
            type: participantsConstants.participantsFetchOne,
            payload: fakeSelected
          });
        }
      );
    }
  }, [participantId, dispatch]);

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
  const loading = participantId && data ? false : true;
  const hasError = !loading && !data;

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
