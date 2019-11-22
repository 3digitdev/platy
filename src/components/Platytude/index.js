import React, { Component } from 'react';
import Button from '../Button';
import platypus from '../../platypus.svg';
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
      <div className='Platytude tile'>
        <div className='tile__icon u-hide-mobile'>
          <figure className='avatar avatar--large'>
            <img src={platypus} alt="Platypus avatar"/>
          </figure>
        </div>
        <div className='tile__container'>
          <p className='tile__title u-no-margin'>{`${this.props.sender} says...`}</p>
          <p className='tile_subtitle u-no-margin'>{`"${this.props.text}"`}</p>
          <span className='info'><strong>{'Posted:  '}</strong><em>{'When they felt like it'}</em></span>
        </div>
        <span className='u-no-margin'>
          <Button extraClass='inline' btnClass='btn-tiny plat-btn' text='Yup'/>
          <Button extraClass='inline' btnClass='btn-tiny plat-btn' text='Huh'/>
          <Button extraClass='inline' btnClass='btn-tiny plat-btn' text='Right?'/>
        </span>
      </div>
    );
  }
}

export default Platytude;
