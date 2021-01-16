import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function Matcher() {

  const topStyle = {
    width: "80%" //110% is full stars
  };

  return (
    <div className="restaurant">
      <h2>Restaurant Name</h2>
      <img src="https://lunawood.com/wp-content/uploads/2018/02/placeholder-image-300x225.png" />
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