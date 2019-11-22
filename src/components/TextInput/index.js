import React, { Component } from 'react';
import './TextInput.css';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  
  render() {
    return <div className="TextInput" />;
  }
}

export default TextInput;
