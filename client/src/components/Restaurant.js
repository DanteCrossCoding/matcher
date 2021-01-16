import React from "react";
import picture from "./tacoShack.png"

import "./Restaurant.scss";

export default function Restaurant(props) {

  return (
    <div class="restaurant">
      <h3>{props.name}</h3>
      <img alt="A Taco" src={picture}/>
    </div>
  );
}