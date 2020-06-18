import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import {
  reqEmail,
  reqString,
  reqPhoneNumber,
} from "../../../../../../data/validations";
import { contactPersonCategories } from "../../../../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../components/forms/XFormSimple";
import XTextInput from "../../../../../../components/inputs/XTextInput";
import { toOptions } from "../../../../../../components/inputs/inputHelpers";
import { useDispatch } from "react-redux";
import XSelectInput from "../../../../../../components/inputs/XSelectInput";
import { remoteRoutes } from "../../../../../../data/constants";
import { post, put } from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";

const schema = yup.object().shape({
  name: reqString,
  role: reqString,
  telephone: reqPhoneNumber,
  email: reqEmail,
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  participantId: any;
  initialData?: any;
}

const ContactPersonForm = (props: IProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(
    props.initialData ? true : false
  );
  const [data, setData] = useState<any>(
    props.initialData
      ? props.initialData
      : {
          name: "",
          role: "",
          telephone: "",
          email: "",
        }
  );
  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    actions.setSubmitting(true);
    const toSave: any =
      /* {
      name: values.name,
      telephone: values.phone,
      email: values.email,
      personRoles: [values.role],
    } */
      {
        id: faker.random.uuid(),
        name: values.name,
        roles: [
          {
            createdAt: new Date(faker.date.past(5)),
            id: faker.random.uuid(),
            isDeleted: false,
            lastUpdated: null,
            personId: faker.random.uuid(),
            roleName: values.role,
          },
        ],
        telephones: [
          {
            category: "Work",
            contactId: faker.random.uuid(),
            createdAt: new Date(faker.date.past(5)),
            id: faker.random.uuid(),
            isDeleted: false,
            isPrimary: true,
            lastUpdated: new Date(faker.date.past(5)),
            value: values.phone,
          },
        ],
        emails: [
          {
            category: "Work",
            contactId: faker.random.uuid(),
            createdAt: new Date(faker.date.past(5)),
            id: faker.random.uuid(),
            isDeleted: false,
            isPrimary: true,
            lastUpdated: null,
            value: values.email,
          },
        ],
      };
    if (!isEdit) {
      post(
        remoteRoutes.participantsContactPersons +
          `/${props.participantId}/persons`,
        toSave,
        (data) => {
          Toast.info("Operation successful");
          actions.resetForm();
          dispatch({
            type: participantsConstants.participantsAddContactPerson,
            payload: data,
          });
          if (props.done) props.done();
          handleClose();
        },
        () => {
          Toast.error("Operation failed");
        }
      );
    } else {
      put(
        remoteRoutes.ninVerification,
        toSave,
        (data) => {
          Toast.info("Operation successful");
          actions.resetForm();
          dispatch({
            type: participantsConstants.participantsUpdateContactPerson,
            payload: { ...toSave },
          });
          if (props.done) props.done();
          actions.setSubmitting(false);
          handleClose();
        },
        () => {
          dispatch({
            type: participantsConstants.participantsUpdateContactPerson,
            payload: { ...toSave },
          });
          Toast.info("Operation successful");
          actions.resetForm();
          handleClose();
          actions.setSubmitting(false);
        }
      );
    }
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
        <Grid item xs={12}>
          <XSelectInput
            size="small"
            name="role"
            label="Role"
            options={toOptions(contactPersonCategories)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="telephone"
            label="Phone Number"
            type="text"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <XTextInput
            name="email"
            label="Email"
            type="email"
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </XFormSimple>
  );
};

export default ContactPersonForm;
