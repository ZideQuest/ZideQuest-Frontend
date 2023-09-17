import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./backend_url";

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

export async function fetchUserData() {
  const user = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  if (!user || !user.token) {
    return {};
  }
  
  const { data } = await axios.get(`${BASE_URL}/users/info`, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
  return data;
}
