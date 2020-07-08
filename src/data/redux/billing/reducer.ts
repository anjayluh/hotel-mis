import { IBill, IBillCycle } from "../../../modules/billing/types";

export const BillingsConstants = {
  BillingsFetchAll: "BillingsFetchAll",
  BillingsFetchLoading: "BillingsFetchLoading",
  BillingsGenerateBill: "BillingsGenerateBill",
  BillingsFetchCurrentCycle: "BillingsFetchCurrentCycle",
  BillingsFetchCurrentCycleStatus: "BillingsFetchCurrentCycleStatus",
  BillingsFetchLastCycle: "BillingsFetchLastCycle",
  BillingsFetchLastCycleStatus: "BillingsFetchLastCycleStatus",
  emailErrorMessage: "emailErrorMessage"
};

export interface IBillingState {
  loading: boolean;
  data: IBill[];
  generateBill: boolean;
  currentCycle: IBillCycle | null;
  lastBillingCycle: IBillCycle | null;
  emailErrorMessage: string | null
}

const initialState: IBillingState = {
  loading: false,
  data: [],
  generateBill: true,
  currentCycle: null,
  lastBillingCycle: null,
  emailErrorMessage: null
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case BillingsConstants.BillingsFetchAll: {
      return { ...state, loading: false, data: action.payload };
    }

    case BillingsConstants.BillingsFetchLoading: {
      return { ...state, loading: action.payload };
    }

    case BillingsConstants.BillingsGenerateBill: {
      return { ...state, generateBill: action.payload };
    }

    case BillingsConstants.BillingsFetchCurrentCycle: {
      return { ...state, currentCycle: action.payload };
    }

    case BillingsConstants.BillingsFetchCurrentCycleStatus: {
      return {
        ...state,
        currentCycle: {
          ...state.currentCycle,
          billingCycleId: action.payload.billingCycleId,
          status: action.payload.status,
          billGeneratedOn: action.payload.dateCreated,
          billCount: action.payload.billCount,
          subscriptionCount: action.payload.subscriptionCount,
        },
      };
    }
      
    case BillingsConstants.BillingsFetchLastCycle: {
      return { ...state, lastBillingCycle: action.payload };
    }
      
      case BillingsConstants.BillingsFetchLastCycleStatus: {
      return {
        ...state,
        lastBillingCycle: {
          ...state.lastBillingCycle,
          id: action.payload.billingCycleId,
          status: action.payload.status,
          billGeneratedOn: action.payload.dateCreated,
          billCount: action.payload.billCount,
          subscriptionCount: action.payload.subscriptionCount,
        },
      };
    }
      
      case BillingsConstants.emailErrorMessage: {
      return { ...state, emailErrorMessage: action.payload };
    }


    default: {
      return state;
    }
  }
}
