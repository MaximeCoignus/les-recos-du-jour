import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "./context";

function Navbar({ navSelected }) {
  const { sportsList, setNavSelected } = useGlobalContext();

  const pickASport = (name) => {
    setNavSelected(name);
  };

  useEffect(() => {
    pickASport(navSelected);
    // eslint-disable-next-line
  }, [navSelected]);

  return (
    <div className="header-navbar">
      <nav className="nav-links">
        {sportsList.map((sport, index) => {
          const { name, url } = sport;
          const selected = navSelected === name;
          return (
            <div
              key={index}
              className={`header-nav-link ${selected && "nav-selected"}`}
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
