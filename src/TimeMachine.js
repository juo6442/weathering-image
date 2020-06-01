import React from 'react';
import './style.css';

class SourceImage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLoadedImage(data) {
    const sourceImage = document.getElementById('sourceImage');
    sourceImage.src = data;
  }

  loadSelectedImage() {
    const file = document.getElementById('imageSelector').files[0];
    console.log(file);

    const reader = new FileReader();
    reader.onload = (e) => this.handleLoadedImage(e.target.result);
    reader.readAsDataURL(file);
  }

  showImageSelector() {
    const selector = document.getElementById('imageSelector');
    selector.click();
  }

  render() {
    return (
      <div id="sourceImageContainer">
        <input type="file" id="imageSelector" accept="image/*" onChange={() => this.loadSelectedImage()} />
        <input type="button" value="Load image" onClick={() => this.showImageSelector()} />
        <img id="sourceImage" />
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
      <div id="resultImageContainer">
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
