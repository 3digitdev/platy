import React, { Component } from 'react';
import './AddModal.css';

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const platytude = (new FormData(event.target)).get('platytude');
    console.log(platytude);
    // TODO: GET DATETIME AND USER, THEN SEND DATA TO SERVER
  }

  render() {
    return (
      <div className="AddModal modal modal-large" id="AddPlatytudeModal">
        <a href="#DONTMOVE" className="modal-overlay close-btn" aria-label="Close"></a>
        <div className="modal-content" role="document">
        <div className="modal-header">
          <a href="" className="pull-right" aria-label="Close"><span className="icon"><i className="fa fa-wrapper fa-times"></i></span></a>
          <div className="modal-title">{'Add a Platytude'}</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="modal-body">
            <div className="input-control">
              <label className="inline" for="p-platytude">{'Name:'}</label>
              <input className="name-input" id="p-name" type="text" name="name" placeholder="&nbsp;" />
              <span className="border"></span>
            </div>
            <div className="input-control">
              <label for="p-platytude">{'Platytude:'}</label>
              <textarea className="platytude-input" id="p-platytude" name="platytude" placeholder="&nbsp;" />
              <span className="border"></span>
            </div>
          </div>
          <div className="modal-footer">
              <button className="btn btn--pilled" ><h6>Submit</h6></button>
          </div>
        </form>
    </div>
      </div>
    );
  }
}

export default AddModal;
