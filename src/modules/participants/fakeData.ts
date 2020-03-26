import * as faker from "faker";
import { IGeneratedParticipant} from "./types";
import {enumToArray} from "../../utils/stringHelpers";
import {createArray} from "../../utils/arrayHelpers";
import { format, compareAsc } from 'date-fns'

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