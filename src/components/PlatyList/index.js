import React, { Component } from 'react';
import Platytude from '../Platytude';
import './PlatyList.css';


class PlatyList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const platytudes = this.props.platys.map((p, i) => (
      <Platytude key={i} sender={p.sender} text={p.text}/>
    ));

    return (
      <div className='PlatyList col-12'>
        { platytudes }
      </div>
    );
  }
}

export default PlatyList;
