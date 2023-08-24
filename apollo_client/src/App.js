import React, { useState, useContext, useEffect } from "react";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "./Components/Context/context";
import { FoodProvider } from "./Components/Context/Foodcontext";
// components
import Login from "./Components/Page Routes/Login";
import Register from "./Components/Page Routes/Register";
import Home from "./Components/Page Routes/Home";
import Navbar from "./Components/Page Routes/Statics/Navbar";
import Auth from "./Components/Page Routes/Auth/Auth";
import cors from "cors";

import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Drawer from "./Components/Page Routes/Statics/Drawer";
import DeleteAccount from "./Components/Page Routes/DeleteAccount";
import UserProfile from "./Components/Page Routes/UserProfile";
import Menu from "./Components/Page Routes/Menus";
import Payment from "./Components/Page Routes/Statics/Payment";
import { from } from "zen-observable";

function App() {
  return (
    <AuthProvider>
      <FoodProvider>
        <Router>
          <Navbar fields={window.location.href} />
          <div>
            <Route exact path="/" component={Drawer} />
            <Auth exact path="/Login" component={Login} />
            <Auth exact path="/Register" component={Register} />
            {localStorage.getItem("token") ? (
              <div>
                <Route exact path="/UserProfile" component={UserProfile} />
                <Route exact path="/DeleteAccount" component={DeleteAccount} />
                <Route exact path="/Menu" component={Menu} />
                <Route exact path="/Payments" component={Payment} />
              </div>
            ) : null}
          </div>
        </Router>
      </FoodProvider>
    </AuthProvider>
  );
}

export default App;
