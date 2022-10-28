import React, { useEffect } from "react";
import { useGlobalContext } from "./context";

function OddsSelection({ navSelected }) {
  const { oddsList, oddSelected, setOddSelected, setNavSelected } =
    useGlobalContext();

  useEffect(() => {
    setNavSelected(navSelected);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="odds">
      {oddsList[navSelected].odds.map((odd, index) => {
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
