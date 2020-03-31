import React, {useEffect, useState} from "react";
import Layout from "../../../../../components/Layout";
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import XTable from "../../../../../components/table/XTable";
import {XHeadCell} from "../../../../../components/table/XTableHead";
import Grid from '@material-ui/core/Grid';
import {search} from "../../../../../utils/ajax";
import Loading from "../../../../../components/Loading";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {IParticipantsState} from "../../../../../data/redux/participants/reducer";
import {IState, Anchor} from "../../../../../data/types";
import {columns} from "./SubscriptionConfig";
import {fakeSubscriptions} from "../../../fakeData";
import { ISubscription} from "../../../types";

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
            lineHeight: '0.5',
            marginBottom: '-5px',
            marginLeft: '8px',
            marginTop: '-6px',
            fontWeight: 'normal'
        },
        addIcon:{
            marginLeft: '-5px',
            marginRight: '-10px',
            height: '0.7em',
            fontSize: '13px',
        }
    }),
);

const headCells: XHeadCell[] = [...columns];


const Billings = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<ISubscription[]>([])
    const classes = useStyles();

    useEffect(() => {
        setData(callFakeSubscriptions(5));
    }, [dispatch])

    function callFakeSubscriptions(length: number) {
        let subscriptions = []
        while (length > 0){
            subscriptions.push(fakeSubscriptions())
            length = length - 1
        }
        setLoading(false)

        return subscriptions
    }
    function handleNew() {

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box p={1} className={classes.root}>
                    <Box pb={2}>
                        <Grid container>
                            <Grid item sm={12} className={classes.pageHeading}>
                                <Typography variant='h5'>All Bills</Typography>
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
                                        usePagination={false}
                                    />
                                </Grid>
                            </Grid>
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

export default Billings
