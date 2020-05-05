import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import { useDispatch } from "react-redux";
import { reqString } from "../../../../../../data/validations";
import { subscriptionsServiceTypes } from "../../../../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../components/forms/XFormSimple";
import { ISubscription } from "../../../../types";
import XTextInput from "../../../../../../components/inputs/XTextInput";
import { remoteRoutes } from "../../../../../../data/constants";
import { post, put } from "../../../../../../utils/ajax";
import Toast from "../../../../../../utils/Toast";
import { participantsConstants } from "../../../../../../data/redux/participants/reducer";

const schema = yup.object().shape({
  name: reqString,
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
      phones: props.initialData.phones,
      emails: props.initialData.emails,
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
      </Grid>
    </XFormSimple>
  );
};

export default ParticipantDetailsForm;
