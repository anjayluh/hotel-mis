import React from "react";
import { useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {
  reqString,
  reqPhoneNumber,
  reqEmail,
} from "../../../../../../data/validations";
import { organisationTypeCategories } from "../../../../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../components/forms/XFormSimple";
import XTextInput from "../../../../../../components/inputs/XTextInput";
import XSelectInput from "../../../../../../components/inputs/XSelectInput";
import { toOptions } from "../../../../../../components/inputs/inputHelpers";
import { remoteRoutes } from "../../../../../../data/constants";
import { put } from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";

const schema = yup.object().shape({
  name: reqString,
  // type: reqString,
  phoneNumberPrimary: reqPhoneNumber,
  // phoneNumberOther: phoneNumber,
  // officialEmail: reqEmail,
  emailPrimary: reqEmail,
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  initialData?: any;
}

const ParticipantDetailsForm = (props: IProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(
    props.initialData ? true : false
  );
  const [data, setData] = useState<any>(
    props.initialData
      ? {
          name: props.initialData.company && props.initialData.company.name,
          type: "",
          phoneNumberPrimary: props.initialData.phones.filter(
            (phone: any) => phone.isPrimary
          )[0].value,
          emailPrimary: props.initialData.emails.filter(
            (email: any) => email.isPrimary
          )[0].value,
        }
      : {
          name: "",
        }
  );

  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: any = {
      category: props.initialData.category,
      company: {
        name: values.name,
        id: props.initialData.company.id,
      },
      phones: props.initialData.phones.map((item: any, index: number) => {
        if (item.isPrimary) {
          item.value = values.phoneNumberPrimary;
        }
        return item;
      }),
      emails: props.initialData.emails.map((item: any, index: number) => {
        if (item.isPrimary) {
          item.value = values.emailPrimary;
        }
        return item;
      }),
      id: props.initialData.id,
    };

    put(
      remoteRoutes.participants,
      toSave,
      (data) => {
        Toast.info("Operation successful");
        dispatch({
          type: participantsConstants.participantsUpdateParticipant,
          payload: data,
        });
        if (props.done) props.done();
        actions.setSubmitting(false);
        handleClose();
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
            label="Name"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <XSelectInput
            size="small"
            name="type"
            label="Type"
            options={toOptions(organisationTypeCategories)}
            variant="outlined"
          />
        </Grid> */}
        <Grid item xs={12}>
          <XTextInput
            name="emailPrimary"
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
      </Grid>
    </XFormSimple>
  );
};

export default ParticipantDetailsForm;
