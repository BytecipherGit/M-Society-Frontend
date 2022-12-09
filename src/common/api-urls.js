const BaseUrl = process.env.REACT_APP_BASE_URL;

export const ApiUrl = {
    //Auth Super Admin API URLS
    AUTH_SUPER_ADMIN_LOGIN_API: BaseUrl + "superAdmin/login",
    AUTH_SUPER_ADMIN_SET_NEW_PASS_API: BaseUrl + "superAdmin/setNewPassword",
    AUTH_SUPER_ADMIN_CHANGE_PASS_API: BaseUrl + "superAdmin/changePassword",
    AUTH_SUPER_ADMIN_SEND_OTP_API: BaseUrl + "superAdmin/sendOtp",

    // Society Admin API URLS
    SOCIETY_ADMIN_LOGIN_API: "society/adminLogin",
    SOCIETY_ADMIN_SIGNUP_API: "society/adminSignUp",
    SOCIETY_ADMIN_SEND_INVITE_API: "society/sendInvitation",
    ADD_SOCIETY_API: "society/",
    UPDATE_SOCIETY_API: "society/",
    DELETE_SOCIETY_API: "society/",
    GET_ALL_SOCIETY_API: "society/all",
    GET_SELECTED_SOCIETY_API: "society/",

    // Designation API URLS
    ADD_DESIGNATION_API: BaseUrl + "designation/",
    DELETE_DESIGNATION_API: BaseUrl + "designation/",
    UPDATE_DESIGNATION_API: BaseUrl + "designation/",
    GET_ALL_DESIGNATION_API: BaseUrl + "designation/all",
    GET_SELECTED_DESIGNATION_API: BaseUrl + "designation/",

    // Resident user API URLS
    RESIDENT_USER_SIGNUP_API: BaseUrl + "residentialUser/signup",
    RESIDENT_USER_LOGIN_API: BaseUrl + "residentialUser/login",
    RESIDENT_USER_DELETE_API: BaseUrl + "residentialUser/",
    RESIDENT_USER_UPDATE_API: BaseUrl + "residentialUser/",
    GET_ALL_RESIDENT_USER_API: BaseUrl + "residentialUser/all",
    GET_SELECTED_RESIDENT_USER_API: BaseUrl + "residentialUser/",
    RESIDENT_USER_SET_NEW_PASS_API: BaseUrl + "residentialUser/setNewPassword",
    RESIDENT_USER_CHANGE_PASS_API: BaseUrl + "residentialUser/changePassword",
    RESIDENT_USER_SEND_OTP_API: BaseUrl + "residentialUser/sendOtp",
};
