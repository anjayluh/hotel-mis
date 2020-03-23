import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {IWorkflowFilter} from "./types";
import XTable from "../../components/table/XTable";
import {XHeadCell} from "../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import Filter from "./Filter";
import {search} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import Loading from "../../components/Loading";
// import NewPersonForm from "./forms/NewPersonForm";
import Box from "@material-ui/core/Box";
import EditDialog from "../../components/EditDialog";
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
    }),
);

const headCells: XHeadCell[] = [...columns];


const Participants = () => {
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);
    const {data, loading}: IParticipantsState = useSelector((state: IState) => state.participants)
    const [filter, setFilter] = useState<IWorkflowFilter>({});
    const classes = useStyles();


    useEffect(() => {
        dispatch({
            type: participantsConstants.participantsFetchLoading,
            payload: true,
        })
        console.log(checkEmptyObject(filter))
        if(checkEmptyObject(filter)){
            dispatch({
                type: participantsConstants.participantsFetchAll,
                payload: [...callfakeParticipant(10)],
            })
        }
        else{
            dispatch({
                type: participantsConstants.participantsFilter,
                payload: filter,
            })
        }
        /* search(
            remoteRoutes.contacts,
            filter,
            (resp) => { 
                let x = callfakeParticipant(5);
                console.log('x', x)
                dispatch({
                    type: participantsConstants.participantsFetchAll,
                    payload: [...resp],
                })
            },
            undefined,
            () => {
                dispatch({
                    type: participantsConstants.participantsFetchLoading,
                    payload: false,
                })
            }) */
    }, [filter, dispatch])

    function callfakeParticipant(length: number) {
        let participants = []
        // console.log('fake', fakeParticipant())
        while (length > 0){
            participants.push(fakeParticipant())
            length = length - 1
        }
        return participants
    }
    
    function handleFilter(value: any) {
        setFilter({...filter, ...value})
    }

    function checkEmptyObject(value: any){
        if(Object.keys(value).length === 0){
            return true
        }
        else {
            Object.keys(value).some(function(a) {
                if(value[a] !== ""){
                    return true
                }
            });
            // return false
        }
    }

    function handleNew() {
        setCreateDialog(true)
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
                                <Grid item sm={12}>
                                    <Typography variant='h5'>Participants</Typography>
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
            <EditDialog title="New Person" open={createDialog} onClose={closeCreateDialog}>
                {/* <NewPersonForm data={{}} done={closeCreateDialog}/> */}
            </EditDialog>
        </Layout>
    );
}

export default Participants
