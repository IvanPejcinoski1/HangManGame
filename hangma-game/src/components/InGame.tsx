import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProgressBar from "./ProgressBar";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";
import ModalComponent from "./ModalComponent";
import { useParams } from "react-router-dom";
import { CategoryKey } from "../types";

const InGame = () => {
  const {
    selectedCategory,
    wordForPlaying,
    setModalShow,
    modalShow,
    playClickSound,
    isGameWon,
    setIsGameWon,
    setSelectedCategory,
    wordData,
  } = useContext(SelectedCategoryContext);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [firstLine, setFirstLine] = useState("");
  const [secondLine, setSecondLine] = useState("");
  const [guessHistory, setGuessHistory] = useState<string[]>([]);

  const numberOfMistakes = guessHistory.filter(
    (letter) => !wordForPlaying.toUpperCase().includes(letter)
  ).length;
  const uniqueLetters = new Set(wordForPlaying.toUpperCase());

  const playSound = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const { catergory } = useParams();
  useEffect(() => {
    if (catergory && catergory in wordData.categories) {
      setSelectedCategory(catergory as CategoryKey);
    }
  }, []);
  const handleGuess = (letter: string) => {
    if (guessHistory.includes(letter)) return;

    setGuessHistory((prev) => [...prev, letter]);

    if (wordForPlaying.toUpperCase().includes(letter)) {
      playSound("/sounds/guessed.mp3");
    } else {
      playSound("/sounds/mistake.mp3");
    }
  };

  useEffect(() => {
    if (isGameWon || numberOfMistakes === 8) {
      return;
    }

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (alphabet.includes(key) && !guessHistory.includes(key)) {
        handleGuess(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [guessHistory, isGameWon, numberOfMistakes]);

  useEffect(() => {
    const uniqueLettersArray = Array.from(uniqueLetters).filter(
      (letter) => letter.trim() !== "" && letter !== "'"
    );

    if (
      uniqueLettersArray.every((letter) =>
        guessHistory.includes(letter.toUpperCase())
      ) &&
      uniqueLettersArray.length > 0
    ) {
      setIsGameWon(true);
      setTimeout(() => {
        setModalShow(true);
      }, 500);
    }

    if (numberOfMistakes === 8) {
      setModalShow(true);
      setIsGameWon(false);
    }
  }, [guessHistory, numberOfMistakes, uniqueLetters]);

  useEffect(() => {
    const renderWordForPlaying = (word: string) => {
      const wordChunks = word.toUpperCase().split(/[ t]/).filter(Boolean);

      const mergeStrings = (words: string[], maxLength = 12) => {
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
            if (currentString) currentString += " ";
            currentString += word;
          } else {
            result.push(currentString);
            currentString = word;
          }
        });
        if (currentString) result.push(currentString);
        return result;
      };

      const mergedStrings = mergeStrings(wordChunks);
      setFirstLine(mergedStrings[0] || "");
      setSecondLine(mergedStrings[1] || "");
    };

    renderWordForPlaying(wordForPlaying);
  }, [wordForPlaying]);

  return (
    <Container fluid className="background inGame">
      <Row>
        <Container className="innerContainer">
          <Row className="headRow">
            <img
              src="/images/Menu.png"
              alt="menu"
              className="menuIcon px-0 mt-3"
              onClick={() => {
                playClickSound();
                setModalShow(true);
              }}
            />
            <Col className="d-flex align-items-center">
              <p className="ps-5">
                {selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
              </p>
              <ProgressBar mistakes={numberOfMistakes} />
            </Col>
          </Row>
          <Row className="showWord">
            <Col lg={12} className="d-flex justify-content-center gap-3">
              {firstLine.split("").map((letter, index) => (
                <div
                  key={index}
                  className="letterDiv"
                  style={{
                    backgroundColor:
                      letter === " "
                        ? "transparent"
                        : guessHistory.includes(letter) || letter === "'"
                        ? "#2463ff"
                        : "rgba(38, 22, 118, 0.5)",
                  }}
                >
                  {guessHistory.includes(letter) || letter === "'"
                    ? letter
                    : ""}
                </div>
              ))}
            </Col>
            <Col lg={12} className="d-flex justify-content-center gap-3">
              {secondLine.split("").map((letter, index) => (
                <div
                  key={index}
                  className="letterDiv"
                  style={{
                    backgroundColor:
                      letter === " "
                        ? "transparent"
                        : guessHistory.includes(letter) || letter === "'"
                        ? "#2463ff"
                        : "rgba(38, 22, 118, 0.5)",
                  }}
                >
                  {guessHistory.includes(letter) || letter === "'"
                    ? letter
                    : ""}
                </div>
              ))}
            </Col>
          </Row>

          <Row className="keyboard justify-content-center mx-auto py-3">
            {alphabet.map((letter, index) => (
              <div
                key={index}
                onClick={() => handleGuess(letter)}
                className="button text-center pt-1"
                style={{
                  cursor: "pointer",
                  backgroundColor: guessHistory.includes(letter)
                    ? "rgba(86,79,156,255)"
                    : "white",
                  pointerEvents:
                    isGameWon || guessHistory.includes(letter)
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
