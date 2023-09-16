import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Button, Image } from "react-native";

import { loadHistory, clearHistory } from "../data/async_storage";
import { textColor } from "../data/color";

import search_icon from "../../assets/images/search.png";

export default function RecentSearch({ handleTextChange }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await loadHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  const clearHandler = () => {
    clearHistory();
    setHistory([]);
  };

  const recentPressHandler = (h) => {
    handleTextChange(h);
  };

  return (
    <View style={styles.recentContainer}>
      <View style={styles.recentHeaderContainer}>
        <Text style={styles.recentHeaderText}>Recents</Text>
        {history.length != 0 && <Button title="clear" onPress={clearHandler} />}
      </View>
      {history.length != 0 ? (
        history.map((h, i) => (
          <Pressable
            key={`history-${i}`}
            onPress={() => recentPressHandler(h)}
            style={styles.recentItem}
          >
            <View style={styles.searchIconContainer}>
              <Image source={search_icon} style={styles.searchIconImage} />
            </View>
            <Text style={styles.recentText}>{h}</Text>
          </Pressable>
        ))
      ) : (
        <Text style={styles.noRecent}>No recent search history...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  recentContainer: {
    paddingHorizontal: 15,
    backgroundColor: "white"
  },
  recentHeaderContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    borderColor: "grey",
  },
  recentHeaderText: {
    fontWeight: 700,
    fontSize: 16,
    color: textColor,
  },
  searchIconContainer: {
    width: 20,
    height: 20,
  },
  searchIconImage: {
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  recentItem: {
    flexDirection: "row",
    gap: 10,
    padding: 5,
    width: "100%",
    alignItems: "center",
  },
  recentText: {
    fontSize: 15,
    fontWeight: 500,
    color: textColor,
  },
  noRecent: {
    color: textColor,
    margin: 10,
  },
});
