import React from "react";
import { useGlobalContext } from "./context";
import moment from "moment";
import BookmakerChoice from "./BookmakerChoice";

function OddsTable() {
  const { fixtures, loading } = useGlobalContext();

  if (loading) {
    return <div className="loading"></div>;
  }

  if (fixtures.length === 0) {
    return (
      <p style={{ fontSize: "xx-large", margin: "0 auto" }}>
        no recommandation today
      </p>
    );
  }

  return (
    <div className="fixture-table">
      <BookmakerChoice />
      <table className="result-table" width="100%">
        <thead>
          <tr height="50">
            <th width="25%">Date</th>
            <th width="25%">Fixture</th>
            <th width="25%">Odds</th>
            <th width="25%">League</th>
          </tr>
        </thead>
        <tbody>
          {fixtures.map((game, index) => {
            const _game = game.fixture;
            const { date } = _game.fixture;
            const { name: league } = _game.league;
            const {
              home: { name: homeTeam },
              away: { name: awayTeam },
            } = _game.teams;
            const { odd } = game;
            const formattedDate = moment(date).format("ddd D MMM");
            return (
              <tr key={index} height="50">
                <td width="25%">{formattedDate}</td>
                <td width="25%">{`${homeTeam} v ${awayTeam}`}</td>
                <td width="25%">{odd}</td>
                <td width="25%">{league}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OddsTable;
