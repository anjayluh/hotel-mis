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
import {columns} from "./PaymentsConfig";
import {participantsConstants} from "../../../../../data/redux/participants/reducer";
import {remoteRoutes} from "../../../../../data/constants";
import {fakePayment} from "../../../fakeData";
import Details from './Details/Details';
import SlideOutDrawer from "../../../../../components/SlideOutDrawer";

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


const Payments = () => {
    const dispatch = useDispatch();
    const paymentsData = useSelector((state: IState) => state.participants.payments)
    const [loading, setLoading] = useState<boolean>(false)
    const [anchor, setAnchor]= useState<Anchor>('right');
    const [openSlideOut, setOpenSlideOut] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setLoading(true)
        search(
            remoteRoutes.contacts,
            'filter',
            (resp) => {
                dispatch({
                    type: participantsConstants.participantsPaymentsFetchAll,
                    payload: [...callFakePayment(15)],
                })
            },
            undefined,
            () => {
                setLoading(false)
            })
    }, [])

    function callFakePayment(length: number) {
        let Payments = []
        while (length > 0){
            Payments.push(fakePayment())
            length = length - 1
        }
        return Payments
    }

    function handleToggleDrawer(id?: any) {
        setOpenSlideOut(!openSlideOut)
        setAnchor('right')
    }

    function handleNewPayment() {

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box p={1} className={classes.root}>
                    <Box pb={2}>
                        <Grid container>
                            <Grid item sm={12} className={classes.pageHeading}>
                                <Typography variant='h5'>All Bills</Typography>
                                <Button className={classes.addNewButton}
                                        startIcon={<AddIcon className={classes.addIcon}/>}
                                        variant="text" onClick={handleNewPayment}>
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
                                        data={paymentsData}
                                        initialRowsPerPage={10}
                                        usePagination={false}
                                        handleSelection={handleToggleDrawer}
                                        hoverClass = {classes.rowHover}
                                    />
                                </Grid>
                            </Grid>
                    }
                </Box>
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
        </Grid>
    );
}

export default Payments
