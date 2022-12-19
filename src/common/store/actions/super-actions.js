import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { superAdminActions } from "./action-types";

export const doAuthSuperSendOtp = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.AUTH_SUPER_ADMIN_SEND_OTP_API,
      params
    );

    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.SUPER_ADMIN_SEND_OTP,
        payload: {
          email: params.email,
          otp: response?.data?.data?.OTP,
        },
      });
      return response;
    } else if (response?.response?.status === 500) {
      return response.response;
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
  };
};

export const doAuthSuperSetNewPassword = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.AUTH_SUPER_ADMIN_SET_NEW_PASS_API,
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
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
  };
};

export const doAuthSuperChangePassword = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.AUTH_SUPER_ADMIN_CHANGE_PASS_API,
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
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
  };
};

// Get all Society list
export const getAllSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.SUPER_ADMIN_GET_ALL_SOCIETY,
      params
    );
    console.log("socity data", response);

    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.GET_ALL_SOCIETY,
        payload: response?.data,
      });
      return response;
    } else if (response?.response?.status === 500) {
      return response.response;
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
  };
};

// Add Society
export const doSocietyAdd = (params) => {
  return async (dispatch) => {
    const response = Instance("POST", ApiUrl.ADD_SOCIETY_API, params);
    if (response?.status === 200 && response?.data?.success) {
      // dispatch({
      //   type: superAdminActions.SUPER_ADMIN_ADD_SOCIETY,
      //   payload: {},
      // });
      return response;
    } else if (response?.response?.status === 500) {
      return response.response;
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
  };
};
// Add Society
export const getSelectedSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_SOCIETY_API + params._id
    );

    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.SUPER_ADMIN_VIEW_SOCIETY,
        payload: response?.data,
      });
      return response;
    } else if (response?.response?.status === 500) {
      return response.response;
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
  };
};
