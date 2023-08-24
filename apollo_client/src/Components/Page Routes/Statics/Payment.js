import React from "react";
// context
import { context } from "../../Context/Foodcontext";
import StripeCheckout from "react-stripe-checkout";

import {
  Container,
  Grid,
  Button,
  Segment,
  Form,
  Divider,
  Message
} from "semantic-ui-react";

const Payment = props => {
  const api_key = "";
  const foods = React.useContext(context);
  const [food, setFood] = React.useState([]);

  // async function handleToken(token, addresses) {
  //   const response = await axios.post(
  //     "https://ry7v05l6on.sse.codesandbox.io/checkout",
  //     { token, product }
  //   );
  //   const { status } = response.data;
  //   console.log("Response:", response.data);
  //   if (status === "success") {
  //     toast("Success! Check email for details", { type: "success" });
  //   } else {
  //     toast("Something went wrong", { type: "error" });
  //   }

  // }
  const food_data = foods.pres;
  const [loaader, setLoader] = React.useState(false);
  if (food_data) {
    return (
      <div>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              {food_data.map(meal => (
                <div>
                  <Message color="green">{meal.description}</Message>
                  <Message color="blue">
                    <Message.Content>{meal.sub_items[0].price}</Message.Content>
                  </Message>
                </div>
              ))}
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Form>
                <Form.TextArea
                  name="billddress"
                  placeholder="billing address.."
                />
                <Form.Input value={localStorage.getItem("username")} disabled />
                <Form.Input placeholder="Shipping area vicinity Pin" />
                <Form.Input placeholder="Phone number" name="phone no" />
                <Button
                  positive
                  onClick={() => {
                    setLoader(true);
                  }}
                >
                  Submit Info
                </Button>
              </Form>
              {loaader === true ? (
                <div>
                  <Divider horizontal>Pay now</Divider>
                  <StripeCheckout
                    amount="500"
                    billingAddress
                    description="Awesome Product"
                    image="https://yourdomain.tld/images/logo.svg"
                    locale="auto"
                    stripeKey=""
                    zipCode
                  />
                </div>
              ) : null}
            </Grid.Column>
          </Grid>

          <Divider vertical>Pay With</Divider>
        </Segment>
      </div>
    );
  } else {
    return (
      <Button
        onClick={() => {
          props.history.push("/Menu");
        }}
      >
        Please Add Food
      </Button>
    );
  }
};

export default Payment;
