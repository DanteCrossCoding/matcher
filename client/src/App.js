import React, { useState, useEffect } from "react";
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import CarouselContainer from "./components/CarouselContainer"
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT)

function App() {

  const [user, setUser] = useState("");
  const [restaurants, setRestaurant] = useState([]);


  useEffect(() => {
    document.title = "Matcher"
    setUser(Math.floor(Math.random() * 10).toString());
  }, [])

  const startMatch = function() {
    socket.emit('new match session', user)
  } 

  socket.on('response', (response) => {
    setRestaurant(prev => [...prev, response.restaurants])
  })

  const testoraunts =  
  [ '8IUK_KGorRQ4yfa5h6ANcQ',
  'ba7QMdfLHj2ayzssvKJ6-A',
  'JgSGpSMHbGecAXs_o1rE_g',
  'vnKoBdTuh2lsUKASMwQYbA',
  'NN19pPLwqETuATMNlUNb_Q',
  'K1943yeGQELTUeiH6bDa2g',
  'UAcbpL0tF-URY0yKlLw6ow',
  'AEOyRbQtYD3bmX1qJWvt4g',
  'uxJqItMyU6pAJxxmveiXBw',
  'Hcw11wj3TMoP5Deg66bJig' ]

  return (
      <div>
        <header className="App-header">
          <h1>
          User {user}
          </h1>
            <CarouselContainer
              start={startMatch}
              restaurants={testoraunts}
              user={user}
            />
        </header>
      </div>
  );
}

export default App;
