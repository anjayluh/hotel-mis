import {IVerificationRequest} from "../../../modules/ninVerification/types";
import {IRequestDetails} from "../../../modules/ninVerification/types";

export const verificationRequestConstants = {
    RequestsFetchAll:"RequestsFetchAll",
    RequestsFetchLoading:"RequestsFetchLoading",
    RequestDetails: "RequestDetails",
    RequestsAddNew: "RequestsAddNew",
    RequestsPostNew: "RequestsPostNew",

}

export interface IVerificationRequestState {
    loading: boolean
    data: IVerificationRequest[]
    requestDetails?:IRequestDetails
    turnOnSlideOut: boolean
}

const initialState: IVerificationRequestState = {
    loading: false,
    data: [],
    requestDetails: undefined,
    turnOnSlideOut: false

}


export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case verificationRequestConstants.RequestsFetchAll: {
            return {...state, loading: false, data: action.payload}
        }

        case verificationRequestConstants.RequestsFetchLoading: {
            return {...state, loading: action.payload}
        }

        case verificationRequestConstants.RequestDetails: {
            return {...state, requestDetails: action.payload}
        }

        case verificationRequestConstants.RequestsAddNew: {
            return {...state, turnOnSlideOut: action.payload}
        }

        case verificationRequestConstants.RequestsPostNew: {
            const newNinVerificationRequest: IVerificationRequest = action.payload
            return {...state, data: [...state.data, newNinVerificationRequest]}
        }

        default: {
            return state
        }
    }
}