/* eslint-disable no-plusplus */
import React, { useContext, useRef, useState, useEffect } from "react";
import { isSafari, isIE } from "react-device-detect";
import GameInformationsContext from "../../../contexts/InformationsGameContext";
import useWindowSize from "../../../customHooks/useWindowSize";
import ToSmallScreen from "../../molecules/ToSmallScreen/ToSmallScreen";
import Space from "../../organisms/Space/Space";
import Unicorn from "../../atoms/Unicorn/Unicorn";
import Volcano from "../../atoms/Volcano/Volcano";
import GameGround from "../../atoms/GameGround/GameGround";
import Start from "../../molecules/Start/Start";

import "./Home.scss";

export default function Home() {
  // CONTEXT
  const context = useContext(GameInformationsContext);
  const { gameInformations, setGameInformations } = context;

  // STATES
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [effects, setEffects] = useState({
    jump: null,
    gameOver: null,
  });
  const [randomTime, setRandomTime] = useState(0);

  const size = useWindowSize();
  const unicornPosition = useRef(0);
  const map = document.querySelector(".game_map");

  useEffect(() => {
    setEffects({
      jump: document.querySelector(".jumpAudio"),
      gameOver: document.querySelector(".gameOverAudio"),
    });
  }, [gameInformations]);

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
    function handleUserKeyPress(e) {
      if (e.keyCode === 32 || e.keyCode === 38) {
        e.preventDefault();

        if (!isJumping) {
          isJumping = true;
          jump();
          if (effects.jump !== null && !isSafari && !isIE) {
            effects.jump.play();
          }
        }
        if (!isPlaying) {
          setIsPlaying(true);
          setIsGameOver(false);
          if (score > 0) setScore(0);
        }
      }
    }

    // KEYBOARD "KEYDOWN" EVENT
    document.addEventListener("keydown", handleUserKeyPress);
    return () => {
      document.removeEventListener("keydown", handleUserKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, effects]);

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
        if (effects.gameOver !== null && !isSafari && !isIE) {
          effects.gameOver.play();
        }
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
    const min = 1000; // ms
    const max = 2500; // ms
    setRandomTime(Math.floor(Math.random() * (max - min + 1) + min));
  }

  // UPDATE SCORE WHEN ISPLAYING IS TRUE
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => setScore(score + 1), 100);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPlaying, score]);

  // PLAY GENERATEOBSTACLES() ONLY IS ISPLAYING IS TRUE
  useEffect(() => {
    let intervalGenerateObstacles;

    function startGenerateObstacle() {
      intervalGenerateObstacles = setInterval(generateObstacles, randomTime);
    }

    function stopGenerateObstacle() {
      clearInterval(intervalGenerateObstacles);
      if (score > gameInformations.highScore && isGameOver) {
        setGameInformations({
          ...gameInformations,
          highScore: score,
        });
      }
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
      clearInterval(intervalGenerateObstacles);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, randomTime]);

  return (
    <div className="game">
      {size.width > size.height * 1.25 ? (
        <>
          {isPlaying || isGameOver ? (
            <h2 className="game_score">Score : {score}</h2>
          ) : null}

          {!isPlaying && !isGameOver ? (
            <Start message="To start press" />
          ) : null}
          {!isPlaying && isGameOver ? (
            <Start option="- game over -" message="To replay press" />
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
      <GameGround />
    </div>
  );
}
