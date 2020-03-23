import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PDateInput from "../../components/plain-inputs/PDateInput";
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import {toOptions} from "../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../components/plain-inputs/PSelectInput";
import Divider from '@material-ui/core/Divider';
import {participantsConstants, IParticipantsState} from "../../data/redux/participants/reducer";
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@material-ui/core";
import classes from "*.module.css";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            marginBottom: '16px',
        },
    }),
);
interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const [data, setData] = useState({
        name: '',
        type: '',
        dateCreated: new Date('2014-08-18T21:11:54')
    })
    const classes = useStyles();

    const participantTypes = ['Commercial Bank', 'Microfinance', 'Forex Bureau']

    function submitForm(values: any) {
        onFilter(values);        
    }


    function handleChange(event: React.ChangeEvent<any>) {
        const name = event.target.name
        const value = event.target.value
        const newData = {...data, [name]: value}
        setData({...newData})
        submitForm(newData)
    }
    const handleValueChange = (name: string) => (value: any) => {
        if (name === 'dateCreated') {
            value = value ? value.toISOString() : value
        }
        const newData = {...data, [name]: value}
        setData(newData)
        submitForm(newData)
    }
    return <form>
        <Grid spacing={3} container>
            <Grid item xs={12}>
            <Typography component="h6" variant="h6" className={classes.heading}>
                Search
            </Typography>
            <Divider/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="name"
                    value={data['name']}
                    onChange={handleChange}
                    label="Participant"
                    variant="outlined"
                    fullWidth
                    size='small'
                    color="secondary"
                />
            </Grid>
            <Grid item xs={12}>
                <PSelectInput
                    name="type"
                    value={data['type']}
                    onChange={handleChange}
                    label="Participant Type"
                    variant="outlined"
                    size='small'
                    color="secondary"
                    options={toOptions(participantTypes)}
                />
            </Grid>
            <Grid item xs={12}>
            <PDateInput
                    name="dateCreated"
                    value={data['dateCreated'] || null}
                    onChange={handleValueChange('dateCreated')}
                    label="Date Created"
                    variant="inline"
                    inputVariant='outlined'
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" >
                    <Button
                        disabled={loading}
                        variant="contained"
                        color="secondary"
                        onClick={submitForm}>Apply Filter</Button>
                </Box>
            </Grid>
        </Grid>
    </form>

}

export default Filter
