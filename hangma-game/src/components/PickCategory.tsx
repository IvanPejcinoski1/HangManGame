import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";

const PickCategory = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useContext(
    SelectedCategoryContext
  );
  const handlePickedCategory = (catergory: any) => {
    setSelectedCategory(catergory);
    navigate("/inGame");
  };

  return (
    <Container fluid className="background pickCategory">
      <Row>
        <Container className="innerContainer">
          <Row className="headRow">
            <Col className="text-center position-relative">
              <Link to={"/"}>
                <img
                  src="images/Back.png"
                  alt=""
                  className="position-absolute positionStart"
                />
              </Link>

              <img src="images/PickCategory.png" alt="" />
            </Col>
          </Row>
          <Row className="justify-content-center align-items-stretch">
            <Col
              className="catergory"
              lg={4}
              onClick={() => handlePickedCategory("movies")}
            >
              <div>
                <p>MOVIES</p>
              </div>
            </Col>
            <Col
              className="catergory"
              lg={4}
              onClick={() => handlePickedCategory("tvShows")}
            >
              <div>
                <p>TV SHOWS</p>
              </div>
            </Col>
            <Col
              className="catergory"
              lg={4}
              onClick={() => handlePickedCategory("countries")}
            >
              <div>
                <p>COUNTRIES</p>
              </div>
            </Col>

            <Col
              className="catergory"
              lg={4}
              onClick={() => handlePickedCategory("capitalCities")}
            >
              <div>
                <p>CAPITAL CITIES</p>
              </div>
            </Col>

            <Col
              className="catergory"
              lg={4}
              onClick={() => handlePickedCategory("animals")}
            >
              <div>
                <p>ANIMALS</p>
              </div>
            </Col>

            <Col
              className="catergory"
              lg={4}
              onClick={() => handlePickedCategory("sports")}
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
