import React from "react";

import "./Button.scss";
import { Form, Button, Dropdown, DropdownButton } from "react-bootstrap";

// Renders button Component
export default function FormContainer(props) {

  const handleSelect = function (event) {
    props.changeCat(event);
  }

  return (
    
  <DropdownButton onSelect={handleSelect} id="dropdown-basic-button" title="Select New Category">
    <Dropdown.Item eventKey="japanese">Japanese</Dropdown.Item>
    <Dropdown.Item eventKey="chinese">Chinese</Dropdown.Item>
    <Dropdown.Item eventKey="seafood">Seafood</Dropdown.Item>
    <Dropdown.Item eventKey="italian">Italian</Dropdown.Item>
    <Dropdown.Item eventKey="brunch">Brunch</Dropdown.Item>
    <Dropdown.Item eventKey="vietnamese">Vietnamese</Dropdown.Item>
    <Dropdown.Item eventKey="mexican">Mexican</Dropdown.Item>
  </DropdownButton>
  );
}


