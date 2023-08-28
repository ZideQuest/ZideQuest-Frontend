import { Image, StyleSheet, Text, View } from "react-native";

const MinimalCard = ({
  quest_name,
  quest_image,
  time,
  location,
  user_level,
  user_name,
  user_image,
}) => {
  return (
    <View>
      <View style={styles.CardContainer}>
        <Text style={styles.quest_name}>{quest_name}</Text>
        <View style={styles.row}>
          <View style={styles.row_inner}>
            <Image style={styles.userprofile} source={user_image} />
            <View style={styles.userdescription}>
              <Text>{user_name}</Text>
              <Text>{user_level}</Text>
            </View>
          </View>
          <View style={styles.time_and_location}>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.location}>{location}</Text>
          </View>
        </View>
        <View style={styles.image_container}>
          <Image style={styles.quest_image} source={quest_image} />
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
    // borderWidth: 2,
    // borderColor: "black",
    elevation: 2,
    shadowRadius: 1,
  },
  quest_name: {
    color: "orange",
    left: 12,
    top: 10,
    fontSize: 20,
    fontWeight: "bold",
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
  quest_image: {
    width: "100%",
    height: "79%",
    borderRadius: 10,
    // borderWidth: 2,
    // borderColor: "blue",
  },
});

export default MinimalCard;
