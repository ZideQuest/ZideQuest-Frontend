import axios from "axios";

const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api/v1";
//3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api-docs/v1/

export async function getRecQuestData() {
  try {
    const { data } = await axios.get(`${BASE_URL}/quests/recommend`);
    return data;
  } catch (e) {
    console.error("Error:", e);
    return {
      message: "failed to get recommened quest",
      status: 400,
    };
  }
}
