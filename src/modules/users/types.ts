import {BaseModel} from "../../data/types";

export interface IWorkflowInclude {
    caseData?: boolean
    tasks?: boolean
    documents?: boolean
}

export interface IWorkflowFilter {
    id?: string
    referenceNumber?: string
    nin?: string
    requestId?: string
    initiator?: []
    externalReference?: string
    userId?: string
    applicant?: string
    assignee?: string
    showNew?: boolean
    showAssigned?: boolean
    statuses?: string[]
    status?: string
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
export interface IVerificationStatus {
    id: string,
    name: string
}
export interface IVerificationRequest {
    id: string,
    date?: Date,
    name: string,
    nin: string,
    dateOfBirth?: Date,
    status: IVerificationStatus,
    requestId?: string,
    cardNumber?: string
}
export interface IRequestDetailsStatus {
    order: number,
    task:string,
    status: string,
    date?: Date | null
}
export interface IRequestDetails {
    id?: any,
    requestId: any,
    requestDate?: Date,
    nin: string,
    dateOfBirth: Date,
    referenceNumber?: any,
    cardNumber?: any
    initiator: string,
    participant: string,
    name?: string
    status?: string
    receivedFromNira?:string
    receivedAt?: string
    submittedAt?: string
    requestStatus: IRequestDetailsStatus[]
}

export enum WorkflowStatus {
    Open = 'Open',
    Error = 'Error',
    Closed = 'Closed'
}

export enum WorkflowNinStatus {
    Pending = 'Pending',
    Error = 'Error',
    Verified = 'Verified',
    Successful = 'Successful',
    Failed = 'Failed',
    Rejected = 'Rejected'

}

export enum WorkflowRequestStatus {
    RequestReceived='Request Received',
    AuthenticationSuccessful='Authentication Successful',
    RequestSubmitted='Request submitted to NIRA',
    ResultReceived='Result Received',
    ResponseReturned='Response Returned'
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
