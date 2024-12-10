import React, { createContext, useState, useEffect, ReactNode } from "react";
import data from "../data.json";
import { CategoryKey, Data } from "../types";

interface Props {
  children: ReactNode;
}

interface ContextData {
  selectedCategory: CategoryKey;
  setSelectedCategory: (category: CategoryKey) => void;
  wordForPlaying: string;
  modalShow: boolean;
  setModalShow: (arg: boolean) => void;
  getWordForPlaying: () => void;
  playClickSound: () => void;
  setIsGameWon: (arg: boolean) => void;
  isGameWon: boolean;
  wordData: Data;
}

export const SelectedCategoryContext = createContext({} as ContextData);

export const SelectedCategoryProvider: React.FC<Props> = ({ children }) => {
  const [wordData, setWordData] = useState<Data>(data);
  const [modalShow, setModalShow] = useState(false);
  const [wordForPlaying, setWordForPlaying] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryKey>("movies");

  const getWordForPlaying = () => {
    let aviableWordsInTheSelectedCategory = wordData.categories[
      selectedCategory
    ].filter((word) => !word.selected);

    let randomNumber = Math.floor(
      Math.random() * aviableWordsInTheSelectedCategory.length
    );

    setWordForPlaying(aviableWordsInTheSelectedCategory[randomNumber].name);

    let updatedWordDataCategory = wordData.categories[selectedCategory].map(
      (word) =>
        word.name === aviableWordsInTheSelectedCategory[randomNumber].name
          ? { ...word, selected: true }
          : word
    );

    setWordData((prevData) => ({
      ...prevData,
      categories: {
        ...prevData.categories,
        [selectedCategory]: updatedWordDataCategory,
      },
    }));
  };

  useEffect(() => {
    getWordForPlaying();
  }, [selectedCategory]);

  const playClickSound = () => {
    const clickSound = new Audio("/sounds/click.mp3");
    clickSound.play();
  };
  const [isGameWon, setIsGameWon] = useState(false);
  if (wordForPlaying === "") {
    getWordForPlaying();
  }
  return (
    <SelectedCategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        wordForPlaying,
        modalShow,
        setModalShow,
        getWordForPlaying,
        playClickSound,
        setIsGameWon,
        isGameWon,
        wordData,
      }}
    >
      {children}
    </SelectedCategoryContext.Provider>
  );
};
