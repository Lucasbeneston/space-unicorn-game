/* eslint-disable no-plusplus */
import React, { useRef, useState, useEffect } from "react";

// CUSTOM HOOK
import useWindowSize from "../../../customHooks/useWindowSize";

// COMPONENTS
import ToSmallScreen from "../../molecules/ToSmallScreen/ToSmallScreen";
import Space from "../../organisms/Space/Space";
import Unicorn from "../../atoms/Unicorn/Unicorn";
import Volcano from "../../atoms/Volcano/Volcano";
import Start from "../../molecules/Start/Start";

// STYLE
import "./Home.scss";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const size = useWindowSize();
  const unicornPosition = useRef(0);
  const map = document.querySelector(".game_map");

  // UNICORN JUMP FUNCTION
  useEffect(() => {
    const unicorn = document.querySelector(".unicorn");
    let isJumping = false;

    function jump() {
      let count = 0;
      const gravity = 0.9;

      const jumpTimer = setInterval(() => {
        // Move up
        unicornPosition.current += 30;
        count++;
        unicornPosition.current *= gravity;
        unicorn.style.animation = "none";
        unicorn.style.bottom = `${unicornPosition.current}px`;
        // Move down
        if (count === 15) {
          clearInterval(jumpTimer);
          const downTimer = setInterval(() => {
            if (count === 0) {
              clearInterval(downTimer);
              isJumping = false;
            }
            unicornPosition.current -= 5;
            count--;
            unicornPosition.current *= gravity;
            unicorn.style.bottom = `${unicornPosition.current}px`;
            if (unicornPosition.current < 10)
              unicorn.style.animation = "fly infinite 2s";
          }, 25);
        }
      }, 25);
    }

    // START OR JUMP
    const handleUserKeyPress = (e) => {
      if (!isPlaying) {
        if (e.keyCode === 32 || e.keyCode === 38) {
          if (!isJumping) {
            isJumping = true;
            jump();
          }
        }
      }
      setIsPlaying(true);
      setIsGameOver(false);
    };

    // KEYBOARD "KEYDOWN" EVENT
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
  }, []);

  // GENERATE OBSTACLES FUNCTION
  function generateObstacles() {
    // Create and add new obstacle in the map
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    const img = document.createElement("img");
    img.src = `${process.env.PUBLIC_URL}/images/coronavirus.png`;
    obstacle.appendChild(img);
    map.appendChild(obstacle);

    // Obstacle start position
    let obstaclePosition = 1700; // px
    obstacle.style.left = `${obstaclePosition}px`;

    // Advance the obstacle by 8px every 0.02s
    const timerId = setInterval(() => {
      obstaclePosition -= 8;
      obstacle.style.left = `${obstaclePosition}px`;

      // If the unicorn hits an obstacle
      if (
        obstaclePosition > 0 &&
        obstaclePosition < 130 &&
        unicornPosition.current < obstacle.clientHeight
      ) {
        setIsGameOver(true);
        setIsPlaying(false);
        clearInterval(timerId);

        // Remove all existing obstacles except the first
        const allObstacles = document.getElementsByClassName("obstacle");
        while (("1", allObstacles[0])) {
          allObstacles[0].parentNode.removeChild(allObstacles[0]);
        }
      }
    }, 20);
  }

  // PLAY GENERATEOBSTACLES() ONLY IS ISPLAYING IS TRUE
  useEffect(() => {
    let random;

    function startGenerateObstacle() {
      random = setInterval(generateObstacles, 2000);
    }

    function stopGenerateObstacle() {
      clearInterval(random);
    }

    function startAndStop() {
      if (isPlaying) {
        startGenerateObstacle();
      } else {
        stopGenerateObstacle();
      }
    }

    startAndStop();
    return () => {
      stopGenerateObstacle();
    };
  }, [isPlaying]);

  return (
    <div className="game">
      {size.width > size.height * 1.25 ? (
        <>
          {isPlaying || isGameOver ? (
            <h2 className="game_score">Score : 0</h2>
          ) : null}

          {!isPlaying && !isGameOver ? (
            <Start message="To start press" />
          ) : null}
          {!isPlaying && isGameOver ? (
            <Start option="game over" message="To replay press" />
          ) : null}
        </>
      ) : null}

      <div className="game_map">
        <Unicorn />
        {size.width > size.height * 1.25 ? (
          <>
            <Space />
            <Volcano />
          </>
        ) : (
          <ToSmallScreen />
        )}
      </div>
      <div className="game_ground" />
    </div>
  );
}
