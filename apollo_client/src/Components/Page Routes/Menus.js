import React from "react";

// providers
import { context } from "../Context/Foodcontext";
import {
  Grid,
  Label,
  Container,
  Button,
  Divider,
  Card,
  CardHeader,
  Icon,
  Message,
  Breadcrumb
} from "semantic-ui-react";
import { Modal, Header, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { List, arrayMove } from "react-movable";
import "../../App.css";
import data from "../../data.json";
import Payment from "./Statics/Payment";

// set context
const Menus = props => {
  const user = React.useContext(context);
  const [foodData, setfoodData] = React.useState(data);
  const [localData, setLocalData] = React.useState({});
  const [selected, setSelected] = React.useState([]);
  let [doodname, setFoodname] = React.useState([]);
  const [scrollStatus, setscrollStatus] = React.useState(false);
  const [userLikedFood, setLikedFood] = React.useState([]);
  React.useState(() => {
    console.log(data.categorys);
    setLocalData(data);
  }, []);
  console.log(userLikedFood);
  window.addEventListener("scroll", () => {
    if (scrollStatus == false) {
      setscrollStatus(true);
      console.log("display model");
    }
  });
  const [err, setErr] = React.useState({ err: "" });
  const Clicker = e => {};
  return (
    <div>
      <Container>
        <br />
        <Label color="orange" size="big">
          Our Food Menu
        </Label>
        <Button
          style={{ marginLeft: "800px" }}
          color="red"
          onClick={() => {
            props.history.push("/");
          }}
        >
          Go Home
        </Button>
        <br />
        <br />

        <Grid columns={3}>
          <Grid.Column width={4}>
            <Label color="red">
              Apply Filters <Icon name="filter" />
            </Label>
            <Divider horizontal />
            <Button color="pink" fluid size="small" onClick={Clicker}>
              Appeteasers
            </Button>
            <br />
            <Button
              color="red"
              fluid
              size="small"
              onClick={Clicker("Fino sides")}
            >
              Fino sides
            </Button>
            <br />
            <Button
              color="green"
              fluid
              size="small"
              onClick={Clicker("Peri-peri chicken")}
            >
              Peri-peri chicken
            </Button>
            <br />
            <Button
              color="yellow"
              fluid
              size="small"
              onClick={Clicker("Sharing platters")}
            >
              Sharing platters
            </Button>
            <br />
            <Button
              color="linkedin"
              fluid
              size="small"
              onClick={Clicker("Mexican")}
            >
              Mexican
            </Button>
            <br />
            <Button
              color="grey"
              fluid
              size="small"
              onClick={Clicker("Dessert")}
            >
              Dessert
            </Button>
            <br />
            <Button
              color="olive"
              fluid
              size="small"
              onClick={Clicker("Salads")}
            >
              Salads
            </Button>
            <br />
          </Grid.Column>
          <Grid.Column width={10}>
            <div>
              {data.categorys.map(food => (
                <div>
                  <Divider horizontal>Menu Types</Divider>
                  <div className="mb-4">
                    <Label fluid color="green">
                      {food.name}
                    </Label>
                  </div>
                  <Card.Group itemsPerRow="2">
                    {food.menu_itemss.map(food_menu => (
                      <div className="mx-3">
                        <Card
                          header={food_menu.name}
                          description={food_menu.description}
                          extra={"the position is" + food_menu.position}
                          width="100"
                        />
                        <Card.Content extra>
                          <Button
                            id="but"
                            onClick={() => {
                              setSelected([...selected, food_menu]);
                              setFoodname([...doodname, food_menu.name]);
                              setLikedFood([...userLikedFood, food_menu]);
                              user.addFood(userLikedFood);
                              // /asshole it return a callback
                            }}
                          >
                            Order Food
                          </Button>
                          <Modal trigger={<Button positive>View More </Button>}>
                            <Modal.Header>Our Food Photo</Modal.Header>
                            <Modal.Content image>
                              <Image
                                wrapped
                                size="medium"
                                src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
                              />
                              <Modal.Description>
                                <Header>Description</Header>
                                {food_menu.sub_items.map(subs => (
                                  <div>
                                    <Message color="green">
                                      <Message.Content>
                                        ID:{subs.id}
                                      </Message.Content>
                                    </Message>
                                    <Message color="green">
                                      <Message.Content>
                                        Name:{subs.name}
                                      </Message.Content>
                                    </Message>
                                    <Message color="green">
                                      <Message.Content>
                                        Position In Restaurent : {subs.position}
                                      </Message.Content>
                                    </Message>
                                    <Message color="green">
                                      <Message.Content>
                                        Cuisine Name :: {subs.cuisine_name}
                                      </Message.Content>
                                    </Message>
                                    <Message color="green">
                                      <Message.Content>
                                        Category Name :: {subs.category_name}
                                      </Message.Content>
                                    </Message>
                                    <br />
                                    <br />
                                    <Breadcrumb>
                                      Any Discount ::
                                      {subs.discount.type}
                                      {subs.discount.amount}
                                    </Breadcrumb>
                                    <Button
                                      color="blue"
                                      fluid
                                      onClick={() => {
                                        setLikedFood([
                                          ...userLikedFood,
                                          food_menu
                                        ]);
                                      }}
                                    >
                                      Add Food to Like
                                    </Button>
                                  </div>
                                ))}
                              </Modal.Description>
                            </Modal.Content>
                          </Modal>
                        </Card.Content>
                      </div>
                    ))}
                  </Card.Group>
                </div>
              ))}
            </div>
          </Grid.Column>
          <Grid.Column width={2}>
            <span>Hello there your menu (Drag and change by priority) </span>
            <List
              values={doodname}
              onChange={({ oldIndex, newIndex }) =>
                setSelected(arrayMove(selected, oldIndex, newIndex))
              }
              renderList={({ children, props }) => (
                <ul {...props}>{children}</ul>
              )}
              renderItem={({ value, props }) => (
                <li id="li" {...props}>
                  {value}
                </li>
              )}
            />
            {doodname.length > 0 ? (
              <Button
                color="green"
                onClick={() => {
                  user.addFood(userLikedFood);
                  props.history.push("/Payments");
                }}
              >
                Proceed to Payment
              </Button>
            ) : (
              <Button negative>Please add food</Button>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Menus;
