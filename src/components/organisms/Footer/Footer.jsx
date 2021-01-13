import React from "react";
import "./Footer.scss";

export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      <h5 className="footer_copyright">&copy; {date} - Lucas Beneston</h5>
      <a
        className="footer_github"
        href="https://github.com/Lucasbeneston/space-unicorn-game"
      >
        Github
      </a>
    </footer>
  );
}
