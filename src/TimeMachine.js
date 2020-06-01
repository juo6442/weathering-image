import React from 'react';
import './style.css';

class SourceImage extends React.Component {
  constructor(props) {
    super(props);
  }

  loadImage() {
    const imageLoader = document.getElementById('imageLoader');
    imageLoader.click();
  }

  render() {
    return (
      <div id="sourceImage">
        <input type="file" id="imageLoader" accept="image/*"></input>
        <input type="button" value="Load image" onClick={() => this.loadImage()}></input>
        <img></img>
      </div>
    );
  }
}

class ResultImage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="resultImage">
        <input type="button" value="Download image"></input>
        <img></img>
      </div>
    );
  }
}

class TimeMachine extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SourceImage />
        <ResultImage />
      </>
    );
  }
}

export default TimeMachine;
