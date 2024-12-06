import { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";
import { Container, Row } from "react-bootstrap";

interface Props {
  show: boolean;
  mistakes: number;
  winCondition: boolean;
  setGuessHistory: React.Dispatch<React.SetStateAction<string[]>>;
}
const ModalComponent = ({
  show,
  mistakes,
  winCondition,
  setGuessHistory,
}: Props) => {
  const { setModalShow, modalShow, getWordForPlaying } = useContext(
    SelectedCategoryContext
  );
  const navigate = useNavigate();
  const handleClick = (navigateArg: string) => {
    setModalShow(false);
    navigate(navigateArg);
  };
  const hadlePlayAgain = () => {
    setGuessHistory([]);
    getWordForPlaying();
    setModalShow(false);
  };
  const handleNewCategoryClick = () => {
    setGuessHistory([]);
    navigate("/pickCategory");
  };
  const handleQuit = () => {
    setGuessHistory([]);
    navigate("/");
  };
  return (
    <div
      className={`${
        show ? "d-block" : "d-none"
      } modalComponent mx-auto d-flex flex-column justify-content-center align-items-center `}
    >
      <img
        src={`${mistakes == 8 ? "images/youLose.png" : ""} ${
          winCondition ? "images/youWin.png" : ""
        }  ${mistakes != 8 && !winCondition ? "images/paused.png" : ""}`}
        alt="logo"
        id="modalImage"
      />
      <Button
        className={`btn `}
        onClick={
          mistakes == 8 || winCondition
            ? () => hadlePlayAgain()
            : () => setModalShow(false)
        }
      >
        {mistakes == 8 || winCondition ? "PLAY AGAIN" : "CONTINUE"}
      </Button>

      <Button className="btn mt-4" onClick={handleNewCategoryClick}>
        NEW CATEGORY
      </Button>

      <Button className="btn mt-4" onClick={handleQuit}>
        QUIT GAME
      </Button>
    </div>
  );
};

export default ModalComponent;
