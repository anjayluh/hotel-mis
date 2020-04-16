import {BaseModel} from "../../data/types";

export interface IGeneratedParticipant {
    id?: string
    name?: string
    type?: string
    dateCreated?: Date
}
export interface IParticipantType {
    id: string
    name: string
}

export interface IParticipantPhone {
    id: string
    type: string
    value: string
}
export enum IParticipantStatusName {
    Active = 'Active',
    Inactive = 'Inactive',
    Suspended = 'Suspended'
}
export interface IParticipantStatus {
    id: string
    name: string
}
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
export interface IParticipantDetails {
    category: string
    person: string | null
    company: ICompany
    identifications: Identifications[]
    phones: IPhones[]
    emails: IEmail[]
    addresses?: []
    tags?: any
    id: string
    createdAt: Date | null
    lastUpdated: Date | null
    isDeleted: false
    subscriptions: ISubscription[]

}

export interface ICompany {
    name: string
    id: string
    createdAt: Date | null
    lastUpdated: Date | null
    isDeleted: false

}
export interface Identifications {
    category: string
    contactId: string
    value: string
    cardNumber: string | null
    issuingCountry: boolean | null
    issueDate: Date
    expiryDate: Date
    isPrimary: boolean
    id: string
    createdAt: Date | null
    lastUpdated: Date | null
    isDeleted: false

}

export interface IPhones {
    category: string
    contactId: string
    value: string
    isPrimary: boolean
    id: string
    createdAt: Date | null
    lastUpdated: Date | null
    isDeleted: false
}
export interface IEmail {
    category: string
    contactId: string
    value: string
    isPrimary: boolean
    id: string
    createdAt: Date | null
    lastUpdated: Date | null
    isDeleted: false
}


export interface IParticipantsFilter {
    id?: string
    name?: string
    type?: string
    dateCreated?: Date
}
// export interface ISubscription {
//     id?: string
//     accountNumber: number
//     status?: string
//     billingCategory?: string
//     service: string
//     subscriptionDate: Date
//     monthlyCap: number
// }

export interface ISubscription {
    id?: string
    companyId: string
    accountNumber: number | null
    dateCreated: Date | null
    subscriptionStatus?: string
    serviceCategoryId: string
    billingCategory?: string
    service?: string
    monthlyCap?: number
}

export interface IContactPersonPhone {
    id: string
    value: string
}
export interface IContactPerson {
    id?: string
    name: string
    role: string
    phone: IContactPersonPhone
    email: string
}

export interface IBill {
    id: string
    billDate: Date,
    billNumber: any
    consumption: any
    rate: number
    billAmount: any
}
export interface IPayment {
    id: string
    paymentDate: Date,
    paymentType: any
    referenceNumber: any
    amount: number
    dateOfEntry?: Date
    enteredBy?: string
}
export interface IPaymentDetails {
    paymentId: string
    paymentDate: Date
    paymentType: any
    amount: number
    dateOfEntry: Date
    enteredBy: string
    referenceNumber: any
}

/* 
export const renderName = (participant: IParticipant): string => {
    if (contact.category === ContactCategory.Person) {
        const person = contact.person
        const name: string =
            salutation ?
                `${person.salutation || ''} ${person.firstName || ''} ${person.middleName || ''} ${person.lastName || ''}`
                : `${person.firstName || ''} ${person.middleName || ''} ${person.lastName || ''}`;

        return name.trim().replace(/\s+/g, ' ');
    } else {
        console.log(contact)
        return contact.company.name
    }

}; */
export interface IWorkflowInclude {
    caseData?: boolean
    tasks?: boolean
    documents?: boolean
}

export interface IWorkflowFilter {
    id?: string
    referenceNumber?: string
    externalReference?: string
    userId?: string
    applicant?: string
    assignee?: string
    showNew?: boolean
    showAssigned?: boolean
    statuses?: string[]
    from?: Date|null
    to?: Date|null
    subStatuses?: string[]
    workflowTypes?: string[]
    include?: IWorkflowInclude
}

