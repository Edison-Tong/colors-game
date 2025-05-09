import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CharacterInit() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Add Character name and "type"</Text>
    </View>
  );
}
