import React, { useState, useEffect, useContext } from "react";
import { CharacterContext } from "./CharacterContext";
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
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
} from "firebase/firestore";
import { db, auth } from "./firebase";

export default function StartScreen() {
  const navigation = useNavigation();
  const { setCharacter } = useContext(CharacterContext);

  const user = auth.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [fetchingTeams, setFetchingTeams] = useState(true);

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!user) return;

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUsername(userData.username || "Player");
        } else {
          setUsername("Player");
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername("Player");
      }
    };

    fetchUsername();
  }, [user]);

  useEffect(() => {
    if (username) {
      navigation.setOptions({
        title: `${username}'s teams`,
      });
    }
  }, [username]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (!user) return;
        const teamsRef = query(collection(db, "Teams", user.uid, "teams"));
        const querySnapshot = await getDocs(teamsRef);

        const userTeams = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTeams(userTeams);
      } catch (error) {
        console.error("Error fetching teams: ", error);
        Alert.alert("Error", "Could not load your teams.");
      } finally {
        setFetchingTeams(false);
      }
    };

    fetchTeams();
  }, [user]);

  const handleContinue = async () => {
    if (!teamName.trim()) return;
    if (!user?.uid) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    setLoading(true);

    try {
      // Sanitize team name to use as document ID (slugify it)
      const teamId = teamName.trim().toLowerCase().replace(/\s+/g, "_");
      // Create a reference using setDoc with a custom ID
      const newTeamRef = doc(db, "Teams", user.uid, "teams", teamId);

      // Check if team with this ID already exists
      const docSnap = await getDoc(newTeamRef);
      if (docSnap.exists()) {
        Alert.alert("Error", "A team with this name already exists.");
        setLoading(false);
        return;
      }

      // Create the new team document
      await setDoc(newTeamRef, {
        name: teamName.trim(),
        createdAt: new Date(),
        ownerUID: user.uid,
        teamId: teamId,
      });

      setModalVisible(false);
      setTeamName("");

      setTeams((prev) => [
        ...prev,
        { id: teamId, name: teamName.trim(), ownerUID: user.uid },
      ]);
      setCharacter((prev) => ({
        ...prev,
        teamName: teamName.trim(),
        teamId: teamId,
      }));
      navigation.navigate("TeamCreationScreen");
    } catch (error) {
      Alert.alert("Error", "Failed to save team. Please try again.");
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.teamsView}>
      <Text style={styles.header}>Your Teams</Text>

      {fetchingTeams ? (
        <ActivityIndicator size="large" />
      ) : teams.length === 0 ? (
        <Text>No teams yet. Create one below!</Text>
      ) : (
        teams.map((team) => (
          <TouchableOpacity
            key={team.id}
            style={styles.teamCard}
            onPress={() =>
              navigation.navigate("TeamCreationScreen", {
                teamName: team.name,
                teamId: team.id,
              })
            }
          >
            <Text style={styles.teamName}>{team.name}</Text>
          </TouchableOpacity>
        ))
      )}

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
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  teamCard: {
    backgroundColor: "red",
    width: "90%",
    aspectRatio: 6 / 1,
    margin: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  teamName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
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
