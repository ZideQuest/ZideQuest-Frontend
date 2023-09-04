import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Button,
  Image,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppContext } from "../data/AppContext";
import { primaryColor } from "../data/color";
import { searchQuest } from "../data/Quest";
import SearchItem from "./Quest/SearchItem";
import RecentSearch from "./RecentSearch";
import * as TabNavigation from "../data/TabNavigation";
import LocationSearchItem from "./Location/LocationSearchItem"

import { storeHistory } from "../data/async_storage";
import search_icon from "../../assets/images/search.png";

export default function SearchBar() {
  const { bottomModalRef, userDetail } = useAppContext();
  const insets = useSafeAreaInsets();
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState(null);
  const [focusing, setFocusing] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const searchFetching = async (query) => {
    const data = await searchQuest(query);
    setSearchResult(data);
  };

  const debouncedFetch = useCallback(debounce(searchFetching, 1000), []);

  const handleTextChange = (q) => {
    setSearch(q);
    setSearchResult([]);
    debouncedFetch(q);
  };

  const onFocusHandler = () => {
    bottomModalRef.current?.snapToPosition("95%");
    setSearching(true);
    setFocusing(true);
  };

  const onBlurHandler = () => {
    setFocusing(false);
  };

  const onSubmitHandler = () => {
    setFocusing(false);
    storeHistory(search);
    bottomModalRef.current?.snapToIndex(1);
  };

  const onCancelHander = () => {
    setSearch(null);
    setFocusing(false);
    setSearchResult([]);
    setSearching(false);
    Keyboard.dismiss();
    bottomModalRef.current?.snapToIndex(1);
  };

  const profilePressHandler = () => {
    TabNavigation.navigate("Profile");
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.topBarContainer}>
        <View style={styles.searchTextContainer}>
          <View style={styles.iconContainer}>
            <Image source={search_icon} style={styles.iconImage} />
          </View>
          <TextInput
            style={styles.searchText}
            placeholder="ค้นหาเควส"
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            value={search}
            onChangeText={handleTextChange}
            onSubmitEditing={onSubmitHandler}
          />
        </View>
        {searching ? (
          <Button title="Cancel" onPress={onCancelHander} />
        ) : (
          <Pressable
            onPress={profilePressHandler}
            style={styles.profileContainer}
          >
            <Image
              src={userDetail.user?.picturePath}
              style={styles.profilePicture}
            />
          </Pressable>
        )}
      </View>

      {searchResult && searching && search && (
        <View style={styles.searchResultContainer}>
          {searchResult.quests?.map((quest) => (
            <SearchItem quest={quest} key={quest._id} />
          ))}
          {searchResult.locations?.map((location) => (
            <LocationSearchItem location={location} key={location._id} />
          ))}
        </View>
      )}

      {searching && !search && (
        <View>
          <RecentSearch setSearch={setSearch} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  topBarContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  serchTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchTextContainer: {
    backgroundColor: "rgb(244,244,244)",
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    height: "100%",
    alignItems: "center",
    paddingLeft: 10,
  },
  searchText: {
    margin: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
  },
  searchResultContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "grey",
  },
  profileContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  iconContainer: {
    width: 20,
    height: 20,
    // backgroundColor: "grey",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    opacity: 0.55,
  },
});
