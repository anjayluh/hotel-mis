import React from 'react';
import {useState} from "react";
import * as yup from "yup";
import * as faker from "faker";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {reqDate, reqString} from "../../../data/validations";
import {organisationTypeCategories} from "../../../data/comboCategories";
import {FormikActions} from "formik";
import PSelectInput from "../../../components/plain-inputs/PSelectInput";
import Grid from "@material-ui/core/Grid";
import XForm from "../../../components/forms/XForm";
import XTextInput from "../../../components/inputs/XTextInput";
import {toOptions} from "../../../components/inputs/inputHelpers";
import {useDispatch} from 'react-redux'
import {INewParticipant} from "../types";
import XSelectInput from "../../../components/inputs/XSelectInput";
import { Redirect } from 'react-router';
import {localRoutes} from "../../../data/constants";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        filterPaper: {
            borderRadius: 0,
            padding: theme.spacing(2)
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        pageHeading: {
            display: 'flex'
        },
    }),
);
const schema = yup.object().shape(
    {
        name: reqString,
        type: reqString,
        phoneNumberPrimary: reqString,
        email: reqString
    }
)

const NewParticipantForm = () => {
    const [data, setData] = useState({
        name: '',
        type: '',
        phoneNumberPrimary: '',
        phoneNumberOther: '',
        email: ''
    })

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
        return <Redirect to={`${localRoutes.participants}/${toSave.id}`} />
    }

    function handleCancel(){

    }

    return (
        <XForm onSubmit={handleSubmit} schema={schema} initialValues={data}
        onCancel={handleCancel}>
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
                        name="type"
                        label="Type"
                        options={toOptions(organisationTypeCategories)}
                        variant='outlined'
                    />
                   {/*  <PSelectInput
                    name="type"
                    value={data['type']}
                    label="Type"
                    variant="outlined"
                    size='small'
                    color="secondary"
                    options={toOptions(organisationTypeCategories)}
                /> */}
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
        </XForm>
    );
}


export default NewParticipantForm;
