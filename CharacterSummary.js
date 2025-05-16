import React, { useContext, useState } from "react";
import CharacterCard from "./CharacterCard";
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
      <CharacterCard
        name={character.name}
        label={character.label}
        level={1}
        move={character.move}
        size={character.size}
        stats={character.stats}
        weapon={character.weapon.label}
        weaponStats={character.weapon.stats}
      />
      <View style={{ padding: 20 }}>
        <Button title="Finish" onPress={handleSaveCharacter} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
