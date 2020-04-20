import React, { useState } from "react";
import * as yup from "yup";
import XFormSimple from "../components/forms/XFormSimple";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import {
  reqEmail,
  reqString,
  phoneNumber,
  reqPhoneNumber
} from "../data/validations";
import XTextInput from "../components/inputs/XTextInput";
import { toOptions } from "../components/inputs/inputHelpers";
import XSelectInput from "../components/inputs/XSelectInput";
import { FormikActions } from "formik";
import { organisationTypeCategories } from "../data/comboCategories";

export default {
  title: "XFormSimple",
  component: XFormSimple
};
const schema = yup.object().shape({
  name: reqString,
  type: reqString,
  phoneNumberPrimary: reqPhoneNumber,
  phoneNumberOther: phoneNumber,
  officialEmail: reqEmail,
  primaryEmail: reqEmail
});

export const SimpleXForm = () => {
  const [data, setData] = useState({
    name: "",
    type: "",
    phoneNumberPrimary: "",
    phoneNumberOther: "",
    officialEmail: "",
    primaryEmail: ""
  });
  const [openSlideOut, setOpenSlideOut] = useState(false);

  function handleClick() {
    handleToggleDrawer();
  }
  function handleToggleDrawer() {
    setOpenSlideOut(!openSlideOut);
  }
  function handleClose() {
    handleToggleDrawer();
  }
  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {};
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
