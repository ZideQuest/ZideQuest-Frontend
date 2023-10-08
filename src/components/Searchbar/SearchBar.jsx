import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Keyboard,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { BottomSheetTextInput, TouchableHighlight } from "@gorhom/bottom-sheet";
import Checkbox from "expo-checkbox";

import { useAppContext } from "../../data/AppContext";
import { primaryColor, textColor } from "../../data/color";
import { searchQuest } from "../../data/Quest";
import * as TabNavigation from "../../data/TabNavigation";
import { getCenterFromPins } from "../../data/locations";
import { storeHistory } from "../../data/async_storage";
import { getTags } from "../../data/tag";
import { activityCategories } from "../../data/activityCategoty";

import RecentSearch from "./RecentSearch";
import SearchResult from "./SearchResult";
import SearchLoading from "./SearchLoading";

import ItemSelectingModal from "../misc/ItemSelectingModal";
import TagItem from "../Quest/TagItem";
import { TimePicker } from "../TimePicker";

import search_icon from "../../../assets/images/search.png";
import BigButton from "../button/BigButton";

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

  const [activityHour, setActivityHour] = useState(0);

  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [tagSearch, setTagSearch] = useState("");

  const [useStartDate, setUseStartDate] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [useEndDate, setUseEndDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const [refresher, setRefresher] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setTags(data);
      } catch (error) {}
    };
    fetchTags();
  }, []);

  const searchFetching = async (
    query,
    queryTags,
    startDate,
    endDate,
    useStartDate,
    useEndDate,
    activityHour
  ) => {
    try {
      const data = await searchQuest(
        query,
        queryTags,
        startDate,
        endDate,
        useStartDate,
        useEndDate,
        activityHour
      );
      setSearchResult(data);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const debouncedFetch = useCallback(debounce(searchFetching, 500), []);

  useEffect(() => {
    searchFetching(
      search,
      selectedTag,
      startDate,
      endDate,
      useStartDate,
      useEndDate,
      activityHour
    );
  }, [selectedTag, startDate, endDate, activityHour, useEndDate, useStartDate]);

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
    if (!searchResult?.locations) {
      bottomModalRef.current?.snapToIndex(1);
      // return;
    }

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

  const onCancelHandler = () => {
    setSearch("");
    setSearchResult([]);
    setSelectedTag([]);
    setActivityHour(0);
    setUseStartDate(false);
    setUseEndDate(false);
    setSearching(false);
    Keyboard.dismiss();
    bottomModalRef.current?.collapse();
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

  const activityPressHandler = (act) => {
    setActivityHour(act);
    setRefresher((prev) => !prev);
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
          <TouchableOpacity onPress={onCancelHandler}>
            <Text
              style={{
                fontFamily: "Kanit300",
                fontSize: 18,
                color: "rgb(0, 122, 255)",
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
          <View
            style={{
              flexDirection: "row",
              // flex: 1,
              // justifyContent: "space-between",
              gap: 10,
            }}
          >
            <ItemSelectingModal
              subject={activityCategories[activityHour]}
              closeOnPress
              refresher={refresher}
              isActive={activityHour != 0}
            >
              <View>
                <Text
                  style={{
                    paddingHorizontal: 7,
                    marginTop: 10,
                    marginBottom: 6,
                    fontFamily: "Kanit400",
                    fontSize: 18,
                  }}
                >
                  เลือกชั่วโมงกิจกรรม
                </Text>
                {Object.keys(activityCategories).map((act) => (
                  <TouchableHighlight
                    underlayColor="#DDDDDD"
                    onPress={() => activityPressHandler(act)}
                    key={`activity-hour-${act}`}
                    style={{ width: "100%", padding: 7, paddingLeft: 13 }}
                  >
                    <Text style={{ fontFamily: "Kanit300", fontSize: 15 }}>
                      {activityCategories[act]}
                    </Text>
                  </TouchableHighlight>
                ))}
              </View>
            </ItemSelectingModal>
            <ItemSelectingModal
              subject="แท็ก"
              isActive={selectedTag.length != 0}
            >
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
          </View>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Checkbox
                color={primaryColor}
                onValueChange={setUseStartDate}
                value={useStartDate}
              />
              <Text style={{ fontFamily: "Kanit300", fontSize: 15 }}>
                เวลาเริ่มเควส
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Checkbox
                color={primaryColor}
                onValueChange={setUseEndDate}
                value={useEndDate}
              />
              <Text style={{ fontFamily: "Kanit300", fontSize: 15 }}>
                เวลาสิ้นสุดเควส
              </Text>
            </View>
          </View>
          {(useStartDate || useEndDate) && (
            <TimePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              useStartDate={useStartDate}
              useEndDate={useEndDate}
            />
          )}

          <BigButton
            text="Apply"
            bg={primaryColor}
            onPress={onSubmitHandler}
            pd={3}
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
        {loading && <SearchLoading search={search} selectedTag={selectedTag} />}

        {searching &&
          !loading &&
          (search ||
          selectedTag.length > 0 ||
          useStartDate ||
          useEndDate ||
          activityHour != 0 ? (
            <SearchResult searchResult={searchResult} />
          ) : (
            <RecentSearch handleTextChange={handleTextChange} />
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
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
    flex: 1,
  },
  tagContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    padding: 7,
  },
  optionContainer: {
    marginHorizontal: 10,
    padding: 7,
    marginBottom: 5,
    gap: 10,
    backgroundColor: "#fefefe",
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
