import React from "react";
import Navbar from "./Navbar";
import OddsTable from "./OddsTable";
import OddsSelection from "./OddsSelection";

function TwoColTable({ navSelected }) {
  return (
    <>
      <Navbar navSelected={navSelected} />
      <div className="two-col">
        <OddsSelection navSelected={navSelected} />
        <OddsTable />
      </div>
    </>
  );
}

export default TwoColTable;
