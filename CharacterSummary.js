import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CharacterSummary() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Summary of character</Text>
      <Button
        title="Finish"
        onPress={() => navigation.navigate("TeamCreationScreen")}
      />
    </View>
  );
}
