import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
// Add the following imports after running 'npm install react-bootstrap@latest bootstrap@latest react-router-dom@latest @fortawesome/fontawesome-free':

const MainMenu = () => {
  return (
    <Container fluid className="background">
      <Row className="justifly-content-center align-items-center h-100">
        <Col
          className="mainContainer mx-auto d-flex flex-column justify-content-center align-items-center"
          lg={4}
        >
          <img src="images/logo.svg" alt="logo" id="logo" />
          <Link to={"/pickCategory"}>
            <img
              src="images/PlayBtn.png"
              alt="play"
              id="playBtn"
              className="mt-5"
            />
          </Link>
          <Link to={"/howToPlay"}>
            <Button className="btn mt-5">How to play</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default MainMenu;
