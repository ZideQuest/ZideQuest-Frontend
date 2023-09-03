import { Image, StyleSheet, Text, View } from "react-native";

function month_to_thai(datestring) {
  switch (datestring) {
    case "01":
      return "ม.ค.";
      break;
    case "02":
      return "ก.พ.";
      break;
    case "03":
      return "มี.ค.";
      break;
    case "04":
      return "เม.ย.";
      break;
    case "05":
      return "พ.ค.";
      break;
    case "06":
      return "มิ.ย.";
      break;
    case "07":
      return "ก.ค.";
      break;
    case "08":
      return "ส.ค.";
      break;
    case "09":
      return "ก.ย.";
      break;
    case "10":
      return "ต.ค.";
      break;
    case "11":
      return "พ.ย.";
      break;
    case "12":
      return "ธ.ค.";
      break;
  }
}

const MinimalCard = ({
  quest_name,
  quest_image,
  time,
  timeEnd,
  location,
  user_name,
  user_image,
  countParticipant,
  maxParticipant,
}) => {
  const date = time.slice(8, 10);
  const month = month_to_thai(time.slice(5, 7));
  const year = time.slice(0, 4);
  const formattedTime = time.slice(14, 19);
  const formattedTimeEnd = timeEnd.slice(14, 19);

  return (
    <View>
      <View style={styles.CardContainer}>
        <Text style={styles.quest_name}>{quest_name}</Text>
        <View style={styles.row}>
          <View style={styles.row_inner}>
            <Image style={styles.userprofile} source={{ uri: user_image }} />
            <View style={styles.userdescription}>
              <Text>{user_name}</Text>
              <View style={styles.participant}>
                <Text style={styles.par_font}>จำนวนผู้เข้าร่วม: </Text>
                <Text style={styles.par_font}>{countParticipant}</Text>
                <Text style={styles.par_font}> / </Text>
                <Text style={styles.par_font}>{maxParticipant}</Text>
              </View>
            </View>
          </View>
          <View style={styles.time_and_date}>
            <Text style={styles.date}>
              {date} {month} {year}
            </Text>
            <View style={styles.timeSE}>
              <Text style={styles.time}>{formattedTime}</Text>
              <Text style={styles.time}>-</Text>
              <Text style={styles.time}>{formattedTimeEnd}</Text>
            </View>
          </View>
        </View>
        <View style={styles.image_container}>
          <Image style={styles.quest_image} source={{ uri: quest_image }} />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
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
  time_and_date: {
    marginTop: 5,
    textAlign: "right",
  },
  time: {
    textAlign: "right",
    color: "grey",
  },
  timeSE: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    textAlign: "right",
    color: "grey",
    fontWeight: "bold",
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
  participant: {
    flexDirection: "row",
  },
  par_font: {
    color: "grey",
  },
});

export default MinimalCard;
