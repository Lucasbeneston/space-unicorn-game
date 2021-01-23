import React from "react";
import GameGround from "../../atoms/GameGround/GameGround";

import "./NoMatch.scss";

export default function NoMatch() {
  return (
    <div className="noMatch">
      <div className="noMatch_informations">
        <h2 className="noMatch_informations_oops">Oops...</h2>
        <h3 className="noMatch_informations_404">404</h3>
        <h4 className="noMatch_informations_notFound">Page not found</h4>
      </div>
      <GameGround />
    </div>
  );
}
