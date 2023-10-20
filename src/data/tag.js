import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./backend_url";

export async function getTags() {
  const { data } = await axios.get(`${BASE_URL}/tags`);
  return data;
}

export async function createTag(tagDetail) {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { data } = await axios.post(`${BASE_URL}/tags`, tagDetail, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return data;
}
