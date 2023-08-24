import React, { useContext } from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
// semantic ui-react
import { Form, Header, Grid, Container, Button } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

// context api
import { AuthContext } from "../Context/context";

function Register(props) {
  // global store
  const context = useContext(AuthContext);
  const [errs, setErrors] = React.useState({ num: "" });
  const [userVal, setUserVal] = React.useState({
    username: "",
    password: "",
    consfirmPassword: "",
    email: ""
  });
  const [bool, setBool] = React.useState(false);

  const [addUser, { loading }] = useMutation(query, {
    // triggered on success register as a callback async
    update(proxy, result) {
      setErrors({});
      context.login(result.data.register);
      let token = result.data.token;
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.exception);

      setBool(true);
      setErrors(err.graphQLErrors[0].extensions.exception);
      // console.log(err.graphQLErrors[0].extensions.exception);
    },
    variables: userVal
  });

  const onSubmit = e => {
    e.preventDefault();
    addUser();
    // no client side valid
  };
  const changer = e => {
    setUserVal({ ...userVal, [e.target.name]: e.target.value });
  };
  if (Object.keys(errs).length === 0) {
    props.history.push("/Login");
  }
  return (
    <div>
      <Container text>
        <br />
        <Header>Register here</Header>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? "loading" : ""}
        >
          <Form.Input
            error={errs.username ? errs.username : null}
            label="Username"
            required
            placeholder="Username..."
            name="username"
            value={userVal.username}
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
          <Form.Input
            error={errs.password ? errs.password : null}
            label="consfirmPassword"
            type="password"
            required
            placeholder="ConsfirmPassword..."
            name="consfirmPassword"
            value={userVal.consfirmPassword}
            onChange={changer}
          />
          <Form.Input
            error={errs.email ? errs.email : null}
            label="email"
            placeholder="Email..."
            name="email"
            required
            value={userVal.email}
            onChange={changer}
          />
          <br />
          <Form.Input
            label="Food"
            placeholder="What Food you like..."
            name="Food"
            required
            value={userVal.email}
            onChange={changer}
          />
          <Button type="submit" primary>
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

// first define typedef and then the resolver type
const query = gql`
  mutation register(
    $username: String!
    $password: String!
    $consfirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        consfirmPassword: $consfirmPassword
        email: $email
      }
    ) {
      id
      email
      token
      username
      createdAt
    }
  }
`;

export default Register;
