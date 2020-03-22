import {IWorkflow, IParticipant} from "../../../modules/participants/types";

import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../constants";
import {Dispatch} from "redux";

export const participantsConstants = {
    participantsFetchAll: "participantsFetchAll",
    participantsFetchLoading: "participantsFetchLoading",

}

export interface IParticipantsState {
    loading: boolean
    participant?: IParticipant
    data: any
}

const initialState: IParticipantsState = {
    loading: false,
    participant: undefined,
    data: []
}


export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case participantsConstants.participantsFetchAll: {
            console.log('result', action.payload)
            return {...state, loading: false, data: action.payload}
        }
        
        case participantsConstants.participantsFetchLoading: {
            return {...state, loading: action.payload}
        }

        default: {
            return state
        }
    }
}

export function participantsStartFetch() {
    return {
        type: participantsConstants.participantsFetchAll}
}

