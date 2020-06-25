import {XHeadCell} from "../../components/table/XTableHead";
import ApplicationLink from "../../components/links/ApplicationLink";
import {printDate, printDateTime} from "../../utils/dateHelpers";
import ContactLink from "../../components/links/ContactLink";
import {getInitials, trimString} from "../../utils/stringHelpers";
import React from "react";
import {renderNinStatus, renderSubStatus} from "./widgets";
import {toTitleCase} from "../contacts/types";
import {hasValue} from "../../components/inputs/inputHelpers";
import XLink from "../../components/links/XLink";
import UserLink from "../../components/links/UserLink";
import {getStatus} from "./fakeData";

export const wfInitialSort = 'applicationDate';
export const ninVerificationHeadCells: XHeadCell[] = [

    {
        name: 'submittedAt', label: 'Date',
        render: (value, rec) => <span>{printDateTime(value)}</span>,
        cellProps: {
            style: {
                width: 40,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'surname', label: 'name',
        cellProps: {style: {width: 150}}
    },
    {
        name: 'nin', label: 'nin',
        cellProps: {
            style: {
                width: 40,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'status', label: 'Status', render: (_, rec) => renderNinStatus(rec.status),
        cellProps: {
            style: {
                width: 40
            }
        }
    },
    {
        name: 'id', label: 'Request id',
        cellProps: {
            style: {
                width: 40,
                whiteSpace: 'nowrap'
            }
        }
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

export const workflowTypes = ['JOINT', 'INDIVIDUAL', 'ENTITY','OTHER']
