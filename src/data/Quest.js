import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./backend_url";

export async function createQuest(questDetail, locationId) {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { data } = await axios.post(
    `${BASE_URL}/quests/locations/${locationId}`,
    questDetail,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}

export async function getQuestData(id) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  const { data } = await axios.get(`${BASE_URL}/quests/${id}/find`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return data;
}

export async function searchQuest(
  name,
  selectedTag,
  startDate,
  endDate,
  useStartDate,
  useEndDate,
  activityHour
) {
  const params = {};
  if (name) {
    params.Name = name;
  }
  if (selectedTag) {
    params.tagId = selectedTag.map((tag) => tag._id);
  }
  if (useStartDate) {
    params.timeStart = startDate;
  }
  if (useEndDate) {
    params.timeEnd = endDate;
  }
  if (activityHour != 0) {
    params.activityCat = activityHour;
  }

  const { data } = await axios.get(`${BASE_URL}/search`, {
    params,
  });

  return data;
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

export async function creatorCancelQuest(questId, reason) {
  try {
    const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));    
    const { token } = userdetail;
    const response = await axios.patch(
      `${BASE_URL}/quests/${questId}/cancel`,
      { message: reason },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error in creatorCancelQuest:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
}

export async function usersQuest() {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  try {
    const { data } = await axios.get(`${BASE_URL}/users/quests`, {
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

export async function sendQuestComplete(id) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  const { data } = await axios.patch(
    `${BASE_URL}/quests/${id}/complete`,
    {},
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  return data;
}

export async function editQuest(questDetail, questId) {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { data } = await axios.put(
    `${BASE_URL}/quests/${questId}`,
    questDetail,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
}


export async function deleteQuest(questId) {
  try {
    const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
    const { data } = await axios.delete(`${BASE_URL}/quests/${questId}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getActiveQuests() {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { data } = await axios.get(`${BASE_URL}/quests/creator-uncomplete`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function getCratorQuests() {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  const { data } = await axios.get(`${BASE_URL}/quests/creator-all`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function getQRCode(questId) {
  const userdetail = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const { token } = userdetail;
  const { data } = await axios.get(`${BASE_URL}/quests/${questId}/qr`, {
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  return data;
}

export async function checkUser(questId, payload) {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const requestData = {
    users: payload,
  };
  const { data } = await axios.patch(
    `${BASE_URL}/quests/${questId}/check-user`,
    requestData,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}

export async function unCheckUser(questId, payload) {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const requestData = {
    users: payload,
  };
  const { data } = await axios.patch(
    `${BASE_URL}/quests/${questId}/uncheck-user`,
    requestData,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}

export async function removeUser(questId, payload) {
  const { token } = JSON.parse(await SecureStore.getItemAsync("userDetail"));
  const requestData = {
    users: payload,
  };
  const { data } = await axios.patch(
    `${BASE_URL}/quests/${questId}/remove-user`,
    requestData,
    {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    }
  );

  return data;
}
