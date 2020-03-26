import {IParticipant} from "../../../modules/participants/types";
import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../constants";
import {Dispatch} from "redux";

export const participantsConstants = {
    participantsFetchAll: "participantsFetchAll",
    participantsFetchLoading: "participantsFetchLoading",
    participantsAddParticipant: "participantsAddParticipant",
    participantsFetchOne: "participantsFetchOne",

}

export interface IParticipantsState {
    loading: boolean,
    selected?: IParticipant,
    fakeSelected?:  IParticipant,
    participant?: IParticipant
    data: any,
}

const initialState: IParticipantsState = {
    loading: false,
    participant: undefined,
    data: [],
    selected: undefined,
    fakeSelected:  undefined
}


export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case participantsConstants.participantsFetchAll: {
            return {...state, loading: false, data: action.payload}
        }
        case participantsConstants.participantsFetchLoading: {
            return {...state, loading: action.payload}
        }
        case participantsConstants.participantsAddParticipant: {
            const newParticipant: IParticipant[] = action.payload
            // Will remove fakeSelected when endpoint is available
            return {...state, data: [...state.data, newParticipant], fakeSelected: newParticipant}
        }
        case participantsConstants.participantsFetchOne: {
            const selected: IParticipant = action.payload
            return {...state, selected}
        }
        default: {
            return state
        }
    }
}


