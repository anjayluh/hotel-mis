import * as faker from "faker";
import {
    ActionStatus,
    IAction,
    ITask,
    IWorkflow,
    TaskStatus,
    WorkflowStatus,
    WorkflowSubStatus,
    IVerificationRequest,
    IVerificationStatus,
    WorkflowNinStatus,
    WorkflowRequestStatus,
    IRequestDetails
} from "./types";
import {enumToArray} from "../../utils/stringHelpers";
import {createArray} from "../../utils/arrayHelpers";
import {format} from "date-fns";
import {getRandomStr} from "../../utils/stringHelpers";
import {organisationNames} from "../billing/fakeData";

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
let arr_elem = ['rr','jjh', 'ggg']
const fakeVerificationRequest = (): IVerificationRequest => {
    return {
        id: uuid(),
        date: new Date(faker.date.past(1)),
        name: faker.name.findName(),
        nin: getRandomStr(13),
        status: {
            id: uuid(),
            name: faker.random.arrayElement(enumToArray(WorkflowNinStatus)) as WorkflowNinStatus
        },
        requestId: getRandomStr(8)

    }
}

export const verificationRequests = () => {
    let verifications: any = []
    for(let i = 0; i < 100; i++) {
        verifications.push(fakeVerificationRequest())
    }
    return verifications
}

export const getStatus  = (verificationRequest: IVerificationRequest) => {
    // const {name} = verificationRequest.status
    return verificationRequest.status.name
}

const fakeRequestDetails =():IRequestDetails => {
    return {
        requestDate: new Date(faker.date.past(1)),
        nin: getRandomStr(13),
        dateOfBirth:new Date(faker.date.past(18)),
        referenceNumber: faker.finance.account(7),
        initiator: faker.name.findName(),
        participant: faker.random.arrayElement(organisationNames),
        requestStatus: {
            status: faker.random.arrayElement(enumToArray(WorkflowRequestStatus)) as WorkflowRequestStatus,
            date: new Date(faker.date.past(1))
        }
    }

}