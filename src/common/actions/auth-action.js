import { Instance } from "../api-services"
import { ApiUrl } from "../api-urls"
import { authActions } from "./action-types";

export const doAuthLogin = (params) => {
    return async (dispatch) => {
        const response = Instance(
            "POST",
            ApiUrl.AUTH_SUPER_ADMIN_LOGIN_API,
            params
        );
        // console.log(params);
        if (response?.status === 200 && response?.data?.success) {
            // console.log(response.data);
            if (!response?.data?.success) {
                alert(response?.data?.message);
            }
            // alert(response.data.message);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            // return response?.data;
        } else if (response?.response?.status === 500) {
            // console.log(response.response.data.message);
        } else if (response?.response?.status === 404 || response?.response?.status === 401 || response?.response?.status === 400) {
            // console.log(response.response.data.message);
            alert(response?.response?.data?.message);
        }
        return dispatch({
            type: authActions.AUTH_LOGIN,
            payload: response?.data,
        });
    };
}

export const doAuthForgetPassword = (params) => {
    return async (dispatch) => {
        const response = Instance(
            "POST",
            ApiUrl.AUTH_SUPER_ADMIN_FORGET_PASS_API,
            params
        );
        // console.log(params);
        if (response?.status === 200 && response?.data?.success) {
            // console.log(response.data);
            if (!response?.data?.success) {
                alert(response?.data?.message);
            }
            // alert(response.data.message);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            // return response?.data;
        } else if (response?.response?.status === 500) {
            // console.log(response.response.data.message);
        } else if (response?.response?.status === 404 || response?.response?.status === 401 || response?.response?.status === 400) {
            // console.log(response.response.data.message);
            alert(response?.response?.data?.message);
        }
        // return dispatch({
        //     type: authActions.AUTH_LOGIN,
        //     payload: response?.data,
        // });
        return response;
    };
}
export const doAuthChangePassword = (params) => {
    return async (dispatch) => {
        const response = Instance(
            "POST",
            ApiUrl.AUTH_SUPER_ADMIN_FORGET_PASS_API,
            params
        );
        // console.log(params);
        if (response?.status === 200 && response?.data?.success) {
            // console.log(response.data);
            if (!response?.data?.success) {
                alert(response?.data?.message);
            }
            // alert(response.data.message);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            // return response?.data;
        } else if (response?.response?.status === 500) {
            // console.log(response.response.data.message);
        } else if (response?.response?.status === 404 || response?.response?.status === 401 || response?.response?.status === 400) {
            // console.log(response.response.data.message);
            alert(response?.response?.data?.message);
        }
        // return dispatch({
        //     type: authActions.AUTH_LOGIN,
        //     payload: response?.data,
        // });
        return response;
    };
}