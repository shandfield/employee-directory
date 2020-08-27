import React, { Component } from "react";
import SearchForm from "./SearchForm";
import EmployeeCard from "./EmployeeCard";
import API from "../utils/API";
import "../styles/Result.css"
import DataTable from "./DataTable";

class SearchResultContainer extends Component {
  state = {
    result: [],
    filter: "",
    filterBy: [{}],
    currentSort: "descend",
    sortField: ""
    };
    headings = [
      { name: "Image", width: "20%" },
      { name: "Name", width: "40%" },
      { name: "Phone", width: "40%" },
      { name: "Email", width: "30%" },
      { name: "DOB", width: "30%" }
    ]
  // When this component mounts, search the employee API for list of employees
  componentDidMount() {
    
    API.search()
    .then(res => {
        console.log(res)
        this.setState({
          result: res.data.results.map((e, i) => ({
            picture: e.picture.medium,
            firstName: e.name.first,
            lastName: e.name.last,
            phone: e.phone,
            email: e.email,
            dob: e.dob.date,
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

    this.filterEmployees(value);
    this.setState({
      [name]: value
    });
    // //calling/using filterEmployees function
    this.filterEmployees(value);
    this.filterEmployees(this.state.search);
  };

handleInputChange = event => {
    event.preventDefault();
    console.log(event);
    const value = event.target.value;
    const name = event.target.name;
    //console.log(value);
   // console.log(name);
    
    this.setState({

      [name]: value

    });
  };

handleSortChange = name => {
  if (this.state.currentSort === "descend"){
    this.setState({order: "ascend"})
  } else {this.setState({order: "descend"})
  }
  // a and d ascend and descend
  const compare= (a,d) => {
    if(this.state.currentSort === "ascend"){
      if (a[name] === undefined){
        return 1
      } else if(d[name] === undefined){
        return -1
      } else if(name === "name"){
        return a[name].first.localeCompare(d[name].first)
      }else{
        return a[name]-d[name]
      }
    } else {
        if(a[name] === undefined){
          return 1
        }else if (d[name] === undefined){
          return -1
        }else if (name === "name"){
          return d[name].first.localeCompare(a[name].first)
        } else{
          return d[name]-a[name]
        }
    }
  }
  const Users = this.state.filterBy.sort(compare);
  this.setState({filterBy: Users});
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
          <DataTable
                  headings = {this.headings}
                  handleSort = {this.handleSortChange}
                />
            <tbody>
              {/* <tr> */}
                {/* <DataTable
                  headings = {this.headings}
                  handleSort = {this.handleSortChange}
                /> */}
                {/* <th scope="col">Photo</th>
                <th scope= "col">First Name</th>
                <th scope="col">Last Name </th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th> */}
              {/* </tr> */}
            
        {[...this.state.result].map((item) =>
              <EmployeeCard
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                phone={item.phone}
                dob = {item.dob}
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