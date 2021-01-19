import React, { useState, useEffect } from "react";
import "./Carousel.scss";
import FormContainer from "./FormContainer";
import { Carousel } from "react-bootstrap";
import Button from "./Button";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

export default function CarouselContainer(props) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([]);
  const [restaurant, setRestaurant] = useState();
  const [restaurants, setRestaurants] = useState([]);

  const rating = restaurant ? restaurant.rating : 0;

  const topStyle = {
    width: `${rating * 36}%` //180% is full stars
  };

  socket.on("query response", (response) => {
    console.log("setting new restaurants...");
    setRestaurant(response[0])
    setRestaurants(response);
    setIndex(0)
  });

  socket.on("connection", (response) => {
    setRestaurant(response[0])
    setRestaurants(response);
  });

  const changeCategory = function (category) {
    socket.emit("new category", category);
  };

  const startMatch = function (category) {
    const responseObj = {category: category, user: props.user}
    socket.emit("new match session", responseObj);
    console.log("matching started");
  };

  const sendAnswerSetState = function (answer) {
    socket.emit("answer", answer);
    setResponse((prev) => [...prev, `${answer.ans}: ${answer.restaurant}`]);
  };

  const handleSelect = (selectedIndex, e) => {
    if (selectedIndex === 9 && index === 0) {
      sendAnswerSetState({
        ans: "nay",
        user: props.user,
        restaurantPhone: restaurants[index].phone,
        restaurant: restaurants[index],
      });
    } else if (selectedIndex > index) {
      sendAnswerSetState({
        ans: "yay",
        user: props.user,
        restaurantPhone: restaurants[index].phone,
        restaurant: restaurants[index],
      });
    } else {
      sendAnswerSetState({
        ans: "nay",
        user: props.user,
        restaurantPhone: restaurants[index].phone,
        restaurant: restaurants[index],
      });
    }
    setIndex(index + 1);
    setRestaurant(restaurants[index + 1]);
  };

  const matchingStarted = function () {
    if (restaurant) {
      return (
        <div>
          <h1>{restaurant.name}</h1>
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
            <Button
              class={"button button--danger"}
              onClick={props.reset}
              name={"Reset"}
            />
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
            <table className="table">
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
                  <th scope="row">Price</th>
                  <td>{restaurant ? restaurant.price : "?"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <FormContainer 
            handleSelect={changeCategory}
            title={"Select New Category"}
          />
        </div>
      ); 
    }
    return (
      <div>
        <h1>Welcome!</h1>
        <FormContainer 
          handleSelect={startMatch}
          title={"Select a Category to Start"}
        />
      </div>
    )
  };

  const carouselItems = restaurants.map((restaurant, index) => {
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

      {matchingStarted()}
    </div>
  );
}
