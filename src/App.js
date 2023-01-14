import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NasaPhoto from "./components/NasaPhoto";
import Stars from "./components/Stars";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route element={<NasaPhoto/>} path="/" />
        </Routes>
        <Stars/>
        <a href="https://github.com/Xahri" target="_blank" rel="noopener noreferrer" className="MadeBy">Made by: Bassem Youssef</a>
      </div>
    </BrowserRouter>
  );
}