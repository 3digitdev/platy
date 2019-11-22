import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className={`Button ${this.props.extraClass}`}>
        <button className='btn btn--pilled'>
          <h6>{this.props.text}</h6>
        </button>
      </div>
    );
  }
}

export default Button;
