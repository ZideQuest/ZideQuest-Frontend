import axios from "axios";

const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";

export async function getCreatorData(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/creator/${id}`);
    return data;
  } catch (e) {
    console.log(e);
    return {
      message: "failed to load this creator",
      status: 400,
    };
  }
}