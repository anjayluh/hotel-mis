import * as faker from "faker";
import {ActionStatus, IAction, ITask, IWorkflow, TaskStatus, WorkflowStatus, WorkflowSubStatus, IParticipant} from "./types";
import {enumToArray} from "../../utils/stringHelpers";
import {createArray} from "../../utils/arrayHelpers";
import { format, compareAsc } from 'date-fns'

const uuid = require('uuid/v4');

export const fakeCase = (): IWorkflow => {
    const fullName = () => `${faker.name.firstName()} ${faker.name.lastName()}`
    return {
        id: uuid(),
        type: faker.random.arrayElement(['ON-BOARD', 'USSD-LOAN']),
        metaData: {
            userName: fullName(),
            assigneeName: fullName(),
            applicantName: fullName()
        },
        applicationDate: faker.date.past(),
        caseData: {},
        name: faker.company.catchPhrase(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        externalReference: uuid(),
        isDeleted: false,
        referenceNumber: faker.lorem.sentence(),
        status: faker.random.arrayElement(enumToArray(WorkflowStatus)) as WorkflowStatus,
        subStatus: faker.random.arrayElement(enumToArray(WorkflowSubStatus)) as WorkflowSubStatus,
        subStatusComment: faker.lorem.sentence(),
        tasks: [],
        documents: [],
        userId: uuid(),
        assigneeId: uuid()
    };
};

export const fakeTask = (): ITask => {
    const actionsCount = faker.random.number({max: 4, min: 1})
    const actions = createArray(actionsCount, fakeAction)
    return {
        id: uuid(),
        workflowId: uuid(),
        name: faker.company.catchPhrase(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        isDeleted: false,
        runDate: faker.date.past(),
        status: faker.random.arrayElement(enumToArray(TaskStatus)) as TaskStatus,
        statusMessage: faker.lorem.sentence(),
        actions: [...actions]
    }
}

export const fakeAction = (): IAction => {
    return {
        endPoint: "", parameterType: "", service: "", type: "",
        id: uuid(),
        name: faker.company.catchPhrase(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.past(),
        isDeleted: false,
        shouldRender: true,
        runDate: faker.date.past(),
        status: faker.random.arrayElement(enumToArray(ActionStatus)) as ActionStatus,
        statusMessage: faker.lorem.sentence(),
        notifications: [],
        roles: [],
        ignored: false,
        optional: false,
        skipped: false,

        nextStatusError: '',
        nextStatusSuccess: '',

        inputData: '',
        outputData: ''
    }
}
const organisationNames = ['Stanbic bank Uganda Limited', 'Pride Microfinance Limited',
'Absa Bank Uganda Limited','Bamunanika Cooperative Society','Bank of India (Uganda) Limited',
'Micro Credit Development Trust','Opportunity Bank uganda','Centenary Bank',
'Metroplex Forex Bureau','Equity Bank Uganda Limited (EBUL)','United Bank of Africa']

const organisationTypes = ['Commercial Bank', 'Microfinance', 'Forex Bureau']
export const fakeParticipant = () : IParticipant => {
    return {
        id: faker.random.uuid(),
        name: faker.random.arrayElement(organisationNames),
        type: faker.random.arrayElement(organisationTypes),
        dateCreated: format(new Date(faker.date.past(1)), 'mm-dd-Y')
    }
};