import { useContext, createContext } from "react";

export const GreenifyContext = createContext();

export function useGreenify() {
  const [greenify, setGreenify] = useContext(GreenifyContext);
  return [greenify, setGreenify];
}

export const ResultsContext = createContext();

export function useResults() {
  const [results, setResults] = useContext(ResultsContext);
  return [results, setResults];
}

export const CurrentHotelContext = createContext();

export function useCurrentHotel() {
  const [currentHotel, setCurrentHotel] = useContext(CurrentHotelContext);
  return [currentHotel, setCurrentHotel];
}
