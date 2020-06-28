import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import XTable from "../../../../../components/table/XTable";
import { XHeadCell } from "../../../../../components/table/XTableHead";
import Grid from "@material-ui/core/Grid";
import { search } from "../../../../../utils/ajax";
import Loading from "../../../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../../../data/types";
import { columns } from "./BillingsConfig";
import { participantsConstants } from "../../../../../data/redux/participants/reducer";
import { remoteRoutes } from "../../../../../data/constants";

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

const headCells: XHeadCell[] = [...columns];
interface IProps {
  subscriptionId: any;
}

const Billings = ({ subscriptionId }: IProps) => {
  const dispatch = useDispatch();
  const selected = useSelector((state: IState) => state.participants.selected);
  const loading = useSelector(
    (state: IState) => state.participants.billingsLoading
  );
  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: participantsConstants.participantsBillsFetchLoading,
      payload: true,
    });
    if (subscriptionId) {
      search(
        remoteRoutes.billing,
        { SubscriptionIds: subscriptionId },
        (resp) => {
          dispatch({
            type: participantsConstants.participantsBillsFetchAll,
            payload: [...resp],
          });
        },
        () => {
          dispatch({
            type: participantsConstants.participantsBillsFetchLoading,
            payload: false,
          });
        }
      );
    } else {
      dispatch({
        type: participantsConstants.participantsBillsFetchLoading,
        payload: false,
      });
    }
  }, []);
  if (selected && !selected.billings) {
    selected.billings = [];
  }
  const showPagination =
    selected && selected.billings && selected.billings.length > 5
      ? true
      : false;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box p={2} className={classes.root}>
          <Box pb={2}>
            <Grid container>
              <Grid item sm={12} className={classes.pageHeading}>
                <Typography variant="h5">All Bills</Typography>
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
                    data={selected.billings}
                    initialRowsPerPage={10}
                    usePagination={showPagination}
                  />
                </Grid>
              </Grid>
            )
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Billings;
