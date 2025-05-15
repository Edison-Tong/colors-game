import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { CharacterContext } from "./CharacterContext";
import { weaponAbilities } from "./WeaponAbilityData";

export default function CharacterWeapon() {
  const { character, setCharacter } = useContext(CharacterContext);
  const navigation = useNavigation();

  const [weapon, setWeapon] = useState(character.weapon);
  const [weaponSkills, setWeaponSkills] = useState({});
  const [ability1, setAbility1] = useState(null);
  const [ability2, setAbility2] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const currentAbilities = weaponAbilities[weapon] || [];
  const abilityOptions = currentAbilities.map((ability) => ({
    label: ability.name,
    value: ability.name,
  }));

  const meleeWeapons = [
    { label: "Sword", value: "sword" },
    { label: "Axe", value: "axe" },
    { label: "Dagger", value: "dagger" },
    { label: "Lance", value: "lance" },
    { label: "Bow", value: "bow" },
    { label: "Gauntlets", value: "gauntlets" },
  ];

  const magicWeapons = [
    { label: "Fire", value: "fire" },
    { label: "Water", value: "water" },
    { label: "Earth", value: "earth" },
    { label: "Lightning", value: "lightning" },
    { label: "Grass", value: "grass" },
    { label: "Aether", value: "aether" },
    { label: "Wind", value: "wind" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "Gray", value: "gray" },
  ];

  return (
    <View>
      <Text>Pick a weapon</Text>
      <DropDownPicker
        open={openDropdown === "weapon"}
        setOpen={(isOpen) => setOpenDropdown(isOpen ? "weapon" : null)}
        value={weapon}
        items={character.unitType === "Mage" ? magicWeapons : meleeWeapons}
        setValue={setWeapon}
        zIndex={4000}
        zIndexInverse={2000}
      />
      <View style={styles.abilities}>
        <View style={styles.ability}>
          <Text>Ability 1</Text>
          <DropDownPicker
            open={openDropdown === "ability1"}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "ability1" : null)}
            value={ability1}
            items={abilityOptions}
            setValue={setAbility1}
            zIndex={3000}
            zIndexInverse={1000}
            style={{ width: 150 }}
          />
        </View>
        <View style={styles.ability}>
          <Text>Ability 2</Text>
          <DropDownPicker
            open={openDropdown === "ability2"}
            setOpen={(isOpen) => setOpenDropdown(isOpen ? "ability2" : null)}
            value={ability2}
            items={abilityOptions}
            setValue={setAbility2}
            zIndex={2000}
            zIndexInverse={500}
            style={{ width: 150 }}
          />
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
  ablility: {},
  submit: {},
});
