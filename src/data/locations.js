import axios from "axios";
import { BASE_URL } from "./backend_url";

export async function fetchLocations() {
  try {
    const { data } = await axios.get(`${BASE_URL}/location`);
    return data;
  } catch (e) {
    return {
      message: "failed to load locations",
      status: 401,
    };
  }
}

export async function getLocationData(id) {
  try {
    const { data } = await axios.get(`${BASE_URL}/location/${id}`);
    const location = data.location;
    const quests = data.quests;

    return { location, quests };
  } catch (e) {
    console.error(e);
    return {
      message: "failed to load this location",
      status: 400,
    };
  }
}

export const createLocation = async ({ method, url, data, headers }) => {
  try {
    const res = await axios({
      method,
      url,
      data,
      headers,
    });
    return res;
  } catch (error) {
    if (error.response) {
      console.log(error?.response?.data);
      console.log(error?.response?.status);
      console.log(error?.response?.headers);
    } else if (error.request) {
    }
    return error;
  }
};
