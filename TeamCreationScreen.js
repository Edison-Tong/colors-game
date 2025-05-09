import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { useNavigation } from "@react-navigation/native";

export default function TeamCreationScreen() {
  const navigation = useNavigation();

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.teamView}>
        <View style={styles.addCharCard}>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => navigation.navigate("CharacterInit")}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View key="2" style={styles.teamView}>
        <View style={styles.addCharCard}>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => navigation.navigate("CharacterInit")}
          >
            <Text style={styles.plusText}>++</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    orientation: "horizontal",
  },
  teamView: {
    flex: 1,
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  addCharCard: {
    flex: 1,
    width: "98%",
    backgroundColor: "grey",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    backgroundColor: "darkgrey",
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    fontSize: 50,
    color: "white",
  },
});
