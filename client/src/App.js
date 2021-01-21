import "./App.scss";
import "./bootstrap/vendor/bootstrap/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Partner from "./components/Partner";
import usePartnerData from "./hooks/partnerData";
import Nav from "./components/Nav";
import useMainView from "./hooks/mainView";
import View from "./components/View";
import { Modal, Button } from "react-bootstrap";

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

function App() {
  const [match, setMatch] = useState();
  const { selected, setSelected, partnerTemp } = usePartnerData();
  const { view, pageChange } = useMainView();
  const [user, setUser] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    resetMatch();
  };

  useEffect(() => {
    setUser(Math.floor(Math.random() * 10).toString()); // THIS ONE DANTE
    document.title = "Matcher";
  }, []);

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
    <>
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
              {partnerTemp.map((partner) => {
                if (partner.id === selected) {
                  return <Partner name={partner.name} email={partner.email} />;
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
                /* foundMatch={foundMatch} */
                view={view}
                select={setSelected}
                selected={selected}
                partners={partnerTemp}
                reset={resetMatch}
                user={user}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
