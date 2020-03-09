import React, { useState, useEffect } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

function EditStudent({ match, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollno, setRollno] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/students/edit-student/${match.params.id}`)
      .then(res => {
        setName(res.data.name);
        setEmail(res.data.email);
        setRollno(res.data.rollno);
      })
      .catch(error => console.log("student GET error : ", error));
  }, [match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    const studentObject = {
      name: name,
      email: email,
      rollno: rollno
    };
    axios
      .put(
        `http://localhost:4000/students/update-student/${match.params.id}`,
        studentObject
      )
      .then(res => {
        console.log(res);
        console.log("Student successfully updated !");
        history.push("/listStudent", {}); // redirection to student list
      })
      .catch(error => {
        console.log("error PUT : ", error);
        setShowAlert(true);
      });
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };
  const handleEmailChange = e => {
    setEmail(e.target.value);
  };
  const handleRollNoChange = e => {
    setRollno(e.target.value);
  };

  return (
    <div className="form-wrapper">
      <h1 className="mb-3 text-center">Update a student</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={handleNameChange} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>RollNo</Form.Label>
          <Form.Control
            type="text"
            value={rollno}
            onChange={handleRollNoChange}
          />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update student
        </Button>
      </Form>
      {showAlert && (
        <Alert variant="danger" className="w-50 m-3" dismissible onClose={() => setShowAlert(false)}>
          Error while updating student !
        </Alert>
      )}
    </div>
  );
}

export default EditStudent;
