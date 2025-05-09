import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PagerView from "react-native-pager-view";
import { useNavigation } from "@react-navigation/native";

export default function TeamCreationScreen() {
  const navigation = useNavigation();

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.teamView}>
        {/* temporary Just here for looks */}

        <View style={styles.charBoard}>
          <Text style={styles.charName}>August</Text>
          <Text style={styles.charSpec}>Power</Text>
          <View style={styles.charImg}>
            <Text>Character Image</Text>
          </View>
          <Text style={styles.charInfo}>Lvl: 1</Text>
          <Text style={styles.charInfo}>Move: 4</Text>
          <Text style={styles.charInfo}>Size: 3</Text>
          <View style={styles.charHealth}></View>
          <View style={styles.charExp}></View>
          <View style={styles.charBaseStats}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Base Stats</Text>
            <Text style={styles.charStat}>Hlth: 23</Text>
            <Text style={styles.charStat}>Str: 11</Text>
            <Text style={styles.charStat}>Def: 8</Text>
            <Text style={styles.charStat}>Mgk: 0</Text>
            <Text style={styles.charStat}>Res: 4</Text>
            <Text style={styles.charStat}>Spd: 7</Text>
            <Text style={styles.charStat}>Skl: 4</Text>
            <Text style={styles.charStat}>Knl: 9</Text>
            <Text style={styles.charStat}>Lck: 4</Text>
            <Text style={styles.charStat}>+Move: 0</Text>
            <Text style={styles.charStat}>+Size: 0</Text>
            <Text style={styles.charStat}>+Ablty: 0</Text>
            <Text style={styles.statsTotal}>Total: 70</Text>
          </View>
          <View style={styles.charBaseAtk}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Base Attack
            </Text>
            <Text style={styles.weapon}>Axe</Text>
            <Text style={styles.atkStat}>Hit%: 75</Text>
            <Text style={styles.atkStat}>Str: 3</Text>
            <Text style={styles.atkStat}>Def: 2</Text>
            <Text style={styles.atkStat}>Mgk: 0</Text>
            <Text style={styles.atkStat}>Res: 0</Text>
            <Text style={styles.atkStat}>Spd: 0</Text>
            <Text style={styles.atkStat}>Skl: 0</Text>
            <Text style={styles.atkStat}>Knl: 0</Text>
            <Text style={styles.atkStat}>Lck: 0</Text>
            <Text style={styles.atkStat}>Range: 1</Text>
          </View>
        </View>
      </View>
      <View key="2" style={styles.teamView}>
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
});
