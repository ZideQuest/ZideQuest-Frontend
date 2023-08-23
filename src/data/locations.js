import axios from "axios";

const BASE_URL =
  "https://3ae4-2001-fb1-1c-c64-fe34-97ff-fea7-ade2.ngrok-free.app/api";

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
    console.log(e);
    return {
      message: "failed to load this location",
      status: 400,
    };
  }
}
