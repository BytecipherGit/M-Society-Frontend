import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { authActions, superAdminActions } from "./action-types";

export const generateNewToken = () => {
  return async (dispatch) => {
    const params = {
      email: localStorage.getItem("email"),
      token: localStorage.getItem("refreshToken"),
    };

    const response = await Instance(
      "POST",
      ApiUrl.AUTH_SUPER_ADMIN_GENERATE_NEW_TOKEN_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      // set New Tokens
      localStorage.setItem("accessToken", response?.data?.accessToken);
      localStorage.setItem("refreshToken", response?.data?.refreshToken);
      // dispatch({
      //   type: authActions.AUTH_LOGIN,
      //   payload: response?.data,
      // });
      return response;
    } else {
      dispatch({
        type: authActions.RESET_STATE,
        payload: {},
      });
    }
  };
};

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
          otp: response?.data?.data?.otp,
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
      return response;
    } else if (response?.response?.status === 403) {
      return response.response;
    } else if (response?.response?.status === 500) {
      return response.response;
    } else if (
      response?.response?.status === 404 ||
      response?.response?.status === 401 ||
      response?.response?.status === 400
    ) {
      return response.response;
    }
    return response;
  };
};

// Get all Society list
export const getAllSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.SUPER_ADMIN_GET_ALL_SOCIETY +
        "?page=" +
        params +
        "&limit=" +
        process.env.REACT_APP_PER_PAGE_LIMIT
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.GET_ALL_SOCIETY,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Get all Society list by search
export const getSearchSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.SUPER_ADMIN_GET_SEARCH_SOCIETY + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.GET_SEARCH_SOCIETY,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Add Society
export const doSocietyAdd = (params) => {
  return async (dispatch) => {
    const response = await Instance("POST", ApiUrl.ADD_SOCIETY_API, params);
    if (response?.status === 200 && response?.data?.success) {
      return response;
    } else if (response?.status === 200 && !response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
// get selected Society
export const getSelectedSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_SOCIETY_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.SUPER_ADMIN_VIEW_SOCIETY,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Update selected Society
export const updateSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance("PUT", ApiUrl.UPDATE_SOCIETY_API, params);
    if (response?.status === 200 && response?.data?.success) {
      // dispatch({
      //   type: superAdminActions.SUPER_ADMIN_ADD_SOCIETY,
      //   payload: {},
      // });
      return response;
    }
    return response.response;
  };
};

// Delete selected Society
export const deleteSociety = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "DELETE",
      ApiUrl.DELETE_SOCIETY_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      // dispatch({
      //   type: superAdminActions.SUPER_ADMIN_ADD_SOCIETY,
      //   payload: {},
      // });
      return response;
    }
    return response.response;
  };
};
// Add Designation
export const addDesignation = (params) => {
  return async (dispatch) => {
    const response = await Instance("POST", ApiUrl.ADD_DESIGNATION_API, params);
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
// Get all Designation list
export const getAllDesignation = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_ALL_DESIGNATION_API +
        "?page=" +
        params +
        "&limit=" +
        process.env.REACT_APP_PER_PAGE_LIMIT
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.GET_ALL_DESIGNATION,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Search Designation API
export const getSearchDesignation = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SEARCH_DESIGNATION_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.GET_ALL_DESIGNATION,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// get selected Designation
export const getSelectedDesignation = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_DESIGNATION_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: superAdminActions.SUPER_ADMIN_VIEW_DESIGNATION,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Update selected Designation
export const updateDesignation = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "PUT",
      ApiUrl.UPDATE_DESIGNATION_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Delete selected Designation
export const deleteDesignation = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "DELETE",
      ApiUrl.DELETE_DESIGNATION_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
