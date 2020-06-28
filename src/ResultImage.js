import React from "react";
import "./style.css";

class ResultImage extends React.Component {
  getQualityFromDegrade(degrade) {
    return (100 - degrade) / 100;
  }

  getImageFromData(data) {
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => {
        resolve(image);
      };
      image.src = data;
    });
  }

  processFirstPass(image, degrade) {
    const canvas = document.createElement("canvas");
    const scale = 1 - degrade / 100 * 0.5 + 0.5;
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL(
      "image/jpeg",
      this.getQualityFromDegrade(this.props.degrade)
    );
  }

  processSecondPass(image, degrade, width, height) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = "black";
    ctx.globalAlpha = degrade / 100 * 0.7;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "color-burn";
    ctx.fillStyle = "rgb(230, 225, 170)";
    ctx.globalAlpha = degrade / 100;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas.toDataURL(
      "image/jpeg",
      this.getQualityFromDegrade(degrade)
    );
  }

  async getDegradedImage(imageData, degrade) {
    if (!imageData) return "";

    const image = await this.getImageFromData(imageData);
    const originalWidth = image.width;
    const originalHeight = image.height;

    let result = this.processFirstPass(image, degrade);
    result = this.processSecondPass(
      await this.getImageFromData(result),
      degrade,
      originalWidth, originalHeight);

    document.getElementById("resultImage").src = result;
  }

  render() {
    return (
      <div id="resultImageContainer">
        <input type="button" value="이미지 저장" />
        <img id="resultImage" alt="결과 이미지"
          src={this.getDegradedImage(this.props.imageData, this.props.degrade)}
        />
        <input type="range" id="qualitySlider"
          min="0" max="100" step="5"
          value={this.props.degrade}
          onChange={(event) => this.props.onQualityChanged(event)}
        />
      </div>
    );
  }
}

export default ResultImage;
