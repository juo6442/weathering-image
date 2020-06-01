import React from 'react';
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
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0);

    return canvas.toDataURL(
      'image/jpeg',
      this.getQualityFromDegrade(this.props.degrade)
    );
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

export default ResultImage;
