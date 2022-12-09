import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";

export const doSocietyAdd = (params) => {
    return async (dispatch) => {
        const response = Instance(
            "POST",
            ApiUrl.ADD_SOCIETY_API,
            params
        );
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