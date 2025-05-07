import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import CharacterCard from "./CharacterCard";

export default function StartScreen() {
  function createNewTeam() {
    alert("New Team Creation");
  }

  return (
    <View style={styles.newCharBtn}>
      <Button title="CreateNewTeam" onPress={createNewTeam} />
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
});
