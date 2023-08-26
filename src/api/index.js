import axios from "axios";

export const API = async (method, url, data, header) => {
  try {
    const response = await axios({
      method,
      url:
        "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api" +
        url,
      data,
      header,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
