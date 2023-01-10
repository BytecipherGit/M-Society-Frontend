import { authActions, superAdminActions } from "../actions/action-types";

const getInitialState = () => ({
  societyList: {},
  selectedSociety: {},
  designationList: {},
  selectedDesignation: {},
  searchSocietyList: {},
  otpCred: {},
});

export const authSuperReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case superAdminActions.SUPER_ADMIN_SEND_OTP:
      return {
        ...state,
        otpCred: action.payload,
      };
    case superAdminActions.GET_ALL_SOCIETY:
      return {
        ...state,
        societyList: action.payload,
      };
    case superAdminActions.GET_SEARCH_SOCIETY:
      return {
        ...state,
        searchSocietyList: action.payload,
      };
    case superAdminActions.SUPER_ADMIN_VIEW_SOCIETY:
      return {
        ...state,
        selectedSociety: action.payload,
      };
    case superAdminActions.GET_ALL_DESIGNATION:
      return {
        ...state,
        designationList: action.payload,
      };
    case superAdminActions.SUPER_ADMIN_VIEW_DESIGNATION:
      return {
        ...state,
        selectedDesignation: action.payload,
      };

    case authActions.RESET_STATE:
      return {
        ...state,
        societyList: {},
        designationList: {},
        selectedDesignation: {},
        searchSocietyList: {},
        otpCred: {},
      };
    default:
      return state;
  }
};
