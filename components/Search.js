import { IonDatetime, IonSearchbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import {
  PlusSmIcon as PlusSmIconSolid,
  MinusSmIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { useGreenify, useResults } from "./GlobalState";
import { useRouter } from "next/router";

export default function Search({token}) {
  const now = new Date();
  const router = useRouter();
  const [rooms, setRooms] = useState(1);
  const [people, setPeople] = useState(1);
  const checkInRef = useRef();
  const checkOutRef = useRef();
  const destinationRef = useRef();
  const [countryList, setCountryList] = useState([]);
  const [greenify] = useGreenify();
  const [geolocList, setGeolocList] = useState([]);
  const [results, setResults] = useResults();
  const [isSearching, setSearching] = useState(false);

  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  useEffect(() => {
    fetch("https://bookings.cdsgroupe.com/api-hackathon/v1/country", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(({ Countries = [] }) => setCountryList(Countries));
  }, []);

  useEffect(() => {
    fetch("/api/geolocs")
      .then((res) => res.json())
      .then((result) => setGeolocList(result));
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div
          className={`px-6 py-6 ${
            greenify ? "bg-green-700" : "bg-indigo-700"
          } rounded-lg md:py-12 md:px-12 lg:py-16 lg:px-16 xl:flex xl:items-center`}
        >
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              Votre prochain voyage
            </h2>
            <p
              className={`mt-3 max-w-3xl text-lg leading-6 ${
                greenify ? "bg-green-700" : "bg-indigo-700"
              }`}
            >
              C'est le temps de choisir votre prochaine destination.
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
            <form
              className="sm:flex flex-wrap"
              onSubmit={(e) => {
                e.preventDefault();
                setSearching(true);
                fetch(
                  "https://bookings.cdsgroupe.com/api-HACKATHON/v1/hotelSearch?" +
                    new URLSearchParams({
                      checkin: String(checkInRef.current.value).split("T")[0],
                      checkout: String(checkOutRef.current.value).split("T")[0],
                      //   hotelName,
                      room: !rooms ? 1 : rooms,
                      guest: people,
                      // allotment,
                      // ages,
                      radius: "50",
                      // byBreakFast,
                      address: String(destinationRef.current.value),
                      //   byStars,
                      latitude:
                        geolocList[String(destinationRef.current.value)] ? geolocList[String(destinationRef.current.value)].latitude : 48.856614,
                      longitude:
                        geolocList[String(destinationRef.current.value)] ? geolocList[String(destinationRef.current.value)].longitude : 2.3522219,
                      agentDutyCode: process.env.NEXT_PUBLIC_AGENT_DUTY_CODE,
                      language: "FR",
                      currency: "EUR",
                      //   pageNumber: 1,
                      //   pageSize: 10,
                    }),
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )
                  .then((res) => res.json())
                  .then((result) => setResults(result))
                  .then(() => router.push("/results")).finally(() => setSearching(false));
              }}
            >
              <label htmlFor="destination" className="text-gray-300">
                Destination
              </label>
              <input
                ref={destinationRef}
                id="destination"
                name="destination"
                list="destination-list"
                required
                className="w-full px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
              />
              <datalist id="destination-list">
                {countryList.map(({ CntName = "" }, i) => (
                  <option value={CntName} key={i} />
                ))}
              </datalist>

              <div className="mt-2 grid grid-cols-2 w-full gap-x-2">
                <div>
                  <label
                    htmlFor="check-in"
                    className="mt-4 w-full text-gray-300"
                  >
                    Check-in
                  </label>
                  <IonDatetime
                    ref={checkInRef}
                    value={now.toISOString()}
                    className="bg-white w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                    mode="md"
                  />
                </div>
                <div>
                  <label
                    htmlFor="check-out"
                    className="mt-4 w-full text-gray-300"
                  >
                    Check-out
                  </label>
                  <IonDatetime
                    ref={checkOutRef}
                    value={new Date(
                      now.setDate(now.getDate() + 7)
                    ).toISOString()}
                    className="bg-white w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                    mode="md"
                  />
                </div>
              </div>
              <div className="flex flex-wrap mt-4">
                <div className="w-1/3">
                  <label
                    htmlFor="check-out"
                    className="mt-4 w-full text-gray-300"
                  >
                    Chambres
                  </label>
                  <div className="flex flex-wrap">
                    <button
                      type="button"
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => rooms > 1 && setRooms((e) => +e - 1)}
                    >
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <input
                      className="w-1/3 bg-white w-full border-white text-center py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                      mode="md"
                      value={rooms}
                      onChange={(e) => {
                        if (!e.target.value) {
                          return setRooms("");
                        } else if (!isNumeric(e.target.value)) return;
                        else {
                          setRooms(+e.target.value);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setRooms((e) => +e + 1);
                      }}
                    >
                      <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="w-1/3">
                  <label htmlFor="people" className="mt-4 w-full text-gray-300">
                    Personnes
                  </label>
                  <div className="flex flex-wrap">
                    <button
                      type="button"
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => people > 1 && setPeople((e) => +e - 1)}
                    >
                      <MinusSmIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <input
                      className="w-1/3 bg-white w-full border-white text-center py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white rounded-md"
                      mode="md"
                      value={people}
                      onChange={(e) => {
                        if (!e.target.value) {
                          return setPeople("");
                        } else if (!isNumeric(e.target.value)) return;
                        else {
                          setPeople(+e.target.value);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        setPeople((e) => +e + 1);
                      }}
                    >
                      <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-5 overflow-visible">
                  <button
                    type="submit"
                    className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent shadow text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                  >
                    {isSearching ?  <>Chargement<br/>...</> : <>C'est parti !<br/>✈️</>}
                  </button>
                </div>
                <div className="text-gray-200 relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="petit-dej"
                      name="petit-dej"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="mx-3 text-sm">
                    <label htmlFor="annulable" className="font-medium">
                      P'tit dej ?
                    </label>
                  </div>
                  <div className="flex items-center h-5 ml-8">
                    <input
                      id="annulable"
                      name="annulable"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="annulable" className="font-medium">
                      Annulable ?
                    </label>
                  </div>
                </div>
              </div>
            </form>
            {/* <p className="mt-3 text-sm text-indigo-200">
              We care about the protection of your data. Read our{" "}
              <a href="#" className="text-white font-medium underline">
                Privacy Policy.
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
