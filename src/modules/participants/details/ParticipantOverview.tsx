import React, {useEffect, useState} from 'react';
import {get} from "../../../utils/ajax";
import {IParticipant, IContactPerson} from "../types";
import {remoteRoutes} from "../../../data/constants";
import {useDispatch, useSelector} from "react-redux";
import {participantsConstants, IParticipantsState} from "../../../data/redux/participants/reducer";
import {fakeContactPersons} from "../fakeData";
import DetailView, {IRec} from "../../../components/DetailView";
import PersonIcon from '@material-ui/icons/PermIdentity';
import EditDialog from "../../../components/EditDialog";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import SectionTitle from "./info/SectionTitle";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {chunkArray} from "../../../utils/arrayHelpers";
import DataLabel from "../../../components/DataLabel";
import DataValue from "../../../components/DataValue";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

interface IProps {
    data: IParticipant
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        row: {
            marginLeft: 0,
            paddingLeft: 0,
            paddingBottom: theme.spacing(2),
        },
        col: {
            marginLeft: 0,
            paddingLeft: 0,
            paddingBottom: theme.spacing(1),
        },
        label: {
            margin: 0,
            paddingLeft: 0,
            paddingRight: theme.spacing(2),
            width: 'auto',
        },
        value: {
            width: '100%',
        },
        contactPersonsCol:{
            marginLeft: 0,
            paddingLeft: 0,
            paddingBottom: 'unset',
        }
    }),
);

const generalContactInfoOne = (data: IParticipant): IRec[] => {
    return [
        {
            label: 'Official Email',
            value: data.officialEmail
        },
        {
            label: 'Phone Number',
            value: data.phoneNumber[0].value
        },
    ]
    
}
const generalContactInfoTwo = (data: IParticipant): IRec[] => {
    return [
        {
            label: 'Primary Email',
            value: data.primaryEmail
        },
        {
            label: 'Phone Number',
            value: data.phoneNumber[1].value
        },
        
    ]
    
}
const contactPersonsOne = (data: Array<any>): IRec[] => {
    if(data[0].name === ''){
        data[0].name = '-';
    }
    if(data[0].category === ''){
        data[0].category = '-';
    }
    if(data[0].phone.value === ''){
        data[0].phone.value = '-';
    }
    if(data[0].email === ''){
        data[0].email = '-';
    }
    
    return [
        {
            label: '',
            value: data[0].name + ` (${data[0].category})`
        },
        {
            label: '',
            value: data[0].phone.value + ` / (${data[0].email})`
        },
        
    ]
}
const contactPersonsTwo = (data: Array<any>): IRec[] => {
    return [
        {
            label: '',
            value: data[0].name + ` (${data[0].category})`
        },
        {
            label: '',
            value: data[0].phone.value + ` / (${data[0].email})`
        },
        
    ]
}
const ParticipantOverview = ({data}: IProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const contactPersons: any = useSelector((state: any) => state.participants.contactPersons);
    const spacing= 5;
    const [dialog, setDialog] = useState(false)
    const {id = ''} = data
    useEffect(() => {
        get(
                `${remoteRoutes.contactPersons}/${data.id}`,
                resp => dispatch({
                    type: participantsConstants.contactPersonsFetchAll,
                    payload: callContactPersons(2),
                }),
                undefined,
                () =>{
                    dispatch({
                        type: participantsConstants.contactPersonsFetchAll,
                        payload: callContactPersons(2),
                    })
                }
                )
    }, [dispatch])
    function callContactPersons(length: number) {
        let tempcontactPersons = [];
        while (length > 0){
            tempcontactPersons.push(fakeContactPersons())
            length = length - 1
        }
        return tempcontactPersons
    }
    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }
    const displayGeneralContactColumnOne = generalContactInfoOne(data);
    const displayGeneralContactColumnTwo = generalContactInfoTwo(data);
    const contactPersonsColumnOne = contactPersonsOne(callContactPersons(1));
    const contactPersonsColumnTwo = contactPersonsTwo(callContactPersons(1));
    const bold= false;
    return (
        <Grid container spacing={1} style={{marginBottom: 15}}>
            <Grid item xs={12}>
                <Grid item xs={12} lg={12} md={12}>
                    <Grid container spacing={spacing}>
                        <Grid item lg={12} xs={12}>
                            <Grid container spacing={1}>
                                <Grid item container direction='row' lg={12} justify="space-evenly" spacing={5}>
                                    <Grid item xs={6} lg={6} md={6}>
                                        <SectionTitle
                                            title='General Contact Overview'
                                            icon={<PersonIcon fontSize='inherit'/>}
                                        />
                                        <Divider/>
                                    </Grid>
                                    <Grid item xs={6} lg={6} md={6}>
                                        <SectionTitle
                                            title='Contact Persons'
                                            icon={<FormatListBulletedIcon fontSize='inherit'/>}
                                        />
                                        <Divider/>
                                    </Grid>
                                </Grid>
                                <EditDialog title='Edit Basic Data' open={dialog} onClose={handleClose}>
                                    {/* <PersonEditor data={data.person} contactId={id} done={handleClose}/> */}
                                </EditDialog>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction='row' style={{paddingTop: 5}}>
                <Grid item xs={6} container direction='row'>
                    <Grid item xs={6}>
                        <Box p={1} ml={3}>
                        <DetailView data={displayGeneralContactColumnOne} />
                    </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box p={1}>
                        <DetailView data={displayGeneralContactColumnTwo} />
                    </Box>
                    </Grid>
                </Grid>
                <Grid item xs={6} container direction='row'>
                    <Grid item xs={6} >
                        <Box p={1}>
                            <table className={classes.root}>
                                <tbody>
                                    <tr key={contactPersonsColumnOne[0].value} className={classes.row}>
                                        <td className={clsx(classes.contactPersonsCol, classes.value)}>
                                            <DataValue>
                                                {contactPersonsColumnOne[0].value}
                                            </DataValue>
                                        </td>
                                    </tr>
                                    <tr key={contactPersonsColumnOne[1].value} className={classes.row}>
                                        <td className={clsx(classes.col, classes.label)}>
                                            <DataLabel noColon={true} bold={bold} noWrap={false}>
                                                {contactPersonsColumnOne[1].value}
                                            </DataLabel>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box p={1}>
                        <table className={classes.root}>
                            <tbody>
                                <tr key={contactPersonsColumnTwo[0].value} className={classes.row}>
                                    <td className={clsx(classes.contactPersonsCol, classes.value)}>
                                        <DataValue>
                                            {contactPersonsColumnTwo[0].value}
                                        </DataValue>
                                    </td>
                                </tr>
                                <tr key={contactPersonsColumnTwo[1].label} className={classes.row}>
                                    <td className={clsx(classes.col, classes.label)}>
                                        <DataLabel noColon={true} bold={bold} noWrap={false}>
                                            {contactPersonsColumnTwo[1].value}
                                        </DataLabel>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box> 
                    </Grid>
                </Grid>
            </Grid>
            <EditDialog title='Edit Basic Data' open={dialog} onClose={handleClose}>
                {/* <PersonEditor data={data.person} contactId={id} done={handleClose}/> */}
            </EditDialog>
        </Grid>
    );
}
export default ParticipantOverview;
