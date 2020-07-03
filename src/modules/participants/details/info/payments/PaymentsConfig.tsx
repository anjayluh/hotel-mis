import { XHeadCell } from "../../../../../components/table/XTableHead";
import { printDate } from "../../../../../utils/dateHelpers";
import { printsMoney } from "../../../../../utils/numberHelpers";
import React from "react";

export const columns: XHeadCell[] = [
  {
    name: "paymentDate",
    label: "Payment date",
    render: (value, rec) => <span>{printDate(value)}</span>,
    cellProps: {
      style: {
        width: 200,
      },
    },
  },
  {
    name: "paymentType",
    label: "Payment type",
    cellProps: {
      style: {
        width: 200,
      },
    },
  },
  {
    name: "referenceNumber",
    label: "Ref. Number",
    cellProps: {
      style: {
        width: 100,
      },
    },
  },
  {
    name: "amount",
    label: "Amount",
    numeric: true,
    render: (value, rec) => printsMoney(value),
    cellProps: {
      style: {
        width: 80,
        paddingRight: 40,
      },
    },
  },
];
