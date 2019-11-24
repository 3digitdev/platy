import React, { Component } from 'react';
import platypus from '../../platypus.svg';
import './Platytude.css';

// Helper functions

const randomIndex = (text, skipIdx = -1) => {
  let randIdx = -1;
  const alphaReg = /[A-Za-z]/;
  do {
    randIdx = Math.floor(Math.random() * text.length);
  } while (randIdx === skipIdx || alphaReg.test(text[randIdx]) || text[randIdx] === text[skipIdx]);
  return randIdx;
};

const xformIndices = text => {
  const first = randomIndex(text);
  const second = randomIndex(text, first);
  return (first < second) ? [first, second] : [second, first];
};

const transpose = (text, firstIdx, secondIdx) => (
  text.slice(firstIdx) +
  text[secondIdx] +
  text.slice(firstIdx + 1, secondIdx) +
  text[firstIdx] +
  text.slice(secondIdx + 1, text.length)
);

// REST calls

const getPlatytude = id => {
  // TODO
};

const updatePlatytude = (id, mod) => {
  // TODO
};

const createPlatytude = (sender, plat_text) => {
  const plat = { sender, plat_text, score: 0, xforms: [] };
  // TODO
}

// MAIN STUFF

class Platytude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.key
    };
    this.transposePlatytude = this.transposePlatytude.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.resetPlatytude = this.resetPlatytude.bind(this);
  }

  transposePlatytude(id) {
    const plat = getPlatytude(id);
    const text = plat.plat_text;
    const [first, second] = xformIndices(text);
    const plat_text = transpose(text, first, second);
    const mod = { plat_text, xforms: plat.xforms.push([first, second]) };
    console.log(JSON.stringify(mod));
    updatePlatytude(id, mod);
  }

  incrementScore(id) {
    const plat = getPlatytude(id);
    if (plat.score < 17) {
      const mod = { score: plat.score + 1 };
      console.log(JSON.stringify(mod));
      updatePlatytude(id, mod);
    }
  }

  resetPlatytude(id) {
    const plat = getPlatytude(id);
    let resetTxt = plat.plat_text;
    resetTxt = plat.xforms.reduce((acc, cur) => {
      const [first, second] = cur;
      acc = transpose(acc, first, second);
      return acc;
    }, resetTxt);
    const mod = { score: 0, plat_text: resetTxt, xforms: [] };
    console.log(JSON.stringify(mod));
    updatePlatytude(id, mod);
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
            {this.props.sender}
          </h6>
            <p className='tile__title u-no-margin inline'>{` says...${(new Array(this.props.score)).fill('.').join('')}`}</p>
          <p className='tile_subtitle u-no-margin'>{`"${this.props.text}"`}</p>
          <span className='info'><strong>{'Posted:  '}</strong><em>{'When they felt like it'}</em></span>
        </div>
        <span className='u-no-margin'>
          <button className='btn btn--pilled btn-tiny plat-btn' onClick={() => this.transposePlatytude(this.props.key)}>
            <h6>{'Yup!'}</h6>
          </button>
          <button className='btn btn--pilled btn-tiny plat-btn' onClick={() => this.incrementScore(this.props.key)}>
            <h6>{'Huh.'}</h6>
          </button>
          <button className='btn btn--pilled btn-tiny plat-btn' onClick={() => this.resetPlatytude(this.props.key)}>
            <h6>{'Why?'}</h6>
          </button>
        </span>
      </div>
    );
  }
}

export default Platytude;
