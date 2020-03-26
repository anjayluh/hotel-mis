import React, {useState} from 'react';
import {IParticipant} from "../../types";
import DetailView, {IRec} from "../../../../components/DetailView";
import {printDate} from "../../../../utils/dateHelpers";
import PersonIcon from '@material-ui/icons/PermIdentity';
import EditIconButton from "../../../../components/EditIconButton";
import EditDialog from "../../../../components/EditDialog";
// import PersonEditor from "../editors/PersonEditor";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import SectionTitle from "./SectionTitle";

interface IProps {
    data: IParticipant
}

export const idFields = (data: IParticipant): IRec[] => {
    
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

const BioData = ({data}: IProps) => {
    const [dialog, setDialog] = useState(false)
    const {id = ''} = data

    const handleClick = () => {
        setDialog(true)
    }

    const handleClose = () => {
        setDialog(false)
    }
    const displayData = idFields(data);

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <SectionTitle
                    title='Participant Overview'
                    editButton={<EditIconButton onClick={handleClick}/>}
                    icon={<PersonIcon fontSize='inherit'/>}
                />
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <Box p={1}>
                    <DetailView data={displayData} />
                </Box>
                <Box p={1}>
                    <DetailView data={displayData} />
                </Box>
            </Grid>
            <EditDialog title='Edit Basic Data' open={dialog} onClose={handleClose}>
                {/* <PersonEditor data={data.person} contactId={id} done={handleClose}/> */}
            </EditDialog>
        </Grid>
    );
}
export default BioData;
