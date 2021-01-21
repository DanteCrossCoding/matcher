import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function MatchListItem(props: any) {
  return (
    <div>
      <h1>{props.match.restaurant}</h1>
    </div>
  )
}

export default MatchListItem