import React, { Component } from 'react';
import { Fetch } from 'react-request';
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

    return (
      <Fetch url='http://localhost:5000/platytudes'>
        {({ fetching, failed, data }) => {
          console.log(fetching, failed, data)
          if (fetching) {
            return (
              <div className='row'>
                <div className='filter col-12'>
                  <h6>{'Loading...'}</h6>
                </div>
              </div>
            );
          }
          if (failed) {
            return (
              <div className='row'>
                <div className='filter col-12'>
                  <h6>{'ERROR!'}</h6>
                </div>
              </div>
            );
          }
          if (data) {
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
                    {data.map(p => (
                      <Platytude
                        key={p.id}
                        sender={p.sender}
                        text={p.plat_text}
                        score={p.score}
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
