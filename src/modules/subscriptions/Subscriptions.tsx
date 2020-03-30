import React, {useEffect, useState} from "react";
import Layout from "../../components/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {IWorkflowFilter} from "./types";
import XTable from "../../components/table/XTable";
import {XHeadCell} from "../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import Filter from "./Filter";
import {search} from "../../utils/ajax";
import {remoteRoutes} from "../../data/constants";
import Loading from "../../components/Loading";
import Box from "@material-ui/core/Box";
import EditDialog from "../../components/EditDialog";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {BillingsConstants, IBillingState} from "../../data/redux/billing/reducer";
import {SubscriptionConstants, ISubscriptionState} from "../../data/redux/subscription/redux";
import {IState} from "../../data/types";
import {SubscriptionColumns} from "./config";
import {fakeSubscriptions} from "./fakeData";


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

const headCells: XHeadCell[] = [...SubscriptionColumns];


const Subscription = () => {
    const dispatch = useDispatch();
    const [createDialog, setCreateDialog] = useState(false);
    const {data, loading}: ISubscriptionState = useSelector((state: IState) => state.subscriptions)
    const [filter, setFilter] = useState<IWorkflowFilter>({});
    const classes = useStyles();

    useEffect(() => {
        dispatch({
            type: SubscriptionConstants.SubscriptionsFetchLoading,
            payload: true,
        })
        search(
            remoteRoutes.contacts,
            filter,
            (resp) => {
                dispatch({
                    type: SubscriptionConstants.SubscriptionsFetchAll,
                    payload: [...fakeSubscriptions(15)],
                })
            },
            undefined,
            () => {
                dispatch({
                    type: SubscriptionConstants.SubscriptionsFetchLoading,
                    payload: false,
                })
            })
    }, [filter, dispatch])



    function handleFilter(value: any) {
        setFilter({...filter, ...value})
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
                                <Grid item sm={12} className={classes.pageHeading}>
                                    <Typography variant='h4'>Subscriptions</Typography>
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
                    <Box pt={6}>
                        <Paper className={classes.filterPaper} elevation={0}>
                            <Filter onFilter={handleFilter} loading={loading}/>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Layout>
    );
}

export default Subscription
