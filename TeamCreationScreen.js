import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TeamCreationScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.teamView}>
      <View style={styles.addCharCard}>
        <TouchableOpacity
          style={styles.addIcon}
          onPress={() => navigation.navigate("CharacterInit")}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  teamView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addCharCard: {
    height: "99%",
    width: "98%",
    backgroundColor: "grey",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    backgroundColor: "darkgrey",
    height: 100,
    width: 100,
    borderRadius: 50, // 70 / 2 to make it a perfect circle
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    fontSize: 50,
    color: "white",
  },
});
