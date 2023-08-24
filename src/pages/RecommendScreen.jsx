import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import userprofiletest from "../../assets/images/UserProfileTest.jpg";

import SearchBar from "../components/SearchBar"

const MinimalCard = ({ event, time, location, userlevel, username, image }) => {
  return (
    <View style={styles.CardContainer}>
      <SearchBar />
      <View>
        <Text style={styles.event_name}>event</Text>
        {/* <Text style={styles.event_name}>{event}</Text> */}
        <View style={styles.row}>
          <View style={styles.row_inner}>
            <Image style={styles.userprofile} source={userprofiletest} />
            <View style={styles.userdescription}>
              <Text>User Name</Text>
              {/* <Text>{username}</Text> */}
              <Text>User Level</Text>
              {/* <Text>{userlevel}</Text> */}
            </View>
          </View>
          <View style={styles.time_and_location}>
            <Text style={styles.time}>Time</Text>
            {/* <Text style={styles.time}>{time}</Text> */}
            <Text style={styles.location}>Location</Text>
            {/* <Text style={styles.location}>{location}</Text> */}
          </View>
        </View>
      </View>
      {/* <Image style={styles.event_image} source={userprofiletest} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  Card: { height: "50%" },
  CardContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  event_name: {
    color: "white",
    left: "2%",
    top: "10%",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: "30%",
    // borderWidth: 2,
    // borderColor: "blue",
  },
  row_inner: {
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
    width: "30%",
    height: "100%",
  },
  event_image: {
    height: "100%",
    borderWidth: 2,
    borderColor: "blue",
  },
});

export default MinimalCard;
