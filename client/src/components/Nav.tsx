import React from 'react';
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'

export default function Nav(props: any) {


  if (props.view === 'match') {
    return (
      <div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" onClick={() => props.setView('partner')}>Partner Management
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => props.setView('match')}>Match
          <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
      </div>
    )
  } else if (props.view === 'partner') {
    return (
      <div>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item active">
          <a className="nav-link" onClick={() => props.setView('partner')}>Partner Management
              <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => props.setView('match')}>Match</a>
        </li>
      </ul>
      </div>
    )
  }


}