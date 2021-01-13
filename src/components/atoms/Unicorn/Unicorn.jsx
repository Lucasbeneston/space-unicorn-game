import React from "react";
import "./Unicorn.scss";

export default function Unicorn() {
  return (
    <div className="unicorn">
      <img src={`${process.env.PUBLIC_URL}/images/Unicorn.png`} alt="" />
      <audio
        className="unicorn_jumpAudio"
        src={`${process.env.PUBLIC_URL}/audio/jump.flac`}
      >
        <track
          default
          kind="captions"
          src={`${process.env.PUBLIC_URL}/audio/jump.flac`}
        />
      </audio>
    </div>
  );
}
