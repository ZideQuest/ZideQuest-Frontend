import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import * as TabNavigation from "../../data/TabNavigation";
import BackButton from "../../components/button/BackButton";

import { useAppContext } from "../../data/AppContext";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

export default function Profile({ navigation }) {
  const { logout, userDetail } = useAppContext();

  console.log(userDetail.user);

  const logoutHandler = () => {
    alert("Logging out...");
    logout();
    TabNavigation.navigate("Recommend");
  };

  return (
    <View style={styles.profileContainer}>
      <BackButton />
      <View style={styles.displayProfile}>
        <Image
          source={{ uri: userDetail.user.picturePath }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <Text>{userDetail.user.organizeName}</Text>
      <View>
        <View>
          <Text>Active Quests</Text>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
  },
  displayProfile: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
  },
});
