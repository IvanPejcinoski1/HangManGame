import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ProgressBar from "./ProgressBar";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";
import ModalComponent from "./ModalComponent";

const InGame = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    wordForPlaying,
    setModalShow,
    modalShow,
  } = useContext(SelectedCategoryContext);
  let alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [guessHistory, setGuessHistory] = useState<string[]>([]);
  const [isGameWon, setIsGameWon] = useState(false);

  let numberOfMistakes = guessHistory.filter(
    (letter) => !wordForPlaying.toUpperCase().includes(letter)
  ).length;
  let uniqueLetters = new Set(wordForPlaying);

  const renderWordForPlaying = (word: string) => {
    let wordChunks = word.toUpperCase().split(/[ t]/).filter(Boolean);

    function mergeStrings(words: string[], maxLength = 12) {
      const result: string[] = [];
      let currentString = "";

      words.forEach((word) => {
        while (word.length > maxLength) {
          const part = word.slice(0, maxLength - 1);
          result.push(part + "-");
          word = word.slice(maxLength - 1);
        }

        if (
          currentString.length + word.length + (currentString ? 1 : 0) <=
          maxLength
        ) {
          if (currentString) {
            currentString += " ";
          }
          currentString += word;
        } else {
          result.push(currentString);
          currentString = word;
        }
      });
      if (currentString) {
        result.push(currentString);
      }
      return result;
    }
    const mergedStrings = mergeStrings(wordChunks);
    setFirstLine(mergedStrings[0] || "");
    setSecondLine(mergedStrings[1] || "");
  };

  function capitalizeCategory(category: string) {
    switch (category) {
      case "movies":
        return "Movies";
      case "tvShows":
        return "Tv shows";
      case "countries":
        return "Countries";
      case "capitalCities":
        return "Capital cities";
      case "animals":
        return "Animals";
      case "sports":
        return "Sports";
      default:
        return "Unknown category";
    }
  }

  useEffect(() => {
    if (
      Array.from(uniqueLetters)
        .filter((letter) => letter.trim() !== "" && letter !== "'")
        .every((letter) => guessHistory.includes(letter.toUpperCase()))
    ) {
      setIsGameWon(true);
      setModalShow(true);
    }
    if (numberOfMistakes == 8) {
      setModalShow(true);
      setIsGameWon(false);
    }
  }, [guessHistory]);
  useEffect(() => {
    setIsGameWon(false);
    setModalShow(false);
  }, []);
  useEffect(() => {
    renderWordForPlaying(wordForPlaying);
  }, [wordForPlaying]);

  return (
    <Container fluid className="background inGame">
      <Row>
        <Container className="innerContainer ">
          <Row className="headRow ">
            <Col className="d-flex align-items-center">
              <img
                src="images/Menu.png"
                alt=""
                className="menuIcon"
                onClick={() => setModalShow(true)}
              />
              <p className="ps-5">{capitalizeCategory(selectedCategory)}</p>
              <ProgressBar mistakes={numberOfMistakes} />
            </Col>
          </Row>
          <Row className="showWord ">
            <Col lg={12} className="d-flex justify-content-center gap-3">
              {firstLine
                .toUpperCase()
                .split("")
                .map((letter, index) => (
                  <div
                    key={index}
                    className="letterDiv "
                    style={{
                      backgroundColor:
                        letter === " "
                          ? "transparent"
                          : guessHistory.includes(letter)
                          ? "#2463ff"
                          : "rgba(38, 22, 118, 0.5)",
                    }}
                  >
                    {guessHistory.includes(letter) || letter == "'"
                      ? letter
                      : ""}
                  </div>
                ))}
            </Col>
            <Col lg={12} className="d-flex justify-content-center gap-3">
              {secondLine
                .toUpperCase()
                .split("")
                .map((letter, index) => (
                  <div
                    key={index}
                    className="letterDiv "
                    style={{
                      backgroundColor:
                        letter === " "
                          ? "transparent"
                          : guessHistory.includes(letter)
                          ? "#2463ff"
                          : "rgba(38, 22, 118, 0.5)",
                    }}
                  >
                    {guessHistory.includes(letter) || letter == "'"
                      ? letter
                      : ""}
                  </div>
                ))}
            </Col>
          </Row>
          <Row className="keyboard justify-content-center mx-auto py-3">
            {alphabet.map((letter, index) => (
              <div
                onClick={() =>
                  setGuessHistory((prevState) => [...prevState, letter])
                }
                key={index}
                className="flex-shrink-0  button text-center align-content-center "
                style={{
                  cursor: "pointer",
                  backgroundColor: guessHistory.includes(letter)
                    ? "rgba(86,79,156,255)"
                    : "white",
                  pointerEvents: guessHistory.includes(letter)
                    ? "none"
                    : "auto",
                }}
              >
                {letter}
              </div>
            ))}
          </Row>
          <ModalComponent
            show={modalShow}
            mistakes={numberOfMistakes}
            winCondition={isGameWon}
            setGuessHistory={setGuessHistory}
          />
        </Container>
      </Row>
    </Container>
  );
};
export default InGame;
