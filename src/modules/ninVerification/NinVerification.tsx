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
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
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

        rowHover: {
                '&:hover': {
                    cursor: 'pointer',
            },
        },
        close: {
            position: 'fixed',
            bottom: '30px',
        },
        closeButton: {
            padding: '4px 30px',
            backgroundColor: "rgba(38, 50, 56, 0.04)"            
        },

        pageHeading: {
            display: 'flex'
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


    function handleToggleDrawer(id?: any) {
        setOpenSlideOut(!openSlideOut)
        setAnchor('right')
    }

    function handleFilter(f: IWorkflowFilter) {
        setFilter({...filter, ...f})
    }



    return (
        <Navigation>
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Box p={1} className={classes.root}>
                        <Box pb={2}>
                            <Grid container>
                                <Grid item sm={12} className={classes.pageHeading}>
                                    <Typography variant='h4'>NIN Verification Requests</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        {
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
                                    hoverClass = {classes.rowHover}
                                />
                            </Grid>
                        }
                    </Box>
                </Grid>
                <Grid item xs={3} style={{display: open ? "block" : "none"}}>
                    <Box pt={6}>
                        <Paper className={classes.filterPaper} elevation={0}>
                            <Filter onFilter={handleFilter} loading={loading}/>
                        </Paper>
                    </Box>

                </Grid>
            </Grid>
            <SlideOutDrawer handleToggleDrawer={handleToggleDrawer} open={openSlideOut} anchor={anchor} title="">
                <Details closeSlideOut={handleToggleDrawer}></Details>

                <Grid item xs={12} className={classes.close}>
                    <Button
                        className={classes.closeButton}
                        onClick={handleToggleDrawer}
                        size='small'
                    >
                        Close
                    </Button>
                </Grid>
            </SlideOutDrawer>
        </Navigation>

    );
}

export default NinVerifications
