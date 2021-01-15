//   const [score, setScore] = useState(0);

// useEffect(() => {
//   const timer = setInterval(() => setScore(score + 1), 10);
//   // if (isGameOver) clearInterval(timer);
//   return () => clearInterval(timer);
// }, [isGameOver, score]);

// const map = document.querySelector(".game_map");

// function generateObstacles() {
//   const randomTime = Math.random() * 5000;
//   let obstaclePosition = 1700; // px

//   const obstacle = document.createElement("div");
//   obstacle.classList.add("obstacle");

//   const img = document.createElement("img");
//   img.src = `${process.env.PUBLIC_URL}/images/coronavirus.png`;

//   obstacle.appendChild(img);
//   map.appendChild(obstacle);

//   obstacle.style.left = `${obstaclePosition}px`;
//   const timerId = setInterval(() => {
//     if (
//       obstaclePosition > 0 &&
//       obstaclePosition < 130 &&
//       unicornPosition < obstacle.clientHeight
//     ) {
//       setIsGameOver(true);
//       setIsPlaying(false);
//       clearInterval(timerId);

//       map.removeChild(map.lastChild);
//     }
//     obstaclePosition -= 8;
//     obstacle.style.left = `${obstaclePosition}px`;
//   }, 20);
//   setTimeout(generateObstacles, randomTime);
// }

// useEffect(() => {
//   if (!isGameOver) generateObstacles();
//   // change to !isGameOver for work
// }, [isGameOver]);
