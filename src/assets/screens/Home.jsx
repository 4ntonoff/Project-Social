import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Feed from "./Feed";
import Stats from "./Stats";
import PostPage from "./PostPage";

const HOMEROUTES = {
  FEED: "/",
  POST: "/post/:id",
  STATS: "/stats",
};

const Home = ({ routes }) => {
  return (
    <div className="home">
      <Navbar routes={routes} homeRoutes={HOMEROUTES} />
      <div className="content">
        <Routes>
          <Route
            path={HOMEROUTES.FEED}
            element={<Feed routes={routes} homeRoutes={HOMEROUTES} />}
          />
          <Route
            path={HOMEROUTES.POST}
            element={<PostPage routes={routes} homeRoutes={HOMEROUTES} />}
          />
          <Route
            path={HOMEROUTES.STATS}
            element={<Stats routes={routes} homeRoutes={HOMEROUTES} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
