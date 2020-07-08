import {XHeadCell} from "../../components/table/XTableHead";
import {printDateTime} from "../../utils/dateHelpers";
import React from "react";
import {renderNinStatus} from "./widgets";

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

];

export const workflowTypes = ['JOINT', 'INDIVIDUAL', 'ENTITY','OTHER']
