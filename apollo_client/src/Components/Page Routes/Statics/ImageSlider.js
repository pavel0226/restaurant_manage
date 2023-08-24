import React from "react";
import Carousel from "react-3d-carousels";
import {
  Grid,
  Button,
  Message,
  Segment,
  Container,
  Image
} from "semantic-ui-react";
const images = [
  "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
];

export default class ImageSlider extends React.Component {
  render() {
    const data = (
      <div>
        <div
          style={{
            position: "absolute",
            width: 850,
            height: 300,
            margin: "0 auto"
          }}
        >
          <Carousel
            ref={carousel => (this.carousel = carousel)}
            width={300}
            height={300}
            direction={"vertical"}
            effect={"3d"}
            index={0}
          >
            <div style={{ width: 300, height: 300 }}>
              <Image
                id="im"
                src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            </div>
            <div style={{ width: 300, height: 300 }}>
              <Image
                id="im"
                src="https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            </div>
            <div style={{ width: 300, height: 300 }}>
              <Image
                id="im"
                src="https://images.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            </div>
          </Carousel>
        </div>
      </div>
    );
    const data2 = (
      <div>
        <div
          style={{
            position: "absolute",
            width: 850,
            height: 300,
            margin: "0 auto"
          }}
        >
          <Carousel
            ref={carousel => (this.carousel = carousel)}
            width={300}
            height={300}
            direction={"vertical"}
            effect={"3d"}
            index={0}
          >
            <div style={{ width: 300, height: 300 }}>
              <Image size="small" id="im" src={images[0]} />
            </div>
            <div style={{ width: 300, height: 300 }}>
              <Image size="small" id="im" src={images[1]} />
            </div>
            <div style={{ width: 300, height: 300 }}>
              <Image size="small" id="im" src={images[2]} />
            </div>
          </Carousel>
        </div>
      </div>
    );
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>{data}</Grid.Column>
            <Grid.Column>{data2}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}
