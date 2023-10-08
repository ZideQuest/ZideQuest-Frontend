import { View, Text, StyleSheet } from "react-native";
import SearchItem from "./SearchItem";
import LocationSearchItem from "./LocationSearchItem";
import { useAppContext } from "../../data/AppContext";

export default function SearchResult({ searchResult }) {
  const { userDetail } = useAppContext();

  return (
    <View style={styles.searchResultContainer}>
      {!searchResult.quests?.length && !searchResult.locations?.length && (
        <View style={styles.searchStatusText}>
          <Text
            style={{
              color: textColor,
              fontFamily: "Kanit300",
              fontSize: 16,
            }}
          >
            No Result Found
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
    borderTopWidth: 1,
    borderColor: "grey",
  },
});
