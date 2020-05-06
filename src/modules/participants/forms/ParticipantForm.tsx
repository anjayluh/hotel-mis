import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import {
  reqEmail,
  reqString,
  phoneNumber,
  reqPhoneNumber,
} from "../../../data/validations";
import { organisationTypeCategories } from "../../../data/comboCategories";
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
  // phoneNumberOther: phoneNumber,
  // officialEmail: reqEmail,
  primaryEmail: reqEmail,
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
    // phoneNumberOther: "",
    // officialEmail: "",
    primaryEmail: "",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      companyType: "Limited",
      name: values.name,
      category: "Company",
      email: values.primaryEmail,
      phone: values.phoneNumberPrimary,
      identificationNumber: Date.parse(new Date().toISOString()).toString(),
      identificationValidFrom: new Date(),
      identificationValidTo: new Date(),
    };

    post(
      remoteRoutes.participants + `/company`,
      toSave,
      (data) => {
        Toast.info("Operation successful");
        actions.resetForm();
        dispatch({
          type: participantsConstants.participantsAddParticipant,
          payload: { ...data },
        });
        if (props.done) props.done();
        actions.setSubmitting(false);
        history.push(`${localRoutes.participants}/${data.id}`);
      },
      () => {
        Toast.error("Operation failed");
        actions.setSubmitting(false);
      }
    );
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
            name="primaryEmail"
            label="Primary Email"
            type="email"
            variant="outlined"
            size="small"
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
        {/* <Grid item xs={12}>
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
        </Grid> */}
      </Grid>
    </XFormSimple>
  );
};

export default ParticipantForm;
