// import React, { useState } from "react";
// import LoginScreen from "./LoginScreen";
// import SignUpScreen from "./SignUpScreen";
// import MainGame from "./MainGame";

// export default function App() {
//   const [user, setUser] = useState(null);
//   const [screen, setScreen] = useState("signup"); // can be "signup" or "login"

//   if (!user) {
//     if (screen === "signup") {
//       return <SignUpScreen onSwitch={() => setScreen("login")} onLogin={setUser} />;
//     } else {
//       return <LoginScreen onSwitch={() => setScreen("signup")} onLogin={setUser} />;
//     }
//   }

//   return <MainGame user={user} />;
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";
import MainGame from "./MainGame";
console.log("App component rendered");

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUp">
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainGame" component={MainGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
