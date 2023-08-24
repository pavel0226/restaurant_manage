import React from "react";
import { AuthContext } from "../Context/context";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

// semantic ui stuff
import {
  Divider,
  Grid,
  Container,
  Form,
  Button,
  Card,
  CardContent
} from "semantic-ui-react";
import { Label } from "semantic-ui-react";
import Home from "./Home";

function DeleteAccount(props) {
  const [delMessage, setDelMessage] = React.useState({ msg: "" });
  const [del, { loading }] = useMutation(query, {
    update(proxy, result) {
      setDelMessage(...delMessage, ...{ msg: result });
    },
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
    onCompleted(msg) {
      console.log("done deleting account");
    }
  });
  const context = React.useContext(AuthContext);
  return (
    <Container>
      <div>
        <br />
        <br />
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Form loading={loading ? true : null}>
                <Label>
                  <Label.Detail>Delete the account</Label.Detail>
                </Label>
                <Form.Input
                  placeholder="Add Reason to Delete"
                  name="Account name.."
                />
                <Button content="Delete Account" negative />
                <Button
                  content="Home Account"
                  positive
                  onClick={() => {
                    props.history.push("/");
                  }}
                ></Button>
                <Button
                  content="Order Food ? decison changed"
                  positive
                  onClick={() => {
                    props.history.push("/Menu");
                  }}
                ></Button>
              </Form>
            </Grid.Column>
            {/* column 2 for contact */}
            <Grid.Column>
              <Form loading={loading ? true : null}>
                <Label size="big">
                  <Label.Detail>Name of the account</Label.Detail>
                </Label>
                <Form.Input
                  placeholder="Add Reason to touch with use"
                  type="email"
                  name="Account name.."
                />
                <Label>
                  <Label.Detail>Email of the account</Label.Detail>
                </Label>
                <Form.Input
                  placeholder="Add Reason to touch with use"
                  type="text"
                  name="Account name.."
                />
                <Label>
                  <Label.Detail>Favourite food</Label.Detail>
                </Label>
                <Form.Input
                  placeholder="Favourite food  with use"
                  type="text"
                  name="Food..."
                />
                <Button content="Contact Account" negative />
                <Button
                  color="olive"
                  onClick={() => {
                    props.history.push("/UserProfile");
                  }}
                >
                  About Account
                </Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </Container>
  );
}

//gql query
const query = gql`
  mutation deleteAccount($msg: String!) {
    msg
  }
`;

export default DeleteAccount;
