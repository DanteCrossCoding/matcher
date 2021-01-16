import React, { useState, useEffect } from "react";
import "./Restaurant.scss";
import { Carousel } from "react-bootstrap"
import picture from "./tacoShack.png"
import Button from "./Button"
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT)

export default function CarouselContainer(props) {
  
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([])

  const sendAnswerSetState = function (answer) {
    socket.emit('answer', answer)
    setResponse(prev => [...prev, `${answer.ans}: ${answer.restaurant}`])
  };

  const handleSelect = (selectedIndex, e) => {
    if (selectedIndex > index) {
      sendAnswerSetState({ans: "yay", user: props.user, restaurant: props.restaurants[index]})
    }
    else {
      sendAnswerSetState({ans: "nay", user: props.user, restaurant: props.restaurants[index]})
    }
    setIndex(index + 1);
  };

  const carouselItems = props.restaurants.map((restaurant) => {
    return (
      <Carousel.Item key={restaurant}>
        <img
          className="d-block w-100"
          src={picture}
          alt="First slide"
        />
        <Carousel.Caption key={restaurant}>
          <p>{restaurant}</p>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  return (
    <div>
      <Carousel indicators={false} interval={null} activeIndex={index} onSelect={handleSelect}>
        {carouselItems}
      </Carousel>
      <div className="button-row">
        <Button
          class={"button button--confirm"}
          onClick={props.start}
          name={"Start"}
        />
      </div>
    </div>
     
  );
}