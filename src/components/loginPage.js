import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function LoginPage({ onConnexion, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || email.length === 0) return;
    if (!password || password.length === 0) return;

    axios
      .post("http://localhost:4000/user/login", {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data.text);
        localStorage.setItem("token", res.data.token);
        onConnexion();
        history.push("/listStudent", {});
      })
      .catch(error => {
        if (error.response === undefined) console.log("Erreur", error);
        else console.log("Erreur", error.response.data.text);
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="text-center">Page de connexion</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Button type="submit" variant="danger" size="lg" block="block">
          Connexion
        </Button>
      </Form>
    </div>
  );
}

export default LoginPage;
