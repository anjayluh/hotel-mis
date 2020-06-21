import { XHeadCell } from "../../components/table/XTableHead";
import ParticipantLink from "../../components/links/ParticipantLink";
import { printDate } from "../../utils/dateHelpers";
import React from "react";
import { format, compareAsc } from "date-fns";
import { getConsumption } from "./fakeData";
import { getbillAmount } from "./fakeData";

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
    name: "dateCreated",
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
    name: "consumption",
    label: "Consumption",
    render: (value, rec) => getConsumption(rec),
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
    name: "billAmount",
    label: "Bill amount",
    numeric: true,
    render: (value, rec) => getbillAmount(rec),
    cellProps: {
      style: {
        width: 200,
        whiteSpace: "nowrap",
        paddingRight: 40,
      },
    },
  },
];
