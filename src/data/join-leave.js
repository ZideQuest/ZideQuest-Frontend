import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {BASE_URL} from "./backend_url"


export async function join_leave(id) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  
  try {
    const response = await axios.patch(
      `${BASE_URL}/quest/join-leave/${id}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}