import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { authActions } from "./action-types";

export const doAuthLogin = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.AUTH_SUPER_ADMIN_LOGIN_API,
      params
    );
    console.log(response);
    if (response?.status === 200 && response?.data?.success) {
      // set Tokens
      localStorage.setItem("accessToken", response?.data?.accessToken);
      localStorage.setItem("refreshToken", response?.data?.refreshToken);
      localStorage.setItem("user", JSON.stringify(response?.data?.data));
      dispatch({
        type: authActions.AUTH_LOGIN,
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

export const doAuthLogout = (params) => {
  return async (dispatch) => {
    const refresh_token = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("accessToken");
    params = { refresh_token, token };
    const response = await Instance(
      "DELETE",
      ApiUrl.AUTH_SUPER_ADMIN_LOGOUT_API,
      params
    );
    console.log("logout api rresponse >>>", response);
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: authActions.RESET_STATE,
        payload: {},
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

    // return dispatch({
    //   type: authActions.RESET_STATE,
    //   message: "Logged out successfully",
    // });
  };
};