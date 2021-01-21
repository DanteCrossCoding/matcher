import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

function Nav(props: any) {
  let partner: string = "nav-item right";

  let match: string = "nav-item right";

  if (props.view === "match") {
    match += " active";
  }

  if (props.view === 'partner') {
    partner += " active"
  }

  return (
    <ul className="navbar-nav ml-auto">
      <li className={partner}>
        <span className="nav-link" onClick={() => props.pageChange('partner')}>Partner Management
        </span>
      </li>
      <li className={match}>
        <span className="nav-link" onClick={() => props.pageChange('match')}>Match
        </span>
      </li>
    </ul>
  )
}

export default Nav