import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import MainGame from "./MainGame"; // your PagerView screen

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  return <MainGame user={user} />;
}
