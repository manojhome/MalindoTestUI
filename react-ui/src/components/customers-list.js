import React, { Component } from "react";
import CustomerDataService from "../services/customer.service";
import { Link } from "react-router-dom";

export default class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCustomers = this.retrieveCustomers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.removeAllCustomers = this.removeAllCustomers.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      Customers: [],
      currentCustomer: null,
      currentIndex: -1,
      searchKey: "",
      searchTitleError: ""
    };  
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCustomers() {
    CustomerDataService.getAll()
      .then(response => {
        this.setState({
          Customers: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCustomers();
    this.setState({
      currentCustomer: null,
      currentIndex: -1
    });
  }

  setActiveCustomer(Customer, index) {
    this.setState({
      currentCustomer: Customer,
      currentIndex: index
    });
  }

  removeAllCustomers() {
    CustomerDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    var title = this.state.searchTitle;    
    this.state.searchTitle="Coming Soon";
  }

  render() {
    const { searchTitle, Customers, currentCustomer, currentIndex, searchTitleError} = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Coming Soon"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />            
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>             
            </div>            
          </div>
        </div>
        <div>
        </div>
        
        {searchTitleError !== '' ? 
        <div class="alert alert-dsanger" role="alert">
        {searchTitleError}
        </div>
        : null}       

        <div className="col-md-6">
          <h6>Select a customer below...  </h6>
          <ul className="list-group">
            {Customers &&
              Customers.map((Customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(Customer, index)}
                  key={Customer.customerId}
                >
                  {Customer.title}  {Customer.firstName} {Customer.lastName}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Details</h4>
              <div> 
                <label>
                  <strong>Full Name:</strong>
                </label>{" "}
                {currentCustomer.title} {currentCustomer.firstName} {currentCustomer.lastName}
              </div>
              <div>
                <label>
                  <strong>Date of Birth:</strong>
                </label>{" "}
                {currentCustomer.dateOfBirth} 
              </div>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentCustomer.emailAddress} 
              </div>
              <div>
                <label>
                  <strong>Phone Number:</strong>
                </label>{" "}
                {currentCustomer.mobilePhoneNo} 
              </div>
              <div>
                <label>
                  <strong>Suburb:</strong>
                </label>{" "}
                {currentCustomer.suburbCity} 
              </div>
              <div>
                <label>
                  <strong>Post code:</strong>
                </label>{" "}
                {currentCustomer.postCode} 
              </div>
              <Link
                to={"/Customers/" + currentCustomer}
                className="badge badge-warning"
              >
                Edit
              </Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCustomer}
            >
              Delete
            </button>
            </div>
          ) : (
            <div>
          
            </div>
          )}
        </div>
      </div>
    );
  }
}
