import {
  IBill,
  IParticipant,
  IPayment,
  IContactPerson,
  ISubscription,
} from "../../../modules/participants/types";
import { get } from "../../../utils/ajax";
import { remoteRoutes } from "../../constants";
import { Dispatch } from "redux";

export const participantsConstants = {
  participantsFetchAll: "participantsFetchAll",
  participantsUpdateParticipant: "participantsUpdateParticipant",
  participantsFetchLoading: "participantsFetchLoading",
  participantsAddParticipant: "participantsAddParticipant",
  getParticipantDetails: "getParticipantDetails",
  participantsFetchOne: "participantsFetchOne",
  contactPersonsFetchAll: "contactPersonsFetchAll",
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
  participantSubscriptionsFetchAll: "participantSubscriptionsFetchAll",
  participantsAddSubscription: "participantsAddSubscription",
  participantsToggleAction: "participantsToggleAction",
  participantsUpdateSubscriptionStatus: "participantsUpdateSubscriptionStatus",
  participantsFetchContactPersons: "participantsFetchContactPersons",
  participantsFetchContactPersonsLoading: "participantsFetchContactPersonsLoading"
};

export interface IParticipantsState {
  loading: boolean;
  selected?: IParticipant;
  participant?: IParticipant;
  data: any;
  billingsLoading?: boolean;
  paymentsLoading: boolean;
  paymentsDetailsLoading: boolean;
  paymentDetails?: IPayment;
  addedPayment?: IPayment;
  fetchOne?: boolean;
  showAction?: boolean;
  contactPersonsLoading?: boolean;
}

const initialState: IParticipantsState = {
  loading: false,
  participant: undefined,
  data: [],
  selected: undefined,
  billingsLoading: false,
  paymentsLoading: false,
  paymentsDetailsLoading: false,
  paymentDetails: undefined,
  addedPayment: undefined,
  showAction: false,
  contactPersonsLoading: false
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case participantsConstants.contactPersonsFetchAll: {
      return { ...state, contactPersons: action.payload };
    }
    case participantsConstants.participantsUpdateParticipant: {
      const updatedData = state.data.map((item: any, index: number) =>
        item.id === action.payload.id ? action.payload : item
      );
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          company: action.payload.company,
        },
        data: updatedData,
      };
    }
    case participantsConstants.participantsFetchAll: {
      return { ...state, loading: false, data: action.payload };
    }
    case participantsConstants.participantsFetchLoading: {
      return { ...state, loading: action.payload };
    }
    case participantsConstants.participantsAddParticipant: {
      const newParticipant: IParticipant[] = action.payload;
      return {
        ...state,
        data: [...state.data, newParticipant],
        selected: newParticipant,
      };
    }
    case participantsConstants.getParticipantDetails: {
      const selected = state.data.filter(
        (participantDetails: IParticipant) =>
          action.payload.participantId === participantDetails.id
      );
      return { ...state, selected: selected[0], loading: false };
    }
    case participantsConstants.participantsFetchOne: {
      return { ...state, selected: action.payload, loading: false };
    }
    case participantsConstants.participantsBillsFetchLoading: {
      return { ...state, billingsLoading: action.payload };
    }
    case participantsConstants.participantsBillsFetchAll: {
      return {
        ...state,
        billingsLoading: false,
        selected: state.selected && {
          ...state.selected,
          billings: action.payload,
        },
      };
    }
    case participantsConstants.participantsPaymentsFetchLoading: {
      return { ...state, paymentsLoading: action.payload };
    }
    case participantsConstants.participantsPaymentsFetchAll: {
      return {
        ...state,
        paymentsLoading: false,
        selected: state.selected && {
          ...state.selected,
          payments: action.payload,
        },
      };
    }

    case participantsConstants.participantsAddPayment: {
      const newPayment: IPayment = action.payload;
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          payments: state.selected.payments
            ? [...state.selected.payments, newPayment]
            : [newPayment],
        },
      };
    }
    case participantsConstants.paymentsDetailsFetchAllLoading: {
      return { ...state, paymentsDetailsLoading: action.payload };
    }
    case participantsConstants.paymentsDetailsFetchAll: {
      const paymentDetails: IPayment = action.payload;
      return { ...state, paymentDetails, paymentsDetailsLoading: false };
    }
    case participantsConstants.participantSubscriptionsFetchAll: {
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          subscriptions: action.payload,
        },
      };
    }
    case participantsConstants.participantsAddSubscription: {
      const newSubscription: ISubscription = action.payload;
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          subscriptions: state.selected.subscriptions
            ? [...state.selected.subscriptions, newSubscription]
            : [newSubscription],
        },
      };
    }
      case participantsConstants.participantsFetchContactPersonsLoading: {
      return { ...state, contactPersonsLoading: action.payload };
    }
    case participantsConstants.participantsFetchContactPersons: {
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          contactPersons: action.payload,
        },
      };
    }
    case participantsConstants.participantsAddContactPerson: {
      const newContactPerson: IContactPerson[] = action.payload;
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          contactPersons: state.selected.contactPersons
            ? [...state.selected.contactPersons, newContactPerson]
            : [newContactPerson],
        },
      };
    }
    case participantsConstants.participantsUpdateContactPerson: {
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          contactPersons: state.selected.contactPersons.map((contact, index) =>
            contact.name === action.payload.name ? action.payload : contact
          ),
        },
      };
    }
    case participantsConstants.participantsDeleteContactPerson: {
      let contacts =
        state.selected &&
        state.selected.contactPersons &&
        state.selected.contactPersons.filter(function (contact) {
          return contact.id !== action.payload;
        });
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          contactPersons: contacts,
        },
      };
    }
    case participantsConstants.participantsToggleAction: {
      return { ...state, showAction: action.payload };
    }
    case participantsConstants.participantsUpdateSubscriptionStatus: {
      const status = action.payload.value === "left" ? "Active" : "InActive";
      let subscriptions =
        state.selected &&
        state.selected.subscriptions &&
        state.selected.subscriptions.map(function (subscription) {
          if (subscription.id === action.payload.record.id) {
            subscription.subscriptionStatus = status;
          }
          return subscription;
        });
      
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          subscriptions: subscriptions,
        },
      };
    }
    default: {
      return state;
    }
  }
}
