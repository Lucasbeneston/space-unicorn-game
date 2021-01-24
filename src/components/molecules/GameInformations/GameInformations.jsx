import React from "react";
import PropTypes from "prop-types";

import "./GameInformation.scss";

export default function GameInformations({ score, speedLevel }) {
  return (
    <div className="gameInformations">
      <div className="gameInformations_score">
        <h2>000000</h2>
        <span>{score}</span>
      </div>
      <div className="gameInformations_speedLevel">
        <h2>Level</h2>
        <span>{speedLevel}</span>
      </div>
    </div>
  );
}

GameInformations.propTypes = {
  speedLevel: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
