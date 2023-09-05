import axios from "axios";

export const requestAPI = async ({ method, url, data, headers }) => {
  try {
    const res = await axios({
      method,
      url,
      data,
      headers,
    });
    return res;
  } catch (error) {
    if (error.response) {
      console.log(error?.response?.data);
      console.log(error?.response?.status);
      console.log(error?.response?.headers);
    } else if (error.request) {
    }
    return error;
  }
};
