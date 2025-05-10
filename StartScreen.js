import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import CharacterCard from "./CharacterCard";
import { useNavigation } from "@react-navigation/native";

export default function StartScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View style={styles.teamsView}>
        <View style={styles.teamCard}>
          <Text>Team 1</Text>
        </View>
        <View style={styles.teamCard}>
          <Text>Team 2</Text>
        </View>
        <View style={styles.teamCard}>
          <Text>Team 3</Text>
        </View>
        <View style={styles.newCharBtn}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TeamCreationScreen")}
          >
            <Text style={styles.Btn}>Create New Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  teamsView: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  teamCard: {
    backgroundColor: "red",
    color: "white",
    width: "90%",
    aspectRatio: "6/1",
    margin: 3,
    borderRadius: 50,
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
