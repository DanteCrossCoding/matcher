import React from "react";
import Button from "./Button"
import Restaurant from "./Restaurant"
import "./Restaurant.scss";

export default function MatchContainer(props) {

  return (
    <div class="swiper">
        <Restaurant
          name={props.restaurantName ? props.restaurantName : "Welcome"}
        />
      <div class="button-row">
        <Button
          class={"button button--confirm"}
          onClick={props.A}
          name={"Yay"}
        />
        <Button
          class={"button button--danger"}
          onClick={props.B}
          name={"Nay"}
        />
      </div>
      <Button 
        class={"button button--danger"}
        onClick={props.start}
        name={"Start Match"}
      />
    </div>
  );
}