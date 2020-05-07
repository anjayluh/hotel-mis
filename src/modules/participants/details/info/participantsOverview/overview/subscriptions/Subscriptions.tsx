import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import XTable from "../../../../../../../components/table/XTable";
import { XHeadCell } from "../../../../../../../components/table/XTableHead";
import Grid from "@material-ui/core/Grid";
import Loading from "../../../../../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./SubscriptionConfig";
import { fakeSubscriptions } from "../../../../../fakeData";
import { IState } from "../../../../../../../data/types";
import SlideOutDrawer from "../../../../../../../components/SlideOutDrawer";
import SubscriptionsForm from "../../forms/SubscriptionsForm";
import { Anchor } from "../../../../../../../data/types";
import { participantsConstants } from "../../../../../../../data/redux/participants/reducer";
import { remoteRoutes } from "../../../../../../../data/constants";
import { get } from "../../../../../../../utils/ajax";

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
  })
);

interface IProps {
  id: any;
}
const headCells: XHeadCell[] = [...columns];

const Subscriptions = ({ id }: IProps) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { selected } = useSelector((state: IState) => state.participants);
  const classes = useStyles();
  const [formData, setFormData] = useState<any | null>({
    service: "",
    subscriptionDate: null,
  });
  const [add, setAdd] = useState(false);
  const [openSlideOut, setOpenSlideOut] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>("right");

  useEffect(() => {
    get(
      remoteRoutes.subscriptions + `?companyIds=${id}`,
      (resp) => {
        dispatch({
          type: participantsConstants.participantSubscriptionsFetchAll,
          payload: resp,
        });
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }, [dispatch]);

  function handleToggleDrawer(methodType?: string, actionData?: any) {
    setOpenSlideOut(!openSlideOut);
    if (methodType === "add") {
      setAdd(true);
    } else if (methodType === "edit") {
      setFormData({
        name: actionData[0].value.substring(
          0,
          actionData[0].value.indexOf("(") - 1
        ),
        role: actionData[0].value.substring(
          actionData[0].value.indexOf("(") + 1,
          actionData[0].value.indexOf(")")
        ),
        phone: actionData[1].value.substring(
          0,
          actionData[1].value.indexOf("/") - 1
        ),
        email: actionData[1].value.substring(
          actionData[1].value.indexOf("(") + 1,
          actionData[1].value.length - 1
        ),
      });
    }
  }
  function handleNewSubscription() {
    handleToggleDrawer("add");
  }
  if (selected && !selected.subscriptions) {
    selected.subscriptions = [];
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Box p={1} className={classes.root}>
          <Box pb={2}>
            <Grid container>
              <Grid item sm={12} className={classes.pageHeading}>
                <Typography variant="h5">Subscription</Typography>
                {!loading && selected && selected.subscriptions.length < 1 && (
                  <Button
                    className={classes.addNewButton}
                    startIcon={<AddIcon className={classes.addIcon} />}
                    variant="text"
                    onClick={handleNewSubscription}
                  >
                    Add New
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
          {loading ? (
            <Loading />
          ) : (
            selected && (
              <Grid container spacing={2} style={{ overflow: "visible" }}>
                <Grid item xs={12}>
                  <XTable
                    headCells={headCells}
                    data={selected.subscriptions}
                    initialRowsPerPage={4}
                    usePagination={false}
                  />
                </Grid>
              </Grid>
            )
          )}
        </Box>
      </Grid>
      <SlideOutDrawer
        handleToggleDrawer={handleToggleDrawer}
        open={openSlideOut}
        anchor={anchor}
        title={add ? "Add New Subscription" : "Edit Subscription"}
      >
        <SubscriptionsForm
          id={id}
          closeSlideOut={handleToggleDrawer}
        ></SubscriptionsForm>
      </SlideOutDrawer>
    </Grid>
  );
};

export default Subscriptions;
