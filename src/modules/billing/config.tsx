import {XHeadCell} from "../../components/table/XTableHead";
import ParticipantLink from "../../components/links/ParticipantLink";
import {printDate} from "../../utils/dateHelpers";
import React from "react";
import { format, compareAsc } from 'date-fns'

export const columns: XHeadCell[] = [
    {
        name: 'dateCreated', label: 'Bill date',
        render: (value, rec) => <span>{printDate(value)}</span>,
        cellProps: {
            style: {
                width: 60,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'name', label: 'Participant',
        render: (value, rec) => <ParticipantLink id={rec.id} name={rec.name}/>,
        cellProps: {style: {width: 70}}
    },
    {
        name: 'billNumber', label: 'Bill number',
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'consumption', label: 'Consumption',
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'rate', label: 'Rate',
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'billAmount', label: 'Bill amount',
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },

];
