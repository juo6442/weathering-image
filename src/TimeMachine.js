import React from 'react';
import SourceImage from './SourceImage';
import './style.css';

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
  handleImageLoad(image) {
    const sourceImage = document.getElementById('sourceImage');
    sourceImage.src = image;

    const tempImage = new Image();
    tempImage.src = image;
    tempImage.onload = () => {
      this.setState({
        source: {
          data: image,
          width: tempImage.width,
          height: tempImage.height,
        }
      });
    };
  }

  render() {
    return (
      <>
        <SourceImage
          onImageLoad={(e) => this.handleImageLoad(e)}
        />
        <ResultImage
          source={this.source}
        />
      </>
    );
  }
}

export default TimeMachine;
