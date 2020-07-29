import { XHeadCell } from "../../components/table/XTableHead";
import { printDateTime } from "../../utils/dateHelpers";
import {
  getLastCharacters,
  getAsterikCharacters,
} from "../../utils/stringHelpers";
import React from "react";
import {
  renderNinStatus,
  renderResponseStatus,
  renderValidityStatus,
} from "./widgets";

export const wfInitialSort = "applicationDate";
function printFullName(record: any) {
  let surname = record.surname ? record.surname : "";
  let givenName = record.givenNames ? record.givenNames : "";
  let otherNames = record.otherNames ? record.otherNames : "";
  return surname + " " + givenName + " " + otherNames;
}
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
    render: (value, rec) => <span>{printFullName(rec)}</span>,
    cellProps: { style: { width: 150 } },
  },
  {
    name: "nin",
    label: "NIN",
    render: (value, rec) => (
      <span>{getAsterikCharacters(value, 2, 10, 8)}</span>
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
    render: (value, rec) => <span>{getAsterikCharacters(value, 0, 5, 5)}</span>,
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
