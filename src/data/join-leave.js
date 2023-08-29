import axios from "axios";
import * as SecureStore from "expo-secure-store";
const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";


export async function join_leave(id) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  // console.log(token);
  
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
    // console.log("API Response:", response.data);
  } catch (error) {
    console.log(error);
    return false;
  }
}