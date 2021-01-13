import React from "react";
import "./Space.scss";

export default function Space() {
  return (
    <div className="space">
      <img
        className="space_planet"
        src={`${process.env.PUBLIC_URL}/images/planet.png`}
        alt="asteroid"
      />
      <img
        className="space_asteroid1"
        src={`${process.env.PUBLIC_URL}/images/asteroid_2.png`}
        alt="asteroid"
      />
      <img
        className="space_asteroid2"
        src={`${process.env.PUBLIC_URL}/images/asteroid_1.png`}
        alt="asteroid"
      />
      <img
        className="space_asteroid3"
        src={`${process.env.PUBLIC_URL}/images/asteroid_3.png`}
        alt="asteroid"
      />
      <img
        className="space_asteroid4"
        src={`${process.env.PUBLIC_URL}/images/asteroid_1.png`}
        alt="asteroid"
      />
    </div>
  );
}
