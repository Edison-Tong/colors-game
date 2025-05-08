import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import CharacterCard from "./CharacterCard";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.newCharBtn}>
      <TouchableOpacity
        onPress={() => navigation.navigate("TeamCreationScreen")}
      >
        <Text style={styles.Btn}>Create New Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  newCharBtn: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  Btn: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 50,
  },
});
