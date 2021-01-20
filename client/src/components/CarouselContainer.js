import React, { useState, useEffect } from "react";
import "./Carousel.scss";
import FormContainer from "./FormContainer";
import { Carousel, Spinner } from "react-bootstrap";
import Button from "./Button";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

export default function CarouselContainer(props) {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState([]);
  const [restaurant, setRestaurant] = useState();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState('null');

  const rating = restaurant ? restaurant.rating : 0;

  const topStyle = {
    width: `${rating * 36}%`, //180% is full stars
  };

  socket.on("query response", (response) => {
    console.log("setting new restaurants...");
    setLoading(false);
    setRestaurant(response[0]);
    setRestaurants(response);
    setIndex(0);
    setMatch('null')
  });

  socket.on("connection", (response) => {
    setRestaurants(response);
    setRestaurant(response[0]);
    setLoading(false);
    setIndex(0)
  });

  socket.on("resetCarousel", () => {
    console.log('carousel reset')
    setRestaurant();
    setRestaurants();
    setIndex(0);
    setMatch('null')
  });

  const changeCategory = function (category) {
    setLoading(true);
    socket.emit("change category", category);
  };

  const startMatch = function (category) {
    setLoading(true);
    const responseObj = { category: category, user: props.user };
    socket.emit("new match session", responseObj);
    console.log("matching started");
  };

  const sendAnswerSetState = function (answer) {
    socket.emit("answer", answer);
    setResponse((prev) => [...prev, `${answer.ans}: ${answer.restaurant}`]);
  };

  const isLoading = function () {
    if (loading) {
      return (
        <div class="spinner">
          <h6>Loading Restaurants...</h6>
          <Spinner animation="border" />
        </div>
      );
    }
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
        if (index === 8) {
          setMatch('false')
        }
    } else {
        sendAnswerSetState({
          ans: "nay",
          user: props.user,
          restaurantPhone: restaurants[index].phone,
          restaurant: restaurants[index],
        });
        if (index === 8) {
          setMatch('false')
        }
    }
    setIndex(index + 1);
    setRestaurant(restaurants[index + 1]);
  };

  const matchingStarted = function () {
    if ((match === 'false')) {
      return (
        <div>
          <h1>No matches found yet</h1>
          <h3>Keep Matching:</h3>
          <FormContainer
            handleSelect={changeCategory}
            title={"Select another Category"}
          />
          <h3>
            Or find a {
              <a rel="noreferrer" target="_blank" href={`http://www.google.com/search?q=Marriage+counsellor`}>
              marriage counsellor
            </a>
            }
          </h3>
          <div>{isLoading()}</div>
        </div>
      );
    } 
    if (restaurant === undefined && match === 'null') {
      return (
        <div>
          <h1>Welcome!</h1>
          <FormContainer
            handleSelect={startMatch}
            title={"Select a Category to Start"}
          />
          <div>{isLoading()}</div>
        </div>
      );
    }
    else {
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
          <div className="button-row"></div>
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
          <div>{isLoading()}</div>
          <FormContainer
            handleSelect={changeCategory}
            title={"Select New Category"}
          />
        </div>
      );
    }
  };

  return <div>{matchingStarted()}</div>;
}
