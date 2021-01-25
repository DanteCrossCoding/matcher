import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function MatchListItem(props: any) {
  return (
    <div>
      <a href={`https://www.google.com/search?q=${props.match.restaurant}`}>{props.match.restaurant}</a>
    </div>
  )
}

// https://www.google.com/search?q=${props.name} 
// https://maps.google.com/?q=${props.address},${props.city} 

export default MatchListItem