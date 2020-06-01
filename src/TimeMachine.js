import React from 'react';
import './style.css';

class SourceImage extends React.Component {
  loadSelectedImage() {
    const file = document.getElementById('imageSelector').files[0];

    const reader = new FileReader();
    reader.onload = (e) => this.props.onImageLoad(e.target.result);
    reader.readAsDataURL(file);
  }

  showImageSelector() {
    const selector = document.getElementById('imageSelector');
    selector.click();
  }

  render() {
    return (
      <div id="sourceImageContainer">
        <input type="file" id="imageSelector" accept="image/*"
          onChange={() => this.loadSelectedImage()}
        />
        <input type="button" value="Load image"
          onClick={() => this.showImageSelector()}
        />
        <img id="sourceImage" alt="불러온 이미지" />
      </div>
    );
  }
}

class ResultImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      degrade: 0,
    };
  }

  changeImageQuality() {
    const degrade = document.getElementById('qualitySlider').value;
    console.log(degrade);
    this.setState({degrade: degrade});

    this.getDegradedImage(this.state.degrade);
  }

  getDegradedImage(degrade) {
    const sourceImage = document.getElementById('sourceImage');

    const canvas = document.getElementById('resultCanvas');
    console.log(sourceImage.width);
    canvas.width = sourceImage.width;
    canvas.height = sourceImage.height;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(sourceImage, 0, 0);

    const resultImage = document.getElementById('resultImage');
    resultImage.src = canvas.toDataURL('image/jpeg', 0);
  }

  render() {
    return (
      <div id="resultImageContainer">
        <input type="button" value="Download image"></input>
        <canvas id="resultCanvas" />
        <img id="resultImage" alt="결과 이미지" />
        <input type="range" id="qualitySlider" min="0" max="100" step="5" defaultValue="0" onChange={() => this.changeImageQuality()} />
      </div>
    );
  }
}

class TimeMachine extends React.Component {
  constructor(props) {
    super(props);
  }

  handleImageLoad(image) {
    const sourceImage = document.getElementById('sourceImage');
    sourceImage.src = image;

    const tempImage = new Image();
    tempImage.src = image;
    tempImage.onload = () => {
      this.setState({
        sourceWidth: tempImage.width,
        sourceHeight: tempImage.height,
      });
    };
  }

  render() {
    return (
      <>
        <SourceImage
          onImageLoad={(e) => this.handleImageLoad(e)}
        />
        <ResultImage />
      </>
    );
  }
}

export default TimeMachine;
