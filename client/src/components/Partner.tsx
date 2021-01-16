import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function Partner(props :any) {
  return (
    <div className="current-partner">
      <h1 className="mt-5">{props.name}</h1>
      <img src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg" width="200px" />
  <h5>{props.email}</h5>
    </div>
  );
}

export default Partner