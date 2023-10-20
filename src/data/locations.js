import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./backend_url";

export async function fetchLocations() {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  let data = {};
  if (userdetail) {
    const response = await axios.get(`${BASE_URL}/locations`, {
      headers: {
        Authorization: "Bearer " + userdetail.token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    data = response.data;
  } else {
    const response = await axios.get(`${BASE_URL}/locations`);
    data = response.data;
  }
  // console.log(data)
  return data;
}

export async function getLocationData(id) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));

  let locationsData;
  if (userdetail) {
    const { data } = await axios.get(`${BASE_URL}/locations/${id}`, {
      headers: {
        Authorization: "Bearer " + userdetail.token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    locationsData = data;
  } else {
    const { data } = await axios.get(`${BASE_URL}/locations/${id}`);
    locationsData = data;
  }

  const location = locationsData.location;
  const quests = locationsData.quests;
  return { location, quests };
}

export const createLocation = async (data) => {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  const res = await axios.post(`${BASE_URL}/locations`, data, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
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

export const editLocation = async (data, id) => {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;

  return await axios.put(`${BASE_URL}/locations/${id}`, data, {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteLocation = async (id) => {
  try {
    const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
    const { token } = userdetail;

    const res = await axios.delete(`${BASE_URL}/locations/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (error) {
    console.error(error);
  }
};
