// CharacterCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CharacterCard({ name, specialization, level, move, size, stats, attack }) {
  return (
    <View style={styles.charBoard}>
      <Text style={styles.charName}>{name}</Text>
      <Text style={styles.charSpec}>{specialization}</Text>
      <View style={styles.charImg}>
        <Text>Character Image</Text>
      </View>
      <Text style={styles.charInfo}>Lvl: {level}</Text>
      <Text style={styles.charInfo}>Move: {move}</Text>
      <Text style={styles.charInfo}>Size: {size}</Text>
      <View style={styles.charHealth}></View>
      <View style={styles.charExp}></View>
      <View style={styles.charBaseStats}>
        <Text style={styles.sectionTitle}>Base Stats</Text>
        {Object.entries(stats).map(([label, value]) => (
          <Text key={label} style={styles.charStat}>
            {label}: {value}
          </Text>
        ))}
        <Text style={styles.statsTotal}>
          Total: {Object.values(stats).reduce((acc, val) => acc + val, 0)}
        </Text>
      </View>
      <View style={styles.charBaseAtk}>
        <Text style={styles.sectionTitle}>Base Attack</Text>
        <Text style={styles.weapon}>{attack.weapon}</Text>
        {Object.entries(attack)
          .filter(([k]) => k !== "weapon")
          .map(([label, value]) => (
            <Text key={label} style={styles.atkStat}>
              {label}: {value}
            </Text>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  charBoard: {
    width: "95%",
    height: "95%",
    backgroundColor: "grey",
    borderRadius: 40,
  },
  charName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    left: "10%",
    top: "5%",
  },
  charSpec: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    left: "80%",
    top: "3%",
  },
  charImg: {
    width: 100,
    height: 100,
    backgroundColor: "darkgrey",
    left: "35%",
    top: "8%",
    justifyContent: "center",
    alignItems: "center",
  },
  charInfo: {
    fontSize: 20,
    color: "white",
    padding: 5,
    top: "-5%",
    left: "65%",
  },
  charHealth: {
    width: "80%",
    height: "5%",
    left: "10%",
    backgroundColor: "pink",
  },
  charExp: {
    width: "80%",
    height: "5%",
    left: "10%",
    top: "1%",
    backgroundColor: "lightgreen",
  },
  charBaseStats: {
    left: "6%",
    top: "3%",
    fontSize: 15,
  },
  charStat: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
  },
  statsTotal: {
    fontSize: 20,
    fontWeight: "bold",
  },
  charBaseAtk: {
    left: "60%",
    top: "-40%",
    fontSize: 15,
  },
  atkStat: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 4,
  },
  weapon: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
