import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import CarouselContainer from "./CarouselContainer";

function Matcher(props: any) {

  return (
    <div className="restaurant">
      {props.foundMatch()}
      <div>
        <CarouselContainer
          start={props.start}
          reset={props.reset}
          restaurants={props.restaurants}
          user={props.user}
          rating={props.rating}
          changeCat={props.changeCat}
        />
      </div>
    </div>
  );
}

export default Matcher;
