import { XHeadCell } from "../../components/table/XTableHead";
import { printDateTime } from "../../utils/dateHelpers";
import React from "react";
import {
  renderNinStatus,
  renderResponseStatus,
  renderValidityStatus,
  renderNinValidityStatus,
} from "./widgets";
import { WorkflowValidityStatus, WorkflowNinValidityStatus } from "./types";

export const wfInitialSort = "applicationDate";
function printFullName(record: any) {
  let surname = record.surname ? record.surname : "";
  let givenName = record.givenNames ? record.givenNames : "";
  let otherNames = record.otherNames ? record.otherNames : "";
  return surname + " " + givenName + " " + otherNames;
}
export const ninVerificationHeadCells: XHeadCell[] = [
  {
    name: "receivedAt",
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
    render: (value, rec) => <span>{printFullName(rec)}</span>,
    cellProps: { style: { width: 150 } },
  },
  {
    name: "nin",
    label: "NIN",
    render: (value, rec) => (
      <span>{value}</span>
    ),
    cellProps: {
      style: {
        width: 40,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "cardNumber",
    label: "Card Number",
    render: (value, rec) => <span>{value}</span>,
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
    render: (_, rec) => renderNinStatus(rec.requestStatus),
    cellProps: {
      style: {
        width: 40,
      },
    },
  },
  {
    name: "ninStatus",
    label: "Nin validity",
    render: (_, rec) => renderNinValidityStatus(rec.resultJson.ninStatus),
    cellProps: {
      style: {
        width: 40,
      },
    },
  },
  {
    name: "resultJson.matchingStatus",
    label: "Match Status",
    render: (_, rec) => (rec.resultJson.matchingStatus == null 
      ? '':renderResponseStatus(rec.resultJson.matchingStatus)),
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
