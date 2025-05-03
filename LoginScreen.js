// LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginOrSignUp = async () => {
    if (!username || !password) {
      Alert.alert("Missing fields", "Enter both username and password");
      return;
    }

    try {
      // Try signing in
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      onLogin(userCredential.user);
    } catch (signInError) {
      // If user not found, try creating one
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, username, password);
        onLogin(userCredential.user);
      } catch (signUpError) {
        Alert.alert("Error", signUpError.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Colors</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login / Sign Up" onPress={handleLoginOrSignUp} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#101010", justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 40, color: "white" },
  input: { width: "100%", backgroundColor: "#fff", padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16 },
});
