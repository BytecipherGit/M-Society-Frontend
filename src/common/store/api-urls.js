const BaseUrl = process.env.REACT_APP_BASE_URL;

export const ApiUrl = {
  //Auth Super Admin API URLS
  AUTH_SUPER_ADMIN_LOGIN_API: BaseUrl + "superAdmin/login",
  AUTH_SUPER_ADMIN_SET_NEW_PASS_API: BaseUrl + "superAdmin/setNewPassword",
  AUTH_SUPER_ADMIN_CHANGE_PASS_API: BaseUrl + "superAdmin/changePassword",
  AUTH_SUPER_ADMIN_SEND_OTP_API: BaseUrl + "superAdmin/sendOtp",
  AUTH_SUPER_ADMIN_LOGOUT_API: BaseUrl + "superAdmin/logout",
  SUPER_ADMIN_GET_ALL_SOCIETY: BaseUrl + "society/all",
  SUPER_ADMIN_GET_SEARCH_SOCIETY: BaseUrl + "society/search/",
  GET_SELECTED_SOCIETY_API: BaseUrl + "society",
  ADD_SOCIETY_API: BaseUrl + "society",
  UPDATE_SOCIETY_API: BaseUrl + "society",
  DELETE_SOCIETY_API: BaseUrl + "society",
  AUTH_SUPER_ADMIN_GENERATE_NEW_TOKEN_API: BaseUrl + "superAdmin/refresh-token",

  // Society Admin API URLS

  AUTH_SOCIETY_ADMIN_GENERATE_NEW_TOKEN_API: BaseUrl + "admin/refresh-token",
  SOCIETY_ADMIN_LOGIN_API: BaseUrl + "admin/login",
  SOCIETY_ADMIN_LOGOUT_API: BaseUrl + "admin/logout",
  SOCIETY_ADMIN_CHANGE_PASS_API: BaseUrl + "admin/changePassword",
  SOCIETY_ADMIN_SEND_INVITE_API: BaseUrl + "admin/invitation/send",
  SOCIETY_ADMIN_SET_NEW_PASS_API: BaseUrl + "user/setNewPassword",

  // Designation API URLS
  ADD_DESIGNATION_API: BaseUrl + "designation/",
  DELETE_DESIGNATION_API: BaseUrl + "designation/",
  UPDATE_DESIGNATION_API: BaseUrl + "designation/",
  GET_ALL_DESIGNATION_API: BaseUrl + "designation",
  GET_SELECTED_DESIGNATION_API: BaseUrl + "designation/",
  GET_SEARCH_DESIGNATION_API: BaseUrl + "designation/search/",

  // Notice (Society Admin dashboard) API URLS
  ADD_NOTICE_API: BaseUrl + "notice/",
  DELETE_NOTICE_API: BaseUrl + "notice/",
  UPDATE_NOTICE_API: BaseUrl + "notice/",
  GET_ALL_NOTICE_API: BaseUrl + "notice/all",
  GET_SELECTED_NOTICE_API: BaseUrl + "notice/",
  GET_SEARCH_NOTICE_API: BaseUrl + "notice/search/",

  // Phone Directory (Society Admin dashboard) API URLS
  ADD_PHONE_DIRECTORY_API: BaseUrl + "directory/",
  DELETE_PHONE_DIRECTORY_API: BaseUrl + "directory/",
  UPDATE_PHONE_DIRECTORY_API: BaseUrl + "directory/",
  GET_ALL_PHONE_DIRECTORY_API: BaseUrl + "directory/all",
  GET_SELECTED_PHONE_DIRECTORY_API: BaseUrl + "directory/",
  GET_SEARCH_PHONE_DIRECTORY_API: BaseUrl + "directory/search/",

  // Phone Directory (Society Admin dashboard) API URLS

  DELETE_COMPLAINT_API: BaseUrl + "complaint/",
  UPDATE_COMPLAINT_API: BaseUrl + "complaint/",
  GET_ALL_COMPLAINT_API: BaseUrl + "complaint/all",
  GET_SELECTED_COMPLAINT_API: BaseUrl + "complaint/",
  GET_SEARCH_COMPLAINT_API: BaseUrl + "complaint/search/",

  // Resident user API URLS
  RESIDENT_USER_SIGNUP_API: BaseUrl + "residentialUser/signup",
  RESIDENT_USER_LOGIN_API: BaseUrl + "residentialUser/login",

  RESIDENT_USER_DELETE_API: BaseUrl + "user/",
  RESIDENT_USER_UPDATE_API: BaseUrl + "user",
  GET_ALL_RESIDENT_USER_API: BaseUrl + "user/all",
  GET_SEARCH_RESIDENT_USER_API: BaseUrl + "user/search/",
  GET_SELECTED_RESIDENT_USER_API: BaseUrl + "user/",

  RESIDENT_USER_SET_NEW_PASS_API: BaseUrl + "user/setNewPassword",
  RESIDENT_USER_CHANGE_PASS_API: BaseUrl + "residentialUser/changePassword",
  RESIDENT_USER_SEND_OTP_API: BaseUrl + "user/sendOtp",

  // Document (Society Admin dashboard) API URLS
  ADD_DOCUMENT_API: BaseUrl + "document/",
  DELETE_DOCUMENT_API: BaseUrl + "document/",
  UPDATE_DOCUMENT_API: BaseUrl + "document/",
  GET_ALL_DOCUMENT_API: BaseUrl + "document/all",
  GET_SELECTED_DOCUMENT_API: BaseUrl + "document/",
  GET_SEARCH_DOCUMENT_API: BaseUrl + "document/search/",
};
