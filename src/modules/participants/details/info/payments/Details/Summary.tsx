import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import DetailView, { IRec } from "../../../../../../components/DetailView";
import { printDateTime, printDate } from "../../../../../../utils/dateHelpers";
import { printsMoney } from "../../../../../../utils/numberHelpers";
import { IPayment } from "../../../../types";

interface IProps {
  data: IPayment;
}

const Summary = ({ data }: IProps) => {
  function paymentType(value: string) {
    let paymentType = "";
    if (value === "Eft") {
      paymentType = "Electronic Funds Transfer (EFT)";
    } else if (value === "DirectDebit") {
      paymentType = "Direct Debit";
    } else {
      paymentType = value;
    }
    return paymentType;
  }
  const fields: IRec[] = [
    {
      label: "Payment Date",
      value: data.paymentDate ? printDateTime(data.paymentDate) : "-",
    },
    {
      label: "Payment Type",
      value: data.paymentType ? paymentType(data.paymentType) : "-",
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
      label: "Entered By",
      value: data.enteredBy ? data.enteredBy : "-",
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
