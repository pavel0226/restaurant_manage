import React, { useContext } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// semantic ui-react
import { Form, Header, Grid, Container, Button } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

import { AuthContext } from "../Context/context";

function Login(props) {
  const context = useContext(AuthContext);
  const [errs, setErrors] = React.useState({ num: "" });
  const [userVal, setUserVal] = React.useState({
    email: "",
    password: ""
  });

  function setTokens(result, token) {
    localStorage.setItem("token", token);
    localStorage.setItem("email", result.data.Login.email);
    localStorage.setItem("username", result.data.Login.username);
    localStorage.setItem("createdAt", result.data.Login.createdAt);
  }
  const [addUser, { loading }] = useMutation(query, {
    // triggered on success register as a callback async
    update(proxy, result) {
      setErrors({});
      context.login(result.data.Login);
      let token = result.data.Login.token;
      setTokens(result, token);
    },
    onError(err) {
      //return graphql server errors
      // console.log(err.graphQLErrors[0].extensions.exception);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      // console.log(err.graphQLErrors[0].extensions.exception);
    },
    variables: userVal
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
    if (Object.keys(errs).length > 0) {
    }
    // no client side valid
  };
  const changer = e => {
    setUserVal({ ...userVal, [e.target.name]: e.target.value });
  };
  if (Object.keys(errs).length === 0) {
    window.location.href = "/";
  }
  return (
    <div>
      <Container text>
        <br />
        <Header>Login here</Header>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <Form.Input
            error={errs.email ? errs.email : null}
            label="email"
            placeholder="Email..."
            name="email"
            required
            value={userVal.email}
            onChange={changer}
          />
          <Form.Input
            error={errs.password ? errs.password : null}
            label="Password"
            required
            type="password"
            placeholder="Password..."
            name="password"
            value={userVal.password}
            onChange={changer}
          />

          <Button type="submit" primary>
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
}

// first define typedef and then the resolver type
const query = gql`
  mutation Login($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Login;
