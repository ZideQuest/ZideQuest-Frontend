import React, { useState, useCallback } from "react";
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
import { useAppContext } from "../data/AppContext";
import { primaryColor, textColor } from "../data/color";
import { searchQuest } from "../data/Quest";
import SearchItem from "./Quest/SearchItem";
import RecentSearch from "./RecentSearch";
import * as TabNavigation from "../data/TabNavigation";
import LocationSearchItem from "./Location/LocationSearchItem";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { getCenterFromPins } from "../data/locations";
import { storeHistory } from "../data/async_storage";
import search_icon from "../../assets/images/search.png";

export default function SearchBar({ searching, setSearching }) {
  const {
    bottomModalRef,
    userDetail,
    mapSearchedLocation,
    snapBack,
    mapRefetch,
    mapMoveTo,
  } = useAppContext();
  const [search, setSearch] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchFetching = async (query) => {
    const data = await searchQuest(query);
    setSearchResult(data);
    setLoading(false);
  };

  const debouncedFetch = useCallback(debounce(searchFetching, 500), []);

  const handleTextChange = (q) => {
    setLoading(true);
    setSearch(q);
    setSearchResult([]);
    debouncedFetch(q);
  };

  const onFocusHandler = () => {
    bottomModalRef.current?.snapToIndex(3);
    setSearching(true);
  };

  const onBlurHandler = () => {
    if (!search) {
      setSearching(false);
    }
  };

  const onSubmitHandler = () => {
    storeHistory(search);
    bottomModalRef.current?.snapToIndex(1);
    mapSearchedLocation(searchResult.locations);
    const target = getCenterFromPins(searchResult.locations);
    if (target) {
      mapMoveTo(
        target.latitude,
        target.longitude,
        target.latitudeDelta,
        target.longitudeDelta
      );
    }
  };

  const onCancelHander = () => {
    setSearch(null);
    setSearchResult([]);
    setSearching(false);
    Keyboard.dismiss();
    bottomModalRef.current?.snapToIndex(1);
    mapRefetch();
  };

  const profilePressHandler = () => {
    TabNavigation.navigate("Profile");
  };

  const ProfileImage = () => {
    if (userDetail.user?._id) {
      return (
        <Pressable
          onPress={profilePressHandler}
          style={styles.profileContainer}
        >
          <Image
            src={userDetail.user?.picturePath}
            style={styles.profilePicture}
          />
        </Pressable>
      );
    }

    return (
      <Pressable
        onPress={() => alert("Login first")}
        style={[styles.profileContainer, { padding: 6, borderWidth: 1 }]}
      >
        <Image
          src="https://img.icons8.com/material-outlined/24/cat--v1.png"
          style={styles.profilePicture}
        />
      </Pressable>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={styles.topBarContainer}>
        <View style={styles.searchTextContainer}>
          <View style={styles.iconContainer}>
            <Image source={search_icon} style={styles.iconImage} />
          </View>
          <BottomSheetTextInput
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
          <ProfileImage />
        )}
      </View>

      <View style={styles.greyBackground}>
        {searching && search && (
          <View style={styles.searchResultContainer}>
            {!loading &&
              !searchResult.quests?.length &&
              !searchResult.locations?.length && (
                <View style={styles.searchStatusText}>
                  <Text
                    style={{
                      color: textColor,
                      fontFamily: "Kanit300",
                      fontSize: 16,
                    }}
                  >
                    No Result Found
                  </Text>
                </View>
              )}

            <SearchItem
              quests={searchResult.quests}
              isAdmin={userDetail.isAdmin}
            />
            <LocationSearchItem locations={searchResult.locations} />
          </View>
        )}

        {loading && search && (
          <View style={styles.searchStatusText}>
            <Text
              style={{ color: textColor, fontFamily: "Kanit300", fontSize: 16 }}
            >
              Search for <Text style={{ color: "black" }}>'{search}'</Text>
            </Text>
          </View>
        )}

        {searching && !search && (
          <View>
            <RecentSearch handleTextChange={handleTextChange} />
          </View>
        )}
      </View>
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
    backgroundColor: "white",
    paddingBottom: 10,
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
    padding: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 10,
  },
  searchResultContainer: {
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
  searchStatusText: {
    flexDirection: "row",
    paddingTop: 10,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  greyBackground: {
    backgroundColor: "#F2F2F2",
  },
});
