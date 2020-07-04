import { XHeadCell } from "../../components/table/XTableHead";
import ParticipantLink from "../../components/links/ParticipantLink";
import { printDate } from "../../utils/dateHelpers";
import React from "react";
import { format, compareAsc } from "date-fns";
import { printMoney } from "../../utils/numberHelpers";

export const columns: XHeadCell[] = [
  {
    name: "name",
    label: "Participant",
    render: (value, rec) => <ParticipantLink id={rec.id} name={rec.name} />,
    cellProps: {
      style: { width: 300 },
    },
  },
  {
    name: "billDate",
    label: "Bill date",
    render: (value, rec) => <span>{printDate(value)}</span>,
    cellProps: {
      style: {
        width: 200,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "billNumber",
    label: "Bill number",
    cellProps: {
      style: {
        width: 100,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "consumptionAmount",
    label: "Consumption",
    render: (value, rec) => (value === 0 ? value : printMoney(value)),
    numeric: true,
    cellProps: {
      style: {
        width: 100,
        whiteSpace: "nowrap",
        textAlign: "right",
      },
    },
  },
  {
    name: "rate",
    label: "Rate",
    numeric: true,
    cellProps: {
      style: {
        width: 200,
        whiteSpace: "nowrap",
        textAlign: "right",
      },
    },
  },
  {
    name: "lastBillAmountDue",
    label: "Bill amount",
    numeric: true,
    render: (value, rec) => printMoney(value),
    cellProps: {
      style: {
        width: 200,
        whiteSpace: "nowrap",
        paddingRight: 40,
      },
    },
  },
];
