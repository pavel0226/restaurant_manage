import React from "react";

import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Loader,
  Grid,
  List,
  ListContent,
  Card,
  Image,
  Container,
  Message,
  Button
} from "semantic-ui-react";

const UserProfile = props => {
  const [user, setUser] = React.useState([]);
  const { loading, data } = useQuery(query, {
    onCompleted() {
      const username = localStorage.getItem("username");
      let final_data = data.getUserswithUs.filter(user => {
        return user.username === username;
      });
      console.log(final_data);
      setUser(final_data);
    },
    onError(err) {
      console.log(err);
    }
  });
  return (
    <div>
      <br />
      <br />
      <Container>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <Grid columns="2">
            <Grid.Row>
              {user.map(pres => (
                <React.Fragment>
                  <Grid.Column>
                    <Card>
                      <div>
                        <Image
                          wrapped
                          size="medium"
                          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                          alt="dummy"
                        />
                      </div>
                    </Card>
                  </Grid.Column>
                  <Grid.Column>
                    <List>
                      <Message info>{pres.createdAt.toString()}</Message>
                      <Message info>{pres.email}</Message>
                      <Message info>{pres.id}</Message>
                      <Message info>{pres.username}</Message>
                    </List>
                  </Grid.Column>
                </React.Fragment>
              ))}
            </Grid.Row>
          </Grid>
        )}
        <div>
          <Container>
            <Grid columns="1">
              <Grid.Row>
                <Button
                  fluid
                  color="facebook"
                  onClick={() => {
                    props.history.push("/DeleteAccount");
                  }}
                >
                  Delete Account
                </Button>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        )
      </Container>
    </div>
  );
};

const query = gql`
  {
    getUserswithUs {
      id
      email
      username
      createdAt
    }
  }
`;

export default UserProfile;
