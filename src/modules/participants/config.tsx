import {XHeadCell} from "../../components/table/XTableHead";
import ParticipantLink from "../../components/links/ParticipantLink";
import {printDate} from "../../utils/dateHelpers";
import React from "react";
import { format, compareAsc } from 'date-fns'

export const columns: XHeadCell[] = [
    {
        name: 'company.name', label: 'Participant',
        render: (value, rec) => <ParticipantLink id={rec.id} name={value} />
    },

    {
        name: 'category', label: 'Participant Type',
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap',
                display: 'none'
            }
        }
    },
    {
        name: 'createdAt', label: 'Date Created',
    render: (value, rec) => <span>{printDate(value)}</span>,
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },
];
