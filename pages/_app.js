import "tailwindcss/tailwind.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import {
  GreenifyContext,
  ResultsContext,
  CurrentHotelContext,
} from "../components/GlobalState";

function MyApp({ Component, pageProps }) {
  const [enabled, setEnabled] = useState(false);
  const [results, setResults] = useState([]);
  const [currentHotel, setCurrentHotel] = useState({});

  return (
    <CurrentHotelContext.Provider value={[currentHotel, setCurrentHotel]}>
      <GreenifyContext.Provider value={[enabled, setEnabled]}>
        <ResultsContext.Provider value={[results, setResults]}>
          <Navbar greenify={enabled} />
          <Component {...pageProps} />
        </ResultsContext.Provider>
      </GreenifyContext.Provider>
    </CurrentHotelContext.Provider>
  );
}

export default MyApp;
