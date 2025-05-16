import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CharacterContext } from "./CharacterContext";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase"; // Your Firestore instance

export default function CharacterSummary() {
  const navigation = useNavigation();
  const { character } = useContext(CharacterContext);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  const handleSaveCharacter = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in.");
      return;
    }
    if (!character.teamId) {
      Alert.alert("Error", "No team selected.");
      return;
    }

    setLoading(true);

    try {
      // Use a slugified version of the character's name as the ID
      const characterId = character.name.toLowerCase().replace(/\s+/g, "_");

      const characterRef = doc(
        db,
        "teams",
        user.uid,
        "teamList",
        character.teamId,
        "characters",
        characterId
      );

      await setDoc(characterRef, {
        ...character,
        createdAt: new Date(),
        ownerUID: user.uid,
      });

      Alert.alert("Success", "Character saved!");
      navigation.navigate("TeamCreationScreen", { teamId: character.teamId });
    } catch (error) {
      console.error("Error saving character:", error);
      Alert.alert("Error", "Failed to save character.");
    } finally {
      setLoading(false);
    }
  };

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

      {loading ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <Button title="Finish" onPress={handleSaveCharacter} />
      )}
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
