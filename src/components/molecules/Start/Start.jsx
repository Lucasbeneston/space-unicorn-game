import React from "react";
import PropTypes from "prop-types";

import "./Start.scss";

export default function Start({ option, message }) {
  return (
    <div className="start">
      <h2 className="start_option">{option}</h2>
      <h2 className="start_title">{message}</h2>
      <div className="start_keyboardIndication">
        <p>space</p>
        <span>or</span>
        <p>arrowUp</p>
      </div>
    </div>
  );
}
Start.defaultProps = {
  option: null,
};

Start.propTypes = {
  option: PropTypes.string,
  message: PropTypes.string.isRequired,
};
