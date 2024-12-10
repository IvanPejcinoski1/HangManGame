import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { SelectedCategoryContext } from "../context/SelectedCateroryContext";

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
  const { setModalShow, getWordForPlaying, playClickSound, setIsGameWon } =
    useContext(SelectedCategoryContext);
  const navigate = useNavigate();

  const hadlePlayAgain = () => {
    setGuessHistory([]);
    getWordForPlaying();
    setModalShow(false);
  };
  const handleNewCategoryClick = () => {
    setModalShow(false);
    setGuessHistory([]);
    navigate("/pickCategory");
    getWordForPlaying();
  };
  const handleQuit = () => {
    setModalShow(false);
    setGuessHistory([]);
    navigate("/");
    getWordForPlaying();
  };
  return (
    <div
      className={`${
        show ? "d-block" : "d-none"
      } modalComponent mx-auto d-flex flex-column justify-content-center align-items-center `}
    >
      <img
        src={`${mistakes == 8 ? "/images/youLose.png" : ""} ${
          winCondition ? "/images/youWin.png" : ""
        }  ${mistakes != 8 && !winCondition ? "/images/paused.png" : ""}`}
        alt="logo"
        id="modalImage"
      />
      <Button
        className={`btn`}
        onClick={() => {
          playClickSound();
          if (mistakes == 8 || winCondition) {
            setIsGameWon(false);
            hadlePlayAgain();
          } else {
            setModalShow(false);
          }
        }}
      >
        {mistakes == 8 || winCondition ? "PLAY AGAIN" : "CONTINUE"}
      </Button>
      <Button
        className="btn mt-4"
        onClick={() => {
          playClickSound();
          setIsGameWon(false);
          handleNewCategoryClick();
        }}
      >
        NEW CATEGORY
      </Button>

      <Button
        className="btn mt-4"
        onClick={() => {
          playClickSound();
          setIsGameWon(false);
          handleQuit();
        }}
      >
        QUIT GAME
      </Button>
    </div>
  );
};

export default ModalComponent;
