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

  loadSelectedImage() {
    const file = document.getElementById("imageSelector").files[0];

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
      <section className="imageEditor">
        <div className="buttonContainer">
          <input type="file" id="imageSelector" accept="image/*"
            onChange={() => this.loadSelectedImage()}
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
