import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import {getRouteParam} from "../../../../../../utils/routHelpers";
import Loading from "../../../../../../components/Loading";
import Error from "../../../../../../components/Error";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {IPaymentDetails, IWorkflow, trimCaseId} from "../../../../types";
import Typography from "@material-ui/core/Typography";
import {Flex} from "../../../../../../components/widgets";
import Summary from "./Summary";
// import WorkflowView from "./WorkflowView";
import {put, search} from "../../../../../../utils/ajax";
import {remoteRoutes} from "../../../../../../data/constants";
import Button from "@material-ui/core/Button";
import LoaderDialog from "../../../../../../components/LoaderDialog";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {fakeRequestDetails} from "../../../../../ninVerification/fakeData";
import {participantsConstants} from "../../../../../../data/redux/participants/reducer";
import {IState} from "../../../../../../data/types";
import XTextInput from "../../../../../../components/inputs/XTextInput";
import {fakePaymentDetails} from "../../../../fakeData";


interface IProps {
    closeSlideOut?: () => any

}

const useWfStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 0,
            backgroundColor: 'transparent'
        },
        stepPaper: {
            borderRadius: 0,
        },
        stepLabel: {
            padding: theme.spacing(1)
        },
        stepContent: {
            paddingRight: 0,
            paddingBottom: theme.spacing(1)

        },
        taskIcon: {
            marginTop: 1
        },

    })
);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0,
            padding: theme.spacing(1),
            position: 'relative'
        },
        divider: {
            marginTop: theme.spacing(2)
        },
        noPaddingLeft: {
            paddingLeft: 0
        },
        loading: {
            position: 'absolute',
            top: 300,
        }
    })
);

const paymentDetails: IPaymentDetails = fakePaymentDetails();

const Details = (props: IProps) => {
    const dispatch: Dispatch<any> = useDispatch();
    const caseId = getRouteParam(props, 'caseId')
    const wfClasses = useWfStyles()
    const classes = useStyles()
    const [blocker, setBlocker] = useState<boolean>(false)
    const paymentData = useSelector((state: IState) => state.participants.paymentDetails);
    const loading = useSelector((state: IState) => state.participants.loading);

    useEffect(() => {
        dispatch({
            type: participantsConstants.participantsFetchLoading,
            payload: true,
        })
        search(
            remoteRoutes.contacts,
            'filter',
            (resp) => {
                dispatch({
                    type: participantsConstants.PaymentsDetailsFetchAll,
                    payload: paymentDetails
                })
            },
            undefined,
            () => {
                dispatch({
                    type: participantsConstants.participantsFetchLoading,
                    payload: false,
                })
            })
    }, [])

    function handleClose(){
        if (props.closeSlideOut) {
            props.closeSlideOut()
        }
    }
    return (
    <div>
        {
            paymentData &&
            <div className={classes.root} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display='flex' py={1}>
                            <Box flexGrow={1} pt={1}>
                                <Typography variant='h5'>Payment ID: { paymentData ? paymentData.paymentId: 'loading'}</Typography>
                            </Box>
                        </Box>
                        <Divider/>
                        <Box pt={1}>
                            {
                                loading ? <Loading loaderClass={classes.loading}/> :
                                    <Summary data={paymentData}/>
                            }
                        </Box>
                    </Grid>
                </Grid>
            </div>
        }


    </div>

    );
}

export default Details;
