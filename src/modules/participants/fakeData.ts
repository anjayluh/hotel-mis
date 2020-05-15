import * as faker from "faker";
import {
  ISubscription,
  IContactPerson,
  IBill,
  IPayment,
  IParticipant,
} from "./types";
import { enumToArray } from "../../utils/stringHelpers";
import { createArray } from "../../utils/arrayHelpers";
import { format, compareAsc } from "date-fns";
import { value } from "jsonpath";
import { paymentTypes } from "../../data/comboCategories";
import { contactPersonCategories } from "../../data/comboCategories";

const uuid = require("uuid/v4");

const organisationNames = [
  "Stanbic bank Uganda Limited",
  "Pride Microfinance Limited",
  "Absa Bank Uganda Limited",
  "Bamunanika Cooperative Society",
  "Bank of India (Uganda) Limited",
  "Micro Credit Development Trust",
  "Opportunity Bank uganda",
  "Centenary Bank",
  "Metroplex Forex Bureau",
  "Equity Bank Uganda Limited (EBUL)",
  "United Bank of Africa",
];

const organisationTypes = ["Commercial Bank", "Microfinance", "Forex Bureau"];
export const fakePayment = (): IPayment => {
  return {
    id: faker.random.uuid(),
    paymentDate: new Date(faker.date.past(1)),
    paymentType: faker.random.arrayElement(paymentTypes),
    referenceNumber: faker.finance.account(5),
    amount: faker.random.number({ min: 999999, max: 9999999 }),
  };
};

export const fakePaymentDetails = (): IPayment => {
  return {
    id: faker.finance.account(6),
    paymentDate: new Date(faker.date.past(1)),
    paymentType: faker.random.arrayElement(paymentTypes),
    amount: faker.random.number({ min: 999999, max: 9999999 }),
    dateOfEntry: new Date(faker.date.past(1)),
    enteredBy: faker.name.findName(),
    referenceNumber: faker.finance.account(5),
  };
};
export const fakeParticipant = (): IParticipant => {
  return {
    category: faker.random.arrayElement(organisationTypes),
    person: null,
    company: {
      name: faker.random.arrayElement(organisationNames),
      id: faker.random.uuid(),
      createdAt: new Date(faker.date.past(1)),
      lastUpdated: null,
      isDeleted: false,
    },
    identifications: [
      {
        category: "Nin",
        contactId: faker.random.uuid(),
        value: "DE128398323",
        cardNumber: null,
        issuingCountry: null,
        issueDate: new Date(faker.date.past(1)),
        expiryDate: new Date(faker.date.past(1)),
        isPrimary: true,
        id: faker.random.uuid(),
        createdAt: new Date(faker.date.past(1)),
        lastUpdated: null,
        isDeleted: false,
      },
    ],
    phones: [
      {
        category: "Mobile",
        contactId: faker.random.uuid(),
        value: "0414100100",
        isPrimary: true,
        id: faker.random.uuid(),
        createdAt: new Date(faker.date.past(1)),
        lastUpdated: null,
        isDeleted: false,
      },
    ],
    emails: [
      {
        category: "Personal",
        contactId: faker.random.uuid(),
        value: "reach_out@stanbic.co.ug",
        isPrimary: true,
        id: faker.random.uuid(),
        createdAt: new Date(faker.date.past(1)),
        lastUpdated: null,
        isDeleted: false,
      },
    ],
    addresses: [],
    tags: null,
    id: faker.random.uuid(),
    createdAt: new Date(faker.date.past(1)),
    lastUpdated: null,
    isDeleted: false,
    subscriptions: [
      {
        id: faker.random.uuid(),
        companyId: faker.random.uuid(),
        accountNumber: null,
        dateCreated: new Date(faker.date.past(1)),
        subscriptionStatus: faker.random.arrayElement(subscriptionStatus),
        serviceCategoryId: faker.random.uuid(),
        billingCategory: "Standard",
        service: "NIN Verification",
        monthlyCap: faker.random.arrayElement(monthlyCap),
      },
    ],
    contactPersons: [
      {
        id: faker.random.uuid(),
        name: faker.name.firstName() + " " + faker.name.lastName(),
        role: faker.random.arrayElement(contactPersonCategories),
        phone: {
          id: faker.random.uuid(),
          value: faker.phone.phoneNumberFormat(0),
        },
        email: faker.internet.email(),
      },
    ],
    payments: [fakePaymentDetails()],
  };
};

const subscriptionStatus = ["Active", "Inactive", "Suspended"];
const monthlyCap = [10000, 20000];

export const fakeSubscriptions = (): ISubscription => {
  return {
    id: faker.random.uuid(),
    companyId: faker.random.uuid(),
    accountNumber: faker.random.number({ min: 10000, max: 99999 }),
    dateCreated: new Date(faker.date.past(5)),
    subscriptionStatus: faker.random.arrayElement(subscriptionStatus),
    serviceCategoryId: faker.random.uuid(),
    billingCategory: "Standard",
    service: "NIN Verification",
    monthlyCap: faker.random.arrayElement(monthlyCap),
  };
};

export const fakeContactPersons = (): IContactPerson => {
  return {
    id: faker.random.uuid(),
    name: faker.name.firstName() + " " + faker.name.lastName(),
    role: faker.random.arrayElement(contactPersonCategories),
    phone: {
      id: faker.random.uuid(),
      value: faker.phone.phoneNumberFormat(0),
    },
    email: faker.internet.email(),
  };
};

export const fakeBill = (): IBill => {
  return {
    id: faker.random.uuid(),
    billDate: new Date(faker.date.past(1)),
    billNumber: faker.finance.account(5),
    consumption: faker.random.number({ min: 10000, max: 99999 }),
    rate: faker.random.number({ min: 20, max: 50 }),
    billAmount: faker.random.number({ min: 999999, max: 9999999 }),
  };
};
