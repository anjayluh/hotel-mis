import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import DetailView, { IRec } from "../../../../../../components/DetailView";
import { printDateTime } from "../../../../../../utils/dateHelpers";
import { printsMoney } from "../../../../../../utils/numberHelpers";
import { formatPaymentType } from "../../../../../../utils/BOUSpecificHelpers";
import { IPayment } from "../../../../types";

interface IProps {
  data: IPayment;
}

const Summary = ({ data }: IProps) => {
  const fields: IRec[] = [
    {
      label: "Payment Date",
      value: data.paymentDate ? printDateTime(data.paymentDate) : "-",
    },
    {
      label: "Payment Type",
      value: data.paymentType ? formatPaymentType(data.paymentType) : "-",
    },
    {
      label: "Amount",
      value: data.amount ? printsMoney(data.amount) : "-",
    },
    {
      label: "Date of Entry",
      value: data.dateCreated ? printDateTime(data.dateCreated) : "-",
    },
    {
      label: "Payment Made By",
      value: data.paymentMadeBy ? data.paymentMadeBy : "-",
    },
    {
      label: "Ref.Number",
      value: data.referenceNumber ? data.referenceNumber : "-",
    },
    {
      label: "Comment",
      value: data.comment ? data.comment : "-",
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <div>
          <DetailView data={fields} />
        </div>
      </Grid>
    </Grid>
  );
};

export default Summary;
