import React, { Component } from "react";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";
import API from "../utils/API";
import "../styles/Result.css"


class SearchResultContainer extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "lastName",
    currentSort: "default",
    sortField: ""
  };

  // When this component mounts, search the employee API for list of employees
  componentDidMount() {
    
    API.search()
    .then(res => {
        console.log(res)
        this.setState({
          result: res.data.results.map((e, i) => ({
            firstName: e.name.first,
            lastName: e.name.last,
            picture: e.picture.large,
            email: e.email,
            phone: e.phone,
            dob: e.age,
            key: i
          }))
        })
    })
    .catch(err => console.log(err));
  }
//making the ability to allow the user to filter the employees
  filerEmployees = (searchKey) => {
    console.log(searchKey);
    console.log(this.state.result);
    //by using this.state.result is will render the values of what is being searched
    let filterResult = this.state.result.filter(person => person.firstName === searchKey)
    
    this.setState({
        result: filterResult
    })
}

  handleFormSubmit = event => {
      event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    console.log(name);

    //need to add filter function here
    this.filerEmployees(value);
    this.setState({
      [name]: value
    });
    this.filerEmployees(value);
    this.filterEmployees(this.state.search);
  };

handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    console.log("**********");
    console.log(value);
    console.log(name);
    
    this.setState({

      [name]: value

    });
};

  render() {
    return (
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h2>Employee Directory</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <SearchForm
                    value={this.state.search}
                     handleInputChange={this.handleInputChange}
                     handleFormSubmit={this.handleFormSubmit}
                     />
                </div>
              </div>
            <div className="row">
          <table className="table">
            <tr>
              <th scope="col">Photo</th>
              <th>First Name</th>
              <th scope="col">Last Name </th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
            {[...this.state.result].map((item) =>
              <EmployeeCard
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                key={item.key}
              />
            )}

          </table>
        </div>
    </div>
    );
  }
}

export default SearchResultContainer;