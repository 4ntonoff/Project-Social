import React from "react";
import { NavLink } from "react-router-dom";
import { ChartNoAxesCombined, Newspaper } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        <Newspaper size={24} />
        Feed__
      </NavLink>
      <NavLink
        to="/home/stats"
        className={({ isActive }) => (isActive ? "underline" : "")}
      >
        <ChartNoAxesCombined />
        Stats
      </NavLink>
    </nav>
  );
};

export default Navbar;
