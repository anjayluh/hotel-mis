import {ISubscription} from "../../../modules/subscriptions/types";
import {IBill} from "../../../modules/billing/types";
export const SubscriptionConstants = {
    SubscriptionsFetchAll: "SubscriptionsFetchAll",
    SubscriptionsFetchLoading: "SubscriptionsFetchLoading",

}

export interface ISubscriptionState {
    loading: boolean
    data: ISubscription[]
}

const initialState: ISubscriptionState = {
    loading: false,
    data: []
}


export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case SubscriptionConstants.SubscriptionsFetchAll: {
            return {...state, loading: false, data: action.payload}
        }

        case SubscriptionConstants.SubscriptionsFetchLoading: {
            return {...state, loading: action.payload}
        }

        default: {
            return state
        }
    }
}