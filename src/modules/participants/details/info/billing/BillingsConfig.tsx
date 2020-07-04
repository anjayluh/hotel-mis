import { XHeadCell } from "../../../../../components/table/XTableHead";
import ParticipantLink from "../../../../../components/links/ParticipantLink";
import { printDate } from "../../../../../utils/dateHelpers";
import { printMoney } from "../../../../../utils/numberHelpers";
import React from "react";

export const columns: XHeadCell[] = [
  {
    name: "billDate",
    label: "Bill Date",
    render: (value, rec) => <span>{printDate(value)}</span>,
    cellProps: {
      style: {
        width: 200,
      },
    },
  },
  {
    name: "billNumber",
    label: "Bill Number",
    render: (value, rec) => (value === null ? "null" : value),
    cellProps: {
      style: {
        width: 60,
        paddingLeft: 80,
      },
    },
  },
  {
    name: "consumptionAmount",
    label: "Consumption",
    numeric: true,
    render: (value, rec) => (value === 0 ? value : printMoney(value)),
    cellProps: {
      style: {
        width: 200,
        textAlign: "right",
        paddingRight: 80,
      },
    },
  },
  {
    name: "unitPrice",
    label: "Rate",
    numeric: true,
    cellProps: {
      style: {
        width: 200,
        paddingRight: 80,
      },
    },
  },
  {
    name: "amountDue",
    label: "Bill amount",
    numeric: true,
    render: (value, rec) => (value === 0 ? value : printMoney(value)),
    cellProps: {
      style: {
        width: 150,
        paddingRight: 40,
      },
    },
  },
];
