import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { residentialUserActions } from "./action-types";

export const doAuthResidentSendOtp = (params) => {
    return async (dispatch) => {
        const response = await Instance(
            "POST",
            ApiUrl.RESIDENT_USER_SEND_OTP_API,
            params
        );

        if (response?.status === 200 && response?.data?.success) {
            dispatch({
                type: residentialUserActions.RESIDENT_SEND_OTP,
                payload: {
                    email: params.email,
                    otp: response?.data?.data?.OTP
                },
            });
            return response;
        } else if (response?.response?.status === 500) {

            return response.response;
        } else if (response?.response?.status === 404 || response?.response?.status === 401 || response?.response?.status === 400) {
            return response.response;
        }


    };
}

export const doAuthResidentSetNewPassword = (params) => {
    return async (dispatch) => {
        const response = await Instance(
            "POST",
            ApiUrl.RESIDENT_USER_SET_NEW_PASS_API,
            params
        );
        // console.log(params);

        if (response?.status === 200 && response?.data?.success) {

            // dispatch({
            //     type: superAdminActions.SUPER_ADMIN_SEND_OTP,
            //     payload: {
            //         email: params.email,
            //         otp: response?.data?.data?.OTP
            //     },
            // });
            return response;
        } else if (response?.response?.status === 500) {
            return response.response;
        } else if (response?.response?.status === 404 || response?.response?.status === 401 || response?.response?.status === 400) {
            return response.response;
        }

    };
}
