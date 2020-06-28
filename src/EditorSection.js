import React from "react";
import SourceImage from "./SourceImage";
import ResultImage from "./ResultImage";
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

  render() {
    return (
      <section>
        <SourceImage
          imageData={this.state.imageData}
          onImageLoad={(data) => this.handleImageLoad(data)}
        />
        <ResultImage
          degrade={this.state.degrade}
          degradedImage={this.state.degradedImageData}
          onQualityChanged={(event) => this.handleQualityChange(event)}
        />
      </section>
    );
  }
}

export default EditorSection;
