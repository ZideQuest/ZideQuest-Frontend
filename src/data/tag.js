import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./backend_url";

export async function getTags() {
  const { data } = await axios.get(`${BASE_URL}/tags`);
  return data;
}
