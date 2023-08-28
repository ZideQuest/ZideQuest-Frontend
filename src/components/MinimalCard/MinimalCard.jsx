import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import userprofiletest from "../../../assets/images/UserProfileTest.jpg";
import Activity from "../../../assets/images/ActivityTest.jpg";

const MinimalCard = ({
  event_name,
  event_image,
  time,
  location,
  user_level,
  user_name,
  user_image,
}) => {
  return (
    <View>
      <View style={styles.CardContainer}>
        {/* <Text style={styles.event_name}>event</Text> */}
        <Text style={styles.event_name}>{event_name}</Text>
        <View style={styles.row}>
          <View style={styles.row_inner}>
            {/* <Image style={styles.userprofile} source={userprofiletest} /> */}
            <Image style={styles.userprofile} source={user_image} />
            <View style={styles.userdescription}>
              {/* <Text>User Name</Text> */}
              <Text>{user_name}</Text>
              {/* <Text>User Level</Text> */}
              <Text>{user_level}</Text>
            </View>
          </View>
          <View style={styles.time_and_location}>
            {/* <Text style={styles.time}>Time</Text> */}
            <Text style={styles.time}>{time}</Text>
            {/* <Text style={styles.location}>Location</Text> */}
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.image_container}>
          {/* <Image style={styles.event_image} source={Activity} /> */}
          <Image style={styles.event_image} source={event_image} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Card: { height: "50%" },
  Container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  CardContainer: {
    height: 300,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
    elevation: 1,
    shadowRadius: 2,
  },
  event_name: {
    color: "grey",
    left: 12,
    top: 10,
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: "20%",
    // borderWidth: 2,
    // borderColor: "orange",
  },
  row_inner: {
    height: 60,
    flexDirection: "row",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  userdescription: {
    marginTop: 5,
    marginLeft: 5,
  },
  time_and_location: {
    marginTop: 5,
    textAlign: "right",
  },
  time: {
    textAlign: "right",
    color: "grey",
  },
  location: {
    textAlign: "right",
    color: "grey",
  },
  userprofile: {
    width: 50,
    height: 50,
  },
  image_container: {
    marginLeft: 5,
    marginRight: 5,
  },
  event_image: {
    width: "100%",
    height: "78%",
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "blue",
  },
});

export default MinimalCard;
