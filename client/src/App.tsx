import React from 'react';
import './App.css';
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

  return (
    <body>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div className="container">
      <a className="navbar-brand" href="#">Start Bootstrap</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Services</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div className="container">
    <div className="row">
      <div className="col-lg-12 text-center">
        <h1 className="mt-5">A Bootstrap 4 Starter Template</h1>
        <p className="lead">Complete with pre-defined file paths and responsive navigation!</p>
        <ul className="list-unstyled">
          <li>Bootstrap 4.5.3</li>
          <li>jQuery 3.5.1</li>
        </ul>
      </div>
    </div>
  </div>

</body>
  );
}

export default App;
