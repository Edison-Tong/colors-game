import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "./firebase"; // Your firebase app init file

export default function StartScreen() {
  const navigation = useNavigation();
  const db = getFirestore(app);

  const [modalVisible, setModalVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!teamName.trim()) return;

    setLoading(true);

    try {
      // Save team name to Firestore collection "teams"
      const docRef = await addDoc(collection(db, "teams"), {
        name: teamName.trim(),
        createdAt: new Date(),
      });

      setLoading(false);
      setModalVisible(false);
      setTeamName("");

      // Navigate to next screen, passing the Firestore doc id and teamName
      navigation.navigate("TeamCreationScreen", {
        teamName,
        teamId: docRef.id,
      });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to save team. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.teamsView}>
      {/* ...existing UI... */}

      <View style={styles.newCharBtn}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.Btn}>Create New Team</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Enter Team Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Team Name"
              value={teamName}
              onChangeText={setTeamName}
            />

            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button
                  title="Continue"
                  onPress={handleContinue}
                  disabled={teamName.trim() === ""}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  teamsView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  teamCard: {
    backgroundColor: "red",
    color: "white",
    width: "90%",
    aspectRatio: 6 / 1,
    margin: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  newCharBtn: {
    marginTop: 20,
  },
  Btn: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 50,
    textAlign: "center",
    overflow: "hidden",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
