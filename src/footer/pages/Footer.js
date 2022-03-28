import React from "react";

import {SiTwitter, SiLinkedin} from "react-icons/si";

import "./Footer.css";
const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();

  return (
    <footer>
      <div className = "social-media-container">
        <a title = "twitter" className = "social-media-button" href = "https://twitter.com/CharoYuya" target= "_blank">
          <SiTwitter />
        </a>
        <a title = "linkedin" className = "social-media-button" href = "https://www.linkedin.com/in/yuya-hochi-my-profile/" target= "_blank">
          <SiLinkedin />
        </a>
      </div>
      <div className = "copyright">
        <p>&copy; Copyright {year}</p>
      </div>
    </footer>
  )
};

export default Footer;