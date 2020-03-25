import React from 'react';
import {useState} from "react";
import * as yup from "yup";
import * as faker from "faker";
import {reqEmail, reqString} from "../../../data/validations";
import {organisationTypeCategories} from "../../../data/comboCategories";
import {FormikActions} from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../components/forms/XFormSimple";
import XTextInput from "../../../components/inputs/XTextInput";
import {toOptions} from "../../../components/inputs/inputHelpers";
import {useDispatch} from 'react-redux'
import {INewParticipant} from "../types";
import XSelectInput from "../../../components/inputs/XSelectInput";
import { useHistory } from 'react-router';
import {localRoutes} from "../../../data/constants";
import PSelectInput from "../../../components/plain-inputs/PSelectInput";

const schema = yup.object().shape(
    {
        name: reqString,
        type: reqString,
        phoneNumberPrimary: reqString,
        email: reqEmail
    }
)

interface IProps {
    closeSlideOut: () => any
}

const NewParticipantForm = (props: IProps) => {
    const [data, setData] = useState({
        name: '',
        type: '',
        phoneNumberPrimary: '',
        phoneNumberOther: '',
        email: ''
    })
    const history = useHistory();
    const dispatch = useDispatch();

    function handleSubmit(values: any, actions: FormikActions<any>) {
        const toSave: INewParticipant = {
            id: faker.random.uuid(),
            name: values.name,
            phoneNumber: [
                {
                    id: faker.random.uuid(), 
                    type: "primary", 
                    value: values.phoneNumberPrimary
                },
                {
                    id: faker.random.uuid(), 
                    type: "primary", 
                    value: values.phoneNumberOther
                },
            ],
            type: {
                id: faker.random.uuid(), 
                name: values.type
            },
            status: {
                id: faker.random.uuid(), 
                name: "Inactive"
            },
            officialEmail: values.email,
            dateCreated: new Date()
        }
        console.log(toSave);
        history.push(`${localRoutes.participants}/${toSave.id}`)
    }

    function handleClose(){
        props.closeSlideOut();
    }

    return (
        <XFormSimple onSubmit={handleSubmit} schema={schema} initialValues={data}
        onCancel={handleClose}>
            <Grid spacing={1} container direction='column'>
                <Grid item xs={12}>
                    <XTextInput
                        name="name"
                        label="Participant Name"
                        type="text"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XSelectInput
                        size='small'
                        name="type"
                        label="Type"
                        options={toOptions(organisationTypeCategories)}
                        variant='outlined'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="phoneNumberPrimary"
                        label="Phone Number (Primary)"
                        type="text"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="phoneNumberOther"
                        label="Phone Number (Other)"
                        type="text"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={12}>
                    <XTextInput
                        name="email"
                        label="Official Email"
                        type="email"
                        variant='outlined'
                        size='small'
                    />
                </Grid>
            </Grid>
        </XFormSimple>
    );
}


export default NewParticipantForm;
