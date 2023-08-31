import axios from "axios";

import * as SecureStore from "expo-secure-store";
const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";


export async function getQuestData(id) {
  
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const {token} = userdetail;
  try {
    const { data } = await axios.get(`${BASE_URL}/quest/find/${id}`,{headers: {
      'Authorization': 'Bearer ' + token,
    }});
    console.log("API Response:", data);
    return data ;
  } catch (e) {
    console.log(e);
    return {
      message: "failed to load this Quest",
      status: 400,
    };
  }
}