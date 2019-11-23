import React, { Component } from 'react';
import icon from '../../platypus.svg';
import Button from '../Button';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  clearFilter() {
    this.props.clearFilterCb();
  }

  render() {
    return (
      <div className="Header">
        <div className="head-wrap">
          <img className="logo" src={icon} alt="Platypus Logo" />
          <div className="app-name">
            <h3>Platy</h3>
          </div>
          <div className="filter"><h6>{this.state.filterName}</h6></div>
          <a className='add-btn' href='#AddPlatytudeModal'>
            <Button text="Add a 'tude" />
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
