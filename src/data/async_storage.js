import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeHistory = async (value) => {
  console.log("store triggered");

  try {
    let history = await AsyncStorage.getItem("search-history");
    if (!history) history = [];
    history = JSON.parse(history);

    console.log("storing : ", [value, ...history]);

    const new_history = JSON.stringify([value, ...history]);
    await AsyncStorage.setItem("search-history", new_history);
  } catch (e) {
    console.error("error storing history", e);
  }
};
export const loadHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("search-history");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("error loading history", e);
    return [];
  }
};

export const clearHistory = async () => {
  try {
    const no_history = JSON.stringify([]);
    await AsyncStorage.setItem("search-history", no_history);
  } catch (e) {
    console.error("error storing history", e);
  }
};
