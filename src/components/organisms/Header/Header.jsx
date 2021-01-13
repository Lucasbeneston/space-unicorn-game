import React, { useState, useEffect } from "react";
import Effect from "../../atoms/SVGR/Effect";
import Music from "../../atoms/SVGR/Music";
import "./Header.scss";

export default function Header() {
  const [isPlaying, setIsPlaying] = useState({
    music: false,
    effect: true,
  });

  useEffect(() => {
    const music = document.querySelector(".header_music");

    if (isPlaying.music) {
      music.volume = 0.5;
      music.play();
    } else {
      music.pause();
    }
  }, [isPlaying]);

  return (
    <header className="header">
      <div className="header_containerButtons">
        <button
          className={`header_containerButtons_button ${
            isPlaying.effect ? "active" : ""
          }`}
          type="button"
          // onClick={() => {
          //   setIsPlaying({ ...isPlaying, effect: !isPlaying.effect });
          // }}
        >
          <Effect />
        </button>
        <button
          className={`header_containerButtons_button ${
            isPlaying.music ? "active" : ""
          }`}
          type="button"
          onClick={() => {
            setIsPlaying({ ...isPlaying, music: !isPlaying.music });
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
      <h1 className="header_title">Space Unicorn Game</h1>
      <h3 className="header_highScore">Hight score : 0</h3>
    </header>
  );
}
