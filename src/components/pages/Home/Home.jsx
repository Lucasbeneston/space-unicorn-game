/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import "./Home.scss";

export default function Home() {
  const [isGameOver, setIsGameOver] = useState(false);
  // console.log(isGameOver);

  useEffect(() => {
    const unicorn = document.querySelector(".unicorn");
    const map = document.querySelector(".game_map");
    let isJumping = false;
    const gravity = 0.9;

    function control(e) {
      if (!isGameOver) {
        if (e.keyCode === 32 || e.keyCode === 38) {
          if (!isJumping) {
            isJumping = true;
            jump();
          }
        }
      }
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
          }, 20);
        }
        // Move up
        position += 30;
        count++;
        position *= gravity;
        unicorn.style.bottom = `${position}px`;
      }, 20);
    }

    function generateObstacles() {
      const randomTime = Math.random() * 6000;
      let obstaclePosition = 1000;
      const obstacle = document.createElement("div");
      if (!isGameOver) obstacle.classList.add("obstacle");
      map.appendChild(obstacle);
      obstacle.style.left = `${obstaclePosition}px`;

      const timerId = setInterval(() => {
        if (obstaclePosition > 0 && obstaclePosition < 130 && position < 60) {
          clearInterval(timerId);
          setIsGameOver(true);
          while (map.firstChild) {
            map.removeChild(map.lastChild);
          }
        }

        obstaclePosition -= 10;
        obstacle.style.left = `${obstaclePosition}px`;
      }, 20);
      setTimeout(generateObstacles, randomTime);
    }
    if (!isGameOver) generateObstacles();
  }, [isGameOver]);

  return (
    <div className="game">
      {isGameOver ? <h2 className="game_gameover">Game Over !</h2> : null}
      <div className="game_map">
        <div className="unicorn" />
      </div>
    </div>
  );
}
