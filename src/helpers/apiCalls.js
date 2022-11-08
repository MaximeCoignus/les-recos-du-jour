const HOST = process.env.REACT_APP_SPORTS_API_FOOTBALL_HOST;

export const teams = (league) => {
  return fetch(`${HOST}/api/teams?league=${league}`);
};

export const lastFixturesPerTeam = (team) => {
  return fetch(`${HOST}/api/fixtures?team=${team}`);
};

export const eligibleTeamNextGame = async (team) => {
  return fetch(`${HOST}/api/next-fixture?team=${team}`);
};

export const nextGameOdds = async (fixtureId) => {
  return fetch(`${HOST}/api/odds?fixture=${fixtureId}`);
};
