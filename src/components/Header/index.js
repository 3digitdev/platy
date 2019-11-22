import React, { Component } from 'react';
import icon from '../../platypus.svg';
import Button from '../Button';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div className="Header">
        <div className="head-wrap">
          <img className="logo" src={icon} alt="Platypus Logo" />
          <div className="app-name">
            <h3>Platy</h3>
          </div>
          <Button extraClass="add-btn" text="Add a 'tude" />
        </div>
      </div>
    );
  }
}

export default Header;
