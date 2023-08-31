import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {BASE_URL} from "./backend_url"

export async function userQuest() {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  
  try {
    const {data} = await axios.get(
      `${BASE_URL}/user/quest/64ecd0d0719a910e237991c8`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
    
  } catch (error) {
    console.error(error);
    return false;
  }
}