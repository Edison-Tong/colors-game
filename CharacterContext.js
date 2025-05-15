import React, { createContext, useState } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    name: "",
    label: "",
    unitType: null,
    size: null,
    move: null,
    stats: {},
    weapon: "",
    weaponSkills: {},
  });

  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
