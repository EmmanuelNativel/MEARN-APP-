import React from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import CreateStudent from "./components/createStudent";
import EditStudent from "./components/editStudent";
import StudentList from "./components/studentList";
import error404 from "./components/error404";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header mb-5">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to="/listStudent" className="nav-link">
                  MERN CRUD APP
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to="/createStudent" className="nav-link">
                    Create
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/listStudent" className="nav-link">
                    List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={StudentList} />
                  <Route path="/createStudent" component={CreateStudent} />
                  <Route path="/editStudent/:id" component={EditStudent} />
                  <Route path="/listStudent" component={StudentList} />
                  <Route component={error404} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
