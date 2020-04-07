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
                width: 70
            }
        }
    },
    {
        name: 'billNumber', label: 'Bill Number',
        cellProps: {
            style: {
                width: 70,
                paddingLeft: 80
            }
        }
    },
    {
        name: 'consumption', label: 'Consumption',
        numeric: true,
        render: (value, rec) => printFormattedMoney(value),
        cellProps: {
            style: {
                width: 100,
                textAlign: 'right',
                paddingRight: 80

            }
        }
    },
    {
        name: 'rate', label: 'Rate',
        numeric: true,
        cellProps: {
            style: {
                width: 80,
                paddingRight: 80
            }
        }
    },
    {
        name: 'billAmount', label: 'Bill amount',
        numeric: true,
        render: (value, rec) => printFormattedMoney(value),
        cellProps: {
            style: {
                width: 80,
                paddingRight: 40
            }
        }
    },
];