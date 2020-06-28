import React from 'react';
import './style.css';

class ResultImage extends React.Component {
  changeQuality() {
    const degrade = document.getElementById('qualitySlider').value;
    this.props.onQualityChange(degrade);
  }

  getScaleFromDegrade(degrade) {
    return (100 - degrade) / 100 * 0.5 + 0.5;
  }

  getQualityFromDegrade(degrade) {
    return (100 - degrade) / 100;
  }

  getResizedImage(image, scale) {
    return new Promise(function(resolve, reject) {
      const canvas = document.createElement('canvas');
      canvas.width = image.width * scale;
      canvas.height = image.height * scale;

      const ctx = canvas.getContext('2d');
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      const resizedImage = new Image();
      resizedImage.onload = () => {
        resolve(resizedImage);
      };
      resizedImage.src = canvas.toDataURL('image/jpeg', 0);
    });
  }

  async getDegradedImage(source) {
    if (!source) return '';

    const canvas = document.createElement('canvas');
    canvas.width = source.width;
    canvas.height = source.height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(await this.getResizedImage(source, this.getScaleFromDegrade(this.props.degrade)), 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = "black";
    ctx.globalAlpha = (1 - this.getQualityFromDegrade(this.props.degrade)) * 0.7;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "color-burn";
    ctx.fillStyle = "rgb(234, 225, 176)";
    ctx.globalAlpha = (1 - this.getQualityFromDegrade(this.props.degrade));
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const result = canvas.toDataURL(
      'image/jpeg',
      this.getQualityFromDegrade(this.props.degrade)
    );
    document.getElementById('resultImage').src = result;
  }

  render() {
    return (
      <div id="resultImageContainer">
        <input type="button" value="Download image" />
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
