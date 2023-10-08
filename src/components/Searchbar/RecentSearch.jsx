import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from "react-native";

import { loadHistory, clearHistory } from "../../data/async_storage";
import { textColor } from "../../data/color";

import search_icon from "../../../assets/images/search.png";

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
        {history.length != 0 && (
          <TouchableOpacity onPress={clearHandler}>
            <Text
              style={{
                fontFamily: "Kanit300",
                fontSize: 18,
                color: "rgb(0, 122, 255)",
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {history.length != 0 ? (
        history.map((h, i) => (
          <TouchableHighlight
            underlayColor="#DDDDDD"
            key={`history-${i}`}
            onPress={() => recentPressHandler(h)}
            style={styles.recentItem}
          >
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={styles.searchIconContainer}>
                <Image source={search_icon} style={styles.searchIconImage} />
              </View>
              <Text style={styles.recentText}>{h}</Text>
            </View>
          </TouchableHighlight>
        ))
      ) : (
        <Text style={styles.noRecent}>No recent search history...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  recentContainer: {
    paddingTop: 5,
    paddingHorizontal: 15,
    backgroundColor: "white",
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
    fontFamily: "Kanit500",
    fontSize: 17,
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
    fontFamily: "Kanit300",
    color: textColor,
  },
  noRecent: {
    color: textColor,
    margin: 10,
    fontSize: 15,
    fontFamily: "Kanit300"
  },
});
