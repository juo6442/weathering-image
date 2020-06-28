import React from "react";
import "./style.css";

let githubUrl = "https://github.com/juo6442/weathering-image";

function Footer(props) {
  return (
    <footer>
      <hr />
      <p>Github: <a href={githubUrl}>{githubUrl}</a></p>
    </footer>
  );
}

export default Footer;
