import React from "react";
import "./style.css";

class SourceImage extends React.Component {
  loadSelectedImage() {
    const file = document.getElementById("imageSelector").files[0];

    const reader = new FileReader();
    reader.onload = (e) => this.props.onImageLoad(e.target.result);
    reader.readAsDataURL(file);
  }

  showImageSelector() {
    const selector = document.getElementById("imageSelector");
    selector.click();
  }

  render() {
    return (
      <div id="sourceImageContainer">
        <input type="file" id="imageSelector" accept="image/*"
          onChange={() => this.loadSelectedImage()}
        />
        <input className="" type="button" value="이미지 불러오기"
          onClick={() => this.showImageSelector()}
        />
        <img id="sourceImage" alt="불러온 이미지"
          src={this.props.imageData}
        />
      </div>
    );
  }
}

export default SourceImage;
