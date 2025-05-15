import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CharacterContext } from "./CharacterContext";

export default function CharacterSummary() {
  const navigation = useNavigation();
  const { character } = useContext(CharacterContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.charName}>{character.name}</Text>
        <Text style={styles.charSpec}>{character.label}</Text>
      </View>

      <View style={styles.characterDetails}>
        <View style={styles.charImg}>
          <Text>Character Image</Text>
        </View>

        <View style={styles.infoBlock}>
          <Text style={styles.charInfo}>Lvl: 1</Text>
          <Text style={styles.charInfo}>Move: {character.move}</Text>
          <Text style={styles.charInfo}>Size: {character.size}</Text>
        </View>
      </View>

      <View style={styles.bars}>
        <View style={styles.charHealth} />
        <View style={styles.charExp} />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.charBaseStats}>
          <Text style={styles.sectionTitle}>Base Stats</Text>
          {Object.entries(character.stats).map(([label, value]) => (
            <Text key={label} style={styles.charStat}>
              {label}: {value}
            </Text>
          ))}
        </View>

        <View style={styles.charBaseAtk}>
          <Text style={styles.sectionTitle}>Base Attack</Text>
          <Text style={styles.weapon}>{character.weapon.label}</Text>
          {Object.entries(character.weapon.stats).map(([label, value]) => (
            <Text key={label} style={styles.atkStat}>
              {label}: {value ?? 0}
            </Text>
          ))}
        </View>
      </View>

      <Button
        title="Finish"
        onPress={() => navigation.navigate("TeamCreationScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 20,
    padding: 20,
    justifyContent: "space-around",
    height: "98%",
    width: "98%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  charName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  charSpec: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  characterDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  charImg: {
    width: 100,
    height: 100,
    backgroundColor: "darkgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  infoBlock: {
    justifyContent: "center",
    gap: 6,
  },
  charInfo: {
    fontSize: 16,
    color: "white",
  },
  bars: {
    gap: 10,
    marginVertical: 10,
  },
  charHealth: {
    height: 15,
    backgroundColor: "pink",
    borderRadius: 5,
  },
  charExp: {
    height: 15,
    backgroundColor: "lightgreen",
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  charBaseStats: {
    flex: 1,
  },
  charStat: {
    fontSize: 14,
    color: "white",
    marginVertical: 2,
  },
  charBaseAtk: {
    flex: 1,
  },
  atkStat: {
    fontSize: 14,
    color: "white",
    marginVertical: 2,
  },
  weapon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
});
