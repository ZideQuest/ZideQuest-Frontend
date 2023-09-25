import axios from "axios";
import { BASE_URL } from "./backend_url";

export async function getCreatorData(id) {
  const { data } = await axios.get(`${BASE_URL}/creators/${id}`);
  return data;
}
