import React from "react";
import { getDegradedImage } from "./ImageDegrader";
import "./style.css";

class EditorSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      degrade: 0,
      degradedImageData: null,
    };

    this.loadSampleImage();
  }

  handleImageLoad(data) {
    this.setState({
      degrade: 0,
      imageData: data,
      degradedImageData: getDegradedImage(data, 0),
    }, this.refreshResult);
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDrop(event) {
    event.preventDefault();

    if (event.dataTransfer.items[0].kind === "file") {
      const file = event.dataTransfer.items[0].getAsFile();
      this.loadSelectedImage(file);
    }
  }

  handleQualityChange(event) {
    this.setState({
      degrade: event.target.value,
    }, this.refreshResult);
  }

  refreshResult() {
    getDegradedImage(this.state.imageData, this.state.degrade)
      .then((result) => {
        this.setState({
          degradedImageData: result,
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

      this.handleImageLoad(canvas.toDataURL("Image/jpeg"));
    }
    sampleImage.src = "sample.png";
  }

  loadSelectedImage(file) {
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
            onChange={(event) => this.loadSelectedImage(event.target.files[0])}
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
