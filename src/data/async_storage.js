import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeHistory = async (value) => {
  try {
    let history = await AsyncStorage.getItem("search-history");
    if (!history) history = [];
    history = JSON.parse(history);

    let new_history;
    if (!history.includes(value)) {
      new_history = JSON.stringify([value, ...history]);
    } else {
      const temp = history.filter(h => h != value);
      new_history = JSON.stringify([value, ...temp])
    }
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
