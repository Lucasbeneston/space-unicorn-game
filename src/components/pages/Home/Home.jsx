/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from "react";

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
  console.log("isPlaying conponente ---> ", isPlaying);

  const [isGameOver, setIsGameOver] = useState(false);
  const size = useWindowSize();
  const unicornPosition = 0;
  const map = document.querySelector(".game_map");

  // UNICORN JUMP FUNCTION
  function jump() {
    console.log("Jump !");
  }

  // KEYBOARD "KEYDOWN" EVENT
  document.addEventListener("keydown", (e) => {
    if (!isPlaying) {
      if (e.keyCode === 32 || e.keyCode === 38) {
        jump();
      }
    }
    setIsPlaying(true);
    setIsGameOver(false);
  });

  // GENERATE OBSTACLE FUNCTION
  function generateObstacles() {
    // Random time to generate obstacles
    // const min = 1500; // s
    // const max = 5000; // s
    // const randomTime = Math.floor(Math.random() * (max - min + 1) + min);

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
        unicornPosition < obstacle.clientHeight
      ) {
        setIsGameOver(true);
        setIsPlaying(false);
        clearInterval(timerId);

        // Remove all existing obstacles except the first
        const allObstacles = document.getElementsByClassName("obstacle");
        while (allObstacles[1]) {
          allObstacles[1].parentNode.removeChild(allObstacles[1]);
        }
      }
    }, 20);
    console.log("RENDER generateObstacle() !");
  }

  // Jouer la fonction que si isPlaying est true
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
          {isPlaying ? <h2 className="game_score">Score : 0</h2> : null}

          {!isPlaying && !isGameOver ? (
            <Start message="To start press" />
          ) : null}
          {!isPlaying && isGameOver ? (
            <Start message="To replay press" />
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
