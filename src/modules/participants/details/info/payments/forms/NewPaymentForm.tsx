import React from 'react';
import {useState} from "react";
import * as yup from "yup";
import * as faker from "faker";
import {reqEmail, reqString, reqDate, reqNumber} from "../../../../../../data/validations";
// import {organisationTypeCategories} from "../../../data/comboCategories";
import {paymentTypes} from "../../../../../../data/comboCategories";
import {FormikActions} from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../components/forms/XFormSimple"
import XTextInput from "../../../../../../components/inputs/XTextInput";
import {toOptions} from "../../../../../../components/inputs/inputHelpers";
import {useDispatch} from 'react-redux'
import {IPayment} from "../../../../types";
import XSearchInput from "../../../../../../components/inputs/XSearchInput";
import XSelectInput from "../../../../../../components/inputs/XSelectInput"
import { useHistory } from 'react-router';
import {localRoutes} from "../../../../../../data/constants";
import {remoteRoutes} from "../../../../../../data/constants";
import {post} from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import {participantsConstants} from "../../../../../../data/redux/participants/reducer";
import PDateInput from "../../../../../../components/plain-inputs/PDateInput";

const schema = yup.object().shape(
    {
        paymentDate: reqDate,
        paymentType: reqString,
        referenceNumber: reqNumber,
        dateOfEntry: reqDate,
        enteredBy: reqString,
    }
)

interface IProps {
    closeSlideOut: () => any
    done?: () => any
}

const NewPaymentForm = (props: IProps) => {
    const [data, setData] = useState({
        paymentDate: new Date('2014-08-18T21:11:54'),
        paymentType: '',
        referenceNumber: '',
        amount: '',
        dateOfEntry: null,
        enteredBy: '',
    })
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikActions<any>) {
        const toSave: IPayment = {
            id: faker.random.uuid(),
            paymentDate: values.paymentDate,
            paymentType: values.paymentType,
            referenceNumber: values.referenceNumber,
            amount: values.amount,
            dateOfEntry: values.dateOfEntry,
            enteredBy: values.enteredBy,
        }
        post(remoteRoutes.participants, toSave,
            (data) => {
                Toast.info('Operation successful')
                actions.resetForm()
                dispatch({
                    type: participantsConstants.participantsAddPayment,
                    payload: {...toSave},
                })
                if (props.done)
                    props.done()
            },
            undefined,
            () => {
                dispatch({
                    type: participantsConstants.participantsAddPayment,
                    payload: {...toSave},
                })
                actions.setSubmitting(false);

            }
        )
    }

    function handleClose(){
        props.closeSlideOut();
    }
    const handleValueChange = (name: string) => (value: any) => {
        if (name === 'paymentDate' || name === 'dateOfEntry') {
            value = value ? value.toISOString() : value
        }
        const newData = {...data, [name]: value}
        setData(newData)
    }

    return (
        <XFormSimple onSubmit={handleSubmit} schema={schema} initialValues={data}
                     onCancel={handleClose}>
            <Grid spacing={2} container direction='column'>
                <Grid item xs={12}>
                    <PDateInput
                        name="paymentDate"
                        value={data['paymentDate']}
                        onChange={handleValueChange('paymentDate')}
                        label="Payment Date"
                        variant="inline"
                        inputVariant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XSelectInput
                        size='small'
                        name="type"
                        label="Type"
                        options={toOptions(paymentTypes)}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="referenceNumber"
                        label="Reference Number"
                        type="text"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="amount"
                        label="Amount"
                        type="number"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <PDateInput
                        name="dateOfEntry"
                        value={data['dateOfEntry']}
                        onChange={handleValueChange('dateOfEntry')}
                        label="Date of entry"
                        variant="inline"
                        inputVariant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="enteredBy"
                        label="Entered by"
                        type="text"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
            </Grid>
        </XFormSimple>
    );
}


export default NewPaymentForm;
