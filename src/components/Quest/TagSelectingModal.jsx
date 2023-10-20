import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useState } from "react";

import ItemSelectingModal from "../misc/ItemSelectingModal";
import TagItem from "./TagItem";

import search_icon from "../../../assets/images/search.png";
import { buttonGrey, textColor } from "../../data/color";

import { createTag } from "../../data/tag";

export default function TagSelectingModal({
  selectedTag,
  setSelectedTag,
  tags,
  setTags,
}) {
  const [tagSearch, setTagSearch] = useState("");

  const [addingTag, setAddingTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("olive");

  const AddNewTag = () => {
    return (
      <View
        style={{
          borderRadius: 15,
          backgroundColor: addingTag ? "grey" : buttonGrey,
        }}
      >
        <Text
          style={{
            color: addingTag ? "white" : textColor,
            paddingHorizontal: 7,
            fontFamily: "Kanit400",
          }}
        >
          Add New Tag +
        </Text>
      </View>
    );
  };

  const submitNewTag = async () => {
    try {
      const newTag = await createTag({
        tagName: newTagName,
        tagColor: newTagColor,
      });
      setNewTagName("");
      setNewTagColor("olive");
      setAddingTag(false);
      setTags((prev) => [...prev, newTag]);
    } catch (error) {
      alert(`error occured ${error}`);
    }
  };

  const selectedTagIds = selectedTag.map((t) => t._id);
  const tagPressHandler = (tag) => {
    if (selectedTagIds.includes(tag._id)) {
      setSelectedTag((prev) => prev.filter((p) => p._id != tag._id));
    } else {
      setSelectedTag((prev) => [...prev, tag]);
    }
  };

  return (
    <ItemSelectingModal
      subject={selectedTag.length != 0 ? `${selectedTag.length} แท็ก` : "แท็ก"}
      isActive={selectedTag.length != 0}
    >
      <View style={{ padding: 15, width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
            borderColor: textColor,
            gap: 5,
          }}
        >
          <Image source={search_icon} style={{ width: 18, height: 18 }} />
          <TextInput
            placeholder="ค้นหาแท็ก"
            value={tagSearch}
            onChangeText={setTagSearch}
            style={{ fontFamily: "Kanit300", flex: 1 }}
          />
        </View>
        <View style={styles.tagContainer}>
          {tags
            .filter((tag) => tag.tagName.includes(tagSearch))
            .map((tag) => (
              <TouchableOpacity
                onPress={() => tagPressHandler(tag)}
                key={`search-tag-${tag._id}`}
                style={{
                  borderColor: selectedTagIds.includes(tag._id)
                    ? "black"
                    : "white",
                  borderWidth: 3,
                  borderRadius: 15,
                }}
              >
                <TagItem tag={tag} />
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            onPress={() => setAddingTag((prev) => !prev)}
            style={{
              borderColor: "white",
              borderWidth: 3,
              borderRadius: 15,
            }}
          >
            <AddNewTag />
          </TouchableOpacity>
        </View>
        {addingTag && (
          <View
            style={{
              marginTop: 10,
              borderTopWidth: 0.5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <Text style={{ marginVertical: 5, fontFamily: "Kanit400" }}>
                สร้างแท็กใหม่ :
              </Text>
              <TextInput
                placeholder="Tag name"
                value={newTagName}
                onChangeText={setNewTagName}
                placeholderTextColor="white"
                autoFocus
                style={{
                  fontFamily: "Kanit400",
                  backgroundColor: newTagColor,
                  color: "white",
                  paddingHorizontal: 7,
                  borderRadius: 15,
                }}
              />
            </View>
            <View
              style={{ flexDirection: "row", gap: 5, alignItems: "center" }}
            >
              <TextInput
                placeholder="Color code"
                value={newTagColor}
                onChangeText={setNewTagColor}
              />
              <TouchableOpacity
                style={{ backgroundColor: "red", paddingHorizontal: 5 }}
                onPress={submitNewTag}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ItemSelectingModal>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 2,
    paddingTop: 10,
    // height: "100%",
  },
});
