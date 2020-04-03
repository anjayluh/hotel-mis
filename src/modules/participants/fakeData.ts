import * as faker from "faker";
import {
    IGeneratedParticipant,
    ISubscription,
    IContactPerson,
    IBill,
    IPayment,
    IPaymentDetails,
    IParticipant, IParticipantType, IParticipantPhone, IParticipantStatus
} from "./types";
import {enumToArray} from "../../utils/stringHelpers";
import {createArray} from "../../utils/arrayHelpers";
import { format, compareAsc } from 'date-fns'
import { value } from "jsonpath";
import {paymentTypes} from "../../data/comboCategories";

const uuid = require('uuid/v4');

const organisationNames = ['Stanbic bank Uganda Limited', 'Pride Microfinance Limited',
'Absa Bank Uganda Limited','Bamunanika Cooperative Society','Bank of India (Uganda) Limited',
'Micro Credit Development Trust','Opportunity Bank uganda','Centenary Bank',
'Metroplex Forex Bureau','Equity Bank Uganda Limited (EBUL)','United Bank of Africa']

const organisationTypes = ['Commercial Bank', 'Microfinance', 'Forex Bureau']
export const fakeParticipant = () : IGeneratedParticipant => {
    return {
        id: faker.random.uuid(),
        name: faker.random.arrayElement(organisationNames),
        type: faker.random.arrayElement(organisationTypes),
        dateCreated: new Date(faker.date.past(1))
    }
};
export interface IParticipant {
    id: string
    name: string
    type: IParticipantType
    phoneNumber: IParticipantPhone[]
    status: IParticipantStatus
    officialEmail: string
    primaryEmail: string
    dateCreated: Date
}
export const fakeParticipantDetails = () : IParticipant => {
    return {
        id: faker.random.uuid(),
        name: 'Stanbic bank Uganda Limited',
        phoneNumber: [
            {
                id: faker.random.uuid(),
                type: "primary",
                value: faker.phone.phoneNumber()
            },
            {
                id: faker.random.uuid(),
                type: "primary",
                value: faker.phone.phoneNumber()
            },
        ],
        type: {
            id: faker.random.uuid(),
            name: 'Commercial Bank'
        },
        status: {
            id: faker.random.uuid(),
            name: "Active"
        },
        officialEmail: faker.internet.email(),
        primaryEmail: faker.internet.email(),
        dateCreated: new Date()
    }
};

const subscriptionStatus = ['Active', 'Inactive', 'Suspended']
const monthlyCap = [10000, 20000]

export const fakeSubscriptions = () : ISubscription => {
    return {
        id: faker.random.uuid(),
        accountNumber: faker.random.number({min:10000, max:99999}),
        status: faker.random.arrayElement(subscriptionStatus),
        billingCategory: 'Standard',
        service: 'NIN Verification',
        subscriptionDate: new Date(faker.date.past(5)),
        monthlyCap: faker.random.arrayElement(monthlyCap)
    }
};
const contactPersonCategories = ['Billing', 'Technical']
export const fakeContactPersons = () : IContactPerson => {
    return {
        id: faker.random.uuid(),
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        category: faker.random.arrayElement(contactPersonCategories),
        phone: {
            id: faker.random.uuid(),
            value: faker.phone.phoneNumber()
        },
        email: faker.internet.email(),
    }
};

export const fakeBill = () : IBill => {
    return {
        id: faker.random.uuid(),
        billDate: new Date(faker.date.past(1)),
        billNumber: faker.finance.account(5),
        consumption: faker.random.number({min:10000, max:99999}),
        rate: faker.random.number({'min': 20, 'max': 50}),
        billAmount: faker.random.number({min:999999, max:9999999}),

    }
};

export const fakePayment = () : IPayment => {
    return {
        id: faker.random.uuid(),
        paymentDate: new Date(faker.date.past(1)),
        paymentType: faker.random.arrayElement(paymentTypes),
        referenceNumber: faker.finance.account(5),
        amount: faker.random.number({min:999999, max:9999999}),

    }
};

export const fakePaymentDetails =(): IPaymentDetails => {
    return {
        paymentId: faker.finance.account(6),
        paymentDate: new Date(faker.date.past(1)),
        paymentType: faker.random.arrayElement(paymentTypes),
        amount: faker.random.number({min:999999, max:9999999}),
        dateOfEntry: new Date(faker.date.past(1)),
        enteredBy: faker.name.findName(),
        referenceNumber: faker.finance.account(5),
    }
}
