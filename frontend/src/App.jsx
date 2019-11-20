// PLEASE IMPORT ALL AT THE TOP
import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Homepage from "./Homepage.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Cart from "./Cart.jsx";
import ProductCategory from "./ProductCategory.jsx";
import ProductPage from "./ProductPage.jsx";
import MerchantPage from "./MerchantPage.jsx";
import UserDashboard from "./UserDashboard.jsx";
import MerchantDashboard from "./MerchantDashboard.jsx";
import ProductForm from "./ProductForm";
import Checkout from "./Checkout.jsx";

import "./style/navbar.css";

//COMPONENT DECLARATION
class UnconnectedApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: "",
      database: ""
    };
  }

  // Autologin
  componentDidMount = () => {
    let autoLogin = async () => {
      console.log("auto-login hit");
      await fetch("/autologin", {
        method: "POST"
      });
      this.props.dispatch({ type: "login-success" });
    };
    autoLogin();
  };

  render() {
    return (
      <>
        <BrowserRouter>
          <div>
            {/* auto attaching navbar to every page */}
            <Navbar />

            <Route path="/" exact={true}>
              <Homepage />
            </Route>
            <Route path="/signup" exact={true}>
              <Signup />
            </Route>
            <Route path="/cart" exact={true}>
              <Cart />
            </Route>
            <Route path="/category/:productCategory" exact={true}>
              <ProductCategory category="placeholder" />
            </Route>
            <Route path="/product/:productId" exact={true}>
              <ProductPage />
            </Route>
            <Route path="/merchant/:merchantId" exact={true}>
              <MerchantPage />
            </Route>
            <Route path="/dashboard" exact={true}>
              {!this.props.isLoggedIn && (
                <>
                  <Login />
                </>
              )}
              {this.props.isLoggedIn && this.props.user.userType === "users" && (
                <>
                  <UserDashboard />
                </>
              )}
              {this.props.isLoggedIn &&
                this.props.user.userType === "merchants" && (
                  <>
                    <MerchantDashboard />
                  </>
                )}
            </Route>
            <Route path="/checkout" exact={true}>
              <Checkout />
            </Route>
            <Route path="/productform" exact={true}>
              <ProductForm />
            </Route>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

//COMPONENT REDUX
// states from store being mapped to the component props

let mapStateToProps = st => {
  return { isLoggedIn: st.loggedIn, user: st.user };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
