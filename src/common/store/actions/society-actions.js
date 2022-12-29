import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { authActions, societyAdminActions } from "./action-types";

export const generateNewToken = () => {
  return async (dispatch) => {
    const params = {
      phoneNumber: localStorage.getItem("phoneNumber"),
      token: localStorage.getItem("refreshToken"),
    };

    const response = await Instance(
      "POST",
      ApiUrl.AUTH_SOCIETY_ADMIN_GENERATE_NEW_TOKEN_API,
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

// Otp verification in forgot password
export const doAuthSocietySendOtp = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.RESIDENT_USER_SEND_OTP_API,
      params
    );

    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.SOCIETY_ADMIN_SEND_OTP,
        payload: {
          phoneNumber: params.phoneNumber,
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
// Forgot Password Society Admin
export const doAuthSocietySetNewPassword = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.RESIDENT_USER_SET_NEW_PASS_API,
      params
    );

    if (response?.status === 200 && response?.data?.success) {
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

// Change Password logged in society Admin
export const doAuthSocietyChangePassword = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.RESIDENT_USER_CHANGE_PASS_API,
      params
    );

    if (response?.status === 200 && response?.data?.success) {
      return response;
    } else if (response?.status === 200 && !response?.data?.success) {
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
    return response.response;
  };
};

// get logged in admin profile
export const getSocietyAdminProfile = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_RESIDENT_USER_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_SOCIETY_ADMIN_PROFILE,
        payload: response?.data?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Update Admin Profile
export const updateSocietyAdminProfile = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "PUT",
      ApiUrl.RESIDENT_USER_UPDATE_API,
      params,
      "file"
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Add Notice
export const addNotice = (params) => {
  return async (dispatch) => {
    const response = await Instance("POST", ApiUrl.ADD_NOTICE_API, params);
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
// Get all Notice list
export const getAllNotice = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_ALL_NOTICE_API + "?page=" + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_NOTICE,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Search Notice API
export const getSearchNotice = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SEARCH_NOTICE_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_NOTICE,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// get selected Notice
export const getSelectedNotice = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_NOTICE_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_SELECTED_NOTICE,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Update selected Notice
export const updateNotice = (params) => {
  return async (dispatch) => {
    const response = await Instance("PUT", ApiUrl.UPDATE_NOTICE_API, params);
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Delete selected Notice
export const deleteNotice = (params) => {
  return async (dispatch) => {
    const response = await Instance("DELETE", ApiUrl.DELETE_NOTICE_API, params);
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Add Phone Directory
export const addPhoneDirectory = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.ADD_PHONE_DIRECTORY_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
// Get all Phone Directory list
export const getAllPhoneDirectory = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_ALL_PHONE_DIRECTORY_API + "?page=" + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_PHONE_DIRECTORY,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Search Phone Directory API
export const getSearchPhoneDirectory = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SEARCH_PHONE_DIRECTORY_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_PHONE_DIRECTORY,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// get selected Phone Directory
export const getSelectedPhoneDirectory = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_PHONE_DIRECTORY_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_SELECTED_PHONE_DIRECTORY,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Update selected Phone Directory
export const updatePhoneDirectory = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "PUT",
      ApiUrl.UPDATE_PHONE_DIRECTORY_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Delete selected Phone Directory
export const deletePhoneDirectory = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "DELETE",
      ApiUrl.DELETE_PHONE_DIRECTORY_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Get all Complaint list
export const getAllComplaint = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_ALL_COMPLAINT_API + "?page=" + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_COMPLAINT,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Search Complaint API
export const getSearchComplaint = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SEARCH_COMPLAINT_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_COMPLAINT,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// get selected Complaint
export const getSelectedComplaint = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_COMPLAINT_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_SELECTED_COMPLAINT,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Update selected Complaint
export const updateComplaint = (params) => {
  return async (dispatch) => {
    const response = await Instance("PUT", ApiUrl.UPDATE_COMPLAINT_API, params);
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Delete selected Complaint
export const deleteComplaint = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "DELETE",
      ApiUrl.DELETE_COMPLAINT_API,
      params
    );

    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Get all Residential User list
export const getAllResidentialUser = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_ALL_RESIDENT_USER_API + "?page=" + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_RESIDENTIAL_USER,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Search Residential User API
export const getSearchResidentialUser = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SEARCH_RESIDENT_USER_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_RESIDENTIAL_USER,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// get selected Residential User
export const getSelectedResidentialUser = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_RESIDENT_USER_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_SELECTED_RESIDENTIAL_USER,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Update selected Residential User
export const updateResidentialUser = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "PUT",
      ApiUrl.RESIDENT_USER_UPDATE_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Delete selected Residential User
export const deleteResidentialUser = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "DELETE",
      ApiUrl.RESIDENT_USER_DELETE_API,
      params
    );

    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Add Document
export const addDocument = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "POST",
      ApiUrl.ADD_DOCUMENT_API,
      params,
      "file"
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
// Get all Document list
export const getAllDocument = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_ALL_DOCUMENT_API + "?page=" + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_DOCUMENT,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// Search Document API
export const getSearchDocument = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SEARCH_DOCUMENT_API + params
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_ALL_DOCUMENT,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};

// get selected Document
export const getSelectedDocument = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "GET",
      ApiUrl.GET_SELECTED_DOCUMENT_API + "/" + params._id
    );
    if (response?.status === 200 && response?.data?.success) {
      dispatch({
        type: societyAdminActions.GET_SELECTED_DOCUMENT,
        payload: response?.data,
      });
      return response;
    }
    return response.response;
  };
};
// Update selected Document
export const updateDocument = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "PUT",
      ApiUrl.UPDATE_DOCUMENT_API,
      params,
      "file"
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};

// Delete selected Document
export const deleteDocument = (params) => {
  return async (dispatch) => {
    const response = await Instance(
      "DELETE",
      ApiUrl.DELETE_DOCUMENT_API,
      params
    );
    if (response?.status === 200 && response?.data?.success) {
      return response;
    }
    return response.response;
  };
};
