import React, { Component } from "react";
import "./App.css";

import AppNavbar from "./components/AppNavbar";
import ItemModal from "./components/ItemModal";
import ShoppingList from "./components/ShoppingList";

import { Container } from "reactstrap";

import store from "./store";
import { Provider } from "react-redux";
import { loadUser } from "./actions/authAction";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
