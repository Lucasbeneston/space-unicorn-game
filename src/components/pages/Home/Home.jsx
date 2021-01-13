/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import Space from "../../organisms/Space/Space";
import Unicorn from "../../atoms/Unicorn/Unicorn";

import "./Home.scss";
import Volcano from "../../atoms/Volcano/Volcano";

export default function Home() {
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => setScore(score + 1), 10);
  //   return () => clearInterval(timer);
  // }, [isGameOver, score]);

  console.log(setScore);

  useEffect(() => {
    const unicorn = document.querySelector(".unicorn");
    const map = document.querySelector(".game_map");
    const jumpAudio = document.querySelector(".unicorn_jumpAudio");
    let isJumping = false;
    const gravity = 0.9;

    function control(e) {
      if (!isGameOver) {
        if (e.keyCode === 32 || e.keyCode === 38) {
          if (!isJumping) {
            isJumping = true;
            jump();
            jumpAudio.volume = 0.5;
            jumpAudio.play();
          }
        }
      }
      // setIsGameOver(false);
    }
    document.addEventListener("keydown", control);

    let position = 0;

    function jump() {
      let count = 0;
      const timerId = setInterval(() => {
        // Move down
        if (count === 15) {
          clearInterval(timerId);
          const downTimerId = setInterval(() => {
            if (count === 0) {
              clearInterval(downTimerId);
              isJumping = false;
            }
            position -= 5;
            count--;
            position *= gravity;
            unicorn.style.bottom = `${position}px`;
            if (position < 10) unicorn.style.animation = "fly infinite 2s";
          }, 25);
        }
        // Move up
        position += 30;
        count++;
        position *= gravity;
        unicorn.style.animation = "none";
        unicorn.style.bottom = `${position}px`;
      }, 25);
    }

    function generateObstacles() {
      const randomTime = Math.random() * 5000;
      let obstaclePosition = 1700; // px

      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");

      const img = document.createElement("img");
      img.src = `${process.env.PUBLIC_URL}/images/coronavirus.png`;

      obstacle.appendChild(img);
      map.appendChild(obstacle);

      obstacle.style.left = `${obstaclePosition}px`;

      const timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 130 && position < 60) {
          clearInterval(timerId);
          map.removeChild(map.lastChild);
          setIsGameOver(true);
        }
        obstaclePosition -= 8;
        obstacle.style.left = `${obstaclePosition}px`;
      }, 20);

      setTimeout(generateObstacles, randomTime);
    }
    if (!isGameOver === false) generateObstacles();
  }, [isGameOver]);

  return (
    <div className="game">
      <h2 className="game_score">Score : {score}</h2>
      {isGameOver ? <h2 className="game_gameover">Game Over</h2> : null}
      <div className="game_map">
        <Space />
        <Unicorn />
        <Volcano />
      </div>
      <div className="game_ground" />
    </div>
  );
}
