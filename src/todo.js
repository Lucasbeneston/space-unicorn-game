// TO DO LIST :
// - RANDOM TIME TO GENERATE OBSTACLES
// - AUGMENTER LE SCORE QUAND ISPLAYING = TRUE
// - UPDATE HIGH SCORE SI SCORE > HIGH SCORE QUAND ISGAMEOVER = TRUE
// - AJOUTER UN SON DE GAME OVER
// - FAIRE AVANCER LE TERRAIN QUAND ISPLAYING = TRUE
// - FAIRE AVANCER LES ÉTOILES PLUS VITE QUAND ISPLAYING = TRUE
// - UTILISER UN COMPONENT OBSTACLE PLUTÔT QUE DE CRÉER DIV + CLASSNAME + ...
// - ÉCRIRE README EN ANGLAIS
// - GÉRER ON/OFF DES BRUITAGES
// - AFFICHER SCORE SOUS UNE NOUVELLE FORME ET CENTRÉ : 000000 > 000345

// - RANDOM TIME TO GENERATE OBSTACLES
// const min = 1500; // s
// const max = 5000; // s
// const randomTime = Math.floor(Math.random() * (max - min + 1) + min);

// - AUGMENTER LE SCORE QUAND ISPLAYING = TRUE
// useEffect(() => {
//   const timer = setInterval(() => setScore(score + 1), 100);
//   // if (isGameOver) clearInterval(timer);
//   return () => clearInterval(timer);
// }, [isGameOver, score]);
