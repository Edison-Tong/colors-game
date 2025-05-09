import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TeamCreationScreen() {
  const navigation = useNavigation();

  function CreateNewTeam() {
    navigation.navigate();
  }

  return (
    <View>
      <Text>Create a new team here</Text>
    </View>
  );
}
