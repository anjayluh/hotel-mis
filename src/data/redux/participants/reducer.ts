import {IBill, IParticipant, IPayment, IPaymentDetails, IContactPerson, ISubscription} from "../../../modules/participants/types";
import {get} from "../../../utils/ajax";
import {remoteRoutes} from "../../constants";
import {Dispatch} from "redux";

export const participantsConstants = {
    participantsFetchAll: "participantsFetchAll",
    participantsFetchLoading: "participantsFetchLoading",
    participantsAddParticipant: "participantsAddParticipant",
    getParticipantDetails: "getParticipantDetails",
    contactPersonsFetchAll: 'contactPersonsFetchAll',
    participantsBillsFetchAll: "participantsBillsFetchAll",
    participantsPaymentsFetchAll: "participantsPaymentsFetchAll",
    participantsPaymentsFetchLoading: "participantsPaymentsFetchLoading",
    paymentsDetailsFetchAll: "paymentsDetailsFetchAll",
    paymentsDetailsFetchAllLoading: "paymentsDetailsFetchAllLoading",
    participantsAddPayment: "participantsAddPayment",
    participantsBillsFetchLoading: "participantsBillsFetchLoading",
    participantsAddContactPerson: "participantsAddContactPerson",
    participantsUpdateContactPerson: "participantsUpdateContactPerson",
    participantsDeleteContactPerson: "participantsDeleteContactPerson",
    participantsAddSubscription: "participantsAddSubscription"
}

export interface IParticipantsState {
    loading: boolean,
    selected?: IParticipant,
    participant?: IParticipant,
    data: any,
    billingsLoading?: boolean
    billings:IBill[]
    payments:IPayment[]
    paymentsLoading: boolean
    paymentsDetailsLoading: boolean
    paymentDetails?: IPaymentDetails
    addedPayment?: IPayment
}

const initialState: IParticipantsState = {
    loading: false,
    participant: undefined,
    data: [],
    selected: undefined,
    billingsLoading: false,
    billings:[],
    paymentsLoading: false,
    paymentsDetailsLoading: false,
    payments:[],
    paymentDetails: undefined,
    addedPayment: undefined,

}

export default function reducer(state = initialState, action: any) {
    switch (action.type) {
        case participantsConstants.contactPersonsFetchAll: {
            return {...state, contactPersons: action.payload}
        }
        case participantsConstants.participantsFetchAll: {
            return {...state, loading: false, data: action.payload}
        }
        case participantsConstants.participantsFetchLoading: {
            return {...state, loading: action.payload}
        }
        case participantsConstants.participantsAddParticipant: {
            const newParticipant: IParticipant[] = action.payload
            return {...state, data: [...state.data, newParticipant], selected: newParticipant}
        }
        case participantsConstants.getParticipantDetails: {
            const participantDetails = state.data.filter((participantDetails: IParticipant) => {
                return action.payload === participantDetails.id
            })
            const selected: IParticipant = participantDetails[0]
            return {...state, selected, loading: false}

        }
        case participantsConstants.participantsBillsFetchLoading: {
            return {...state, billingsLoading: action.payload}
        }
        case participantsConstants.participantsBillsFetchAll: {
            const billings: IBill = action.payload
            return {...state, billings, billsLoading: false}
        }
        case participantsConstants.participantsPaymentsFetchLoading: {
            return {...state, paymentsLoading: action.payload}
        }
        case participantsConstants.participantsPaymentsFetchAll: {
            const payments: IPayment = action.payload
            return {...state, payments, loading: false}
        }
        case participantsConstants.paymentsDetailsFetchAllLoading: {
            return {...state, paymentsDetailsLoading: action.payload}
        }
        case participantsConstants.paymentsDetailsFetchAll: {
            const paymentDetails: IPaymentDetails = action.payload
            return {...state, paymentDetails, paymentsDetailsLoading: false}
        }
        case participantsConstants.participantsAddPayment: {
            const newPayment: IPayment= action.payload
            return {...state, payments: [...state.payments, newPayment]}
        }
        case participantsConstants.participantsAddSubscription: {
            const newSubscription: ISubscription = action.payload
            return {
                ...state, selected: state.selected && {
                    ...state.selected,
                    subscriptions: [...state.selected.subscriptions, newSubscription]
                }
            }
        }
        case participantsConstants.participantsAddContactPerson: {
            const newContactPerson: IContactPerson[] = action.payload
            return {...state, selected: state.selected && {
                    ...state.selected,
                    contactPersons: state.selected.contactPersons ? [...state.selected.contactPersons, newContactPerson] : [newContactPerson]
                }
            }
        }
        case participantsConstants.participantsUpdateContactPerson: {
            return {
                ...state, selected: state.selected && {
                    ...state.selected,
                    contactPersons: state.selected.contactPersons.map(
                        (contact, index) =>
                            (contact.name === action.payload.name) ?
                                action.payload : contact)
                }
            }
        }
        case participantsConstants.participantsDeleteContactPerson: {
            let contacts =  state.selected && state.selected.contactPersons && state.selected.contactPersons.filter(function(contact) {
                return contact.name === action.payload.name;
            });
            return {...state, selected: state.selected && {
                ...state.selected, contactPersons: contacts}
            }
        }
        default: {
            return state
        }
    }
}


