import React from 'react';
import { Modal, Button } from "react-bootstrap";
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import '../bootstrap/vendor/bootstrap/css/custom.css'

function ModalContainer(props) {

  let title;
  let body;
  let buttons;

  if (props.type === "match" && props.show === true) {
    
    body = (
      <Modal.Body>
        Woohoo we found a match!{" "}
          {
            <a
              rel="noreferrer"
              target="_blank"
              href={`http://www.google.com/search?q=${props.match}`}
            >
              {props.match}
            </a>
          }
      </Modal.Body>
    )

    title = ( 
      <Modal.Title>We Got One!</Modal.Title>
    )

    buttons = (
      <Button className="modal-button" variant="secondary" onClick={props.handleCloseMatch}>
            Close
      </Button>
    )
  }

  if (props.type === "invite" && props.show === true) {

    body = (
      <Modal.Body>
        {props.request.username}, {props.request.partner} Would like to start matching!
      </Modal.Body>
    )

    title = ( 
      <Modal.Title>New Matchr Request</Modal.Title>
    )

    buttons = (
      <>
        <Button className="modal-button" variant="secondary" onClick={props.handleCloseAccept}>
          Accept
        </Button>
        <Button variant="secondary" onClick={props.handleClose}>
            Close
        </Button>
      </>
    )
  }

  if (props.type === "confirm" && props.show === true) {

    body = (
      <Modal.Body>
        Would you like to send {props.partner} a request to start matching?
      </Modal.Body>
    )

    title = ( 
      <Modal.Title>Sending New Matchr Request</Modal.Title>
    )

    buttons = (
      <>
        <Button className="modal-button" variant="secondary" onClick={props.handleCloseSend}>
          Send
        </Button>
        <Button variant="secondary" onClick={props.handleClose}>
            Close
        </Button>
      </>
    )
  }

  return (
    <Modal show={props.show}>
      <Modal.Header>
        {title}
      </Modal.Header>
      {body}
      <Modal.Footer>
        {buttons}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalContainer