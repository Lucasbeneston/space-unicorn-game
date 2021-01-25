import React from "react";
import Love from "../../atoms/SVGR/Love";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <h5 className="footer_copyright">
        Made with <Love /> by Lucas Beneston
      </h5>
      <a
        className="footer_github"
        href="https://github.com/Lucasbeneston/space-unicorn-game"
      >
        Github
      </a>
    </footer>
  );
}
