import React from "react";

function OddsTable() {
  return (
    <div className="fixture-table">
      <table width="100%">
        <thead>
          <tr height="50">
            <th width="25%">Date</th>
            <th width="25%">Fixture</th>
            <th width="25%">Odds</th>
            <th width="25%">League</th>
          </tr>
        </thead>
        <tbody>
          <tr height="50">
            <td width="25%">Fri 28 Oct</td>
            <td width="25%">Lens v Toulouse</td>
            <td width="25%">1.58</td>
            <td width="25%">Ligue 1</td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: "xx-large" }}>no recommandation today</p>
      <div className="loading"></div>
    </div>
  );
}

export default OddsTable;
