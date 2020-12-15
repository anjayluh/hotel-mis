import {
  IServiceCategory, INiraCredentials,
} from "../../../modules/settings/types";

export const settingsConstants = {
  serviceCategoriesFetchAll: "serviceCategoriesFetchAll",
  settingsFetchLoading: "settingsFetchLoading",
  serviceCategoriesAddServiceCategory: "serviceCategoriesAddServiceCategory",
  RequestPostNiraCredentials: "RequestPostNiraCredentials",
  };

export interface ISettingsState {
  serviceCategories: IServiceCategory[];
  loading: boolean
  niraCredentials?: INiraCredentials
}

const initialState: ISettingsState = {
  serviceCategories: [],
  loading: false,
  niraCredentials: undefined,
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case settingsConstants.serviceCategoriesFetchAll: {
      return { ...state, serviceCategories: action.payload };
    }
      case settingsConstants.settingsFetchLoading: {
      return { ...state, loading: action.payload };
    }
    case settingsConstants.serviceCategoriesAddServiceCategory: {
      return {
        ...state,
        serviceCategories: [...state.serviceCategories, action.payload]
      };
    }
    case settingsConstants.RequestPostNiraCredentials: {
      return {...state, niraCredentials: action.payload}
    }
    default: {
      return state;
    }
  }
}
