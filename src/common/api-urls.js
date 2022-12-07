const BaseUrl = process.env.REACT_APP_BASE_URL;

export const ApiUrl = {
    //Auth Super Admin API URL
    AUTH_SUPER_ADMIN_LOGIN_API: BaseUrl + "superAdmin/login",
    AUTH_SUPER_ADMIN_FORGET_PASS_API: BaseUrl + "superAdmin/forgetPassword",
    AUTH_SUPER_ADMIN_CHANGE_PASS_API: BaseUrl + "superAdmin/changePassword",

};
