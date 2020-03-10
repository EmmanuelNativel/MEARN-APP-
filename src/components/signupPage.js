import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function SignupPage({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  const handlePasswordConfChange = e => {
    setPasswordConf(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!email || email.length === 0) return;
    if (!password || password.length === 0) return;
    if (!passwordConf || passwordConf === 0) return;
    if (password !== passwordConf) return;

    axios
      .post("http://localhost:4000/user/signup", {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data.text);
        history.push("/listStudent", {});
      })
      .catch(error => {
        if (error.response === undefined) console.log("Erreur", error);
        else console.log("Erreur", error.response.data.text);
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="text-center">Page d'inscription</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            vlaue={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Form.Group controlId="passwordConf">
          <Form.Label>Confirmez votre mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={passwordConf}
            onChange={handlePasswordConfChange}
          />
        </Form.Group>

        <Button variant="danger" type="submit" block="block" size="lg">
          Inscription
        </Button>
      </Form>
    </div>
  );
}

export default SignupPage;
