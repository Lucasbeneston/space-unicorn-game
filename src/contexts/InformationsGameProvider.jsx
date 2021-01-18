import React, { useEffect } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../customHooks/useLocalStorage";
import InformationsGameContext from "./InformationsGameContext";

export default function InformationsGameProvider({ children }) {
  const [gameInformations, setGameInformations] = useLocalStorage(
    "information",
    {
      music: false,
      effect: true,
      highScore: 0,
    }
  );

  useEffect(() => {
    setGameInformations(gameInformations);
  }, []);

  const contextInformationsGame = {
    gameInformations,
    setGameInformations,
  };

  return (
    <InformationsGameContext.Provider value={contextInformationsGame}>
      {children}
    </InformationsGameContext.Provider>
  );
}

InformationsGameProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
