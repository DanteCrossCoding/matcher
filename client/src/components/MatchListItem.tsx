import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function MatchListItem(props: any) {
  return (
    <div>
      <a rel="noreferrer" target="_blank" href={`https://www.google.com/search?q=${props.match.restaurant}`}>{props.match.restaurant}</a>
    </div>
  )
}

export default MatchListItem