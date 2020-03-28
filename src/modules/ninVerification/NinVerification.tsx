import React, {useEffect, useState} from "react";
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

import {verificationRequests} from "./fakeData";
import Loading from "../../components/Loading";
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
        pageHeading: {
            display: 'flex'
        },
    }),
);


const verificationRequestData = verificationRequests()

const NinVerifications = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [loadingNew, setLoadingNew] = useState(false);
    const [newData, setNewData] = useState([]);
    const [data, setData] = useState([]);

    const [filter, setFilter] = useState<IWorkflowFilter>({
        workflowTypes: workflowTypes,
        showNew: false,
        showAssigned: true
    });


    useEffect(() => {
        setLoadingNew(true)
        const newFilter = {
            workflowTypes: workflowTypes,
            showNew: true,
            showAssigned: false
        };
        search(remoteRoutes.contacts, newFilter, resp => {
            setNewData(verificationRequestData)
        }, undefined, () => {
            setLoadingNew(false)
        })
    }, [])

    useEffect(() => {
        console.log("Filter", filter)
        setLoading(true)
        search(remoteRoutes.contacts, filter, resp => {
            setData(verificationRequestData)
        }, undefined, () => setLoading(false))
    }, [filter])


    function handleFilterToggle() {
        setOpen(!open);
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
                                    {/* Temporarily removed add icon from button startIcon={<AddIcon/> */}
                                    {/*<Button className={classes.addNewButton}*/}
                                    {/*        variant="text" onClick={handleNew}>*/}
                                    {/*    Add New*/}
                                    {/*</Button>*/}
                                </Grid>
                            </Grid>
                        </Box>
                        {
                            <Grid item xs={12}>
                                <XTable
                                    loading={loadingNew}
                                    headCells={ninVerificationHeadCells}
                                    data={newData}
                                    initialRowsPerPage={10}
                                    usePagination={true}
                                    initialSortBy={wfInitialSort}
                                    initialOrder="desc"
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
        </Navigation>
    );
}

export default NinVerifications
