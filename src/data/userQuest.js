import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {BASE_URL} from "./backend_url"

export async function userQuest() {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  //const { token } = userdetail;
  const  token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZWNkMGQwNzE5YTkxMGUyMzc5OTFjOCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjkzODQ5NTM5LCJleHAiOjE2OTQ0NTQzMzl9.RVULeb0GJXe_3M7zuP6WMDc7z1EVaZbn99tnccv9k4a8K0OfbbtacC1Ij8tzKE0-9GH1xy-aHhMTUkf4M99mlSdPYjxl17nuQSyqcP-nxVykTe3JOS9tkG0-a7JjiEdzgHQkeFYOXdTgcM7txrzRq98qYNbXGteji5_3D1Jkee_DhcvkWz5p7w335Y2aiJAeIwP6mbEp-QGF_RU9sRCToKaw05CBVT_-s6XXy1KeOZGQih3fy1e_eUhxQmjp41brTGDoN68yczqBAlpoU_Y1LpufT2d9jKRgndUSaKpejwVc5BZRXZOrMiSqnwa76e3L4RDULMBkZFLCsnoJBqYkug"
  try {
    const {data} = await axios.get(
      `${BASE_URL}/user/quest`,
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