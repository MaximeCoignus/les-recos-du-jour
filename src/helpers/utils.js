import {
  teams as teamsApiCall,
  nextGameOdds,
  lastFixturesPerTeam,
  eligibleTeamNextGame,
} from "./apiCalls";

// const MIN_REQUIRED_STREAK = {
//   "Over 2.5": 1,
//   "Over 3.5": 2,
//   "Over 4.5": 3,
// };

const MIN_REQUIRED_STREAK = 1;

const concatEligibleFixtures = async (teams, oddSelected, bookmakerId) => {
  let recommandations = [];
  for (let item of teams) {
    const { id } = item.team;
    const streak = await streakCalculator(id);
    const recommandation =
      streak >= MIN_REQUIRED_STREAK
        ? await getNextGameAndOdds(id, oddSelected, bookmakerId)
        : undefined;
    recommandations = recommandations
      .concat(recommandation)
      .filter((reco) => reco);
  }

  return recommandations;
};

const streakCalculator = async (teamId) => {
  let streak = 0;

  const response = await lastFixturesPerTeam(teamId);
  const data = await response.json();
  const _fixtures = data.fixtures;

  for (let i = _fixtures.length - 1; i >= 0; i--) {
    const { home, away } = _fixtures[i].goals;
    const totalGoals = home + away;
    if (totalGoals <= 2) {
      streak += 1;
    } else {
      streak = 0;
    }
  }

  return streak;
};

const getNextGameAndOdds = async (teamId, oddSelected, bookmakerId) => {
  const nextGame = await eligibleTeamNextGame(teamId);
  const data = await nextGame.json();
  const fixture = data.fixture;
  const { id } = fixture.fixture;
  const odd = await getOdds(id, oddSelected, bookmakerId);
  const nextFixtureWithOdds = { fixture, odd };

  return nextFixtureWithOdds;
};

const getOdds = async (id, oddSelected, bookmakerId) => {
  try {
    const response = await nextGameOdds(id);
    const data = await response.json();
    const odds = data.odds[0];

    const { bookmakers } = odds;
    const bookie = bookmakers.find((bookmaker) => {
      return bookmaker.id === bookmakerId;
    });

    const { bets } = bookie;
    const overUnder = bets.find((bet) => {
      return bet.id === 5;
    });

    const { values } = overUnder;
    const selection = values.find((odd) => {
      return odd.value === oddSelected;
    });

    return selection.odd;
  } catch (error) {
    return "coming soon";
  }
};

const removeDuplicates = (fixtures) => {
  return fixtures.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      fixtures.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
};

export const fetchRecommandations = async (
  leagues,
  oddsList,
  oddSelected,
  bookmakerId
) => {
  let recommendedFixtures = [];
  for (let league of leagues) {
    try {
      const { id } = league;
      const response = await teamsApiCall(id);
      const data = await response.json();
      const teams = data.teams;

      const _oddSelected = oddsList[oddSelected];

      const result = await concatEligibleFixtures(
        teams,
        _oddSelected,
        bookmakerId
      );
      recommendedFixtures = recommendedFixtures.concat(result);
    } catch (error) {
      console.error(`no teams available`);
    }
  }

  // remove duplicate fixtures
  const finalResult = removeDuplicates(recommendedFixtures);
  return finalResult;
};