export interface IAction extends BaseModel {
    name: string,
    type: string,
    parameterType: string,
    service: string,
    endPoint: string,
    template?: string,
    errorTemplate?: string|null,
    title: string
    description: string
    roles: string[]
    shouldRender: boolean,
    nextStatusError: string
    nextStatusSuccess: string

    optional: boolean
    ignored: boolean
    skipped: boolean

    status: ActionStatus
    statusMessage: string
    runDate: Date
    inputData: string
    outputData: string
    notifications: any[]
}

export interface ITask extends BaseModel {
    name: string,
    workflowId: string,
    title: string
    description: string
    status: TaskStatus
    statusMessage: string
    runDate: Date
    actions: IAction[]
}

export interface IWorkflow extends BaseModel {
    type: string,
    name: string,
    title: string
    description: string

    applicationDate: Date
    userId: string
    externalReference: string
    referenceNumber: string

    status: WorkflowStatus
    subStatus: WorkflowSubStatus
    subStatusComment: string
    runDate?: Date

    tasks: ITask[]
    documents: IDocument[]
    caseData: any
    metaData: any

    assigneeId?: string
    assignedDate?: string
}

export enum WorkflowStatus {
    Open = 'Open',
    Error = 'Error',
    Closed = 'Closed'
}

export enum WorkflowSubStatus {

    UnknownError = 'UnknownError',
    OperationSucceeded = 'OperationSucceeded',

    Pending = 'Pending',
    Verified = 'Verified',
    ManualVerification = 'ManualVerification',

    ContactCreationFailed = 'ContactCreationFailed',
    CaseUpdateFailed = 'CaseUpdateFailed',


    RegulationCheckFailed = 'RegulationCheckFailed',
    InternalWatchlistFailed = 'InternalWatchlistFailed',
    RiskProfileFailed = 'RiskProfileFailed',

    CifCreationFailed = 'CifCreationFailed',
    AccountCreationFailed = 'AccountCreationFailed',

    AwaitingDocumentsApproval = 'AwaitingDocumentsApproval',
    DocumentsValidationFailed = 'DocumentsValidationFailed',

    AwaitingAccountApproval = 'AwaitingAccountApproval',
    AccountVerificationFailed = 'AccountVerificationFailed',

    AwaitingSignatureUpload = 'AwaitingSignatureUpload',
    SignatureRejected = 'SignatureRejected',

    AwaitingCaseClosure = 'AwaitingCaseClosure',
    FailedToCloseCase = 'FailedToCloseCase',
}


export enum ActionStatus {
    Pending = 'Pending',
    Done = 'Done',
    Error = 'Error'
}

export enum TaskStatus {
    Pending = 'Pending',
    Done = 'Done',
    Error = 'Error'
}

export enum DocumentType {
    Image = 'Image',
    Pdf = 'Pdf'
}

export interface IDocument {
    id: string
    name: string
    fileName: string
    contentType: string
    sizeInMbs: number
}

export interface IManualDecision {
    caseId: string
    taskName: string
    actionName: string

    resumeCase: boolean
    override: boolean
    nextSubStatus: string
    data: any,
}

export const canRunAction = (actionName: string, taskName: string, workflow: IWorkflow) => {
    const taskIndex = workflow.tasks.findIndex(it => it.name === taskName)
    const taskReady = (taskIndex ===0 || workflow.tasks[taskIndex-1].status === TaskStatus.Done)
    if(!taskReady){
        // Some tasks before this action are not yet complete
        return false;
    }
    const task = workflow.tasks[taskIndex]
    const actionIndex = task.actions.findIndex(it => it.name === actionName)
    return (actionIndex ===0 || task.actions[actionIndex-1].status=== ActionStatus.Done)

}

export const printActionStatus = (status: WorkflowStatus) => {
    return status;
}

export const printTaskStatus = (status: WorkflowStatus) => {
    return status;
}

export const trimCaseId = (data: string) => {
    return data.substr(0, 8)
}
