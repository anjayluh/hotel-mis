import { XHeadCell } from "../../components/table/XTableHead";
import { printDateTime } from "../../utils/dateHelpers";
import React from "react";
import { renderNinStatus } from "./widgets";

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
    name: "name",
    label: "name",
    cellProps: { style: { width: 150 } },
  },
  {
    name: "nin",
    label: "nin",
    cellProps: {
      style: {
        width: 40,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "status",
    label: "Status",
    render: (_, rec) => renderNinStatus(rec.status),
    cellProps: {
      style: {
        width: 40,
      },
    },
  },
  {
    name: "id",
    label: "Request id",
    cellProps: {
      style: {
        width: 40,
        whiteSpace: "nowrap",
      },
    },
  },
  // {
  //     name: 'metaData.applicantName',
  //     label: 'Applicant',
  //     render: (data, rec) => {
  //         if (hasValue(rec.metaData.applicantId))
  //             return <ContactLink
  //                 id={rec.metaData.applicantId}
  //                 name={trimString(data, 20)}
  //             />
  //         return <XLink
  //             name={trimString(data, 20)}
  //             title={data}
  //         />
  //     }
  // },
  // {
  //     name: 'metaData.assigneeName',
  //     label: 'Assignee',
  //     render: (data, {metaData}) => data ? <UserLink id={data} name={getInitials(metaData.assigneeName)} title={metaData.assigneeName}/> : ''
  // },
];

// export const workflowHeadCellsNew: XHeadCell[]=[...workflowHeadCells.filter(it=>it.name!=='metaData.assigneeName')]
//

export const workflowTypes = ["JOINT", "INDIVIDUAL", "ENTITY", "OTHER"];
