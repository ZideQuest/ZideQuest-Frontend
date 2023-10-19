import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { buttonGrey, buttonLightGrey, primaryColor } from "../../data/color";
import user_icon from "../../../assets/images/user_icon.png";
import Checkbox from "expo-checkbox";
import bin_icon from "../../../assets/images/bin.png";

export default function UserTag({
  user,
  checkable = false,
  onChecked,
  onDelete,
  deleteable = false,
}) {
  const [isChecked, setIsChecked] = useState(user.status);

  const checkboxHandler = (v) => {
    if (checkable) {
      setIsChecked(v);
      onChecked(v, user?.user?._id);
    }
  };

  const handleDelete = async () => {
    await onDelete(user?.user?._id);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <View>
          <View style={styles.profilePicContainer}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={
                user?.user?.picturePath
                  ? { uri: user?.user?.picturePath }
                  : user_icon
              }
            />
          </View>
          <View
            style={{
              width: 12,
              height: 12,
              backgroundColor: isChecked ? "lime" : "red",
              position: "absolute",
              bottom: 0,
              right: 0,
              borderRadius: 6,
            }}
          ></View>
        </View>
        <Text style={styles.textInfo}>
          {user?.user?.firstName} {user?.user?.lastName}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", gap: 5 }}
      >
        {deleteable && (
          <TouchableOpacity style={styles.binIcon} onPress={handleDelete}>
            <Image
              source={bin_icon}
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        )}

        {checkable && (
          <Checkbox
            value={isChecked}
            onValueChange={checkboxHandler}
            color={primaryColor}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: buttonGrey,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  textInfo: {
    fontSize: 16,
    fontFamily: "Kanit300",
  },
  profilePicContainer: {
    width: 30,
    height: 30,
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
  },
  binIcon: {
    width: 20,
    height: 20,
  },
});
