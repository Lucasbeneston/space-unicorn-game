import React from "react";
import "./Volcano.scss";

export default function Volcano() {
  return (
    <img
      className="volcano"
      src={`${process.env.PUBLIC_URL}/images/volcano.png`}
      alt="volcano"
    />
  );
}
