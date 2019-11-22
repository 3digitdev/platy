import React, { Component } from 'react';
import './Platytude.css';

class Platytude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className='Platytude'>
        <h4 className='sender'>{`${this.props.sender} says...`}</h4>
        <div className='platy-txt'>
          <p className='inline'>{`"${this.props.text}"`}</p>
        </div>
      </div>
    );
  }
}

export default Platytude;
