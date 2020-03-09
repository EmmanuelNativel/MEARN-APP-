import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

function studentTableRow({ student, onStudentsDelete, onDeleteError }) {
  const handleDeleteStudent = e => {
    Axios.delete(`http://localhost:4000/students/delete-student/${student._id}`)
      .then(res => {
        console.log(res);
        console.log("Student deleted successfully !");
        onStudentsDelete();
      })
      .catch(error => {
        console.log("student DELETE error : ", error);
        onDeleteError();
      });
  };

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.email}</td>
      <td>{student.rollno}</td>
      <td>
        <Container>
          <Row>
            <Col>
              <Button as={Link} to={`/editStudent/${student._id}`} size="sm">
                <FontAwesomeIcon icon={faUserEdit} />
              </Button>
            </Col>
            <Col>
              <Button variant="danger" size="sm" onClick={handleDeleteStudent}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            </Col>
          </Row>
        </Container>
      </td>
    </tr>
  );
}

export default studentTableRow;
