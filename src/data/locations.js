import axios from "axios";
import * as SecureStore from "expo-secure-store";
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

export const createLocation = async (data) => {
  try {
    const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
    const { token } = userdetail;
    const res = await axios.post(`${BASE_URL}/location`, data, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    if (error.response) {
      console.error(
        error?.response?.data,
        error?.response?.status,
        error?.response?.headers
      );
    } else if (error.request) {
    }
    return error;
  }
};

export const getCenterFromPins = (locations) => {
  if (locations.length == 0) {
    return;
  } else if (locations.length == 1) {
    return locations[0];
  }

  let minX;
  let minY;
  let maxX;
  let maxY;

  locations.forEach((location) => {
    if (!minX || minX > location.latitude) {
      minX = location.latitude;
    }

    if (!maxX || maxX < location.latitude) {
      maxX = location.latitude;
    }

    if (!minY || minY > location.longitude) {
      minY = location.longitude;
    }

    if (!maxY || maxY < location.longitude) {
      maxY = location.longitude;
    }
  });

  const latitude = (maxX + minX) / 2;
  const longitude = (maxY + minY) / 2;
  const latitudeDelta = (maxX - minX) / 2 + 0.005;
  const longitudeDelta = (maxY - minY) / 2 + 0.005;

  return { latitude, longitude, latitudeDelta, longitudeDelta };
};
