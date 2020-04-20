import React from "react";
import { useState } from "react";
import * as yup from "yup";
import * as faker from "faker";
import { useDispatch } from "react-redux";
import { reqString, reqDate } from "../../../../../../../../data/validations";
import { subscriptionsServiceTypes } from "../../../../../../../../data/comboCategories";
import { FormikActions } from "formik";
import Grid from "@material-ui/core/Grid";
import XFormSimple from "../../../../../../../../components/forms/XFormSimple";
import XDateInput from "../../../../../../../../components/inputs/XDateInput";
import { toOptions } from "../../../../../../../../components/inputs/inputHelpers";
import { ISubscription } from "../../../../../../types";
import XSelectInput from "../../../../../../../../components/inputs/XSelectInput";
import { remoteRoutes } from "../../../../../../../../data/constants";
import { post, put } from "../../../../../../../../utils/ajax";
import Toast from "../../../../../../../../utils/Toast";
import { participantsConstants } from "../../../../../../../../data/redux/participants/reducer";

const schema = yup.object().shape({
  serviceType: reqString,
  subscriptionDate: reqDate
});

interface IProps {
  closeSlideOut: () => any;
  done?: () => any;
  initialData?: any;
}

const SubscriptionsForm = (props: IProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(
    props.initialData ? true : false
  );
  const [data, setData] = useState<any>(
    props.initialData
      ? props.initialData
      : {
          serviceType: "",
          subscriptionDate: null
        }
  );
  const dispatch = useDispatch();

  function handleSubmit(values: any, actions: FormikActions<any>) {
    const toSave: ISubscription = {
      id: faker.random.uuid(),
      companyId: faker.random.uuid(),
      accountNumber: null,
      service: values.serviceType,
      dateCreated: values.subscriptionDate,
      subscriptionStatus: "Active",
      serviceCategoryId: "",
      billingCategory: "",
      monthlyCap: null
    };
    if (!isEdit) {
      post(
        remoteRoutes.ninVerification,
        toSave,
        data => {
          Toast.info("Operation successful");
          actions.resetForm();
          dispatch({
            type: participantsConstants.participantsAddSubscription,
            payload: { ...toSave }
          });
          if (props.done) props.done();
        },
        undefined,
        () => {
          dispatch({
            type: participantsConstants.participantsAddSubscription,
            payload: { ...toSave }
          });
          Toast.info("Operation successful");
          actions.resetForm();
          handleClose();
        }
      );
    } else {
      put(
        remoteRoutes.subscriptions,
        toSave,
        data => {
          Toast.info("Operation successful");
          actions.resetForm();
          dispatch({
            type: participantsConstants.participantsAddSubscription,
            payload: { ...toSave }
          });
          if (props.done) props.done();
        },
        undefined,
        () => {
          dispatch({
            type: participantsConstants.participantsAddSubscription,
            payload: { ...toSave }
          });
          Toast.info("Operation successful");
          actions.resetForm();
          handleClose();
          // actions.setSubmitting(false);
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
          <XSelectInput
            size="small"
            name="serviceType"
            label="Service Type"
            options={toOptions(subscriptionsServiceTypes)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <XDateInput
            name="subscriptionDate"
            label="Subscription Date"
            inputVariant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </XFormSimple>
  );
};

export default SubscriptionsForm;
