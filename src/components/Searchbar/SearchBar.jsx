import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  Image,
  Keyboard,
} from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useAppContext } from "../../data/AppContext";
import { primaryColor, textColor } from "../../data/color";
import { searchQuest } from "../../data/Quest";
import * as TabNavigation from "../../data/TabNavigation";

import RecentSearch from "./RecentSearch";
import SearchItem from "./SearchItem";
import LocationSearchItem from "./LocationSearchItem";

import ItemSelectingModal from "../misc/ItemSelectingModal";
import TagItem from "../Quest/TagItem";
import { TimePicker } from "../TimePicker";

import { getCenterFromPins } from "../../data/locations";
import { storeHistory } from "../../data/async_storage";
import { getTags } from "../../data/tag";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";

import search_icon from "../../../assets/images/search.png";
import SearchResult from "./SearchResult";
import SearchLoading from "./SearchLoading";

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
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [tagSearch, setTagSearch] = useState("");

  const [useStartDate, setUseStartDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [useEndDate, setUseEndDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {}
    };
    fetchTags();
  }, []);

  const searchFetching = async (query, queryTags) => {
    if (!query && !queryTags.length) {
      setLoading(false);
      return;
    }
    try {
      const data = await searchQuest(query, queryTags);
      setSearchResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const debouncedFetch = useCallback(debounce(searchFetching, 500), []);

  useEffect(() => {
    searchFetching(search, selectedTag);
  }, [selectedTag]);

  const handleTextChange = (q) => {
    setLoading(true);
    setSearch(q);
    setSearchResult([]);
    debouncedFetch(q, selectedTag);
  };

  const onFocusHandler = () => {
    bottomModalRef.current?.expand();
    setSearching(true);
  };

  const onBlurHandler = () => {
    // if (!search) {
    //   setSearching(false);
    // }
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
    setSelectedTag([]);
    setSearching(false);
    Keyboard.dismiss();
    bottomModalRef.current?.snapToIndex(1);
    mapRefetch();
  };

  const profilePressHandler = () => {
    TabNavigation.navigate("Profile");
  };

  const selectedTagIds = selectedTag.map((t) => t._id);

  const tagPressHandler = (tag) => {
    setLoading(true);

    if (selectedTagIds.includes(tag._id)) {
      setSelectedTag((prev) => prev.filter((p) => p._id != tag._id));
    } else {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

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
          <TouchableOpacity onPress={onCancelHander}>
            <Text
              style={{
                fontFamily: "Kanit300",
                fontSize: 18,
                color: "rbg(166,200,251)",
              }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        ) : (
          <ProfileImage />
        )}
      </View>

      {searching && (
        <View style={styles.optionContainer}>
          <ItemSelectingModal subject="แท็ก">
            <View style={{ padding: 5, paddingTop: 10, width: "100%" }}>
              <TextInput
                placeholder="ค้นหาแท็ก"
                value={tagSearch}
                onChangeText={setTagSearch}
              />
              <View style={styles.tagContainer}>
                {tags
                  .filter((tag) => tag.tagName.startsWith(tagSearch))
                  .map((tag) => (
                    <TouchableOpacity
                      onPress={() => tagPressHandler(tag)}
                      key={`search-tag-${tag._id}`}
                      style={{
                        borderColor: selectedTagIds.includes(tag._id)
                          ? "black"
                          : "white",
                        borderWidth: 2,
                        borderRadius: 12,
                      }}
                    >
                      <TagItem tag={tag} />
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          </ItemSelectingModal>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={() => setUseStartDate((prev) => !prev)}>
              <Text>วันกิจกรรม</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setUseEndDate((prev) => !prev)}>
              <Text>วันสิ้นสุดกิจกรรม</Text>
            </TouchableOpacity>
          </View>
          <TimePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            useStartDate={useStartDate}
            useEndDate={useEndDate}
          />
        </View>
      )}

      {selectedTag.length > 0 && (
        <View style={styles.tagContainer}>
          {selectedTag.map((tag) => (
            <TouchableOpacity
              onPress={() => tagPressHandler(tag)}
              key={`selected-tag-${tag._id}`}
            >
              <TagItem tag={tag} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.greyBackground}>
        {!loading && searching && (search || selectedTag.length > 0) && (
          <SearchResult searchResult={searchResult} />
        )}

        {loading && <SearchLoading search={search} selectedTag={selectedTag} />}

        {searching && !search && selectedTag.length == 0 && (
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

  greyBackground: {
    backgroundColor: "#F2F2F2",
  },
  tagContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    padding: 7,
  },
  optionContainer: {
    // flexDirection: "row",
    paddingHorizontal: 5,
    marginBottom: 5,
    gap: 10,
  },
});
