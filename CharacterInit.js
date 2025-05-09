import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";

export default function CharacterInit() {
  const navigation = useNavigation();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [unitValue, setUnitValue] = useState(null);
  const [sizeValue, setSizeValue] = useState(null);

  const unitItems = [
    { label: "Regular", value: "Regular" },
    { label: "Mage", value: "Mage" },
  ];

  const sizeItems = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Character Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Sir Alfred Von Wingle-heimer"
        />
        <Text>Character Label</Text>
        <TextInput
          style={styles.input}
          placeholder="Archer, Speed type, Rogue etc"
        />
        <Text>Unit Type</Text>
        <DropDownPicker
          open={openDropdown === "unit"}
          value={unitValue}
          items={unitItems}
          setOpen={(isOpen) => setOpenDropdown(isOpen ? "unit" : null)}
          setValue={setUnitValue}
          zIndex={3000}
          zIndexInverse={1000}
        />
        <Text>Pick your size</Text>
        <DropDownPicker
          open={openDropdown === "size"}
          value={sizeValue}
          items={sizeItems}
          setOpen={(isOpen) => setOpenDropdown(isOpen ? "size" : null)}
          setValue={setSizeValue}
          zIndex={2000}
          zIndexInverse={2000}
        />
        <Button
          title="Continue"
          onPress={() => navigation.navigate("CharacterStats")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    color: "black",
    backgroundColor: "white",
    paddingRight: 30,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    color: "black",
    backgroundColor: "white",
    paddingRight: 30,
    marginBottom: 20,
  },
});
