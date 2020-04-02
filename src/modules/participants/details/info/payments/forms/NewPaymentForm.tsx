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
import {useDispatch, useSelector} from 'react-redux'
import {IPayment} from "../../../../types";
import XSearchInput from "../../../../../../components/inputs/XSearchInput";
import XSelectInput from "../../../../../../components/inputs/XSelectInput"
import XDateInput from "../../../../../../components/inputs/XDateInput";
import { useHistory } from 'react-router';
import {localRoutes} from "../../../../../../data/constants";
import {remoteRoutes} from "../../../../../../data/constants";
import {post} from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import {participantsConstants} from "../../../../../../data/redux/participants/reducer";
import PDateInput from "../../../../../../components/plain-inputs/PDateInput";
import {IState} from "../../../../../../data/types";

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
        paymentDate: null,
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
                Toast.info('Operation successful')
                actions.resetForm()
                actions.setSubmitting(false);

            }
        )
    }

    function handleClose(){
        props.closeSlideOut();
    }

    return (
        <XFormSimple onSubmit={handleSubmit} schema={schema} initialValues={data}
                     onCancel={handleClose}>
            <Grid spacing={2} container direction='column'>
                <Grid item xs={12}>
                    <XDateInput
                        name="paymentDate"
                        label="Payment Date"
                        inputVariant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XSelectInput
                        size='small'
                        name="paymentType"
                        label="paymentType"
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
                        type="text"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XDateInput
                        name="dateOfEntry"
                        label="Date of entry"
                        inputVariant='outlined'
                        size='small'
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
