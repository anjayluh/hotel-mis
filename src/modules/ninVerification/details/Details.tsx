import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import Navigation from "../../../components/Layout";
import {getRouteParam} from "../../../utils/routHelpers";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";

import {IRequestDetails, IWorkflow, trimCaseId} from "../types";
import Typography from "@material-ui/core/Typography";
import {Flex} from "../../../components/widgets";
import Summary from "./Summary";
import WorkflowView from "./WorkflowView";
import {put, search} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import Button from "@material-ui/core/Button";
import LoaderDialog from "../../../components/LoaderDialog";
import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {fetchWorkflowAsync, IWorkflowState, startWorkflowFetch} from "../../../data/redux/workflows/reducer";
import {successColor} from "../../../theme/custom-colors";
import {renderStatus, renderSubStatus} from "../widgets";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import {fakeRequestDetails} from "../fakeData";
import {VerificationRequestConstants, IVerificationRequestState} from "../../../data/redux/ninVerification/reducer";
import {participantsConstants} from "../../../data/redux/participants/reducer";
import {IState} from "../../../data/types";


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
        successIcon: {
            color: successColor
        }
    })
);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0,
            padding: theme.spacing(1)
        },
        divider: {
            marginTop: theme.spacing(2)
        },
        noPaddingLeft: {
            paddingLeft: 0
        }
    })
);
const requestDetails = [fakeRequestDetails()];

const Details = (props: IProps) => {
    const caseId = getRouteParam(props, 'caseId')
    const wfClasses = useWfStyles()
    const classes = useStyles()
    const [blocker, setBlocker] = useState<boolean>(false)
    const requestData = useSelector((state: IState) => state.verificationRequests.requestDetails);
    const [loadindDetails, setLoading] = useState<boolean>(true)
    const dispatch: Dispatch<any> = useDispatch();

    // const [requestData, setRequestData] = useState<any>([]);


    // useEffect(() => {
    //     setRequestData(requestDetails)
    // }, [])

    useEffect(() => {
        setLoading(true)
        search(
            remoteRoutes.contacts,
            'filter',
            (resp) => {
                dispatch({
                    type: VerificationRequestConstants.RequestDetails,
                    payload: requestDetails
                })
            },
            undefined,
            () => {
                setLoading(false)
            })
    }, [dispatch])

    function handleClose(){
        if (props.closeSlideOut) {
            props.closeSlideOut()
        }
    }
    // console.log(typeof requestData, 'jjjjjjjjjjjjjjjjjjjjjjj')
    // let caseData = requestData
    console.log(requestData, 'This prints the arrya data')
    // console.log(caseData[0], 'This prints the individual element, the first one')
    // console.log(Object.keys(caseData), 'Holyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    // for(let i = 0; i< caseData.length; i++){
    //     console.log(caseData[i].nin)
    // }
    return (
    <div>
            <div className={classes.root} >

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display='flex' py={1}>
                            <Box flexGrow={1} pt={1}>
                                <Typography variant='h5'>Request Id</Typography>
                            </Box>
                        </Box>
                        <Divider/>
                        {/*<Box pt={1}>*/}
                        {/*    <Summary data={requestData[0]} />*/}
                        {/*</Box>*/}
                    </Grid>
                </Grid>

            </div>

    </div>

    );
}

export default Details;
