import React from "react";
import picture from "./tacoShack.png"

import { Carousel } from "react-bootstrap"

// Renders button Component
export default function CarouselSlide(props) {

  return (
    <Carousel.Item interval={1000}>
      <img
        className="d-block w-100"
        src={picture}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>{props.key}</p>
      </Carousel.Caption>
    </Carousel.Item>
  );
}