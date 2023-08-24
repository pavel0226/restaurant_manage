import React from "react";
import { Link } from "react-router-dom";

import gql from "graphql-tag";

//
import { useMutation } from "@apollo/react-hooks";

// semantic ui stuff
import { Grid, Container } from "semantic-ui-react";
import { Button, Breadcrumb, Label } from "semantic-ui-react";

const Data = () => {
  const [curr, setCurr] = React.useState(false);
  React.useEffect(() => {
    setCurr(!curr);
    clearInterval(() => console.log("cleared"));
  }, []);
  return (
    <div>
      <span>The Data Page</span>
      <Link to="/">Home</Link>
      <div>
        <Container>The Restaurent Info goes here</Container>
      </div>
    </div>
  );
};

export default Data;
