import {
  IBill,
  IParticipant,
  IPayment,
  IPaymentDetails,
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
};

export interface IParticipantsState {
  loading: boolean;
  selected?: IParticipant;
  participant?: IParticipant;
  data: any;
  billingsLoading?: boolean;
  billings: IBill[];
  paymentsLoading: boolean;
  paymentsDetailsLoading: boolean;
  paymentDetails?: IPaymentDetails;
  addedPayment?: IPayment;
  fetchOne?: boolean;
}

const initialState: IParticipantsState = {
  loading: false,
  participant: undefined,
  data: [],
  selected: undefined,
  billingsLoading: false,
  billings: [],
  paymentsLoading: false,
  paymentsDetailsLoading: false,
  paymentDetails: undefined,
  addedPayment: undefined,
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
      const billings: IBill = action.payload;
      return { ...state, billings, billsLoading: false };
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
          return contact.name === action.payload.name;
        });
      return {
        ...state,
        selected: state.selected && {
          ...state.selected,
          contactPersons: contacts,
        },
      };
    }
    default: {
      return state;
    }
  }
}
