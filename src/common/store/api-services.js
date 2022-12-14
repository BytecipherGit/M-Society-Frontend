import axios from "axios";

export const Instance = async (method, URL, params, file) => {
  let headers = {};
  const loginUserToken = localStorage.getItem("accessToken");
  headers = {
    Authorization: "Bearer " + loginUserToken,
  };
  if (method === "GET") {
    var getConfig = {
      method: method,
      url: URL,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios(getConfig);
      return response;
    } catch (err) {
      return err;
    }
  } else if (method === "PUT" && file === "file") {
    var updateConfig = {
      method: method,
      url: URL,
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
      data: params,
    };

    try {
      const response = await axios(updateConfig);
      return response;
    } catch (err) {
      return err;
    }
  } else if (method === "PUT") {
    const updateData = JSON.stringify(params);
    const updateConfig = {
      method: method,
      url: URL,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data: updateData,
    };

    try {
      const response = await axios(updateConfig);
      return response;
    } catch (err) {
      return err;
    }
  } else if (method === "DELETE") {
    var deleteData = JSON.stringify(params);
    var deleteConfig = {
      method: method,
      url: URL,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data: deleteData,
    };

    try {
      const response = await axios(deleteConfig);
      return response;
    } catch (err) {
      return err;
    }
  } else if (method === "POST" && file === "file") {
    const postConfig = {
      method: method,
      url: URL,
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
      data: params,
    };

    try {
      const response = await axios(postConfig);
      return response;
    } catch (err) {
      return err;
    }
  } else {
    const postData = JSON.stringify(params);

    const postConfig = {
      method: method,
      url: URL,
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      data: postData,
    };

    try {
      const response = await axios(postConfig);
      return response;
    } catch (err) {
      return err;
    }
  }
};
