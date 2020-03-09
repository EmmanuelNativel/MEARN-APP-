import React, { useEffect, useState } from "react";
import axios from "axios";

import { Table, Alert } from "react-bootstrap";
import StudentTableRow from "./studentTableRow";

function StudentList(props) {
  const [students, setStudents] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const loadStudents = () => {
    axios
      .get("http://localhost:4000/students/")
      .then(res => {
        setStudents(res.data);
      })
      .catch(error => {
        console.log("error LIST : ", error);
        setAlertMsg("Error while listing students !");
        setShowAlert(true);
      });
  };

  const handleDeleteError = () => {
    setAlertMsg("Error while deleting a student !");
    setShowAlert(true);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  console.log("LIST");

  return (
    <div>
      <h1 className="mb-3 text-center">List of Students</h1>
      <Table striped bordered hover>
        <thead >
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>rollNo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, i) => (
            <StudentTableRow
              student={student}
              key={i}
              onStudentsDelete={loadStudents}
              onDeleteError={handleDeleteError}
            />
          ))}
        </tbody>
      </Table>
      {showAlert && (
        <Alert variant="danger" className="w-50 m-3" dismissible onClose={ () => setShowAlert(false) }>
          {alertMsg}
        </Alert>
      )}
    </div>
  );
}

export default StudentList;
