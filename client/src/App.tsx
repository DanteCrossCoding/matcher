import React, { useEffect } from 'react';
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import axios from "axios";

function App() {
  const testBackEnd = (): string => {
    axios.get("/test")
      .then((res) => {
        console.log(res.data);
      })
    return "Error";
  }

  useEffect(() => {
    document.title = "Matcher"
  }, [])

  return (
    <body>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="/">Matcher</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Partner Management
              <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Match</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="current-partner">
              <h1 className="mt-5">My Partner</h1>
              <img src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png-286x300.jpg" width="200px" />
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut iure inventore placeat incidunt dolorum voluptates rem, a praesentium facilis nisi blanditiis vero, fugit et consequatur! Sed quidem deleniti quisquam debitis.</p>
              <h5>email@email.com</h5>
            </div>
            <div className="partners">
              <h1 className="mt-5">Partners</h1>
              <ul className="list">
                <li>
                  Partner 1
                </li>
                <li>
                  Partner 2
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </body>
  );
}

export default App;
