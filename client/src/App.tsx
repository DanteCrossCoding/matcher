import React, { useEffect } from 'react';
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import axios from "axios";
import Partner from "./components/Partner";
import PartnerList from './components/PartnerList';

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
            <Partner name="Bob Smith" email="test@test.com"/>
            <PartnerList />
          </div>
        </div>
      </div>

    </body>
  );
}

export default App;
