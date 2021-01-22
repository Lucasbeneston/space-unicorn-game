import React, { useContext, useEffect } from "react";
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
    const music = document.querySelector(".atmosphericMusic");
    const jumpAudio = document.querySelector(".jumpAudio");
    const gameOverAudio = document.querySelector(".gameOverAudio");
    const unicorn = document.querySelector(".unicorn");

    if (music !== null) {
      if (gameInformations.music) {
        music.volume = 0.5;
        music.play();
      } else {
        music.pause();
      }
    }

    if (
      gameInformations.effect &&
      jumpAudio === null &&
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

      // Add jump audio and game over audio to unicorn
      unicorn.appendChild(newJumpAudio);
      unicorn.appendChild(newGameOverAudio);
    }

    if (
      !gameInformations.effect &&
      jumpAudio !== null &&
      gameOverAudio !== null
    ) {
      unicorn.removeChild(jumpAudio);
      unicorn.removeChild(gameOverAudio);
    }
  }, [gameInformations]);

  return (
    <header className="header">
      {size.width > size.height * 1.25 ? (
        <div className="header_containerButtons">
          <button
            className={`header_containerButtons_button ${
              gameInformations.effect ? "active" : ""
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
          <button
            className={`header_containerButtons_button ${
              gameInformations.music ? "active" : ""
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
              className="atmosphericMusic"
              style={{ display: "none" }}
              src={`${process.env.PUBLIC_URL}/audio/Music.wav`}
              controls
              loop
            >
              <track
                default
                kind="captions"
                src={`${process.env.PUBLIC_URL}/audio/Music.wav`}
              />
            </audio>
          </button>
        </div>
      ) : null}

      <h1 className="header_title">Space Unicorn Game</h1>
      {size.width > size.height * 1.25 ? (
        <h3 className="header_highScore">
          High score : {gameInformations.highScore}
        </h3>
      ) : null}
    </header>
  );
}
