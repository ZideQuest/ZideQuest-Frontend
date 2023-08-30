import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../data/AppContext";
import { primaryColor } from "../data/color";
import { searchQuest } from "../data/Quest";
import SearchItem from "./Quest/SearchItem";

export default function SearchBar() {
  const { bottomModalRef } = useAppContext();
  const insets = useSafeAreaInsets();
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [focusing, setFocusing] = useState(false)
  const [searchResult, setSearchResult] = useState(null);

  const searchFetching = async (query) => {
    const data = await searchQuest(query);
    setSearchResult(data);
  };

  const debouncedFetch = useCallback(debounce(searchFetching, 1000), []);

  const handleTextChange = (q) => {
    setSearch(q);
    setSearchResult([])
    debouncedFetch(q);
  };

  const searchHandler = () => {
    bottomModalRef.current?.snapToPosition("100%");
    setSearching(true);
    setFocusing(true)
  };

  const onBlurHandler = () => {
    setFocusing(false)
  };

  const onSubmitHandler = () => {
    setFocusing(false)
    bottomModalRef.current?.snapToIndex(1);
  }

  return (
    <View style={[styles.container, { marginTop: focusing ? insets.top : 0 }]}>
      <View style={styles.serchTextContainer}>
        <TextInput
          style={styles.searchText}
          placeholder="ค้นหาเควส"
          onFocus={searchHandler}
          onBlur={onBlurHandler}
          value={search}
          onChangeText={handleTextChange}
          onSubmitEditing={onSubmitHandler}
        />
        <Pressable style={styles.searchButton} onPress={onSubmitHandler}>
          <Text>Search</Text>
        </Pressable>
      </View>
      {searchResult && search && (
        <View style={styles.searchResultContainer}>
          {searchResult.map((quest) => (
            <SearchItem quest={quest} key={quest._id}/>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
  },
  serchTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchText: {
    backgroundColor: "rgb(244,244,244)",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
  },
  searchResultContainer: {
    marginTop: 20,
  }
});
