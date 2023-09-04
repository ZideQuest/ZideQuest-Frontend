import axios from "axios";

import {BASE_URL} from "./backend_url"

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
