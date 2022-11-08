import React, { useRef } from "react";
import { useGlobalContext } from "./context";
import { bookmakers } from "./helpers/bookmakers";
import Dropdown from "react-bootstrap/Dropdown";

function BookmakerChoice() {
  const { bookmaker, setBookmaker } = useGlobalContext();

  const bookieRef = useRef();

  const bookmakerChange = (id) => {
    setBookmaker(id);
  };

  bookieRef.current = bookmakers.filter((_bookmaker) => {
    const { id } = _bookmaker;
    return id === bookmaker;
  });

  return (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown-button-dark-bookmakers"
        variant="secondary"
        className="book-select-dropdown"
      >
        {bookieRef.current[0].name}
      </Dropdown.Toggle>
      <Dropdown.Menu className="book-select-menu">
        {bookmakers.map((_bookmaker) => {
          const { id, name } = _bookmaker;
          const selected = id === bookmaker;
          if (selected)
            return (
              <Dropdown.Item key={id} active>
                {name}
              </Dropdown.Item>
            );
          else {
            return (
              <Dropdown.Item key={id} onClick={() => bookmakerChange(id)}>
                {name}
              </Dropdown.Item>
            );
          }
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BookmakerChoice;
