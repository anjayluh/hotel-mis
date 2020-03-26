import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import Layout from "../../../components/Layout";
import {getRouteParam} from "../../../utils/routHelpers";
import {IParticipant} from "../types";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import {useDispatch, useSelector} from "react-redux";
import {participantsConstants} from "../../../data/redux/participants/reducer";
import Profile from "./info/Profile";
import Info from "./info/Info";

interface IProps extends RouteComponentProps {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1),
            borderRadius: 0,
            minHeight: '100%',
            overflow: 'show'
        },
        divider: {
            marginTop: theme.spacing(2)
        },
        noPadding: {
            padding: 0
        }
    })
);

const Details = (props: IProps) => {
    const participantId = getRouteParam(props, 'participantId');
    const classes = useStyles();
    const dispatch = useDispatch();
    // to test with actual form replace selected with fakeselected
    const data: IParticipant | undefined = useSelector((state: any) => state.participants.selected);
    const [loading, setLoading] = useState<boolean>(true)
    const [value, setValue] = React.useState('one');
    const tempData = {
        id: "429e16b7-eec4-463f-48b7-08d7bb6a08a2",
        name: "ABI Bank",
        phoneNumber: [
            {
                id: "429e16b7-eec4-463f-48b7-08d7bb6a08a3", 
                type: "primary", 
                value: "0396767798"},
            {
                id: "429e16b7-eec4-463f-48b7-08d7bb6a08a4", 
                type: "other", 
                value: "0396767798"},
            ],
        type: {
            id: "429e16b7-eec4-463f-48b7-08d7bb6a08a5",
            name: "Commercial Bank"
        },
        status: {
            id: "429e16b7-eec4-463f-48b7-08d7bb6a08a6",
            name: "Inactive"
        },
        officialEmail: "info@abcbank.ug",
        dateCreated: new Date()
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };
    useEffect(() => {
        setLoading(true)
        
        get(
            `${remoteRoutes.participants}/${participantId}`,
            resp => dispatch({
                type: participantsConstants.participantsFetchOne,
                payload: tempData,
            }),
            undefined,
            () => {
                dispatch({
                    type: participantsConstants.participantsFetchOne,
                    payload: tempData,
                })
                setLoading(false)
            }
            )        
    }, [dispatch, participantId])

    const hasError = !loading && !data
    return (
        <Layout>
            {loading && <Loading/>}
            {hasError && <Error text='Failed load contact'/>}
            {
                data &&
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{paddingBottom: 0}}>
                            <Profile data={data}/>
                            <Divider className={classes.divider}/>
                        </Grid>
                        <Grid item xs={12} style={{paddingTop: 0}}>
                            <Info data={data}/>
                        </Grid>
                    </Grid>
                </div>
            }
        </Layout>
    );
}

export default withRouter(Details);
