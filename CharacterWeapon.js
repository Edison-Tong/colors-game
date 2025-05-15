import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { CharacterContext } from "./CharacterContext";
import { weaponAbilities } from "./WeaponAbilityData";

export default function CharacterWeapon() {
  const { character, setCharacter } = useContext(CharacterContext);
  const navigation = useNavigation();

  const [weapon, setWeapon] = useState(
    character.unitType === "Mage" ? "fire" : "sword"
  );
  const [weaponSkills, setWeaponSkills] = useState({});
  const [ability1, setAbility1] = useState(null);
  const [ability2, setAbility2] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const currentAbilities = weaponAbilities[weapon] || [];
  const abilityOptions = currentAbilities.map((ability) => ({
    label: ability.name,
    value: ability.name,
    disabled: ability.name === ability1 || ability.name === ability2,
  }));

  const meleeWeapons = [
    {
      label: "Sword",
      value: "sword",
      stats: { hitChance: 85, strength: 2, skill: 1 },
    },
    {
      label: "Axe",
      value: "axe",
      stats: { hitChance: 75, strength: 3, defense: 2 },
    },
    {
      label: "Dagger",
      value: "dagger",
      stats: { hitChance: 90, strength: 1, speed: 1 },
    },
    {
      label: "Lance",
      value: "lance",
      stats: { hitChance: 80, strength: 2, defense: 1, resistance: 1 },
    },
    {
      label: "Bow",
      value: "bow",
      stats: { hitChance: 85, strength: 2, knowledge: 1 },
    },
    {
      label: "Gauntlets",
      value: "gauntlets",
      stats: { hitChance: 80, strength: 2, luck: 2 },
    },
  ];

  const magicWeapons = [
    { label: "Fire", value: "fire", stats: { hitChance: 80, magick: 4 } },
    {
      label: "Water",
      value: "water",
      stats: { hitChance: 85, magick: 2, skill: 1 },
    },
    {
      label: "Earth",
      value: "earth",
      stats: { hitChance: 75, defense: 2, magick: 2, resistance: 1 },
    },
    {
      label: "Lightning",
      value: "lightning",
      stats: { hitChance: 85, magick: 2, speed: 1 },
    },
    {
      label: "Grass",
      value: "grass",
      stats: { hitChance: 85, defense: 1, resistance: 2 },
    },
    {
      label: "Aether",
      value: "aether",
      stats: { hitChance: 90, magick: 1, knowledge: 1 },
    },
    {
      label: "Wind",
      value: "wind",
      stats: { hitChance: 80, magick: 2, move: 1 },
    },
    { label: "Light", value: "light", stats: { hitChance: 90, resistance: 2 } },
    {
      label: "Dark",
      value: "dark",
      stats: { hitChance: 75, defense: 1, magick: 3, resistance: 1 },
    },
    {
      label: "Gray",
      value: "gray",
      stats: { hitChance: 80, magick: 1, knowledge: 3 },
    },
  ];

  const selectedWeapon =
    character.unitType === "Mage"
      ? magicWeapons.find((w) => w.value === weapon)
      : meleeWeapons.find((w) => w.value === weapon);

  const selectedSkills = [
    weaponAbilities[weapon].find((a) => a.name === ability1) ??
      weaponAbilities.default,
    weaponAbilities[weapon].find((a) => a.name === ability2) ??
      weaponAbilities.default,
  ];

  return (
    <View>
      <Text style={{ textAlign: "center", fontSize: 30 }}>
        Select your weapon
      </Text>
      <DropDownPicker
        open={openDropdown === "weapon"}
        setOpen={(isOpen) => setOpenDropdown(isOpen ? "weapon" : null)}
        value={weapon}
        items={character.unitType === "Mage" ? magicWeapons : meleeWeapons}
        setValue={setWeapon}
        zIndex={4000}
        zIndexInverse={2000}
        style={{ marginBottom: 20 }}
      />
      <View style={styles.weaponStats}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Base Attack</Text>
        <Text style={{ fontWeight: "bold" }}>{weapon}</Text>
        <Text>Hit%: {selectedWeapon.stats.hitChance ?? 0}</Text>
        <Text>Str: {selectedWeapon.stats.strength ?? 0}</Text>
        <Text>Def: {selectedWeapon.stats.defense ?? 0}</Text>
        <Text>Mgk: {selectedWeapon.stats.magick ?? 0}</Text>
        <Text>Res: {selectedWeapon.stats.resistance ?? 0}</Text>
        <Text>Spd: {selectedWeapon.stats.speed ?? 0}</Text>
        <Text>Skl: {selectedWeapon.stats.skill ?? 0}</Text>
        <Text>Knl: {selectedWeapon.stats.knowledge ?? 0}</Text>
        <Text>Lck: {selectedWeapon.stats.luck ?? 0}</Text>
        <Text>Range: {selectedWeapon.stats.range ?? 0}</Text>
      </View>
      <View style={styles.abilities}>
        <View style={styles.ability}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>Ability 1</Text>
          <DropDownPicker
            open={openDropdown === "ability1"}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "ability1" : null)}
            value={ability1}
            items={abilityOptions}
            setValue={setAbility1}
            zIndex={3000}
            zIndexInverse={1000}
            style={{ width: 150, marginBottom: 20 }}
            disabledItemLabelStyle={{ color: "gray" }}
          />
          <View style={styles.weaponStats}>
            <Text>Hit%: {selectedSkills[0].hitChance ?? 0}</Text>
            <Text>Str: {selectedSkills[0].strength ?? 0}</Text>
            <Text>Def: {selectedSkills[0].defense ?? 0}</Text>
            <Text>Mgk: {selectedSkills[0].magick ?? 0}</Text>
            <Text>Res: {selectedSkills[0].resistance ?? 0}</Text>
            <Text>Spd: {selectedSkills[0].speed ?? 0}</Text>
            <Text>Skl: {selectedSkills[0].skill ?? 0}</Text>
            <Text>Knl: {selectedSkills[0].knowledge ?? 0}</Text>
            <Text>Lck: {selectedSkills[0].luck ?? 0}</Text>
            <Text>Range: {selectedSkills[0].range}</Text>
          </View>
        </View>
        <View style={styles.ability}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>Ability 2</Text>
          <DropDownPicker
            open={openDropdown === "ability2"}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "ability2" : null)}
            value={ability2}
            items={abilityOptions}
            setValue={setAbility2}
            zIndex={2000}
            zIndexInverse={500}
            style={{ width: 150, marginBottom: 20 }}
            disabledItemLabelStyle={{ color: "gray" }}
          />
          <View style={styles.weaponStats}>
            <Text>Hit%: {selectedSkills[1].hitChance ?? 0}</Text>
            <Text>Str: {selectedSkills[1].strength ?? 0}</Text>
            <Text>Def: {selectedSkills[1].defense ?? 0}</Text>
            <Text>Mgk: {selectedSkills[1].magick ?? 0}</Text>
            <Text>Res: {selectedSkills[1].resistance ?? 0}</Text>
            <Text>Spd: {selectedSkills[1].speed ?? 0}</Text>
            <Text>Skl: {selectedSkills[1].skill ?? 0}</Text>
            <Text>Knl: {selectedSkills[1].knowledge ?? 0}</Text>
            <Text>Lck: {selectedSkills[1].luck ?? 0}</Text>
            <Text>Range: {selectedSkills[0].range}</Text>
          </View>
        </View>
      </View>
      <Button
        style={styles.submit}
        title="Continue"
        onPress={() => navigation.navigate("CharacterSummary")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  abilities: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  weaponStats: {
    display: "flex",
    alignItems: "center",
  },
});
