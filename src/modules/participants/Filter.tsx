import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import InsertInvitation from '@material-ui/icons/InsertInvitation';
import {toOptions} from "../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../components/plain-inputs/PSelectInput";
import {participantsConstants, IParticipantsState} from "../../data/redux/participants/reducer";
import {useDispatch, useSelector} from "react-redux";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const dispatch = useDispatch();

    const [data, setData] = useState({
        name: '',
        type: '',
        dateCreated: ''
    })
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

    return <form>
        <Grid spacing={3} container>
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
                <TextField
                    name="dateCreated"
                    value={data['dateCreated']}
                    onChange={handleChange}
                    label="Date Created"
                    variant='outlined'
                    size='small'
                    color="secondary"
                    fullWidth
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><InsertInvitation /></InputAdornment>,
                      }}
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row" >
                    <Button
                        disabled={loading}
                        variant="contained"
                        color="secondary"
                        onClick={submitForm}>Apply FIlter</Button>
                </Box>
            </Grid>
        </Grid>
    </form>

}

export default Filter
