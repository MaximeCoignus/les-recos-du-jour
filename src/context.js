import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { sports as sportsList } from "./helpers/sports";
import { fetchRecommandations } from "./helpers/utils";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [navSelected, setNavSelected] = useState("");
  const [oddsList, setOddsList] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [oddSelected, setOddSelected] = useState(0);
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookmaker, setBookmaker] = useState(1);

  let firstRender = useRef(true);

  const fetchFixtures = useCallback(async () => {
    setLoading(true);
    let recommendedFixtures = [];
    try {
      recommendedFixtures = await fetchRecommandations(
        leagues,
        oddsList,
        oddSelected,
        bookmaker
      );
    } catch (error) {
      console.error(error);
    }
    setFixtures(recommendedFixtures);
    setLoading(false);
  }, [leagues, oddsList, oddSelected, bookmaker]);

  useEffect(() => {
    fetchFixtures();
  }, [fetchFixtures]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const leagues = sportsList.find((sport) => sport.name === navSelected)[
      "leagues"
    ];
    const odds = sportsList.find((sport) => sport.name === navSelected)["odds"];
    setOddsList(odds);
    setOddSelected(0);
    setLeagues(leagues);
    setBookmaker(1);
  }, [navSelected]);

  return (
    <AppContext.Provider
      value={{
        sportsList,
        oddsList,
        oddSelected,
        navSelected,
        fixtures,
        loading,
        bookmaker,
        setOddSelected,
        setNavSelected,
        setOddsList,
        setLeagues,
        setBookmaker,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
