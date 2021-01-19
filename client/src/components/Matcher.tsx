import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import '../bootstrap/vendor/bootstrap/css/custom.css'
import CarouselContainer from "./CarouselContainer";
import FormContainer from "./FormContainer";

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
        />
      </div>
      <FormContainer changeCat={props.changeCat}/>
    </div>
  );
}

export default Matcher;
