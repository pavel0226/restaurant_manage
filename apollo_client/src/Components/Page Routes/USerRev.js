import React, { useContext } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import decode from "jwt-decode";

import { AuthContext } from "../Context/context";

// semantic ui
import { Button, Header, Image, Modal, Form } from "semantic-ui-react";
const USerRev = () => {
  // all the hooks
  const [complete, setComplete] = React.useState(false);
  let [data, setData] = React.useState({ body: "" });
  const [currentUser, setCcurrentUser] = React.useState("");
  const [err, setErr] = React.useState({});

  // meiddleware for setting context
  const { body } = data;
  const [addPost, { loading }] = useMutation(postQuery, {
    update(proxy, result) {
      setComplete(true);
    },
    onError(err) {
      console.log(data);
      setErr(err);
    },
    onCompleted() {
      console.log("done man");
    }
  });
  const changer = e => {
    let bodies = e.target.value;
    const curr = { bodies };
    setData({ ...data, ...curr });
    // console.log(data);
  };
  const submit = e => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      let username = decode(localStorage.getItem("token")).username;
      setCcurrentUser(username);
    }
    // valid the body
    if (data.body.trim().length === 0) {
      let errs = { emps: "the body length cannot be empty" };
      setErr(errs);
    }
    addPost();
  };
  return (
    <div>
      <Modal trigger={<Button secondary>Add Contributions</Button>}>
        <Modal.Header>Welcom For Contributions</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
            alt="dummy"
          />
          <Modal.Description>
            <Header>Welcome there User</Header>
            <Form onSubmit={submit} loading={loading ? true : false}>
              <Form.Input
                error={err ? null : "please enter a body"}
                name="body"
                label="Contributions Idea..."
                onChange={changer}
              />
              <Button secondary type="submit">
                Comment on Food
              </Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

const postQuery = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
    }
  }
`;

export default USerRev;
