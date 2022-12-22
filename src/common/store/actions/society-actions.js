import { Instance } from "../api-services";
import { ApiUrl } from "../api-urls";
import { societyAdminActions, superAdminActions } from "./action-types";

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
