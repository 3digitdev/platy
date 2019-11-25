import React, { Component } from 'react';
import { Fetch } from 'react-request';
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
    const form = new FormData(event.target);
    const plat_text = form.get('platytude')[0].toUpperCase() + form.get('platytude').slice(1);
    const platytude = { sender: form.get('name'), plat_text };
    return platytude;
  }

  render() {
    return (
      <Fetch url="http://localhost:5000/platytude"
             method="POST"
             headers={{ 'Content-Type': 'application/json' }}>
        {({ fetching, failed, doFetch }) => (
          <div className="AddModal modal modal-large" id="AddPlatytudeModal">
            <a href="#DONTMOVE" className="modal-overlay close-btn" aria-label="Close"></a>
            <div className="modal-content" role="document">
              <div className="modal-header">
                <a href="" className="pull-right" aria-label="Close"><span className="icon"><i className="fa fa-wrapper fa-times"></i></span></a>
                <div className="modal-title">{'Add a Platytude'}</div>
                <p>{fetching && "Submitting..."}{failed && "ERROR OCCURRED"}</p>
              </div>
              <form
                onSubmit={(event) => {
                  const body = JSON.stringify(this.handleSubmit(event));
                  console.log(`DATA: ${body}`);
                  doFetch({body}).then(after => {window.location = "/"}); // not a fan.
                }}>
                <div className="modal-body">
                  <div className="input-control">
                    <label className="inline" htmlFor="p-platytude">{'Name:'}</label>
                    <input className="name-input" id="p-name" type="text" name="name" placeholder="&nbsp;" />
                    <span className="border"></span>
                  </div>
                  <div className="input-control">
                    <label htmlFor="p-platytude">{'Platytude:'}</label>
                    <textarea className="platytude-input" id="p-platytude" name="platytude" placeholder="&nbsp;" />
                    <span className="border"></span>
                  </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn--pilled" disabled={fetching}><h6>Submit</h6></button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Fetch>
    );
  }
}

export default AddModal;
