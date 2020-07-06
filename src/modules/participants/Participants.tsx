import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { IParticipantsFilter } from "./types";
import XTable from "../../components/table/XTable";
import { XHeadCell } from "../../components/table/XTableHead";
import Grid from "@material-ui/core/Grid";
import Filter from "./Filter";
import { search } from "../../utils/ajax";
import { remoteRoutes } from "../../data/constants";
import Loading from "../../components/Loading";
// import NewPersonForm from "./forms/NewPersonForm";
import ParticipantForm from "./forms/ParticipantForm";
import Box from "@material-ui/core/Box";
import EditDialog from "../../components/EditDialog";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  participantsConstants,
  IParticipantsState,
} from "../../data/redux/participants/reducer";
import { IState, Anchor } from "../../data/types";
import { columns } from "./config";

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
      fontSize: 12,
      lineHeight: 0.5,
      marginBottom: -5,
      marginLeft: 8,
      marginTop: -6,
      fontWeight: "normal",
    },
    addIcon: {
      marginLeft: -5,
      marginRight: -10,
      height: "0.7em",
      fontSize: 13,
    },
  })
);

const headCells: XHeadCell[] = [...columns];

const Participants = () => {
  const dispatch = useDispatch();
  const [createDialog, setCreateDialog] = useState(false);
  const [add, setAdd] = useState(false);
  const [anchor, setAnchor] = useState<Anchor>("right");
  const [openSlideOut, setOpenSlideOut] = useState(false);
  const { data, loading }: IParticipantsState = useSelector(
    (state: IState) => state.participants
  );
  const [filter, setFilter] = useState<IParticipantsFilter>({});
  const classes = useStyles();

  useEffect(() => {
    dispatch({
      type: participantsConstants.participantsFetchLoading,
      payload: true,
    });
    search(
      remoteRoutes.participants + `?Categories=Company`,
      filter,
      (resp) => {
        dispatch({
          type: participantsConstants.participantsFetchAll,
          payload: [...resp],
        });
      },
      undefined,
      () => {
        dispatch({
          type: participantsConstants.participantsFetchLoading,
          payload: false,
        });
      }
    );
  }, [filter, dispatch]);

  function handleFilter(value: any) {
    setFilter({ ...filter, ...value });
  }

  function handleToggleDrawer() {
    setOpenSlideOut(!openSlideOut);
    setAnchor("right");
  }

  function handleNew() {
    setAdd(true);
    handleToggleDrawer();
  }

  function closeCreateDialog() {
    setCreateDialog(false);
  }

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box p={1} className={classes.root}>
            <Box pb={2}>
              <Grid container>
                <Grid item sm={12} className={classes.pageHeading}>
                  <Typography variant="h4">Participants</Typography>
                  <Button
                    className={classes.addNewButton}
                    startIcon={<AddIcon className={classes.addIcon} />}
                    variant="text"
                    onClick={handleNew}
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {loading ? (
              <Loading />
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <XTable
                    headCells={headCells}
                    data={data}
                    initialRowsPerPage={10}
                    initialSortBy={"createdAt"}
                    initialOrder={"desc"}
                  />
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box pt={6}>
            <Paper className={classes.filterPaper} elevation={0}>
              <Filter onFilter={handleFilter} loading={loading} />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <SlideOutDrawer
        handleToggleDrawer={handleToggleDrawer}
        open={openSlideOut}
        anchor={anchor}
        title="Add New Participants"
      >
        {add ? (
          <ParticipantForm closeSlideOut={handleToggleDrawer}></ParticipantForm>
        ) : (
          <p>Edit coming soon...</p>
        )}
      </SlideOutDrawer>
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

export default Participants;
