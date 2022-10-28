import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

function Navbar() {
  const { sportsList, navSelected, setNavSelected, setOddSelected } =
    useGlobalContext();

  const pickASport = (name) => {
    setNavSelected(name);
    setOddSelected(0);
  };

  return (
    <div className="navbar">
      <nav className="nav-links">
        {sportsList.map((sport, index) => {
          const { name, url } = sport;
          const selected = navSelected === name;
          return (
            <div
              key={index}
              className={`nav-link ${selected && "nav-selected"}`}
            >
              <Link to={url} onClick={() => pickASport(name)}>
                {name}
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export default Navbar;
