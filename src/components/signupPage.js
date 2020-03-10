import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function SignupPage({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    success: false,
    message: ""
  });

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
    if (!email || email.length === 0) {
      setAlertContent({
        success: false,
        message: "Veuillez entrer une adresse mail."
      });
      setShowAlert(true);
      return;
    }
    if (!password || password.length === 0) {
      setAlertContent({
        success: false,
        message: "Veuillez entrer un mot de passe."
      });
      setShowAlert(true);
      return;
    }
    if (!passwordConf || passwordConf === 0) {
      setAlertContent({
        success: false,
        message: "Veuillez confirmer votre mot de passe."
      });
      setShowAlert(true);
      return;
    }
    if (password !== passwordConf) {
      setAlertContent({
        success: false,
        message: "Votre confirmation de mot de passe est incorrecte."
      });
      setShowAlert(true);
      return;
    }

    axios
      .post("http://localhost:4000/user/signup", {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.data.text);
        setAlertContent({
          success: true,
          message:
            "Inscription réussie, vous allez être redirigé vers la page de connexion."
        });
        setShowAlert(true);
        setTimeout(() => {
          history.push("/login", {});
        }, 2000);
      })
      .catch(error => {
        let messageError = "";
        if (error.response === undefined) messageError = error;
        else messageError = error.response.data.text;
        setAlertContent({
          success: true,
          message: messageError
        });
        setShowAlert(true);
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="text-center">Page d'inscription</h1>
      <Form onSubmit={handleSubmit} className="m-4">
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

      {showAlert && (
        <Alert
          variant={alertContent.success ? "success" : "danger"}
          className="w-50"
          dismissible
          onClose={() => setShowAlert(false)}
        >
          {alertContent.message}
        </Alert>
      )}
    </div>
  );
}

export default SignupPage;
