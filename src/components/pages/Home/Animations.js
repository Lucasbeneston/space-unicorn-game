//   const [score, setScore] = useState(0);
// const [isPlaying, setIsPlaying] = useState(false);
// const [isGameOver, setIsGameOver] = useState(false);

// useEffect(() => {
//   const timer = setInterval(() => setScore(score + 1), 100);
//   // if (isGameOver) clearInterval(timer);
//   return () => clearInterval(timer);
// }, [isGameOver, score]);

// const unicorn = document.querySelector(".unicorn");
// let unicornPosition = 0;
// let isJumping = false;
// const gravity = 0.9;

// function jump() {
//   let count = 0;
//   const jumpTimer = setInterval(() => {
//     // Move up
//     unicornPosition += 30;
//     count++;
//     unicornPosition *= gravity;
//     unicorn.style.animation = "none";
//     unicorn.style.bottom = `${unicornPosition}px`;
//     // Move down
//     if (count === 15) {
//       clearInterval(jumpTimer);
//       const downTimer = setInterval(() => {
//         if (count === 0) {
//           clearInterval(downTimer);
//           isJumping = false;
//         }
//         unicornPosition -= 5;
//         count--;
//         unicornPosition *= gravity;
//         unicorn.style.bottom = `${unicornPosition}px`;
//         if (unicornPosition < 10) unicorn.style.animation = "fly infinite 2s";
//       }, 25);
//     }
//   }, 25);
// }

// function control(e) {
//   if (!isPlaying) {
//     if (e.keyCode === 32 || e.keyCode === 38) {
//       if (!isJumping) {
//         isJumping = true;
//         jump();
//       }
//     }
//   }
//   setIsPlaying(true);
//   setIsGameOver(false);
// }
// document.addEventListener("keydown", control);

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
