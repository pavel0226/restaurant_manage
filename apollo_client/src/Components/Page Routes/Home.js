import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { AuthContext } from "../Context/context";
// components
import USerRev from "./USerRev";
import { chartData } from "./Statics/StatData/stats";
import ImageSlider from "./Statics/ImageSlider";

// semantic ui stuff
import { Header, Container, Card, Menu, Divider } from "semantic-ui-react";
import { Grid, Message, Image } from "semantic-ui-react";
import { Segment, Loader, Flag } from "semantic-ui-react";
import { Button, Icon, Label } from "semantic-ui-react";
import { Pie, Line } from "react-chartjs-2";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(getAllPosts);
  const [charts, setChart] = React.useState(chartData);

  // const { load, postData } = useQuery(getAllPosts);
  if (data) {
    let { getPosts } = data;
    // const { getPosts } = postData;
    return (
      <div>
        <div>
          {/* the image content */}
          <ImageSlider />
        </div>
        {/* chart data */}
        <div style={{ position: "relative", marginTop: "250px" }}>
          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <Line
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      aspectRatio: window.innerWidth / window.innerHeight
                    }}
                    data={charts}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Pie
                    options={{
                      responsive: true
                    }}
                    data={charts}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
        <Container>
          <br />
          <Header as="h2">Our Users</Header>
          <Segment>
            <Menu>
              <Menu.Item>
                <span>Welcome to Food Restaurent Community</span>
              </Menu.Item>
              <Menu.Item position="right">
                <Flag name="in" />
                <Flag name="it" />
                <Flag name="gb" />
                <Flag name="us" />
                <Flag name="ru" />
              </Menu.Item>
            </Menu>
          </Segment>
          <Divider />
          <Grid columns={2} divided>
            <Grid.Row>
              {getPosts.map(el => (
                <div>
                  <Grid.Column key={el.id} className="marginGrid">
                    <Card className="userCard">
                      <Card.Content>
                        {el.username.toUpperCase()}
                        <Message.Item>Username:: {el.body}</Message.Item>
                        <Button as="div" labelPosition="right">
                          <Button color="red" className="butPosition">
                            <Icon name="heart" />
                            Like
                          </Button>
                          <Label as="a" basic color="red" pointing="left">
                            0
                          </Label>
                        </Button>
                        <Button
                          as="div"
                          labelPosition="right"
                          className="butPosition"
                        >
                          <Button basic color="blue" className="butPosition">
                            <Icon name="comment" />
                            comment
                          </Button>
                          <Label as="a" basic color="blue" pointing="left">
                            0
                          </Label>
                        </Button>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                </div>
              ))}
            </Grid.Row>
            <Grid.Row>
              {user.username === null ? null : (
                <div>
                  <USerRev />
                </div>
              )}
            </Grid.Row>
          </Grid>
        </Container>
        <Divider />
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Segment>
            <Loader active />
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        </Container>
      </div>
    );
  }
};

const getAllPosts = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
    }
  }
`;

export default Home;
