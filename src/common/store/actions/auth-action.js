import storage from "redux-persist/lib/storage";
import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { authActions, societyAdminActions } from "./action-types";

export const doAuthLogin = (params) => {
  const url =
    window.location.pathname === "/"
      ? ApiUrl.AUTH_SUPER_ADMIN_LOGIN_API
      : ApiUrl.SOCIETY_ADMIN_LOGIN_API;
  return async (dispatch) => {
    const response = await Instance("POST", url, params);
    if (response?.status === 200 && response?.data?.success) {
      // set Tokens
      localStorage.setItem("accessToken", response?.data?.accessToken);
      localStorage.setItem("refreshToken", response?.data?.refreshToken);
      response?.data?.data?.email &&
        localStorage.setItem("email", response?.data?.data?.email);
      response?.data?.data?.phoneNumber &&
        localStorage.setItem("phoneNumber", response?.data?.data?.phoneNumber);
      response?.data?.data?.isAdmin === "1"
        ? localStorage.setItem("isSocietyAdmin", response?.data?.data?.isAdmin)
        : localStorage.setItem("isSocietyAdmin", "0");

      dispatch({
        type: authActions.AUTH_LOGIN,
        payload: response?.data,
      });
      if (response?.data?.data?.isAdmin === "1") {
        dispatch({
          type: societyAdminActions.GET_SOCIETY_ADMIN_PROFILE,
          payload: response?.data?.data,
        });
      }
      return response;
    } else if (response?.status === 200 && !response?.data?.success) {
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
    return response.response;
  };
};

export const doAuthLogout = (params) => {
  return async (dispatch) => {
    const refresh_token = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("accessToken");
    const isSocietyAdmin = localStorage.getItem("isSocietyAdmin");
    const URL =
      isSocietyAdmin === "1"
        ? ApiUrl.SOCIETY_ADMIN_LOGOUT_API
        : ApiUrl.AUTH_SUPER_ADMIN_LOGOUT_API;
    params = { refresh_token, token };
    const response = await Instance("DELETE", URL, params);

    if (response?.status === 200 && response?.data?.success) {
      storage?.localStorage?.clear();
      localStorage?.clear();
      dispatch({
        type: authActions.RESET_STATE,
        payload: {},
      });

      return response;
    } else if (response?.response?.status === 403) {
      storage?.localStorage?.clear();
      localStorage?.clear();
      dispatch({
        type: authActions.RESET_STATE,
        payload: {},
      });
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
