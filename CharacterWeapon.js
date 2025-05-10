import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CharacterWeapon() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Pick a weapon</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate("CharacterSummary")}
      />
    </View>
  );
}
