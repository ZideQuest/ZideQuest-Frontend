import { View, Text, StyleSheet } from "react-native";
import SearchItem from "./SearchItem";
import LocationSearchItem from "./LocationSearchItem";
import { useAppContext } from "../../data/AppContext";
import { textColor } from "../../data/color";

export default function SearchResult({ searchResult }) {
  const { userDetail } = useAppContext();

  return (
    <View style={styles.searchResultContainer}>
      {!searchResult.quests?.length && !searchResult.locations?.length && (
        <View style={styles.searchStatusText}>
          <Text
            style={{
              color: "lightgray",
              fontFamily: "Kanit400",
              fontSize: 25,
              backgroundColor: "white",
              paddingHorizontal: 25,
              paddingTop: 10
            }}
          >
            ไม่พบเควสที่ค้นหา...
          </Text>
        </View>
      )}

      <SearchItem quests={searchResult.quests} isAdmin={userDetail.isAdmin} />
      <LocationSearchItem locations={searchResult.locations} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchResultContainer: {
    // backgroundColor: "red",
    height: "100%",
  },
});
