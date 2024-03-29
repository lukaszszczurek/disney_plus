import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Search from "./components/Search";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import {
  selectLoggedStatus,
  selectUsername,
  selectUserPhoto,
} from "./components/user/userSlice";
import Video from "./components/Video";
import WatchList from "./components/WatchList";
import Ratings from "./components/Ratings";
import About from "./components/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
