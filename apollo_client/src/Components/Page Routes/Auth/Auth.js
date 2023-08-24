import React from "react";
import { Redirect, Route, withRouter } from "react-router-dom";

import decode from "jwt-decode";

const getter = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
};

const Auth = ({ component: Component, ...rest }) => {
  let auth_status = getter();
  return (
    <Route
      {...rest}
      render={props =>
        auth_status === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default withRouter(Auth);
