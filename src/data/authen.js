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
  const userDetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  if (!userDetail || !userDetail.token) {
    return {};
  }

  const { data } = await axios.get(`${BASE_URL}/users/info`, {
    headers: {
      Authorization: "Bearer " + userDetail.token,
    },
  });

  return {
      token: userDetail.token,
      user: data,
      isAdmin: data.role,
    };
}

export async function userCheckin(questId) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;

  const { data } = await axios.patch(
    `${BASE_URL}/quests/${questId}/attend`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}

export const deleteUserNotification = async (id) => {
  try {
    const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
    const { token } = userdetail;
    // console.log("this is id that send", id);

    const res = await axios.delete(`${BASE_URL}/users/notification/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};
