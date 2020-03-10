import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function LoginPage({ onConnexion, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async e => {
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
        let messageError = "";
        if (error.response === undefined) messageError = error;
        else messageError = error.response.data.text;
        setAlertContent({ success: false, message: messageError });
        setShowAlert(true);
      });
  };

  return (
    <div className="form-wrapper">
      <h1 className="text-center">Page de connexion</h1>
      <Form onSubmit={handleSubmit} className="m-4">
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
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

export default LoginPage;
