import * as faker from "faker";
import { IGeneratedParticipant, ISubscription, IContactPerson} from "./types";
import {enumToArray} from "../../utils/stringHelpers";
import {createArray} from "../../utils/arrayHelpers";
import { format, compareAsc } from 'date-fns'
import { value } from "jsonpath";

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