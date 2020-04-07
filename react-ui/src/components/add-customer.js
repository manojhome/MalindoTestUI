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

  setCustomer(customer) {
    this.setState({
      customer: customer
    });
  }

  onChangeTitle(e) {   
    const customer = {...this.state.customer};
    customer.title = e.target.value;
    this.setCustomer(customer);
  }

  onChangeFirstName(e) {
    const customer = {...this.state.customer};
    customer.firstName = e.target.value;
    this.setCustomer(customer);
  }

  onChangeLastName(e) {
    const customer = {...this.state.customer};
    customer.lastName = e.target.value;
    this.setCustomer(customer);
  }

  onChangeEmail(e) {
    const customer = {...this.state.customer};
    customer.email = e.target.value;
    this.setCustomer(customer);
  }

  onChangeDateOfBirth(e) {
    const customer = {...this.state.customer};
    customer.dateOfBirth = e.target.value;
    this.setCustomer(customer);
  }

  onChangePhoneNumber(e) {
    const customer = {...this.state.customer};
    customer.phoneNumber = e.target.value;
    this.setCustomer(customer);
  }

  onChangeAddress(e) {
    const customer = {...this.state.customer};
    customer.address = e.target.value;
    this.setCustomer(customer);
  }

  onChangeSuburb(e) {
    const customer = {...this.state.customer};
    customer.suburb = e.target.value;
    this.setCustomer(customer);
  }

  onChangePostcode(e) {
    const customer = {...this.state.customer};
    customer.postcode = e.target.value;
    this.setCustomer(customer);
  }

  validateCustomer() {
    var customer = this.state.customer;

    if(customer.firstName === undefined || customer.firstName === '') {
      return {isValid: false, message: 'First Name cannot be empty!'};      
    }
     
    if(!(/^[a-zA-Z ]+$/.test(customer.firstName))) {
      return {isValid: false, message: 'Please enter only alphabetical letters for First Name!'};      
    }

    if(customer.lastName === undefined || customer.lastName === '') {
      return {isValid: false, message: 'Last Name cannot be empty!'};      
    }
     
    if(!(/^[a-zA-Z ]+$/.test(customer.lastName))) {
      return {isValid: false, message: 'Please enter only alphabetical letters for Last Name!'};      
    }

    if(customer.email === undefined || customer.email === '') {
      return {isValid: false, message: 'Email cannot be empty!'};      
    }
     
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(customer.email))) {
      return {isValid: false, message: 'Invalid email!'};      
    }

    if(customer.dateOfBirth === undefined || customer.dateOfBirth === '') {
      return {isValid: false, message: 'Date of Birth cannot be empty!'};      
    }
     
    if(!(/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/.test(customer.dateOfBirth))) {
      return {isValid: false, message: 'Invalid date of birth!'};      
    }
     
    if(customer.phoneNumber !== undefined && customer.phoneNumber !== '' && !(/^[0-9]+$/.test(customer.phoneNumber))) {
      return {isValid: false, message: 'Please enter only numerics for Phone Number!'};      
    }  

    if(customer.postcode !== undefined && customer.postcode !== '' && !(/^[0-9]+$/.test(customer.postcode))) {
      return {isValid: false, message: 'Please enter only numerics for Postcode!'};      
    } 
    
    return {isValid: true, message: ''};
  }

  saveCustomer() {
    var data = this.state.customer;
    var error = this.validateCustomer();    

    if(error.isValid) {
      this.setState({errorMessage: ''})
      CustomerDataService.create(data)
      .then(response => {
        this.setState({
          published: response.data.published,     
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
        this.setState({errorMessage: 'Internal server error!'})
      });
    }
    else {
      this.setState({errorMessage: error.message});
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
              <label htmlFor="phoneNumber">Phone Number</label>
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

            <div className="form-group">
              <button onClick={this.saveCustomer} className="btn btn-success">
                Add
              </button>
            </div> 

            <div className="form-group">     
                {errorMessage !== '' ? 
                  <div className="alert alert-danger" role="alert">
                  {errorMessage}
                  </div>
                  : null} 
            </div>
            
          </div>
        )}
      </div>
    );
  }
}
