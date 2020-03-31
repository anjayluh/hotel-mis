import React, {useEffect, useState} from 'react';
import {RouteComponentProps, withRouter} from "react-router";
import Layout from "../../../components/Layout";
import {getRouteParam} from "../../../utils/routHelpers";
import {IParticipant} from "../types";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import {createStyles, Grid, makeStyles, Theme} from "@material-ui/core";
import {participantsConstants, IParticipantsState} from "../../../data/redux/participants/reducer";
import ParticipantSummary from "./participantsOverview/ParticipantSummary";
import DetailsHeading from "./DetailsHeading";
import ParticipantsOverview from "./ParticipantOverview";
import Suscriptions from "./info/overview/Subscriptions";
import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../../data/constants";
import {useDispatch, useSelector} from "react-redux";
import Billings from "./info/billing/Billings"

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
        },
        tableRoot: {
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
    })
);

const Details = (props: IProps) => {
    const participantId = getRouteParam(props, 'participantId');
    const classes = useStyles();
    const dispatch = useDispatch();
    const [showParticipantsOverview, setShowParticipantsOverview] = useState<boolean>(true)
    const [showBillingsView, setShowBillingsView] = useState<boolean>(true)
    const data: IParticipant = useSelector((state: any) => state.participants.selected);
    const [headings, setHeadings] = useState([
        {text: 'Participants Overview', status: true},
        {text: 'Billing', status: false},
        {text: 'Payments', status: false},
        {text: 'Acount Statement', status: false}
    ])
    const [loading, setLoading] = useState<boolean>(true)
    
    // const data: IParticipant = tempParticipant;
    useEffect(() => {
        if(participantId){
            setLoading(false)
        }
    }, [dispatch, participantId, data])
    
    const hasError = !loading && !data
    
    const handleClick = (value: any) => {
        setHeadings([...headings].map(heading => {
            if(heading.text === value) {
                heading.status = true;
                if(heading.text === 'Participants Overview'){
                    setShowParticipantsOverview(true)
                }else setShowParticipantsOverview(false)

                if(heading.text === 'Billing'){
                    setShowBillingsView(true)
                }else setShowBillingsView(false)

              return {
                ...heading,
                text: heading.text,
                status: true,
              }
            }
            else {
                return {
                    ...heading,
                    text: heading.text,
                    status: false,
                  }
            }
        }))
    }
    return (
        <Layout>
            {loading && <Loading/>}
            {hasError && <Error text='Failed load contact'/>}
            {
                data &&
                <div className={classes.root}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{paddingBottom: 0}}>
                            <ParticipantSummary data={data}/>
                        </Grid>
                        <DetailsHeading data={headings} handleClickedItem={handleClick}></DetailsHeading>
                        { showParticipantsOverview &&
                            <ParticipantsOverview data={{...data}} ></ParticipantsOverview>
                        }

                    </Grid>
                    { showParticipantsOverview &&
                        <Suscriptions></Suscriptions>
                    }
                    { showBillingsView &&
                    <Billings></Billings>
                    }
                </div>
                
            }
        </Layout>
    );
}

export default withRouter(Details);
