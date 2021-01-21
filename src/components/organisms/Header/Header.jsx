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
    const music = document.querySelector(".header_music");

    if (music !== null) {
      if (gameInformations.music) {
        music.volume = 0.5;
        music.play();
      } else {
        music.pause();
      }
    }
  }, [gameInformations.music]);

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
              className="header_music"
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
        <h3 className="header_highScore">High score : 0</h3>
      ) : null}
    </header>
  );
}
