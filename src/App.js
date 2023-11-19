import React, { Component } from 'react';
import './MyForm.css'; // Import your CSS file

class FormDataExample extends Component {
  constructor(props) {
    super(props);
    this.glimage = React.createRef();
    this.state = {
      glreceiptchequeno: '',
      gldate: '',
      glreceipttype: '',
      glreceivedfrom: '',
      glreceivedamount: '',
      glimage: null,
      message:''
    };
  }

  handleglreceiptchequenoChange = (e) => {
    this.setState({ glreceiptchequeno: e.target.value });
  };
  handlegldateChange = (e) => {
    this.setState({ gldate: e.target.value });
  };
  handleglreceipttypeChange = (e) => {
    this.setState({ glreceipttype: e.target.value });
  };
  handleglreceivedfromChange = (e) => {
    this.setState({ glreceivedfrom: e.target.value });
  };
  handleglreceivedamountChange = (e) => {
    this.setState({ glreceivedamount: e.target.value });
  };
  handleImageChange = (e) => {
    this.setState({ selectedImage: e.target.files[0] });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Create a FormData object and append the string and image to it.
    const formData = new FormData();
    formData.append('glreceiptchequeno', this.state.glreceiptchequeno);
    formData.append('gldate', this.state.gldate);
    formData.append('glreceipttype', this.state.glreceipttype);
    formData.append('glreceivedfrom', this.state.glreceivedfrom);
    formData.append('glreceivedamount', this.state.glreceivedamount);
    formData.append('glimage', this.state.selectedImage);
    fetch('http://192.168.0.179:8080/AccountsReceivable', {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
        .then((response) => {
        if (!response.ok) {
          // Check for error status and throw an error
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response body as JSON
      })
      .then((responseData) => {
        // Handle successful response data here
        console.log('Response Data:', responseData);
        this.setState({message: 'Response Data:'+ responseData});
      })
      .catch((error) => {
        // Handle any errors that occurred during the fetch
        console.error('Error posting data:', error.message);
        this.setState({ message: 'Error posting data:'+ error.message});
      });
  };
  handleClearSubmit= (e) => {
    this.setState({ glreceiptchequeno:''});
    this.setState({ gldate: null});
    this.setState({ glreceipttype:''});
    this.setState({ glreceivedfrom: ''});
    this.setState({ glreceivedamount: ''});
//    this.setState({ glimage: null});
//    this.setState({ selectedImage: ''});
    this.setState({ message: ''});
    this.glimage.current.value='';
  };

  render() {

    return (
      <div className="accounts-receivables">
      <div className="transaction-form">
       <div className="accounts-receivables"><h2>ACCOUNTS RECEIVABLES-accountsreceivable</h2></div>
         <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="glreceiptchequeno"><b> Cheque/Receipt No:</b></label>
            <input className="form-control"
              type="text"
              id="glreceiptchequeno"
              value={this.state.glreceiptchequeno}
              onChange={this.handleglreceiptchequenoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gldate"><b>Date:</b></label>
            <input className="form-control"
              type="date"
              id="gldate"
              value={this.state.gldate || ''}
              onChange={this.handlegldateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glreceipttype"><b> Received For:</b></label>
            <input className="form-control"
              type="text"
              id="glreceipttype"
              value={this.state.glreceipttype}
              onChange={this.handleglreceipttypeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glreceivedfrom"><b>Received From:</b></label>
            <input className="form-control"
              type="text"
              id="glreceivedfrom"
              value={this.state.glreceivedfrom}
              onChange={this.handleglreceivedfromChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glreceivedamount"><b>Received Amount:</b></label>
            <input className="form-control"
              type="number"
              id="glreceivedamount"
              value={this.state.glreceivedamount}
              onChange={this.handleglreceivedamountChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="glimage"><b>Receipt/Cheque Image:</b></label>
            <input className="form-control"
              type="file"
              id="glimage"
              accept="*"
              value={this.state.glimage}
              ref={this.glimage}
              onChange={this.handleImageChange}
            />
          </div>
          <button1 className="btn btn-sm btn-primary" onClick={this.handleSubmit}><b>Submit</b></button1>
          <button2 className="btn btn-sm btn-primary" onClick={this.handleClearSubmit}><b>Clear</b></button2>
          <div>{this.state.message}</div>
        </form>
      </div>
      </div>
    );
  }
}

export default FormDataExample;