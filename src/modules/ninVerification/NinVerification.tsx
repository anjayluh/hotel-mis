import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Navigation from "../../components/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import clsx from 'clsx';
import XTable from "../../components/table/XTable";
import Grid from '@material-ui/core/Grid';
import {IWorkflowFilter} from "./types";
import Filter from "./Filter";
import Typography from "@material-ui/core/Typography";
import {search} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import {wfInitialSort, ninVerificationHeadCells, workflowTypes} from "./config";
import Box from "@material-ui/core/Box";
import {VerificationRequestConstants, IVerificationRequestState} from "../../data/redux/ninVerification/reducer";

import {verificationRequests} from "./fakeData";
import Loading from "../../components/Loading";
import NewParticipantForm from "../participants/forms/NewParticipantForm";
import SlideOutDrawer from "../../components/SlideOutDrawer";
import {IState} from "../../data/types";
import Details from "./details/Details";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        drawer: {
            borderRadius: 0,
        },
        content: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            })
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            })
        },
    }),
);

type Anchor = 'top' | 'left' | 'bottom' | 'right';
const verificationRequestData = verificationRequests()

const NinVerifications = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    // const [loading, setLoading] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);
    const [newData, setNewData] = useState([]);
    const {data, loading}:IVerificationRequestState = useSelector((state: IState) => state.verificationRequests);

    const [anchor, setAnchor]= useState<Anchor>('right');
    const [openSlideOut, setOpenSlideOut] = useState(false);

    const [filter, setFilter] = useState<IWorkflowFilter>({
        workflowTypes: workflowTypes,
        showNew: false,
        showAssigned: true
    });


    useEffect(() => {
        const newFilter = {
            workflowTypes: workflowTypes,
            showNew: true,
            showAssigned: false
        };
        dispatch({
            type:VerificationRequestConstants.RequestsFetchLoading,
            payload: true
        })
        search(
            remoteRoutes.contacts, filter,
            resp => {
            dispatch({
                type: VerificationRequestConstants.RequestsFetchAll,
                payload: [...verificationRequestData]
            })
        }, undefined, () => {
            dispatch({
                type:VerificationRequestConstants.RequestsFetchLoading,
                payload: false
            })
        })
    }, [filter, dispatch])

    // useEffect(() => {
    //     console.log("Filter", filter)
    //     setLoading(true)
    //     search(remoteRoutes.contacts, filter, resp => {
    //         setData(verificationRequestData)
    //     }, undefined, () => setLoading(false))
    // }, [filter])


    // function handleFilterToggle() {
    //     setOpen(!open);
    // }
    console.log(data, 'hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    function handleToggleDrawer(id?: any) {
        console.log(id,'uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu')
        setOpenSlideOut(!openSlideOut)
        setAnchor('right')
    }

    function handleFilter(f: IWorkflowFilter) {
        setFilter({...filter, ...f})
    }

    return (
        <Navigation>
            <Grid container spacing={3}>
                <Grid item xs={open ? 9 : 12} className={clsx(classes.content, {[classes.contentShift]: open})}>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Typography variant='h4'>NIN Verification Requests</Typography>
                        </Grid>
                        {
                            loading ? <Loading/> :
                                <Grid item xs={12}>
                                    <XTable
                                        loading={loadingNew}
                                        headCells={ninVerificationHeadCells}
                                        data={data}
                                        initialRowsPerPage={10}
                                        usePagination={true}
                                        initialSortBy={wfInitialSort}
                                        initialOrder="desc"
                                        handleSelection={handleToggleDrawer}
                                    />
                                </Grid>}
                    </Grid>
                </Grid>
                <Grid item xs={3} style={{display: open ? "block" : "none"}}>
                    <Grid container spacing={2}>
                        <Grid item sm={12}>
                            <Typography variant='h4'>&nbsp;</Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Paper elevation={0} style={{borderRadius: 0}}>
                                <Box p={2}>
                                    <Filter onFilter={handleFilter} loading={loading}/>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
            <SlideOutDrawer handleToggleDrawer={handleToggleDrawer} open={openSlideOut} anchor={anchor} title="">
                {/*<NewParticipantForm closeSlideOut={handleToggleDrawer}></NewParticipantForm> :*/}
                <Details closeSlideOut={handleToggleDrawer}></Details>

                    <p>Edit coming soon...</p>
            </SlideOutDrawer>
        </Navigation>
    );
}

export default NinVerifications
