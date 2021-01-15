import React from "react";
import PropTypes from "prop-types";

export default function Start({ message }) {
  return (
    <div className="game_start">
      <h2 className="game_start_title">{message}</h2>
      <div className="game_start_keyboardIndication">
        <p>space</p>
        <span>or</span>
        <p>arrowUp</p>
      </div>
    </div>
  );
}

Start.propTypes = {
  message: PropTypes.string.isRequired,
};
