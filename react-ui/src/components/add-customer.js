import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";

export default class AddCustomer extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeSuburb = this.onChangeSuburb.bind(this);
    this.onChangePostcode = this.onChangePostcode.bind(this);

    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      customer: {},
      id: null,
      published: false,
      submitted: false,
      errorMessage: ''
    };
  }

  onChangeTitle(e) {   
    this.setState({
      customer: {
        title: e.target.value
      }
    });
  }

  onChangeFirstName(e) {
    this.setState({
      customer: {
        firstName: e.target.value
      }
    });
  }

  onChangeLastName(e) {
    this.setState({
      customer: {
        lastName: e.target.value
      }
    });
  }

  onChangeEmail(e) {
    this.setState({
      customer: {
        email: e.target.value
      }
    });
  }

  onChangeDateOfBirth(e) {
    this.setState({
      customer: {
        dateOfBirth: e.target.value
      }
    });
  }

  onChangePhoneNumber(e) {
    this.setState({
      customer: {
        phoneNumber: e.target.value
      }
    });
  }

  onChangeAddress(e) {
    this.setState({
      customer: {
        address: e.target.value
      }
    });
  }

  onChangeSuburb(e) {
    this.setState({
      customer: {
        suburb: e.target.value
      }
    });
  }

  onChangePostcode(e) {
    this.setState({
      customer: {
        postcode: e.target.value
      }
    });
  }

  saveCustomer() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    var isValid = true;
    var errorMessage = '';
    if(data.title === '') {
      isValid = false;
      errorMessage = 'First Name cannot be empty!'
    }

    if(isValid) {

      this.setState({
        errorMessage: ''
      })

      CustomerDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          errorMessage: '',
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.setState({
          errorMessage: 'Internal server error!'
        })
      });
    }
    else {
      this.setState({
        errorMessage: errorMessage
      });
    }
  }

  newCustomer() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    const { errorMessage} = this.state;
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h4>Add Customer </h4>
           
            <div className="form-group">
              <label htmlFor="salutation">Title <span className="text-danger">*</span></label>
              <select className="form-control" onChange={this.onChangeSalutation} name="salutation">
                <option value="MR">Mr.</option>
                <option value="MRS">Mrs.</option>
                <option value="MISS">Miss.</option>
                <option value="MSTR">Mstr.</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">First Name <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="firstName"
                required
                value={this.state.customer.firstName}
                onChange={this.onChangeFirstName}
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="lastName"
                required
                value={this.state.customer.lastName}
                onChange={this.onChangeLastName}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="email"
                required
                value={this.state.customer.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="dateOfBirth"
                required
                value={this.state.customer.dateOfBirth}
                onChange={this.onChangeDateOfBirth}
                name="dateOfBirth"
              />
              ex: 15/06/1997
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number <span className="text-danger">*</span></label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="phoneNumber"
                required
                value={this.state.customer.phoneNumber}
                onChange={this.onChangePhoneNumber}
                name="phoneNumber"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="address"
                required
                value={this.state.customer.address}
                onChange={this.onChangeAddress}
                name="address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="suburb">Suburb</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="suburb"
                required
                value={this.state.customer.suburb}
                onChange={this.onChangeSuburb}
                name="suburb"
              />
            </div>			
            <div className="form-group">
              <label htmlFor="postcode">Postcode</label>
              <input
                type="text"
                autoComplete="off"
                className="form-control"
                id="postcode"
                required
                value={this.state.customer.postcode}
                onChange={this.onChangePostcode}
                name="postcode"
              />
            </div>	

            

            <div>
              <div>
                <button onClick={this.saveCustomer} className="btn btn-success">
                  Add
                </button>
                {errorMessage !== '' ? 
                  <div className="alert alert-danger" role="alert">
                  {errorMessage}
                  </div>
                  : null} 
              </div> 
            </div>
            
          </div>
        )}
      </div>
    );
  }
}
