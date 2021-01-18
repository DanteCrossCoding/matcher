import React, { useState, useEffect } from "react";
import "./Carousel.scss";
import { Carousel } from "react-bootstrap";
import Button from "./Button";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

export default function CarouselContainer(props) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([]);
  const [restaurant, setRestaurant] = useState();
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(Math.floor(Math.random() * 10).toString());
  }, []);

  const startMatch = function () {
    socket.emit("new match session", user);
    console.log("matching started");
    setIndex(index + 1);
    setRestaurant(props.restaurants[index + 1]);
  };

  socket.on("match", (match) => {
    console.log(`We have a match!! ${match}`);
  });

  const topStyle = {
    width: "10%", //160% is full stars
  };

  const sendAnswerSetState = function (answer) {
    socket.emit("answer", answer);
    setResponse((prev) => [...prev, `${answer.ans}: ${answer.restaurant}`]);
  };

  const matchingStarted = function () {
    if (index > 0) {
      return (
        <Button
          class={"button button--danger"}
          onClick={props.reset}
          name={"Reset"}
        />
      );
    }
    return (
      <Button
        class={"button button--confirm"}
        onClick={startMatch}
        name={"Start"}
      />
    );
  };

  const handleSelect = (selectedIndex, e) => {
    if (selectedIndex === 9 && index === 0) {
      sendAnswerSetState({
        ans: "nay",
        user: props.user,
        restaurant: props.restaurants[index].name,
      });
    } else if (selectedIndex > index) {
      sendAnswerSetState({
        ans: "yay",
        user: props.user,
        restaurant: props.restaurants[index].name,
      });
    } else {
      sendAnswerSetState({
        ans: "nay",
        user: props.user,
        restaurant: props.restaurants[index].name,
      });
    }
    setIndex(index + 1);
    setRestaurant(props.restaurants[index + 1]);
  };

  const carouselItems = props.restaurants.map((restaurant, index) => {
    return (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100 carousel-img"
          src={restaurant.image_url}
          alt="First slide"
        />
      </Carousel.Item>
    );
  });

  return (
    <div>
      <h1>{restaurant ? restaurant.name : "Welcome"}</h1>
      <Carousel
        indicators={false}
        interval={null}
        activeIndex={index}
        onSelect={handleSelect}
        fade={true}
      >
        {carouselItems}
      </Carousel>
      <div className="button-row">
        {matchingStarted()}
      </div>
      <div className="rating">
        <div className="top" style={topStyle}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
        <div className="bottom">
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
      </div>
      <div className="description">
        <table class="table">
          <tbody>
            <tr>
              <th scope="row">Phone</th>
              <td>{restaurant ? restaurant.phone : "?"}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{restaurant ? restaurant.address : "?"}</td>
            </tr>
            <tr>
              <th scope="row">City</th>
              <td>{restaurant ? restaurant.city : "?"}</td>
            </tr>
            <tr>
              <th scope="row">Rating</th>
              <td>{restaurant ? restaurant.rating : "?"}</td>
            </tr>
            <tr>
              <th scope="row">Price</th>
              <td>{restaurant ? restaurant.price : "?"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
