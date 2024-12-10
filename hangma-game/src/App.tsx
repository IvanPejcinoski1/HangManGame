import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import MainMenu from "./components/MainMenu";
import HowToPlay from "./components/HowToPlay";
import PickCategory from "./components/PickCategory";
import { Route, Router, Routes } from "react-router-dom";
import { SelectedCategoryProvider } from "./context/SelectedCateroryContext";
import InGame from "./components/InGame";

function App() {
  return (
    <div className="App">
      <SelectedCategoryProvider>
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/pickCategory" element={<PickCategory />} />
          <Route path="/howToPlay" element={<HowToPlay />} />
          <Route path="/inGame/:catergory" element={<InGame />} />
        </Routes>
      </SelectedCategoryProvider>
    </div>
  );
}

export default App;
