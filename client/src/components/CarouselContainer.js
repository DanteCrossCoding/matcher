import React, { useState, useEffect } from "react";
import "./Restaurant.scss";
import { Carousel } from "react-bootstrap"
import picture from "./tacoShack.png"
import Button from "./Button"
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT)

export default function CarouselContainer(props) {

  socket.on('match', (match) => {
    console.log(`We have a match!! ${match}`)
  })
  
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([])

  const sendAnswerSetState = function (answer) {
    socket.emit('answer', answer)
    setResponse(prev => [...prev, `${answer.ans}: ${answer.restaurant}`])
  };
  
  const handleSelect = (selectedIndex, e) => {
    if (selectedIndex === 9 && index === 0) {
      sendAnswerSetState({ans: "nay", user: props.user, restaurant: props.restaurants[index].name})
    }
    else if (selectedIndex > index) {
      sendAnswerSetState({ans: "yay", user: props.user, restaurant: props.restaurants[index].name})
    }
    else {
      sendAnswerSetState({ans: "nay", user: props.user, restaurant: props.restaurants[index].name})
    }
    setIndex(index + 1);
  };

  const carouselItems = props.restaurants.map((restaurant) => {
    return (
      <Carousel.Item key={restaurant.name }>
        <img
          className="d-block w-100 carousel-img"
          src={restaurant.image_url}
          alt="First slide"
        />
        <Carousel.Caption key={restaurant.name}>
          <p>{restaurant.name}</p>
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
        <Button
          class={"button button--danger"}
          onClick={props.reset}
          name={"reset"}
        />
      </div>
    </div>
     
  );
}