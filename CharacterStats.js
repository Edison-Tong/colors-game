import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CharacterStats() {
  const navigation = useNavigation();
  const [stats, setStats] = useState({
    Health: "",
    Strength: "",
    Defense: "",
    Magic: "",
    Resistance: "",
    Speed: "",
    Skill: "",
    Knowledge: "",
    Luck: "",
  });

  const handleChange = (key, value) => {
    setStats((prev) => ({
      ...prev,
      [key]: value.replace(/[^0-9]/g, ""),
    }));
  };

  const total = Object.values(stats).reduce(
    (sum, val) => sum + (parseInt(val) || 0),
    0
  );

  return (
    <View>
      <Text>Determine character stats</Text>
      {Object.keys(stats).map((key) => (
        <View style={styles.row} key={key}>
          <Text style={styles.label}>{key}</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={stats[key]}
            onChangeText={(value) => handleChange(key, value)}
          />
        </View>
      ))}
      <View style={styles.row}>
        <Text style={styles.label}>Total</Text>
        <Text
          style={[
            styles.total,
            total > 70 && { color: "red", fontWeight: "bold" },
          ]}
        >
          {total}
        </Text>
      </View>
      <Button
        title="continue"
        onPress={() => navigation.navigate("CharacterWeapon")}
        disabled={total > 70}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  label: {
    width: 100,
    fontSize: 16,
  },
  input: {
    width: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
  },
  overTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
});
