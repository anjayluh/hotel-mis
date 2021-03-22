import {INiraCredentials, IVerificationRequest} from "../../../modules/ninVerification/types";
import {IRequestDetails} from "../../../modules/ninVerification/types";

export const verificationRequestConstants = {
    RequestsFetchAll:"RequestsFetchAll",
    RequestsFetchLoading:"RequestsFetchLoading",
    RequestDetails: "RequestDetails",
    RequestsAddNew: "RequestsAddNew",
    RequestsPostNew: "RequestsPostNew",
    TurnOnSlideout:"TurnOnSlideout",
    RequestPostNiraCredentials: "RequestPostNiraCredentials",

}

export interface IVerificationRequestState {
    loading: boolean
    data: IVerificationRequest[]
    requestDetails?:IRequestDetails
    niraCredentials?: INiraCredentials
    turnOnSlideOut: boolean
    addNew:boolean
}

const initialState: IVerificationRequestState = {
    loading: false,
    data: [],
    requestDetails: undefined,
    niraCredentials: undefined,
    turnOnSlideOut: false,
    addNew: false

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
            return {...state, addNew: action.payload}
        }
        case verificationRequestConstants.TurnOnSlideout: {
            return {...state, turnOnSlideOut: action.payload}
        }

        case verificationRequestConstants.RequestsPostNew: {
            const newNinVerificationRequest: IVerificationRequest = action.payload
            console.log(action.payload, 'uuuuuuuuuu')
            return {...state, data: [newNinVerificationRequest, ...state.data]}
        }
        case verificationRequestConstants.RequestPostNiraCredentials: {
            return {...state, niraCredentials: action.payload}
        }

        default: {
            return state
        }
    }
}
