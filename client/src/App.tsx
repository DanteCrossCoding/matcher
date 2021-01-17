import React, { useEffect } from 'react';
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import axios from "axios";
import Partner from "./components/Partner";
import PartnerList from './components/PartnerList';
import usePartnerData from "./hooks/partnerData";
import Matcher from './components/Matcher';
import Nav from './components/Nav';
import useMainView from './hooks/mainView';
import View from './components/View';

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

  const {
    selected,
    setSelected,
    partnerTemp
  } = usePartnerData()

  const {
    view,
    pageChange
  } = useMainView();

  return (
    <body>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="/">Matcher</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <Nav view={view} pageChange={pageChange}/>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {partnerTemp.map((partner) => {
              if (partner.id === selected) {
                return <Partner name={partner.name} email={partner.email} />
              }
            })}
            <View view={view} select={setSelected} selected={selected} partners={partnerTemp} />
          </div>
        </div>
      </div>

    </body>
  );
}

export default App;
