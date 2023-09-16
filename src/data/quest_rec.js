import axios from "axios";
import { BASE_URL } from "./backend_url";

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
