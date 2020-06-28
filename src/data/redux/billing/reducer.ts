import { IBill, IBillCycle } from "../../../modules/billing/types";

export const BillingsConstants = {
  BillingsFetchAll: "BillingsFetchAll",
  BillingsFetchLoading: "BillingsFetchLoading",
  BillingsGenerateBill: "BillingsGenerateBill",
  BillingsFetchCurrentCycle: "BillingsFetchCurrentCycle",
};

export interface IBillingState {
  loading: boolean;
  data: IBill[];
  generateBill: boolean;
  currentCycle: IBillCycle | null;
}

const initialState: IBillingState = {
  loading: false,
  data: [],
  generateBill: true,
  currentCycle: null,
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

    default: {
      return state;
    }
  }
}
