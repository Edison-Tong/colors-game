import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CharacterStats() {
  const navigation = useNavigation();
  const [stats, setStats] = useState({
    Health: "4",
    Strength: "4",
    Defense: "4",
    Magic: "4",
    Resistance: "4",
    Speed: "4",
    Skill: "4",
    Knowledge: "4",
    Luck: "4",
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <Text>Determine character stats</Text>
        {Object.keys(stats).map((key) => (
          <View style={[styles.row]} key={key}>
            <Text style={styles.label}>{key}</Text>
            <TextInput
              style={[
                styles.input,
                key === "Health" && stats["Health"] > 12
                  ? {
                      color: "red",
                      fontWeight: "bold",
                    }
                  : "",
                stats[key] < 4 && {
                  color: "red",
                  fontWeight: "bold",
                },
              ]}
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
          disabled={
            total !== 70 ||
            Object.values(stats).some((val) => parseInt(val) < 4) ||
            stats["Health"] > 12
          }
        />
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
          Total stats must add up to 70.
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
          Each stat must be a minimum of 4.{" "}
        </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold", color: "red" }}>
          The health stat cannot start higher than 12.
        </Text>
      </View>
    </TouchableWithoutFeedback>
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
