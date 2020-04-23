import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import {
  reqEmail,
  reqString,
  phoneNumber,
  reqPhoneNumber
} from "../../../data/validations";
import {contactPersonCategories, organisationTypeCategories} from "../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../components/forms/XFormSimple";
import XTextInput from "../../../components/inputs/XTextInput";
import { toOptions } from "../../../components/inputs/inputHelpers";
import { useDispatch } from "react-redux";
import { IParticipant } from "../types";
import XSelectInput from "../../../components/inputs/XSelectInput";
import { useHistory } from "react-router";
import { localRoutes } from "../../../data/constants";
import { remoteRoutes } from "../../../data/constants";
import { post } from "../../../utils/ajax";
import Toast from "../../../utils/Toast";
import { participantsConstants } from "../../../data/redux/participants/reducer";

const schema = yup.object().shape({
  name: reqString,
  type: reqString,
  phoneNumberPrimary: reqPhoneNumber,
  phoneNumberOther: phoneNumber,
  officialEmail: reqEmail,
  primaryEmail: reqEmail
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
}

const ParticipantForm = (props: IProps) => {
  const [data, setData] = useState({
    name: "",
    type: "",
    phoneNumberPrimary: "",
    phoneNumberOther: "",
    officialEmail: "",
    primaryEmail: ""
  });
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: IParticipant = {
      category: values.type,
      person: null,
      company: {
        name: values.name,
        id: "994712fb-593d-432d-2d2c-08d7daebc584",
        createdAt: new Date(faker.date.past(1)),
        lastUpdated: null,
        isDeleted: false
      },
      identifications: [
        {
          category: "Nin",
          contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
          value: "DE128398323",
          cardNumber: null,
          issuingCountry: null,
          issueDate: new Date(faker.date.past(1)),
          expiryDate: new Date(faker.date.past(1)),
          isPrimary: true,
          id: "3994b03c-0e22-4e9c-8ce1-08d7daebc586",
          createdAt: new Date(faker.date.past(1)),
          lastUpdated: null,
          isDeleted: false
        }
      ],
      phones: [
        {
          category: "Mobile",
          contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
          value: values.phoneNumberPrimary,
          isPrimary: true,
          id: faker.random.uuid(),
          createdAt: new Date(faker.date.past(1)),
          lastUpdated: null,
          isDeleted: false
        },
        {
          category: "Mobile",
          contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
          value: values.phoneNumberOther,
          isPrimary: false,
          id: faker.random.uuid(),
          createdAt: new Date(faker.date.past(1)),
          lastUpdated: null,
          isDeleted: false
        }
      ],
      emails: [
        {
          category: "Personal",
          contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
          value: values.primaryEmail,
          isPrimary: true,
          id: faker.random.uuid(),
          createdAt: new Date(),
          lastUpdated: null,
          isDeleted: false
        },
        {
          category: "Personal",
          contactId: "04c8a212-3b79-44c5-6649-08d7daebc579",
          value: values.officialEmail,
          isPrimary: false,
          id: faker.random.uuid(),
          createdAt: new Date(faker.date.past(1)),
          lastUpdated: null,
          isDeleted: false
        }
      ],
      addresses: [],
      tags: null,
      id: "04c8a212-3b79-44c5-6649-08d7daebc579",
      createdAt: new Date(),
      lastUpdated: null,
      isDeleted: false,
      subscriptions: [
        {
          id: "234f65e2-dbfd-4610-a8b0-08d7d24bdd64",
          companyId: "04c8a212-3b79-44c5-6649-08d7daebc579",
          accountNumber: null,
          dateCreated: new Date(faker.date.past(1)),
          subscriptionStatus: "Active",
          serviceCategoryId: "cef84215-8f9d-4ebd-0895-08d7d24bc164"
        }
      ],
      contactPersons: [
        {
          id: faker.random.uuid(),
          name: '',
          role: '',
          phone: {
            id: '',
            value: ''
          },
          email: '',
        }
      ]
    };
    post(
      remoteRoutes.participants,
      toSave,
      data => {
        Toast.info("Operation successful");
        actions.resetForm();
        dispatch({
          type: participantsConstants.participantsAddParticipant,
          payload: { ...toSave }
        });
        if (props.done) props.done();
      },
      undefined,
      () => {
        dispatch({
          type: participantsConstants.participantsAddParticipant,
          payload: { ...toSave }
        });
        actions.setSubmitting(false);
      }
    );
    // Will move this to post when the endpoints are available
    console.log(toSave);
    history.push(`${localRoutes.participants}/${toSave.id}`);
  }

  function handleClose() {
    props.closeSlideOut();
  }

  return (
    <XFormSimple
      onSubmit={handleSubmit}
      schema={schema}
      initialValues={data}
      onCancel={handleClose}
    >
      <Grid spacing={1} container direction="column">
        <Grid item xs={12}>
          <XTextInput
            name="name"
            label="Participant Name"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XSelectInput
            size="small"
            name="type"
            label="Type"
            options={toOptions(organisationTypeCategories)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="phoneNumberPrimary"
            label="Phone Number (Primary)"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="phoneNumberOther"
            label="Phone Number (Other)"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="officialEmail"
            label="Official Email"
            type="email"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="primaryEmail"
            label="Primary Email"
            type="email"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </XFormSimple>
  );
};

export default ParticipantForm;
