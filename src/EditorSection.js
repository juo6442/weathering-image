import React from "react";
import { fitImageSize, getDegradedImage } from "./ImageDegrader";
import "./style.css";

const maxImageSize = 1500 * 1500;

class EditorSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      degrade: 0,
      degradedImageData: null,
      degradedImageDataCache: null,
    };

    this.loadSampleImage();
  }

  handleImageLoad(data) {
    fitImageSize(data, maxImageSize)
      .then((result) => {
        const degradedImageDataCache = new Map();
        degradedImageDataCache.set(0, result);

        this.setState({
          degrade: 0,
          imageData: result,
          degradedImageData: result,
          degradedImageDataCache: degradedImageDataCache,
        }, () => this.showDegradedImage(this.state.degrade));
      });
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items[0].kind === "file") {
      const file = event.dataTransfer.items[0].getAsFile();
      this.loadImage(file);
    }
  }

  handleQualityChange(event) {
    this.setState({
      degrade: Number(event.target.value),
    }, () => this.showDegradedImage(this.state.degrade));
  }

  showDegradedImage(degrade) {
    const cache = this.state.degradedImageDataCache.get(degrade);
    if (cache) {
      this.setState({
        degradedImageData: cache,
      });
      return;
    }

    getDegradedImage(this.state.imageData, degrade)
      .then((result) => {
        const degradedImageDataCache = new Map(this.state.degradedImageDataCache);
        degradedImageDataCache.set(degrade, result);

        this.setState({
          degradedImageData: result,
          degradedImageDataCache: degradedImageDataCache,
        });
      });
  }

  loadSampleImage() {
    const sampleImage = new Image();
    sampleImage.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(sampleImage, 0, 0, canvas.width, canvas.height);

      this.handleImageLoad(canvas.toDataURL("Image/jpeg"), 1);
    }
    sampleImage.src = document.URL + "/sample.png";
  }

  loadImage(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => this.handleImageLoad(e.target.result);
    reader.readAsDataURL(file);
  }

  showImageSelector() {
    const selector = document.getElementById("imageSelector");
    selector.click();
  }

  render() {
    return (
      <section className="imageEditor"
        onDragOver={(event) => this.handleDragOver(event)}
        onDrop={(event) => this.handleDrop(event)}
      >
        <div className="buttonContainer">
          <input type="file" id="imageSelector" accept="image/*"
            onChange={(event) => this.loadImage(event.target.files[0])}
          />
          <input type="button" value="이미지 불러오기"
            onClick={() => this.showImageSelector()}
          />
        </div>

        <img className="image" alt="불러온 이미지"
          src={this.state.degradedImageData}
        />

        <input type="range"
          min="0" max="100" step="5"
          value={this.state.degrade}
          onChange={(event) => this.handleQualityChange(event)}
        />
      </section>
    );
  }
}

export default EditorSection;
