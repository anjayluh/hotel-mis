import React, {Fragment} from 'react';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {ITask, IWorkflow, TaskStatus, IRequestDetails, IRequestDetailsStatus} from "../types";
import DetailView, {IRec} from "../../../components/DetailView";
import {printDateTime} from "../../../utils/dateHelpers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LabelIcon from '@material-ui/icons/Label';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import {errorColor, successColor, warningColor} from "../../../theme/custom-colors";

interface IProps {
    data: IRequestDetails
    onTaskClick?: (id: string) => any
}

const Summary = ({data, onTaskClick}: IProps) => {
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
            value: data.dateOfBirth
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
            value: data.participant
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

                        // data.requestStatus.map(it => (
                        //     <Fragment key={it.order}>
                        //         <ListItem onClick={() => onTaskClick && onTaskClick(it.status)}>
                        //             <ListItemIcon>
                        //                 <LabelIcon style={{color: getTaskColor(it)}}/>
                        //             </ListItemIcon>
                        //             <ListItemText
                        //                 primary={it.task}
                        //             />
                        //         </ListItem>
                        //         <Divider/>
                        //     </Fragment>
                        //
                        // ))
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
