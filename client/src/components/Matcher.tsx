import React from "react";
import "../App.scss";
import "../bootstrap/vendor/bootstrap/css/bootstrap.css";
import '../bootstrap/vendor/bootstrap/css/custom.css'
import CarouselContainer from "./CarouselContainer";

function Matcher(props: any) {

  return (
    <div className="content-card restaurant">
      <div>
        <CarouselContainer
          username={props.username}
          reset={props.reset}
          user={props.user}
        />
      </div>
    </div>
  );
}

export default Matcher;
