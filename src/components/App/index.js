import React, { Component } from 'react';
import { API_URL } from '../../config';
import Video from './Video';
import Poster from './Poster';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class App extends React.Component {

  constructor(props) {
    super(props);

    this.renderTrailers = this.renderTrailers.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.state = {
      loading: true,
      title: '',
      trailers: [],
      openTrailer: null,
    }
  }

  componentDidMount() {
    fetch(API_URL, { method: 'get' }).then(response => {
      return response.json()
    }).then(data => {
      this.setState({ trailers: data.playlist, loading: false });
    });
  }

  renderTrailers() {
    return this.state.trailers.map((trailer) => {
      return (
        <div className="trailer" key={trailer.mediaid}>
          <button className="transparentButton" onClick={() => this.setState({openTrailer: trailer})}>
            <div className="posterContainer">
              <Poster
                url = { trailer.image}/>

              <h2 className="trailerTitle">{trailer.title}</h2>
            </div>
          </button>
        </div>
      );
    });
  }

  renderOpenTrailer() {

      if (this.state.openTrailer === null) {
        return null;
      }

      return (
        <div className="videoTrailer" key={this.state.openTrailer.mediaid}>
          <h2>{this.state.openTrailer.title}</h2>
            <button className="transparentButton" onClick={() => this.setState({openTrailer: this.state.openTrailer.mediaid})}>
              <div className="videoContainer">
                <Video
                  url = { this.state.openTrailer.sources.filter((trailer)=> trailer.label === '406p')[0].file}/>
              </div>
            </button>
        </div>
      );
  }

  closeModal(e) {

    console.log(e);
    e.stopPropagation();
    this.setState({openTrailer: null});
  }

  render() {

    return (
      <div className="containerRow">
        <button className="transparentButton" onClick={this.closeModal}>
          <Modal className="modal"
            isOpen={this.state.openTrailer !== null}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={(e) => this.closeModal(e)}
            onClick={() => this.setState({openTrailer: null })}
          >

            {this.renderOpenTrailer()}
          </Modal>
        </button>
        {this.renderTrailers()}
      </div>
    )

  }
}

export default App;
