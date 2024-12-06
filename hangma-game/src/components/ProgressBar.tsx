import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { FaHeart } from "react-icons/fa";

interface Props {
  mistakes: number;
}
const ProgressBar = ({ mistakes }: Props) => {
  return (
    <>
      <div className="progressBarContainer ms-auto me-3">
        <div
          className="progressBar"
          style={{ width: `${100 - mistakes * 12.5}%` }}
        ></div>
      </div>
      <FaHeart style={{ color: "#FE71FE" }} />
    </>
  );
};
export default ProgressBar;
