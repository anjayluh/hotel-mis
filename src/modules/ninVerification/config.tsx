import { XHeadCell } from "../../components/table/XTableHead";
import { printDateTime } from "../../utils/dateHelpers";
import React from "react";
import {
  renderNinStatus,
  renderResponseStatus,
  renderValidityStatus,
} from "./widgets";

export const wfInitialSort = "applicationDate";
export const ninVerificationHeadCells: XHeadCell[] = [
  {
    name: "submittedAt",
    label: "Date",
    render: (value, rec) => <span>{printDateTime(value)}</span>,
    cellProps: {
      style: {
        width: 40,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "surname",
    label: "Name",
    render: (value, rec) => (
      <span>{rec.surname + " " + rec.givenNames + " " + rec.otherNames}</span>
    ),
    cellProps: { style: { width: 150 } },
  },
  {
    name: "cardNumber",
    label: "Card Number",
    cellProps: {
      style: {
        width: 40,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "status",
    label: "Request Status",
    render: (_, rec) => renderNinStatus(rec.status),
    cellProps: {
      style: {
        width: 40,
      },
    },
  },
  {
    name: "resultJson.matchingStatus",
    label: "Response",
    render: (_, rec) => renderResponseStatus(rec.resultJson.matchingStatus),
    cellProps: {
      style: {
        width: 40,
      },
    },
  },
  {
    name: "resultJson.cardStatus",
    label: "Card Validity",
    render: (_, rec) => renderValidityStatus(rec.resultJson.cardStatus),
    cellProps: {
      style: {
        width: 40,
      },
    },
  },
];

export const workflowTypes = ["JOINT", "INDIVIDUAL", "ENTITY", "OTHER"];
