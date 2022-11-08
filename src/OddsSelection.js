import React from "react";
import { useGlobalContext } from "./context";

function OddsSelection({ navSelected }) {
  const { sportsList, oddSelected, setOddSelected } = useGlobalContext();

  return (
    <div className="odds">
      {sportsList
        .find((sport) => sport.name === navSelected)
        ["odds"].map((odd, index) => {
          const selected = oddSelected === index;
          return (
            <div
              key={index}
              className={`odd ${selected && "odd-selected"}`}
              onClick={() => setOddSelected(index)}
            >
              {odd}
            </div>
          );
        })}
    </div>
  );
}

export default OddsSelection;
