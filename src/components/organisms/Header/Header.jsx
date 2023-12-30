import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { isSafari, isIE } from "react-device-detect";
import useWindowSize from "../../../customHooks/useWindowSize";
import GameInformationsContext from "../../../contexts/InformationsGameContext";
import Effect from "../../atoms/SVGR/Effect";
import Music from "../../atoms/SVGR/Music";
import "./Header.scss";

export default function Header() {
  const size = useWindowSize();
  const context = useContext(GameInformationsContext);
  const { gameInformations, setGameInformations } = context;

  useEffect(() => {
    const atmosphereAudio = document.querySelector(".atmosphericAudio");
    const jumpAudio = document.querySelector(".jumpAudio");
    const gameOverAudio = document.querySelector(".gameOverAudio");
    const levelUp = document.querySelector(".levelUp");
    const unicorn = document.querySelector(".unicorn");

    if (
      gameInformations.effect &&
      unicorn !== null &&
      jumpAudio === null &&
      levelUp === null &&
      gameOverAudio === null
    ) {
      // New jump audio
      const newJumpAudio = document.createElement("audio");
      newJumpAudio.classList.add("jumpAudio");
      newJumpAudio.src = `${process.env.PUBLIC_URL}/audio/Jump.ogg`;
      newJumpAudio.style.display = "none";

      // New game over audio
      const newGameOverAudio = document.createElement("audio");
      newGameOverAudio.classList.add("gameOverAudio");
      newGameOverAudio.src = `${process.env.PUBLIC_URL}/audio/GameOver.ogg`;
      newGameOverAudio.style.display = "none";

      // New level up audio
      const newLevelUpAudio = document.createElement("audio");
      newLevelUpAudio.classList.add("levelUp");
      newLevelUpAudio.src = `${process.env.PUBLIC_URL}/audio/LevelUp.ogg`;
      newLevelUpAudio.style.display = "none";

      // Add jump audio and game over audio to unicorn
      unicorn.appendChild(newJumpAudio);
      unicorn.appendChild(newGameOverAudio);
      unicorn.appendChild(newLevelUpAudio);
    }

    if (
      !gameInformations.effect &&
      jumpAudio !== null &&
      gameOverAudio !== null &&
      levelUp !== null
    ) {
      unicorn.removeChild(jumpAudio);
      unicorn.removeChild(gameOverAudio);
      unicorn.removeChild(levelUp);
    }

    if (atmosphereAudio !== null) {
      if (gameInformations.music && !isSafari && !isIE) {
        atmosphereAudio.volume = 0.25;
        atmosphereAudio.play();
      } else {
        atmosphereAudio.pause();
      }
    }
  }, [gameInformations]);

  return (
    <header className="header">
      {size.width > size.height * 1.25 ? (
        <div className="header_containerButtons">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className={`header_containerButtons_button ${
              gameInformations.effect && !isSafari ? "active" : ""
            }`}
            type="button"
            onClick={() => {
              setGameInformations({
                ...gameInformations,
                effect: !gameInformations.effect,
              });
            }}
          >
            <Effect />
          </button>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className={`header_containerButtons_button musicButton ${
              gameInformations.music && !isSafari ? "active" : ""
            }`}
            type="button"
            onClick={() => {
              setGameInformations({
                ...gameInformations,
                music: !gameInformations.music,
              });
            }}
          >
            <Music />
            <audio
              className="atmosphericAudio"
              style={{ display: "none" }}
              src={`${process.env.PUBLIC_URL}/audio/Music.ogg`}
              controls
              loop
            >
              <track
                default
                kind="captions"
                src={`${process.env.PUBLIC_URL}/audio/Music.ogg`}
              />
            </audio>
          </button>
        </div>
      ) : null}

      <Link className="header_title" to="/">
        <h1>Space Unicorn Game</h1>
      </Link>
      {size.width > size.height * 1.25 ? (
        <h3 className="header_highScore">
          High score : {gameInformations.highScore}
        </h3>
      ) : null}
    </header>
  );
}
