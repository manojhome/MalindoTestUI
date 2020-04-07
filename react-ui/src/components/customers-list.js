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
      searchTitle: "",
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

    if(title) {
      CustomerDataService.findByTitle(this.state.searchTitle)
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
    else {debugger;
      this.setState({
        searchTitleError: "Please enter search text"
      });
    }
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
              placeholder="Search by title"
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
        <div class="alert alert-danger" role="alert">
        {searchTitleError}
        </div>
        : null}       

        <div className="col-md-6">
          <h4>Customer List</h4>

          <ul className="list-group">
            {Customers &&
              Customers.map((Customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(Customer, index)}
                  key={index}
                >
                  {Customer.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCustomers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentCustomer.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCustomer.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentCustomer.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/Customers/" + currentCustomer.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
