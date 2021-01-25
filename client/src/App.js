import "./App.scss";
import "./bootstrap/vendor/bootstrap/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Partner from "./components/Partner";
import usePartnerData from "./hooks/partnerData";
import Nav from "./components/Nav";
import ModalContainer from "./components/ModalContainer";
import useMainView from "./hooks/mainView";
import View from "./components/View";
import useMatchData from "./hooks/getMatchData";
import Cookies from 'universal-cookie';

const ENDPOINT = "http://localhost:9000";

const socket = io(ENDPOINT);

function App() {
  const cookies = new Cookies();
  const [match, setMatch] = useState();
  const [partner, setPartner] = useState()
  const { selected, setSelected, userList } = usePartnerData();
  const { view, pageChange } = useMainView();
  const { matchData, getMatchData, getUserByEmail } = useMatchData()
  const [user, setUser] = useState({});
  const [username, setUsername] = useState(cookies.get('username') ? cookies.get('username') : "");
  const [show, setShow] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [request, setRequest] = useState();
  
  const partnerSelect = function(partner) {
    setPartner(partner)
  }

  const inviteConfirm = function() {
    setShowConfirm(true)
  }

  socket.on('invitation', (response) => {
    setRequest({...response})
    setShowInvite(true)
  })

  const handleCloseMatch = (type) => {
    setShow(false);
    setShowConfirm(false);
    setShowInvite(false);
    resetMatch();
   };

  const handleClose = (type) => {
    setShow(false);
    setShowConfirm(false);
    setShowInvite(false);
   };

   const handleCloseSend = function () {
      const responseObj = {user: user.email, username: username, parter: partner}
      socket.emit('invite', responseObj)
      pageChange('match')
      setShowConfirm(false);
   }

   const handleCloseAccept = function () {
     setShowInvite(false);
     for (const partner of userList) {
       if (partner.email === request.user) {
         setSelected(partner.id);
        }
      }
      pageChange('match')
    }


  const usernameAssign = function(user) {
    if (user === "bob@mango.com") {
      setUsername("Bob Mango")
      cookies.set('username', "Bob Mango")
    }

    if (user === "sue@mango.com") {
      setUsername("Sue Mango")
      cookies.set('username', "Sue Mango")
    }
    
  }

  const successfulLogin = function () {
    setUser(getUserByEmail(cookies.get('email')));
    usernameAssign(cookies.get('email'));
  }

  useEffect(() => {
    document.title = "Matchr";
    /* getUserList(); */
  }, []);

  const loginRedirect = function () {
    pageChange('partner')
  }

  const resetMatch = function () {
    socket.emit("reset", user.email);
    console.log("match reset");
    setMatch();
    pageChange("match-list")
  };

  socket.on("match", (match) => {
    console.log(`We have a match!! ${match}`);
    setShow(true);
    setMatch(match);
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
            <Nav username={username} view={view} pageChange={pageChange} />
          </div>
        </div>
      </nav>

      <div className="body">
              {userList.map((partner) => {
                if (partner.id === selected) {
                  return <Partner name={partner.name} email={partner.email} />
                }
              })}
              <ModalContainer 
                show={show}
                handleClose={handleClose}
                handleCloseMatch={handleCloseMatch}
                match={match}
                type={"match"}
              />
              <ModalContainer 
                request={request}
                show={showInvite}
                handleClose={handleClose}
                handleCloseAccept={handleCloseAccept}
                match={match}
                type={"invite"}
              />
              <ModalContainer
                partner={partner} 
                show={showConfirm}
                handleClose={handleClose}
                handleCloseSend={handleCloseSend}
                match={match}
                type={"confirm"}
              />
              <View
                partner={partner}
                inviteConfirm={inviteConfirm}
                partnerSelect={partnerSelect}
                username={username}
                /* getUserList={getUserList} */
                getUserByEmail={getUserByEmail}
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
  )
}

export default App;
