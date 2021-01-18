import React, { useState, useEffect } from "react";
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import io from 'socket.io-client';
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

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT)

function App() {

  const [user, setUser] = useState("");
  const [restaurants, setRestaurants] = useState([]);


  useEffect(() => {
    const getUserRestaurants = async function() {
      socket.emit('restaurant request', 'user')
      await socket.on('restaurant response', (response) => {
        setRestaurants(response);
      })
    }
    getUserRestaurants();
    document.title = "Matcher"
    setUser(Math.floor(Math.random() * 10).toString());
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

  const startMatch = function() {
    socket.emit('new match session', user)
    console.log("matching started")
  } 

  const resetMatch = function() {
    socket.emit('reset', 'reset')
    console.log("match reset")
  }

  socket.on('connection', (response) => {
    console.log('connected')
  })

  socket.on('match', (match) => {
    console.log(`We have a match!! ${match}`)
  })

  socket.on('query response', (response) => {
    setRestaurants(response);
  })

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
            <View 
              view={view} 
              select={setSelected} 
              selected={selected} 
              partners={partnerTemp}
              start={startMatch}
              reset={resetMatch}
              restaurants={restaurants}
              user={user} 
            />
          </div>
        </div>
      </div>

    </body>
  );
}

export default App;
