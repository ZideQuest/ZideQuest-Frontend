import axios from "axios";
import { BASE_URL } from "./backend_url";

export async function getRecQuestData() {
  const { data } = await axios.get(`${BASE_URL}/quests/recommend`);
  return data;
}
