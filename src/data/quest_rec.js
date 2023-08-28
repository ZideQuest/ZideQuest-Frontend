import axios from "axios";

const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";

export async function getRecQuestData() {
  try {
    const { data } = await axios.post(`${BASE_URL}/quest/recommend`);
    return data;
  } catch (e) {
    return {
      message: "failed to get recommened quest",
      status: 400,
    };
  }
}
