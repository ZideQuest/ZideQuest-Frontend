import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./backend_url";

export async function createQuest(questDetail, locationId) {
  try {
    const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
    console.log(token);
    const { data } = await axios.post(
      `${BASE_URL}/quest/locations/${locationId}`,
      questDetail,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestData(id) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  try {
    const { data } = await axios.get(`${BASE_URL}/quests/${id}/find`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (e) {
    console.error(e);
    return {
      message: "failed to load this Quest",
      status: 400,
    };
  }
}

export async function searchQuest(name) {
  try {
    const { data } = await axios.get(`${BASE_URL}/search`, {
      params: { questName: name },
    });

    return data;
  } catch (e) {
    console.error(e);
    return {
      message: "failed to search Quest",
      status: 400,
    };
  }
}

export async function fetchParticipants(questId) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  try {
    const { data } = await axios.get(
      `${BASE_URL}/quests/${questId}/participants`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data.participant;
  } catch (e) {
    console.error(e);
    return {
      message: "failed to load this Quest",
      status: 400,
    };
  }
}

export async function usersQuest() {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  try {
    const { data } = await axios.get(`${BASE_URL}/users/quest`, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}
