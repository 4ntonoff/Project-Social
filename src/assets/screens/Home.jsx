import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Feed from "./Feed";
import Stats from "./Stats";
import PostPage from "./PostPage";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="stats" element={<Stats />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
