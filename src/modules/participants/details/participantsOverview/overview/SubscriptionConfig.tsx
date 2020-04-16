import { XHeadCell } from "../../../../../components/table/XTableHead";
import ParticipantLink from "../../../../../components/links/ParticipantLink";
import { printDate } from "../../../../../utils/dateHelpers";
import { printFormattedMoney } from "../../../../../utils/numberHelpers";
import React from "react";
import { format, compareAsc } from "date-fns";
import { renderSubscriptionStatus } from "../../info/widgets";

export const columns: XHeadCell[] = [
  {
    name: "accountNumber",
    label: "Account Number",
    cellProps: { style: { width: 70 } }
  },
  {
    name: "subscriptionStatus",
    label: "Status",
    render: (_, rec) => renderSubscriptionStatus(rec.subscriptionStatus),
    cellProps: {
      style: {
        width: 60
      }
    }
  },
  {
    name: "billingCategory",
    label: "Billing Category",
    cellProps: {
      style: {
        width: 80,
        whiteSpace: "nowrap"
      }
    }
  },
  {
    name: "service",
    label: "Service",
    cellProps: {
      style: {
        width: 80,
        whiteSpace: "nowrap"
      }
    }
  },
  {
    name: "dateCreated",
    label: "Subscription Date",
    render: (value, rec) => <span>{printDate(value)}</span>,
    cellProps: {
      style: {
        width: 60
      }
    }
  },
  {
    name: "monthlyCap",
    label: "Monthly Cap",
    numeric: true,
    render: (value, rec) => <span>{printFormattedMoney(value)}</span>,
    cellProps: {
      style: {
        width: 60,
        paddingRight: 40
      }
    }
  }
];
