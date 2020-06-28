import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Footer from "./Footer";
import EditorSection from "./EditorSection";
import "./style.css";

function App(props) {
  return (
    <>
      <Header />
      <EditorSection />
      <Footer />
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
