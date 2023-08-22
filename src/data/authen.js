import axios from "axios";

const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";

export async function sendLoginData(username, password) {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return data;
    
  } catch (e) {
    return {
      message: "failed to login",
      status: 401,
    };
  }
}
