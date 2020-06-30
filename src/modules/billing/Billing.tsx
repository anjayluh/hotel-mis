import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { IWorkflowFilter } from "./types";
import XTable from "../../components/table/XTable";
import { XHeadCell } from "../../components/table/XTableHead";
import Grid from "@material-ui/core/Grid";
import BillingCycle from "./BillingCycle";
import { search } from "../../utils/ajax";
import { remoteRoutes } from "../../data/constants";
import Loading from "../../components/Loading";
// import NewPersonForm from "./forms/NewPersonForm";
import Box from "@material-ui/core/Box";
import EditDialog from "../../components/EditDialog";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  BillingsConstants,
  IBillingState,
} from "../../data/redux/billing/reducer";
import { IState } from "../../data/types";
import { columns } from "./config";
import { fakeBill } from "./fakeData";
import { printDateTime } from "../../utils/dateHelpers";

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
      lineHeight: "0.75",
      marginBottom: "-5px",
      marginLeft: "5px",
      fontWeight: "normal",
    },
    helperText: {
      marginTop: 20,
    },
  })
);

const headCells: XHeadCell[] = [...columns];

const Billings = () => {
  const dispatch = useDispatch();
  const [createDialog, setCreateDialog] = useState(false);
  const { data, loading, currentCycle }: IBillingState = useSelector(
    (state: IState) => state.billing
  );
  const [filter, setFilter] = useState<IWorkflowFilter>({});
  const classes = useStyles();
  const { generateBill } = useSelector((state: IState) => state.billing);
  useEffect(() => {
    if (currentCycle) {
      dispatch({
        type: BillingsConstants.BillingsFetchLoading,
        payload: true,
      });
      search(
        remoteRoutes.billing,
        { BillingCycleIds: currentCycle.id },
        (resp) => {
          dispatch({
            type: BillingsConstants.BillingsFetchAll,
            payload: resp,
          });
          dispatch({
            type: BillingsConstants.BillingsFetchLoading,
            payload: false,
          });
          if (resp.length > 0) {
            dispatch({
              type: BillingsConstants.BillingsGenerateBill,
              payload: false,
            });
          } else {
            dispatch({
              type: BillingsConstants.BillingsGenerateBill,
              payload: true,
            });
          }
        },
        undefined,
        () => {
          dispatch({
            type: BillingsConstants.BillingsFetchLoading,
            payload: false,
          });
        }
      );
    }
  }, [currentCycle, dispatch]);

  function handleFilter(value: any) {
    setFilter({ ...filter, ...value });
  }

  function handleNew() {
    setCreateDialog(true);
  }

  function closeCreateDialog() {
    setCreateDialog(false);
  }

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box p={1}>
            <Grid container>
              <Grid item sm={12} className={classes.pageHeading}>
                <Typography variant="h4">Billing</Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box p={1} pt={0}>
            <BillingCycle
              onFilter={handleFilter}
              loading={loading}
              tableDataCount={data.length}
            />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box p={1} pt={0} className={classes.root}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <XTable
                  headCells={headCells}
                  data={data}
                  initialRowsPerPage={10}
                  usePagination={data.length > 0}
                />
                {/* {loading && <Loading />} */}
                <div className={classes.helperText}>
                  {generateBill && (
                    <Typography variant={"body2"}>
                      No Bills have been generated for the selected cycle yet
                    </Typography>
                  )}
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <EditDialog
        title="New Person"
        open={createDialog}
        onClose={closeCreateDialog}
      >
        {/* <NewPersonForm data={{}} done={closeCreateDialog}/> */}
      </EditDialog>
    </Layout>
  );
};

export default Billings;
