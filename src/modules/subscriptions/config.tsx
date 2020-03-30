import {XHeadCell} from "../../components/table/XTableHead";
import {printDate} from "../../utils/dateHelpers";
import React from "react";
import { format, compareAsc } from 'date-fns'
import {getMonthlyCap} from "./fakeData";
import {renderSubscriptionStatus} from "./widgets";


export const SubscriptionColumns: XHeadCell[] = [
    {
        name: 'accountNumber', label: 'Account Number',
        cellProps: {
            style: {
                width: 30,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'status', label: 'Status', render: (_, rec) => renderSubscriptionStatus(rec.status),
        cellProps: {
            style: {
                width: 40,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'service', label: 'Service',
        cellProps: {
            style: {
                width: 30,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'billingCategory', label: 'Billing Category',
        cellProps: {
            style: {
                width: 30,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'subscriptionDate', label: 'Subscription date',
        render: (value, rec) => <span>{printDate(value)}</span>,
        cellProps: {
            style: {
                width: 20,
                whiteSpace: 'nowrap'
            }
        }
    },
    {
        name: 'monthlyCap', label: 'Bill amount', render: (value, rec) => getMonthlyCap(rec),
        cellProps: {
            style: {
                width: 80,
                whiteSpace: 'nowrap'
            }
        }
    },


];
