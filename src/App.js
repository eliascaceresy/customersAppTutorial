import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeContainer from "./containers/HomeContainer";
import CustomersContainer from "./containers/CustomersContainer";
import CustomerContainer from "./containers/CustomerContainer";
import NewCustomerContainer from "./containers/NewCustomerContainer";
import "./App.css";

class App extends Component {
  renderHome = () => <HomeContainer />;
  renderCustomerContainer = () => <CustomerContainer />;
  renderCustomersListContainer = () => <CustomersContainer />;
  renderCustomerNewContainer = () => <NewCustomerContainer />;

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.renderHome} />
          <Route
            exact
            path="/customers"
            component={this.renderCustomersListContainer}
          />
          <Switch>
            <Route
              path="/customers/new"
              component={this.renderCustomerNewContainer}
            />
            <Route
              path="/customers/:dni"
              render={props => (
                <CustomerContainer dni={props.match.params.dni} />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
