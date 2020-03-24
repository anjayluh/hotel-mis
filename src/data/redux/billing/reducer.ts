import {IBill} from "../../../modules/billing/types";

export const BillingsConstants = {
    BillingsFetchAll: "BillingsFetchAll",
    BillingsFetchLoading: "BillingsFetchLoading",

}

export interface IBillingState {
    loading: boolean
    data: IBill[]
}

const initialState: IBillingState = {
    loading: false,
    data: []
}


export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case BillingsConstants.BillingsFetchAll: {
            return {...state, loading: false, data: action.payload}
        }

        case BillingsConstants.BillingsFetchLoading: {
            return {...state, loading: action.payload}
        }

        default: {
            return state
        }
    }
}


