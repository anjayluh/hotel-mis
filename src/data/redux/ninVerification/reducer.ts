import {IVerificationRequest} from "../../../modules/ninVerification/types";
import {IBill} from "../../../modules/billing/types";
import {BillingsConstants} from "../billing/reducer";
import {IRequestDetails} from "../../../modules/ninVerification/types";

export const VerificationRequestConstants = {
    RequestsFetchAll:'RequestsFetchAll',
    RequestsFetchLoading:'RequestsFetchLoading',
    RequestDetails: 'RequestDetails'

}

export interface IVerificationRequestState {
    loading: boolean
    data: IVerificationRequest[]
    requestDetails?:IRequestDetails[]
}

const initialState: IVerificationRequestState = {
    loading: false,
    data: [],
    requestDetails: []

}


export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case VerificationRequestConstants.RequestsFetchAll: {
            return {...state, loading: false, data: action.payload}
        }

        case VerificationRequestConstants.RequestsFetchLoading: {
            return {...state, loading: action.payload}
        }

        case VerificationRequestConstants.RequestDetails: {
            return {...state, loading: action.payload, requestDetails: action.payload}
        }


        default: {
            return state
        }
    }
}