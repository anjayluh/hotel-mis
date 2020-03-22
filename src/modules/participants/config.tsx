import {XHeadCell} from "../../components/table/XTableHead";
import ParticipantLink from "../../components/links/ParticipantLink";
import React from "react";

export const columns: XHeadCell[] = [
    {
        name: 'name', label: 'Participant',
        render: (value, rec) => <ParticipantLink id={rec.id} name={rec.name}/>,
        cellProps: {style: {width: 70}}
    },
    {
        name: 'type', label: 'Participant Type',
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'dateCreated', label: 'Date Created',
        cellProps: {
            style: {
                width: 60,
                whiteSpace: 'nowrap'
            }
        }
    },
];
