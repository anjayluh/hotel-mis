import { XHeadCell } from "../../../../../../../components/table/XTableHead";
import { printDate } from "../../../../../../../utils/dateHelpers";
import { printFormattedMoney } from "../../../../../../../utils/numberHelpers";
import React from "react";
import { renderSubscriptionStatus } from "../../../../info/widgets";
import { XToggleButton } from "../../../../info/XToggleButton";
export const columns: XHeadCell[] = [
  {
    name: "accountNumber",
    label: "Account Number",
    render: (value, rec) => <span>{value ? value : "null"}</span>,
    cellProps: {
      style: {
        width: 500,
      },
    },
  },
  {
    name: "subscriptionStatus",
    label: "Status",
    render: (_, rec) => renderSubscriptionStatus(rec.subscriptionStatus),
    cellProps: {
      style: {
        width: 500,
      },
    },
  },
  {
    name: "billingCategory",
    label: "Billing Category",
    cellProps: {
      style: {
        width: 500,
        whiteSpace: "nowrap",
        display: "none",
      },
    },
  },
  {
    name: "serviceName",
    label: "Service",
    cellProps: {
      style: {
        width: 600,
        whiteSpace: "nowrap",
      },
    },
  },
  {
    name: "dateCreated",
    label: "Subscription Date",
    render: (value, rec) => <span>{printDate(value)}</span>,
    cellProps: {
      style: {
        width: 300,
      },
    },
  },
  {
    name: "monthlyCap",
    label: "Monthly Cap",
    numeric: true,
    render: (value, rec) => <span>{printFormattedMoney(value)}</span>,
    cellProps: {
      style: {
        width: 500,
        paddingRight: 40,
        display: "none",
      },
    },
  },
  {
    name: "action",
    label: "",
    numeric: true,
    render: (_, rec) => <XToggleButton value={rec.subscriptionStatus} record={rec}/>,
    cellProps: {
      style: {
        paddingRight: 14,
      },
    },
  },
];
