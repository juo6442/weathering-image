import React from 'react';
import SourceImage from './SourceImage';
import './style.css';

class ResultImage extends React.Component {
  changeQuality() {
    const degrade = document.getElementById('qualitySlider').value;
    this.props.onQualityChange(degrade);
  }

  getQualityFromDegrade(degrade) {
    return 1 - (degrade / 100);
  }

  getDegradedImage(source) {
    if (!source) return '';

    const canvas = document.getElementById('resultCanvas');
    canvas.width = source.width;
    canvas.height = source.height;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(source, 0, 0);

    return canvas.toDataURL(
        'image/jpeg',
        this.getQualityFromDegrade(this.props.degrade));
  }

  render() {
    return (
      <div id="resultImageContainer">
        <input type="button" value="Download image" />
        <canvas id="resultCanvas" />
        <img id="resultImage" alt="결과 이미지"
          src={this.getDegradedImage(this.props.source)}
        />
        <input type="range" id="qualitySlider"
          min="0" max="100" step="5"
          value={this.props.degrade}
          onChange={() => this.changeQuality()}
        />
      </div>
    );
  }
}

class TimeMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: null,
      degrade: 0,
    };
  }

  handleImageLoad(image) {
    const sourceImage = document.getElementById('sourceImage');
    sourceImage.src = image;

    const actualSizeImage = new Image();
    actualSizeImage.src = image;
    actualSizeImage.onload = () => {
      this.setState({
        degrade: 0,
        source: actualSizeImage,
      });
    };
  }

  handleQualityChange(degrade) {
    this.setState({
      degrade: degrade,
    });
  }

  render() {
    return (
      <>
        <SourceImage
          onImageLoad={(e) => this.handleImageLoad(e)}
        />
        <ResultImage
          source={this.state.source}
          degrade={this.state.degrade}
          onQualityChange={(e) => this.handleQualityChange(e)}
        />
      </>
    );
  }
}

export default TimeMachine;
