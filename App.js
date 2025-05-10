import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import StartScreen from "./StartScreen";
import TeamCreationScreen from "./TeamCreationScreen";
import CharacterInit from "./CharacterInit";
import CharacterStats from "./CharacterStats";
import CharacterSummary from "./CharacterSummary";
import CharacterWeapon from "./CharacterWeapon";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen
          name="SignUp"
          options={{ title: "Create an Account" }}
          component={SignUpScreen}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="StartScreen"
          options={{ title: "[player-name]'s teams" }}
          component={StartScreen}
        />
        <Stack.Screen
          name="TeamCreationScreen"
          component={TeamCreationScreen}
        />
        <Stack.Screen name="CharacterInit" component={CharacterInit} />
        <Stack.Screen name="CharacterStats" component={CharacterStats} />
        <Stack.Screen name="CharacterWeapon" component={CharacterWeapon} />
        <Stack.Screen name="CharacterSummary" component={CharacterSummary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
