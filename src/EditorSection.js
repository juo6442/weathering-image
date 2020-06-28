import React from "react";
import SourceImage from "./SourceImage";
import ResultImage from "./ResultImage";
import "./style.css";

class EditorSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageData: null,
      degrade: 0,
    };
  }

  handleImageLoad(data) {
    this.setState({
      degrade: 0,
      imageData: data,
    });
  }

  handleQualityChange(event) {
    this.setState({
      degrade: event.target.value,
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
          imageData={this.state.imageData}
          degrade={this.state.degrade}
          onQualityChanged={(event) => this.handleQualityChange(event)}
        />
      </section>
    );
  }
}

export default EditorSection;
