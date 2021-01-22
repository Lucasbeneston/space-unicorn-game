import React from "react";

import "./Unicorn.scss";

export default function Unicorn() {
  return (
    <div className="unicorn">
      <img src={`${process.env.PUBLIC_URL}/images/Unicorn.png`} alt="" />
    </div>
  );
}
