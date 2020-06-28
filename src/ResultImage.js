import React from "react";
import "./style.css";

class ResultImage extends React.Component {
  render() {
    return (
      <div className="imageContainer">
        <input type="button" value="이미지 저장" />
        <img className="image" alt="결과 이미지"
          src={this.props.degradedImage}
        />
        <input type="range"
          min="0" max="100" step="5"
          value={this.props.degrade}
          onChange={(event) => this.props.onQualityChanged(event)}
        />
      </div>
    );
  }
}

export default ResultImage;
