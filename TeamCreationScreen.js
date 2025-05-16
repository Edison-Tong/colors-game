import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import PagerView from "react-native-pager-view";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { CharacterContext } from "./CharacterContext";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import CharacterCard from "./CharacterCard";

export default function TeamCreationScreen() {
  const navigation = useNavigation();
  const { character, setCharacter } = useContext(CharacterContext);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = auth.currentUser?.uid;
  const teamId = character.teamId;

  useFocusEffect(
    useCallback(() => {
      async function fetchCharacters() {
        if (!teamId || !userId) return;

        try {
          setLoading(true);
          const charsRef = collection(
            db,
            "teams",
            userId,
            "teamList",
            teamId,
            "characters"
          );
          const querySnapshot = await getDocs(charsRef);

          const loadedChars = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setCharacters(loadedChars);
        } catch (error) {
          console.error("Error fetching characters:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchCharacters();
    }, [teamId, userId])
  );

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="grey" />
        <Text style={{ color: "grey", marginTop: 10 }}>
          Loading characters...
        </Text>
      </View>
    );
  }

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {/* Existing Characters */}
      {characters.map((char, index) => (
        <CharacterCard
          key={index}
          name={char.name}
          label={char.label}
          level={1}
          move={char.move}
          size={char.size}
          stats={char.stats}
          weapon={char.weapon.label}
          weaponStats={char.weapon.stats}
        />
      ))}
      {/* Add Character Card */}
      <View key="add" style={styles.teamView}>
        <View style={styles.addCharCard}>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => navigation.navigate("CharacterInit")}
          >
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    orientation: "horizontal",
  },
  teamView: {
    flex: 1,
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  addCharCard: {
    flex: 1,
    width: "98%",
    backgroundColor: "grey",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  addIcon: {
    backgroundColor: "darkgrey",
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  plusText: {
    fontSize: 50,
    color: "white",
  },

  //temporary Just here for looks
  charBoard: {
    // width: "95%",
    // height: "95%",
    // backgroundColor: "grey",
    // borderRadius: 50,
    width: "98%",
    height: "100%",
    backgroundColor: "grey",
    borderRadius: 50,
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
    width: "100",
    height: "100",
    backgroundColor: "darkgrey",
    left: "35%",
    top: "8%",
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
  text: {
    fontSize: 24,
    atkStat: {
      fontSize: 15,
      fontWeight: "bold",
      padding: 4,
    },
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
