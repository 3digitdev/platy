import React, { Component } from 'react';
import Platytude from '../Platytude';
import './PlatyList.css';


class PlatyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: ''
    };
    this.setFilter = this.setFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    // this.renderFilter = this.renderFilter.bind(this);
  }

  setFilter(name) {
    this.state.filterName = name;
    this.forceUpdate();
  }

  clearFilter() {
    this.state.filterName = '';
  }

  render() {
    const platytudes = this.props.platys.map((p, i) => (
      <Platytude
        key={i}
        sender={p.sender}
        text={p.text}
        setFilterCb={() => this.setFilter(p.sender)}
      />
    ));
    const hasFilter = this.state.filterName !== '';
    const clearFilterBtn = (
      hasFilter ?
        <a href="" className="pull-right" aria-label="Close">
          <span className="icon"><i className="fa fa-wrapper fa-times"></i></span>
        </a> :
        <div></div>
      );
    const filterText = (hasFilter ? this.state.filterName : 'None');

    return (
      <div>
        <div className='row'>
          <div className='filter col-12 inline'>
            <h6 className='inline'>{'Active Filter: '}<span className='filter-txt'>{filterText}</span></h6>
            {clearFilterBtn}
          </div>
        </div>
        <div className='row'>
          <div className='PlatyList col-12'>
            { platytudes }
          </div>
        </div>
      </div>
    );
  }
}

export default PlatyList;
