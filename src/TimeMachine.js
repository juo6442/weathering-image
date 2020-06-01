import React from 'react';
import SourceImage from './SourceImage';
import ResultImage from './ResultImage';
import './style.css';

class TimeMachine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      source: null,
      degrade: 0,
    };
  }

  handleImageLoad(image) {
    const sourceImage = document.getElementById('sourceImage');
    sourceImage.src = image;

    const actualSizeImage = new Image();
    actualSizeImage.src = image;
    actualSizeImage.onload = () => {
      this.setState({
        degrade: 0,
        source: actualSizeImage,
      });
    };
  }

  handleQualityChange(degrade) {
    this.setState({
      degrade: degrade,
    });
  }

  render() {
    return (
      <>
        <SourceImage
          onImageLoad={(e) => this.handleImageLoad(e)}
        />
        <ResultImage
          source={this.state.source}
          degrade={this.state.degrade}
          onQualityChange={(e) => this.handleQualityChange(e)}
        />
      </>
    );
  }
}

export default TimeMachine;
