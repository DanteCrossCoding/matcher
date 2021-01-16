import React, { useState, useEffect } from "react";
import './App.scss';
import './bootstrap/vendor/bootstrap/css/bootstrap.css'
import MatchContainer from "./components/MatchContainer"
import io from 'socket.io-client';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT)

function App() {


  const [response, setResponse] = useState([]);
  const [user, setUser] = useState("");

  useEffect(() => {
    document.title = "Matcher"
    setUser(Math.floor(Math.random() * 10).toString());
  }, [])

  const sendAnswerSetState = function (answer) {
    socket.emit('answer', answer)
    setResponse(prev => [...prev, answer.ans])
  };

  const startMatch = function() {
    socket.emit('new match session', user)
  } 

  return (
      <div>
        <header className="App-header">
          <h1>
          User {user}
          </h1>
          <div>
            <MatchContainer
              start={startMatch}
              A={() => sendAnswerSetState({ ans: 'yay', user: user})}
              B={() => sendAnswerSetState({ ans: 'nay', user: user})}
              restaurantName={undefined}
            />
          </div>
        </header>
      </div>
  );
}

export default App;
