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
    const getUserRestaurants = async function() {
      socket.emit('restaurant request', 'user')
      await socket.on('restaurant response', (response) => {
        setRestaurant(response);
        console.log(response)
      })
    }
    getUserRestaurants();
    document.title = "Matcher"
    setUser(Math.floor(Math.random() * 10).toString());
  }, [])

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
    /* setRestaurant(prev => [...prev, response.restaurants]) */
  })

  socket.on('match', (match) => {
    console.log(`We have a match!! ${match}`)
  })

  return (
      <div>
        <header className="App-header">
          <h1>
          User {user}
          </h1>
            <CarouselContainer
              start={startMatch}
              reset={resetMatch}
              restaurants={restaurants}
              user={user}
            />
        </header>
      </div>
  );
}

export default App;
