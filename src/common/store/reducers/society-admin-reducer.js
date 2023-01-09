import { authActions, societyAdminActions } from "../actions/action-types";

const getInitialState = () => ({
  otpCred: {},
  adminProfile: {},
  noticeList: {},
  selectedNotice: {},
  phoneDirectoryList: {},
  selectedPhoneDirectory: {},
  complaintList: {},
  selectedComplaint: {},
  residentialUserList: {},
  selectedResidentialUser: {},
  documentList: {},
  selectedDocument: {},
});

export const authSocietyReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case societyAdminActions.GET_SOCIETY_ADMIN_PROFILE:
      return {
        ...state,
        adminProfile: action.payload,
      };
    case societyAdminActions.SOCIETY_ADMIN_SEND_OTP:
      return {
        ...state,
        otpCred: action.payload,
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
        complaintList: action.payload,
      };
    case societyAdminActions.GET_SELECTED_COMPLAINT:
      return {
        ...state,
        selectedComplaint: action.payload,
      };
    case societyAdminActions.GET_ALL_RESIDENTIAL_USER:
      return {
        ...state,
        residentialUserList: action.payload,
      };
    case societyAdminActions.GET_SELECTED_RESIDENTIAL_USER:
      return {
        ...state,
        selectedResidentialUser: action.payload,
      };
    case societyAdminActions.GET_ALL_DOCUMENT:
      return {
        ...state,
        documentList: action.payload,
      };
    case societyAdminActions.GET_SELECTED_DOCUMENT:
      return {
        ...state,
        selectedDocument: action.payload,
      };

    case authActions.RESET_STATE:
      return {
        ...state,
        adminProfile: {},
        noticeList: {},
        selectedNotice: {},
        phoneDirectoryList: {},
        selectedPhoneDirectory: {},
        complaintList: {},
        selectedComplaint: {},
        residentialUserList: {},
        selectedResidentialUser: {},
        documentList: {},
        selectedDocument: {},
        otpCred: {},
      };
    default:
      return state;
  }
};
