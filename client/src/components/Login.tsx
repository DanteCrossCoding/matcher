import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import '../bootstrap/vendor/bootstrap/css/custom.css'

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if ((email === 'test@test.com' || 'bob@bob.com' || 'bob@mango.com' || 'sue@mango.com')) {
      props.cookies.set('email', email)
      props.success();
      props.redirect(); 
  } else {
    alert("Incorrect email or password")
  }
}

  return (
    <div className="content-card restaurant">
      <div className="Login"> 
      <p>
        <h1>Matchr</h1>
        <h1 className="quicksand">Please Log In</h1>
        </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
    </div>

    
  );
}
