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
import {IState, Anchor} from "../../../../../data/types";
import {columns} from "./BillingsConfig";
import {fakeSubscriptions} from "../../../fakeData";
import { ISubscription} from "../../../types";
import {participantsConstants, IParticipantsState} from "../../../../../data/redux/participants/reducer";
import {remoteRoutes} from "../../../../../data/constants";
import {fakeBill} from "../../../fakeData";

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
    const billingData = useSelector((state: IState) => state.participants.billings)
    const [loading, setLoading] = useState<boolean>(false)
    const classes = useStyles();

    useEffect(() => {
        setLoading(true)
        search(
            remoteRoutes.contacts,
            'filter',
            (resp) => {
                dispatch({
                    type: participantsConstants.participantsBillsFetchAll,
                    payload: [...callfakeBill(15)],
                })
            },
            undefined,
            () => {
                setLoading(false)
            })
    }, [])

    function callfakeBill(length: number) {
        let Billings = []
        while (length > 0){
            Billings.push(fakeBill())
            length = length - 1
        }
        return Billings
    }
    console.log(billingData)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box p={2} className={classes.root}>
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
                                        data={billingData}
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
