import { authActions, societyAdminActions } from "../actions/action-types";

const getInitialState = () => ({
  residentList: {},
  noticeList: {},
  selectedNotice: {},
  phoneDirectoryList: {},
  selectedPhoneDirectory: {},
  complaintList: {},
  selectedComplaint: {},
});

export const authSocietyReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case authActions.RESET_STATE:
      return {
        ...state,
        residentList: {},
      };
    case societyAdminActions.GET_ALL_NOTICE:
      return {
        ...state,
        noticeList: action.payload,
      };
    case societyAdminActions.GET_SELECTED_NOTICE:
      return {
        ...state,
        selectedNotice: action.payload,
      };
    case societyAdminActions.GET_ALL_PHONE_DIRECTORY:
      return {
        ...state,
        phoneDirectoryList: action.payload,
      };
    case societyAdminActions.GET_SELECTED_PHONE_DIRECTORY:
      return {
        ...state,
        selectedPhoneDirectory: action.payload,
      };
    case societyAdminActions.GET_ALL_COMPLAINT:
      return {
        ...state,
        phoneDirectoryList: action.payload,
      };
    case societyAdminActions.GET_SELECTED_COMPLAINT:
      return {
        ...state,
        selectedPhoneDirectory: action.payload,
      };

    case authActions.RESET_STATE:
      return {
        ...state,
        noticeList: {},
        selectedNotice: {},
        phoneDirectoryList: {},
        selectedPhoneDirectory: {},
        complaintList: {},
        selectedComplaint: {},
        otpCred: {},
      };
    default:
      return state;
  }
};
