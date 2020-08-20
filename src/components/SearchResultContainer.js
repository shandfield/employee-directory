import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";
import "../styles/Result.css"
import ResultList from "./ResultList"


class SearchResultContainer extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: "firstName",
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
  filterEmployees = (searchKey) => {
    console.log(searchKey);
    console.log(this.state.result);
    //by using this.state.result is will render the values of what is being searched
    var filterResult = this.state.result.filter(person => person.firstName === searchKey)
    
    this.setState({
        result: filterResult
    })
}
//when the form is submitted it is searching the API for what was typed
  handleFormSubmit = event => {
      event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    console.log(name);

    //need to add filter function here
    this.filterEmployees(value);
    this.setState({
      [name]: value
    });
    //calling/using filterEmployees function
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);
  };

handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
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
            <tbody>
              <tr>
                <th scope="col">Photo</th>
                <th scope= "col">First Name</th>
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
          </tbody>
             
        </table>
      </div>
  </div>
    );
  };
};
      

export default SearchResultContainer;