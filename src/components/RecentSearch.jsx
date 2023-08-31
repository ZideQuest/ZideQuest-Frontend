import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";

import { loadHistory, clearHistory } from "../data/async_storage";

export default function RecentSearch() {
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
    setHistory([])
  }

  return (
    <View>
      <Button title="clear" onPress={clearHistory} />
      {history.length != 0 ? (
        history.map((h, i) => (
          <View key={`history-${i}`}>
            <Text>{h}</Text>
          </View>
        ))
      ) : (
        <Text>No recent search history</Text>
      )}
    </View>
  );
}
