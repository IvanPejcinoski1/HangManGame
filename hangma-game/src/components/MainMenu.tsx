import React, { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";

const MainMenu = () => {
  const { playClickSound } = useContext(SelectedCategoryContext);

  return (
    <Container fluid className="background">
      <Row className="justifly-content-center align-items-center h-100">
        <Col
          className="mainContainer mx-auto d-flex flex-column justify-content-center align-items-center"
          lg={4}
        >
          <img src="images/logo.svg" alt="logo" id="logo" />
          <Link to={"/pickCategory"} onClick={playClickSound}>
            <img
              src="/images/PlayBtn.png"
              alt="play"
              id="playBtn"
              className="mt-5"
            />
          </Link>
          <Link to={"/howToPlay"} onClick={playClickSound}>
            <Button className="btn mt-5">How to play</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default MainMenu;
