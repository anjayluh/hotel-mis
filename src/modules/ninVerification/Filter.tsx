import * as React from "react";
import {useState} from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {toOptions} from "../../components/inputs/inputHelpers";
import {Box} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import PSelectInput from "../../components/plain-inputs/PSelectInput";
import PDateInput from "../../components/plain-inputs/PDateInput";
import {enumToArray} from "../../utils/stringHelpers";
import {IWorkflowFilter, WorkflowNinStatus, WorkflowSubStatus} from "./types";
import {workflowTypes} from "./config";
import {PRemoteSelect} from "../../components/inputs/XRemoteSelect";
import {remoteRoutes} from "../../data/constants";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const [data, setData] = useState<IWorkflowFilter>({
        nin: '',
        status: '',
        requestId: '',
        from: null,
        to: null,
        initiator: []
    })

    function submitForm(values: any) {
        onFilter(values)
    }

    function handleChange(event: React.ChangeEvent<any>) {
        const name = event.target.name
        const value = event.target.value
        const newData = {...data, [name]: value}
        setData(newData)
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

    const handleComboValueChange = (name: string) => (value: any) => {

        const newData = {...data, [name]: value}
        const newFilterData = {...data, [name]: value?value.id:null}
        setData(newData)
        submitForm(newFilterData)
    }

    return <form>
        <Grid spacing={3} container>
            <Grid item xs={12}>
                <TextField
                    name="nin"
                    value={data['nin']}
                    onChange={handleChange}
                    label="NIN"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>

            <Grid item xs={12}>
                <TextField
                    name="status"
                    value={data['statuses']}
                    onChange={handleChange}
                    label="Status"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    name="requestId"
                    value={data['requestId']}
                    onChange={handleChange}
                    label="Request ID"
                    type="text"
                    variant='outlined'
                    size='small'
                    fullWidth
                />
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
                    name="initiator"
                    value={data['initiator']}
                    onChange={handleChange}
                    label="Initiator"
                    variant="outlined"
                    size='small'
                    color="secondary"
                    options={toOptions(enumToArray(WorkflowNinStatus))}
                />
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" flexDirection="row">
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
