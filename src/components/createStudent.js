import React, { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function CreateStudent(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState({
    success: false,
    message: ""
  });

  const onNameChange = e => {
    setName(e.target.value);
  };
  const onEmailChange = e => {
    setEmail(e.target.value);
  };
  const onRollNoChange = e => {
    setRollNo(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    const studentObject = {
      name: name,
      email: email,
      rollno: rollNo
    };

    axios
      .post("http://localhost:4000/students/create-student", studentObject)
      .then(res => {
        setShowAlert(true);
        setAlertContent({
          success: true,
          message: "Etudiant créé avec succès !"
        });
      })
      .catch(error => {
        setShowAlert(true);
        setAlertContent({ success: false, message: error.response.data.text });
        //console.log("Error CREATE : ", error.response.data.text);
      });

    setName("");
    setEmail("");
    setRollNo("");
  };
  return (
    <div className="form-wrapper">
      <h1 className="mb-3 text-center">Create a new student</h1>
      <Form onSubmit={onSubmit} className="m-4">
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={onNameChange} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={onEmailChange} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Roll No</Form.Label>
          <Form.Control
            type="number"
            value={rollNo}
            onChange={onRollNoChange}
          />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Create Student
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

CreateStudent.propTypes = {};

export default CreateStudent;
