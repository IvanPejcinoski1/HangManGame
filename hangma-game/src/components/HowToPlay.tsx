import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

const HowToPlay = () => {
  return (
    <Container fluid className="background howToPlay">
      <Row>
        <Container className="innerContainer">
          <Row className="headRow">
            <Col className="text-center position-relative">
              <Link to={"/"}>
                {" "}
                <img
                  src="images/Back.png"
                  alt=""
                  className="position-absolute positionStart"
                />
                <img src="images/HowToPlay.png" alt="" />
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center align-items-stretch">
            <Col className="help" lg={4}>
              <div>
                <h4>01</h4>
                <h6>CHOOSE A CATEGORY</h6>
                <p>
                  First, choose a word category, like animals or movies. The
                  computer then randomly selects a secret word from that topic
                  and shows you blanks for each letter of the word.
                </p>
              </div>
            </Col>
            <Col className="help" lg={4}>
              <div>
                <h4>02</h4>
                <h6>GUESS LETTERS</h6>
                <p>
                  Take turns guessing letters. The computer fils in the relevant
                  black spaces if your guess is correct. If it's wrong, you lose
                  some health, which empites after eight incorrect guesses.
                </p>
              </div>
            </Col>
            <Col className="help " lg={4}>
              <div className="h-100">
                <h4>03</h4>
                <h6>WIN OR LOSE </h6>
                <p>
                  You win by guessing all the letters in the word before your
                  health runs out. If the health bar empties before you guess
                  the word, you lose.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};
export default HowToPlay;
