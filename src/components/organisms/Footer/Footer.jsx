import React from "react";
import Love from "../../atoms/SVGR/Love";

import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <h5 className="footer_copyright">
        Made with <Love /> by{" "}
        <a
          className="footer_copyright_link"
          href="https://www.linkedin.com/in/beneston-lucas/"
        >
          Lucas Beneston
        </a>
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
