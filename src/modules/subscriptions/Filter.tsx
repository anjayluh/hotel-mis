import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PDateInput from "../../components/plain-inputs/PDateInput";
import IBox from "../../components/ibox/IBox";
import {toOptions} from "../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../components/plain-inputs/PSelectInput";
import {organisationNames} from "./fakeData";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const [data, setData] = useState({
        participantName: '',
        type: '',
        from: null,
        to: null,
        billNumber: ''
    })

    const rates = ['20', '30', '40']

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
        if (name === 'from' || name === 'to') {
            value = value ? value.toISOString() : value
        }
        const newData = {...data, [name]: value}
        setData(newData)
        submitForm(newData)
    }
    return <form>
                <Grid spacing={3} container>
                    <Grid item xs={12}>
                        <Box display='flex' pb={1}>
                            <Box flexGrow={1}>
                                <Typography color={'textSecondary'} variant='h5'>Search</Typography>
                            </Box>
                        </Box>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <PDateInput
                            name="from"
                            value={data['from'] || null}
                            onChange={handleValueChange('from')}
                            label="From"
                            variant="inline"
                            inputVariant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PDateInput
                            name="to"
                            value={data['to'] || null}
                            onChange={handleValueChange('to')}
                            label="To"
                            variant="inline"
                            inputVariant='outlined'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PSelectInput
                            name="participantName"
                            value={data['participantName']}
                            onChange={handleChange}
                            label="Participant"
                            variant="outlined"
                            size='small'
                            color="secondary"
                            options={toOptions(organisationNames)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="billNumber"
                            value={data['billNumber']}
                            onChange={handleChange}
                            label="Bill Number"
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
                            label="Rate"
                            variant="outlined"
                            size='small'
                            color="secondary"
                            options={toOptions(rates)}
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
