import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";

import { Nav, Navbar, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import CreateStudent from "./components/createStudent";
import EditStudent from "./components/editStudent";
import StudentList from "./components/studentList";
import error404 from "./components/error404";
import LoginPage from "./components/loginPage";
import SignupPage from "./components/signupPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const handleLogOut = e => {
    localStorage.setItem("token", ""); // On efface le token dans le localStorage
    setIsLogged(false);
  };

  const handleConnexion = () => {
    setIsLogged(true);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header mb-5">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Col xs={6}>
                <Navbar.Brand>
                  <Link to="/listStudent" className="nav-link">
                    MERN CRUD APP
                  </Link>
                </Navbar.Brand>
              </Col>

              <Col className="justify-content-end d-flex flex-row">
                <Nav className="mr-3">
                  <Link to="/createStudent" className="nav-link">
                    Create
                  </Link>
                </Nav>
                <Nav>
                  <Link to="/listStudent" className="nav-link">
                    List
                  </Link>
                </Nav>
              </Col>

              <Col className="justify-content-end d-flex flex-row">
                {!isLogged && (
                  <Nav>
                    <Button as={Link} to="/login">
                      Login
                    </Button>
                  </Nav>
                )}
                {!isLogged && (
                  <Nav className="ml-3">
                    <Button as={Link} to="/signup">
                      Sign Up
                    </Button>
                  </Nav>
                )}
                {isLogged && (
                  <Nav>
                    <Button onClick={handleLogOut}>Log Out</Button>
                  </Nav>
                )}
              </Col>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={StudentList} />
                  <Route
                    path="/login"
                    render={props => (
                      <LoginPage {...props} onConnexion={handleConnexion} />
                    )}
                  />
                  <Route path="/signup" component={SignupPage} />
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
