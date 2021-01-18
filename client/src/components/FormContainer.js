import React from "react";

import "./Button.scss";
import { Form, Button } from "react-bootstrap";

// Renders button Component
export default function FormContainer(props) {
  return (
    <Form inline>
      <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
        Choose Cuisine
      </Form.Label>
      <Form.Control
        as="select"
        className="my-1 mr-sm-2"
        id="inlineFormCustomSelectPref"
        custom
      >
        <option value="0">Choose...</option>
        <option value="japanese">Japanese</option>
        <option value="chinese">Chinese</option>
        <option value="seafood">Seafood</option>
        <option value="italian">Italian</option>
        <option value="brunch">Brunch</option>
        <option value="vietnamese">Vietnamese</option>
        <option value="mexican">Mexican</option>
      </Form.Control>
      <Button /* onClick={} */ type="submit" className="my-1">
        Submit
      </Button>
    </Form>
  );
}
