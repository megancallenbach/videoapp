import React, { Component } from 'react';
// import '../../App.css';

class Video extends React.Component {

  render() {
    return (
      <video className="video" width='100%' controls autoPlay>
        <source src={this.props.url} type="video/mp4"/>
        Please update your browser to view this content.
      </video>
    );
  }
}

export default Video;
