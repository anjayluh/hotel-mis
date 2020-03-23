import {IWorkflow, IParticipant} from "../../../modules/participants/types";

import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../constants";
import {Dispatch} from "redux";

export const participantsConstants = {
    participantsFetchAll: "participantsFetchAll",
    participantsFetchLoading: "participantsFetchLoading",
    participantsFilter: "participantsFilter",

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
            return {...state, loading: false, data: action.payload}
        }
        
        case participantsConstants.participantsFetchLoading: {
            return {...state, loading: action.payload}
        }

        case participantsConstants.participantsFilter: {
            let result: any = [];
            if(action.payload.name !== ''){
                result = state.data.filter((data: any) => {
                let matchedItems: any = [];
                if(data.name.toLowerCase().indexOf(action.payload.name.toLowerCase()) !== -1){
                    matchedItems.push(data)
                    return matchedItems
                }
                })
            }
            return {...state, loading: false, data: result}
        }

        default: {
            return state
        }
    }
}


