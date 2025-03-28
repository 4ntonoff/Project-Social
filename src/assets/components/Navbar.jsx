import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChartNoAxesCombined, Newspaper, LogOut } from "lucide-react";

const Navbar = ({ routes, homeRoutes }) => {
  const navigate = useNavigate();
  return (
    <nav className="navbar-items">
      <div className="navbar">
        <div className="logo">Social</div>
        <NavLink
          to={`${routes.HOME.replace("/*", "")}${homeRoutes.FEED}`}
          end
          className={({ isActive }) =>
            isActive ? "navbar-item--active navbar-item" : "navbar-item"
          }
        >
          <Newspaper size={20} />
          <span>Feed</span>
        </NavLink>
        <NavLink
          to={`${routes.HOME.replace("/*", "")}${homeRoutes.STATS}`}
          className={({ isActive }) =>
            isActive ? "navbar-item--active navbar-item" : "navbar-item"
          }
        >
          <ChartNoAxesCombined size={20} />
          <span>Stats</span>
        </NavLink>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate(routes.REGISTRATION, { replace: true });
        }}
        className="navbar-item"
      >
        <LogOut size={20} />
        <span>Log out</span>
      </button>
    </nav>
  );
};

export default Navbar;
