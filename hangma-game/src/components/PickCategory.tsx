import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";

const PickCategory = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory, playClickSound } = useContext(
    SelectedCategoryContext
  );
  const handlePickedCategory = (catergory: any) => {
    setSelectedCategory(catergory);
    navigate("/inGame");
  };

  return (
    <Container fluid className="background pickCategory">
      <Row>
        <Container className="innerContainer ">
          <Row className="headRow">
            <Col className="text-center position-relative">
              <Link to={"/"} onClick={playClickSound}>
                <img
                  src="images/Back.png"
                  alt=""
                  className="position-absolute positionStart"
                />
              </Link>

              <img
                src="images/PickCategory.png"
                alt="Pick Category"
                style={{ height: "122px", objectFit: "cover" }}
              />
            </Col>
          </Row>
          <Row className="justify-content-center align-items-stretch">
            <Col
              className="catergory"
              lg={4}
              onClick={() => {
                playClickSound();
                handlePickedCategory("movies");
              }}
            >
              <div>
                <p>MOVIES</p>
              </div>
            </Col>
            <Col
              className="catergory"
              lg={4}
              onClick={() => {
                playClickSound();
                handlePickedCategory("tvShows");
              }}
            >
              <div>
                <p>TV SHOWS</p>
              </div>
            </Col>
            <Col
              className="catergory"
              lg={4}
              onClick={() => {
                playClickSound();
                handlePickedCategory("countries");
              }}
            >
              <div>
                <p>COUNTRIES</p>
              </div>
            </Col>

            <Col
              className="catergory"
              lg={4}
              onClick={() => {
                playClickSound();
                handlePickedCategory("capitalCities");
              }}
            >
              <div>
                <p>CAPITAL CITIES</p>
              </div>
            </Col>

            <Col
              className="catergory"
              lg={4}
              onClick={() => {
                playClickSound();
                handlePickedCategory("animals");
              }}
            >
              <div>
                <p>ANIMALS</p>
              </div>
            </Col>

            <Col
              className="catergory"
              lg={4}
              onClick={() => {
                playClickSound();
                handlePickedCategory("sports");
              }}
            >
              <div>
                <p>SPORTS</p>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};
export default PickCategory;
