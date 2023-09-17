import react, { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { View, Text, StyleSheet, Image, Alert, Animated, Easing } from "react-native";
import { useRoute } from "@react-navigation/native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { getQuestData } from "../data/Quest";
import Tag from "../components/Quest/Tag";
import ActivityName from "../components/Quest/ActivityName";
import Bottomsheet from "../components/Bottomsheet/Bottomsheet";
import BigButton from "../components/button/BigButton";
import { join_leave } from "../data/join-leave";
import { textColor, BGcolor, primaryColor } from "../data/color";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function ActivityDetail() {
  const [QuestDetail, setQuestDetail] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const route = useRoute();
  const { questId } = route.params;
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    const fetchData = async (questId) => {
      try {
        const response = await getQuestData(questId);
        setQuestDetail(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(questId);
  }, []);

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  if (isLoading) {
    return (
      <Bottomsheet
        style={styles.container}
        snapPoints={["20%", "60%", "90%"]}
        index={1}
      ></Bottomsheet>
    );
  } else {
    return (
      <Bottomsheet
        style={styles.container}
        snapPoints={["20%", "60%", "90%"]}
        index={1}
      >
        <BottomSheetScrollView>
          <View style={styles.ScrollView}>
            <View style={{ width: "100%", paddingHorizontal: 15 }}>
              <ActivityName quest={QuestDetail} />
            </View>
            {QuestDetail.picturePath == "" ? (
              <View></View>
            ) : (
              <View style={styles.picCon}>
                <Image style={styles.pic} src={QuestDetail.picturePath} />
              </View>
            )}
            <View style={styles.lottieCon}>
              <AnimatedLottieView
              source={require("../../assets/lottie/complete2.json")}
              progress={animationProgress.current}
              />
            </View>
          </View>
        </BottomSheetScrollView>
      </Bottomsheet>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BGcolor,
    width: "100%",
    flexDirection: "row",
    flex: 1,
  },
  picCon: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  pic: {
    width: "100%",
    height: "100%",
  },
  DescripCon: {
    paddingHorizontal: 15,
    backgroundColor: BGcolor,
    width: "100%",
  },
  lottieCon: {
    width: "100%",
    height: 250,
  },
  ScrollView: {},
});
