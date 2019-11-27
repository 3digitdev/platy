import React, { Component } from 'react';
import { Fetch } from 'react-request';
import platypus from '../../platypus.svg';
import './Platytude.css';
const { API_URL } = require('../../constants');

// Helper functions

const randomIndex = (text, skipIdx = -1) => {
  let randIdx = -1;
  const alphaReg = /[^A-Za-z]/;
  do {
    randIdx = Math.floor(Math.random() * text.length);
  } while (randIdx === skipIdx || alphaReg.test(text[randIdx]) || text[randIdx] === text[skipIdx]);
  return randIdx;
};

const transpose = (text, firstIdx, secondIdx) => {
  const first = randomIndex(text);
  const second = randomIndex(text, first);
  [ firstIdx, secondIdx ] = (first < second) ? [first, second] : [second, first];
  let firstChar = text[firstIdx];
  let secondChar = text[secondIdx];
  if (firstIdx === 0) {
    firstChar = firstChar.toLowerCase();
    secondChar = secondChar.toUpperCase();
  }
  return text.slice(0, firstIdx) +
         secondChar +
         text.slice(firstIdx + 1, secondIdx) +
         firstChar +
         text.slice(secondIdx + 1, text.length);
};

// MAIN STUFF

class Platytude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.platytude
    };
    this.transposePlatytude = this.transposePlatytude.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.resetPlatytude = this.resetPlatytude.bind(this);
    this.clickFn = this.clickFn.bind(this);
    this.renderPlatBtns = this.renderPlatBtns.bind(this);
  }

  transposePlatytude(platytude) {
    const plat_text = transpose(platytude.plat_text)
    return { plat_text };
  }

  incrementScore(platytude) {
    return (platytude.score < 17) ? { score: platytude.score + 1 } : {}
  }

  resetPlatytude(platytude) {
    return { score: 0, plat_text: platytude.original_text };
  }

  clickFn(doFetch, innerFn) {
    const body = JSON.stringify(innerFn(this.state.data));
    doFetch({ body }).then(after =>
      this.setState(prev => {
        return after;
      })
    );
    this.forceUpdate();
  }

  renderPlatBtns() {
    return [
      { innerFn: this.transposePlatytude, text: 'Yup!' },
      { innerFn: this.incrementScore, text: 'Huh.' },
      { innerFn: this.resetPlatytude, text: 'Why?' }
    ].map(({ innerFn, text }) => (
      <Fetch
        url={`${API_URL}/platytude/${this.state.data.id}`}
        method="PUT"
        headers={{ 'Content-Type': 'application/json' }}>
        {({ fetching, failed, doFetch }) =>
          <button
            className='btn btn--pilled btn-tiny plat-btn'
            onClick={() => this.clickFn(doFetch, innerFn)}>
            <h6>{text}</h6>
          </button>
        }
      </Fetch>
    ));
  }

  render() {
    return (
      <div className='Platytude tile'>
        <div className='tile__icon u-hide-mobile'>
          <figure className='avatar avatar--large'>
            <img src={platypus} alt="Platypus avatar"/>
          </figure>
        </div>
        <div className='tile__container'>
          <h6 className="inline" onClick={this.props.setFilterCb}>
            {this.state.data.sender}
          </h6>
            <p className='tile__title u-no-margin inline'>{` says...${(new Array(this.state.data.score)).fill('.').join('')}`}</p>
          <p className='tile_subtitle u-no-margin'>{`"${this.state.data.plat_text}"`}</p>
          <span className='info'><strong>{'Posted:  '}</strong><em>{'When they felt like it'}</em></span>
        </div>
        <span className='u-no-margin'>
          {this.renderPlatBtns()}
        </span>
      </div>
    );
  }
}

export default Platytude;
