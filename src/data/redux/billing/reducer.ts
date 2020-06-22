import { IBill } from "../../../modules/billing/types";

export const BillingsConstants = {
  BillingsFetchAll: "BillingsFetchAll",
  BillingsFetchLoading: "BillingsFetchLoading",
  BillingsIsBill: "BillingsIsBill",
};

export interface IBillingState {
  loading: boolean;
  data: IBill[];
  isBill: boolean;
}

const initialState: IBillingState = {
  loading: false,
  data: [],
  isBill: true,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case BillingsConstants.BillingsFetchAll: {
      return { ...state, loading: false, data: action.payload };
    }

    case BillingsConstants.BillingsFetchLoading: {
      return { ...state, loading: action.payload };
    }

    case BillingsConstants.BillingsIsBill: {
      return { ...state, isBill: action.payload };
    }

    default: {
      return state;
    }
  }
}
