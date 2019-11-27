import React, { Component } from 'react';
import { Fetch } from 'react-request';
import { API_URL } from '../../constants';
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
  }

  setFilter(name) {
    this.state.filterName = name;
    this.forceUpdate();
  }

  clearFilter() {
    this.state.filterName = '';
  }

  render() {
    const hasFilter = this.state.filterName !== '';
    const clearFilterBtn = (
      hasFilter ?
        <a href="" className="pull-right" aria-label="Close">
          <span className="icon"><i className="fa fa-wrapper fa-times"></i></span>
        </a> :
        <div></div>
      );
    const filterText = (hasFilter ? this.state.filterName : 'None');
    const filterFn = (hasFilter ? x => x.sender === this.state.filterName : x => x);
    const nonSuccessMsg = (text) => (
      <div className='row'>
        <div className='filter col-12'>
          <h6>{text}</h6>
        </div>
      </div>
    )

    return (
      <Fetch url={`${API_URL}/platytudes`} method="GET">
        {({ fetching, failed, data }) => {
          if (fetching) {
            return nonSuccessMsg('Loading...');
          }
          if (failed) {
            return nonSuccessMsg('ERROR!');
          }
          if (data) {
            return (
              <div className='row'>
                <div className='row'>
                  <div className='filter col-12 inline'>
                    <h6 className='inline'>
                      {'Active Filter: '}
                      <span className='filter-txt'>
                        {filterText}
                      </span>
                    </h6>
                    {clearFilterBtn}
                  </div>
                </div>
                <div className='row'>
                  <div className='PlatyList col-12'>
                    {data.filter(filterFn).map((p, i) => (
                      <Platytude
                        key={p.id}
                        platytude={p}
                        setFilterCb={() => this.setFilter(p.sender)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        }}
      </Fetch>
    );
  }
}

export default PlatyList;
