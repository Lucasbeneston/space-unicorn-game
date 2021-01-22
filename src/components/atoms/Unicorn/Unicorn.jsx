import React from "react";

import "./Unicorn.scss";

export default function Unicorn() {
  return (
    <div className="unicorn">
      <img src={`${process.env.PUBLIC_URL}/images/Unicorn.png`} alt="" />
      {/* <audio
        className="jumpAudio"
        style={{ display: "none" }}
        src={`${process.env.PUBLIC_URL}/audio/Jump.ogg`}
      >
        <track
          default
          kind="captions"
          src={`${process.env.PUBLIC_URL}/audio/Jump.ogg`}
        />
      </audio> */}
    </div>
  );
}
