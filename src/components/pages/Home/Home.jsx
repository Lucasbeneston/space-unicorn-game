/* eslint-disable no-plusplus */
import React, { useState } from "react";
import Space from "../../organisms/Space/Space";
import Unicorn from "../../atoms/Unicorn/Unicorn";
import Volcano from "../../atoms/Volcano/Volcano";
import Start from "../../molecules/Start/Start";

import "./Home.scss";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  document.addEventListener("DOMContentLoaded", () => {
    const unicorn = document.querySelector(".unicorn");
    const jumpAudio = document.querySelector(".unicorn_jumpAudio");

    let unicornPosition = 0;
    let isJumping = false;
    const gravity = 0.9;

    function jump() {
      let count = 0;
      const jumpTimer = setInterval(() => {
        // Move up
        unicornPosition += 30;
        count++;
        unicornPosition *= gravity;
        unicorn.style.animation = "none";
        unicorn.style.bottom = `${unicornPosition}px`;
        // Move down
        if (count === 15) {
          clearInterval(jumpTimer);
          const downTimer = setInterval(() => {
            if (count === 0) {
              clearInterval(downTimer);
              isJumping = false;
            }
            unicornPosition -= 5;
            count--;
            unicornPosition *= gravity;
            unicorn.style.bottom = `${unicornPosition}px`;
            if (unicornPosition < 10)
              unicorn.style.animation = "fly infinite 2s";
          }, 25);
        }
      }, 25);
    }

    function control(e) {
      if (!isPlaying) {
        if (e.keyCode === 32 || e.keyCode === 38) {
          if (!isJumping) {
            isJumping = true;
            jump();
            jumpAudio.volume = 0.5;
            jumpAudio.play();
          }
        }
      }
      setIsPlaying(true);
      setIsGameOver(false);
    }
    document.addEventListener("keydown", control);
  });

  return (
    <div className="game">
      <h2 className="game_score">Score : 0</h2>
      {!isPlaying && !isGameOver ? <Start message="To start press" /> : null}
      {!isPlaying && isGameOver ? <Start message="To replay press" /> : null}
      <div className="game_map">
        <Space />
        <Unicorn />
        <Volcano />
      </div>
      <div className="game_ground" />
    </div>
  );
}
