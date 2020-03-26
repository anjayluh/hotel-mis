import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {IParticipantsFilter} from "./types";
import XTable from "../../components/table/XTable";
import {XHeadCell} from "../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import Filter from "./Filter";
import {search} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import Loading from "../../components/Loading";
// import NewPersonForm from "./forms/NewPersonForm";
import NewParticipantForm from "./forms/NewParticipantForm";
import Box from "@material-ui/core/Box";
import EditDialog from "../../components/EditDialog";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {participantsConstants, IParticipantsState} from "../../data/redux/participants/reducer";
import {IState} from "../../data/types";
import {columns} from "./config";
import {fakeParticipant} from "./fakeData";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        pageHeading: {
            display: 'flex'
        },
        addNewButton: {
            color: '#428BCA',
            textTransform: 'capitalize',
            fontStyle: 'italic',
            fontSize: '12px',
            lineHeight: '0.75',
            marginBottom: '-5px',
            marginLeft: '5px',
            fontWeight: 'normal'
        },
    }),
);

const headCells: XHeadCell[] = [...columns];

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Participants = () => {
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);
    const [Add, setAdd] = useState(false);
    const [anchor, setAnchor]= useState<Anchor>('right');
    const [openSlideOut, setOpenSlideOut] = useState(false);
    const {data, loading}: IParticipantsState = useSelector((state: IState) => state.participants)
    const [filter, setFilter] = useState<IParticipantsFilter>({});
    const classes = useStyles();


    useEffect(() => {
        dispatch({
            type: participantsConstants.participantsFetchLoading,
            payload: true,
        })
        search(
            remoteRoutes.contacts,
            filter,
            (resp) => { 
                dispatch({
                    type: participantsConstants.participantsFetchAll,
                    payload: [...callfakeParticipant(15)],
                })
            },
            undefined,
            () => {
                dispatch({
                    type: participantsConstants.participantsFetchLoading,
                    payload: false,
                })
            })
    }, [filter, dispatch])

    function callfakeParticipant(length: number) {
        let participants = []
        while (length > 0){
            participants.push(fakeParticipant())
            length = length - 1
        }
        return participants
    }
    
    function handleFilter(value: any) {
        setFilter({...filter, ...value})
    }

    function handleToggleDrawer() {
        setOpenSlideOut(!openSlideOut)
        setAnchor('right')
    }

    function handleNew() {
        setAdd(true)
        handleToggleDrawer()
    }

    function closeCreateDialog() {
        setCreateDialog(false)
    }

    return (
        <Layout>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Box p={1} className={classes.root}>
                        <Box pb={2}>
                            <Grid container>
                                <Grid item sm={12} className={classes.pageHeading}>
                                    <Typography variant='h5'>Participants</Typography>
                                    {/* Temporarily removed add icon from button startIcon={<AddIcon/> */}
                                    <Button className={classes.addNewButton}
                                    variant="text" onClick={handleNew}>
                                        Add New
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            loading ? <Loading/> :
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <XTable
                                            headCells={headCells}
                                            data={data}
                                            initialRowsPerPage={10}
                                        />
                                    </Grid>
                                </Grid>
                        }
                    </Box>
                </Grid>
                <Grid item xs={3} >
                    <Box pb={2}>
                        <Typography variant='h5'>&nbsp;</Typography>
                    </Box>
                    <Box pt={1}>
                        <Paper className={classes.filterPaper} elevation={0}>
                            <Filter onFilter={handleFilter} loading={loading}/>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            
            <SlideOutDrawer handleToggleDrawer={handleToggleDrawer} open={openSlideOut} anchor={anchor} title="Add New Participants">
            {
                Add ? <NewParticipantForm closeSlideOut={handleToggleDrawer}></NewParticipantForm> :
                <p>Edit coming soon...</p>
            }
            </SlideOutDrawer>
            <EditDialog title="New Person" open={createDialog} onClose={closeCreateDialog}>
                {/* <NewPersonForm data={{}} done={closeCreateDialog}/> */}
            </EditDialog>
        </Layout>
    );
}

export default Participants
