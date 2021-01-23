import "./App.scss";
import "./bootstrap/vendor/bootstrap/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Partner from "./components/Partner";
import usePartnerData from "./hooks/partnerData";
import Nav from "./components/Nav";
import useMainView from "./hooks/mainView";
import View from "./components/View";
import useMatchData from "./hooks/getMatchData";
import { Modal, Button } from "react-bootstrap";
import Cookies from 'universal-cookie';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

function App() {
  const [match, setMatch] = useState();
  const { selected, setSelected, userList, getUserList } = usePartnerData();
  const { view, pageChange } = useMainView();
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const cookies = new Cookies();

  const handleClose = () => {
    setShow(false);
    resetMatch();
  };
  const { matchData, getMatchData, getUserByEmail } = useMatchData()


  const successfulLogin = function () {
    setUser(getUserByEmail(cookies.get('email')));
  }

  useEffect(() => {
    document.title = "Matchr";
  }, []);

  const loginRedirect = function () {
    pageChange('partner')
  }

  const resetMatch = function () {
    socket.emit("reset", user);
    console.log("match reset");
    setMatch();
  };

  socket.on("match", (match) => {
    console.log(`We have a match!! ${match}`);
    setMatch(match);
    setShow(true);
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="navbar-container">
          <a className="nav-item navbar-brand" href="/">
            Matchr
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <Nav view={view} pageChange={pageChange} />
          </div>
        </div>
      </nav>

      <div className="body">
        <div className="main-container main-view">
          <div className="row">
            <div className="col-lg-12">
              {userList.map((partner) => {
                if (partner.id === selected) {
                  return <Partner name={partner.name} email={partner.email} />
                }
              })}
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>We Got One!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Woohoo we found a match!{" "}
                  {
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={`http://www.google.com/search?q=${match}`}
                    >
                      {match}
                    </a>
                  }
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              <View
                getUserList={getUserList}
                getMatchData={getMatchData}
                cookies={cookies}
                success={successfulLogin}
                redirect={loginRedirect}
                view={view}
                select={setSelected}
                selected={selected}
                partners={userList}
                reset={resetMatch}
                user={user}
                matchList={matchData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
