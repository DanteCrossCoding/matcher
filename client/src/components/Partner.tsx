import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function Partner(props :any) {
  return (
    <div className="current-partner">
      <h1>{props.name}</h1>
      <img id='profile' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" alt="Profile"/>
  <h5 className="user-badge">{props.email}</h5>
    </div>
  );
}

export default Partner