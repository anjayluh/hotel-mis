import {XHeadCell} from "../../../../../components/table/XTableHead";
import ParticipantLink from "../../../../../components/links/ParticipantLink";
import {printDate} from "../../../../../utils/dateHelpers";
import {printFormattedMoney} from "../../../../../utils/numberHelpers";
import React from "react";


export const columns: XHeadCell[] = [
    {
        name: 'billDate', label: 'Bill Date',
        render: (value, rec) => <span>{printDate(value)}</span>,
        cellProps: {
            style: {
                width: 60
            }
        }
    },
    {
        name: 'billNumber', label: 'Bill Number',
        cellProps: {style: {width: 70}}
    },
    {
        name: 'consumption', label: 'Consumption',
        render: (value, rec) => printFormattedMoney(value),
        cellProps: {
            style: {
                width: 30,
                textAlign: 'right',
                paddingRight: 80

            }
        }
    },
    {
        name: 'rate', label: 'Rate',
        cellProps: {
            style: {
                width: 30,
                textAlign: 'right'
            }
        }
    },
    {
        name: 'billAmount', label: 'Bill amount',
        render: (value, rec) => printFormattedMoney(value),
        cellProps: {
            style: {
                width: 80,
                textAlign: 'right'
            }
        }
    },
];
