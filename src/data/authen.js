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

  console.log('data fetched');

  try {
    const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
    const { data } = await axios.get(
      `${BASE_URL}/user/info`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data
  } catch (error) {
    console.error("error fetching user data:", error);
    return {}
  }
}
