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
import {billingCategories} from "./fakeData";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {enumToArray} from "../../utils/stringHelpers";
import {SubscriptionStatus} from "./types";

interface IProps {
    onFilter: (data: any) => any
    loading: boolean
}

const Filter = ({onFilter, loading}: IProps) => {
    const [data, setData] = useState({
        accountNumber: '',
        monthlyCap: '',
        status: '',
        billingCategory: '',
        billNumber: '',
        from: null
    })

    const monthlyCap = ['20,000', '10,000', '30,000']

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
                        <TextField
                            name="accountNumber"
                            value={data['accountNumber']}
                            onChange={handleChange}
                            label="Account Number"
                            variant="outlined"
                            fullWidth
                            size='small'
                            color="secondary"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <PSelectInput
                            name="monthlyCap"
                            value={data['monthlyCap']}
                            onChange={handleChange}
                            label="Monthly Cap"
                            variant="outlined"
                            size='small'
                            color="secondary"
                            options={toOptions(monthlyCap)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PSelectInput
                            name="status"
                            value={data['status']}
                            onChange={handleChange}
                            label="Status"
                            variant="outlined"
                            size='small'
                            color="secondary"
                            options={toOptions(enumToArray(SubscriptionStatus))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PSelectInput
                            name="billingCategory"
                            value={data['billingCategory']}
                            onChange={handleChange}
                            label="Billing Category"
                            variant="outlined"
                            size='small'
                            color="secondary"
                            options={toOptions(billingCategories)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PDateInput
                            name="from"
                            value={data['from'] || null}
                            onChange={handleValueChange('from')}
                            label="Subscription date"
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
