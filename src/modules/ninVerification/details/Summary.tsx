import React, {Fragment} from 'react';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {ITask, IWorkflow, TaskStatus, IRequestDetails, IRequestDetailsStatus} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import {printDateTime, printDate} from "../../../utils/dateHelpers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import {errorColor, successColor, warningColor} from "../../../theme/custom-colors";
import ParticipantLink from "../../../components/links/ParticipantLink";

interface IProps {
    data: IRequestDetails
}

const Summary = ({data}: IProps) => {
    const fields: IRec[] = [
        {
            label: 'Request Date',
            value: printDateTime(data.requestDate)
        },
        {
            label: 'NIN',
            value: data.nin
        },
        {
            label: 'Date of Birth',
            value: printDate(data.dateOfBirth)
        },
        {
            label: 'Ref.Number',
            value: data.referenceNumber
        },
        {
            label: 'Initiator',
            value: data.initiator
        },
        {
            label: 'Participant',
            value: <ParticipantLink id={data.requestId} name={data.participant}/>
        },

    ]

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div>
                    <DetailView data={fields}/>
                </div>
            </Grid>
            <Grid item xs={12}>
                <Typography>Request Status</Typography>
                <List dense>
                    {

                        data.requestStatus.map(it => (
                            <Fragment key={it.order}>
                                <ListItem>
                                    <ListItemIcon>
                                        <LabelIcon style={{color: getTaskColor(it)}}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={it.task}
                                        secondary={it.date && printDateTime(it.date)}
                                    />

                                </ListItem>
                                <Divider/>
                            </Fragment>

                        ))
                    }
                </List>
            </Grid>
        </Grid>
    );
}

export function getTaskColor(task: IRequestDetailsStatus): any {
    switch (task.status) {
        case TaskStatus.Done:
            return successColor
        case TaskStatus.Error:
            return errorColor
        case TaskStatus.Pending:
            return warningColor
    }
}


export default Summary;
