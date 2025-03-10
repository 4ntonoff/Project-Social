import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Feed from "./Feed";
import Stats from "./Stats";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
