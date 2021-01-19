import React, { useState } from "react";
import useMainView from '../hooks/mainView'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../App.scss';
import '../bootstrap/vendor/bootstrap/css/bootstrap.css'
import '../bootstrap/vendor/bootstrap/css/custom.css'

export default function Login() {
  const { view, pageChange } = useMainView();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (email === 'test@test.com' && password === 'password') {
    
  }}

  return (
    <div className="Login">
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
  );
}
