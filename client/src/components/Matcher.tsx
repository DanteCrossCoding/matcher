import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import CarouselContainer from "./CarouselContainer"

function Matcher(props: any) {

  const topStyle = {
    width: "10%" //160% is full stars
  };

  return (
    <div className="restaurant">
      <h2>Restaurant Name</h2>
      <div>
          <h1>
          User {props.user}
          </h1>
            <CarouselContainer
              start={props.start}
              reset={props.reset}
              restaurants={props.restaurants}
              user={props.user}
            />
      </div>
      <div className="rating">
        <div className="top" style={topStyle}>
          <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
        </div>
        <div className="bottom">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
      </div>
      <div className="description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi nobis reiciendis ipsa eveniet corrupti iste, sunt odit, assumenda, itaque veritatis quisquam? Facere, magni? Officiis delectus eius accusantium minima animi modi?
      </div>
    </div>
  )
}

export default Matcher