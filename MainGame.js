import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import CharacterCard from "./CharacterCard";

export default function App() {
  const characters = [
    {
      name: "",
      specialization: "Power",
      level: 1,
      move: 4,
      size: 3,
      stats: {
        Hlth: 23,
        Str: 11,
        Def: 8,
        Mgk: 0,
        Res: 4,
        Spd: 7,
        Skl: 4,
        Knl: 9,
        Lck: 4,
        "+Move": 0,
        "+Size": 0,
        "+Ablty": 0,
      },
      attack: {
        weapon: "Axe",
        "Hit%": 75,
        Str: 3,
        Def: 2,
        Mgk: 0,
        Res: 0,
        Spd: 0,
        Skl: 0,
        Knl: 0,
        Lck: 0,
        Range: 1,
      },
    },
    {
      name: "August",
      specialization: "Evasion",
      level: 1,
      move: 4,
      size: 2,
      stats: {
        Hlth: 22,
        Str: 10,
        Def: 6,
        Mgk: 0,
        Res: 4,
        Spd: 7,
        Skl: 11,
        Knl: 6,
        Lck: 4,
        "+Move": 0,
        "+Size": 0,
        "+Ablty": 0,
      },
      attack: {
        weapon: "Sword",
        "Hit%": 85,
        Str: 2,
        Def: 0,
        Mgk: 0,
        Res: 0,
        Spd: 0,
        Skl: 1,
        Knl: 0,
        Lck: 0,
        Range: 1,
      },
    },
  ];

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {characters.map((char, index) => (
        <View key={index.toString()} style={styles.page}>
          <CharacterCard {...char} />
        </View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
  },
});
