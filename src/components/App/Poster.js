import React, { Component } from 'react';

class Poster extends React.Component {

  render() {
    return (
      <img className="poster"
        width='100%'
        height={this.props.height}
        src={this.props.url}/>
    );
  }
}

export default Poster;
