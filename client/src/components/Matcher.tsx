import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import CarouselContainer from "./CarouselContainer";
import FormContainer from "./FormContainer";

function Matcher(props: any) {

  return (
    <div className="restaurant">
      <div>
        <CarouselContainer
          start={props.start}
          reset={props.reset}
          restaurants={props.restaurants}
          user={props.user}
        />
      </div>
      <FormContainer changeCat={props.changeCat}/>
    </div>
  );
}

export default Matcher;
