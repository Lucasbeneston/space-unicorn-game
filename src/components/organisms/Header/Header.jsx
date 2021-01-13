import React from "react";
import Effect from "../../atoms/SVGR/Effect";
import Music from "../../atoms/SVGR/Music";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header">
      <div className="header_buttons">
        <button type="button">
          <Effect />
        </button>
        <button type="button">
          <Music />
        </button>
      </div>
      <h1 className="header_title">Space Unicorn Game</h1>
      <h3 className="header_highScore">Hight score : 0</h3>
    </header>
  );
}
