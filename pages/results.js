import { useResults, useCurrentHotel } from "../components/GlobalState";

import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XIcon as XIconSolid,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Tarifs", href: "#", current: true },
  { name: "Photo", href: "#", current: false },
  { name: "Avis", href: "#", current: false },
  { name: "Nôtre côté « green »", href: "#", current: false },
];

export default function Results() {
  const [results] = useResults();
  const [currentHotel, setCurrentHotel] = useCurrentHotel();
  const [hotelView, setHotelView] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="bg-white">
      <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Resultats
        </h1>

        <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="border-t border-b border-gray-200 divide-y divide-gray-200"
            >
              {results.Hotels &&
                !!results.Hotels.length &&
                results.Hotels.map((hotel, i) => {
                  hotel.ScoreBookingCom = hotel.ScoreBookingCom ? hotel.ScoreBookingCom.replace(
                    /,/g,
                    "."
                  ) : 0;
                  console.log(hotel);
                  return (
                    <li key={i} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={hotel.ImageUrl}
                          alt={hotel.HtlName}
                          className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                        />
                      </div>

                      <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  onClick={() => {
                                    setSidebar(true);
                                    setCurrentHotel(hotel);
                                  }}
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {hotel.HtlName}
                                </a>
                                <br />
                                <div className="text-xl">
                                  {Array(5)
                                    .fill("☆")
                                    .map((e, i) =>
                                      +hotel.ScoreBookingCom / 2 < i + 1
                                        ? e
                                        : "★"
                                    )
                                    .join("")}
                                </div>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">
                                {hotel.HtlAddress1}
                              </p>
                              {hotel.size ? (
                                <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                                  {hotel.size}
                                </p>
                              ) : null}
                            </div>
                            {/* <p className="mt-1 text-sm font-medium text-gray-900">
                              
                            </p> */}
                            <button
                              type="button"
                              className="mt-6 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Avis
                            </button>
                            <button
                              type="button"
                              className="ml-4 mt-6 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              onClick={() => {
                                setSidebar(false);
                                setHotelView(!hotelView);
                              }}
                            >
                              Hotel view
                            </button>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            {hotel.RoomRateList ? (
                              hotel.RoomRateList[0].RoomPrice + " €"
                            ) : (
                              <ClockIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-300"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>

                        <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                          <CheckIcon
                            className="flex-shrink-0 h-5 w-5 text-green-500"
                            aria-hidden="true"
                          />

                          <span>{"Disponible"}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </section>

          {/* Order summary */}
          {sidebar ? (
            <section
              aria-labelledby="summary-heading"
              className="flex flex-wrap mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
              style={{ width: "100% !important" }}
            >
              <div className="w-full text-xl font-bold text-center">
                {currentHotel.HtlName}{" "}
                <a
                  target="_blank"
                  href="/projet"
                  className="mt-6 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Réserver
                </a>
              </div>
              <div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav
                      className="ml-6 -mb-px flex space-x-8"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                          aria-current={tab.current ? "page" : undefined}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                    <div className="text-4xl text-center">
                      {Array(5)
                        .fill("☆")
                        .map((e, i) =>
                          +currentHotel.ScoreBookingCom / 2 < i + 1 ? e : "★"
                        )
                        .join("")}
                      <br />
                      <div className="mt-6 text-sm font-normal text-left">
                        {currentHotel.HtlAddress1}, Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit anim id est laborum.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section
              aria-labelledby="summary-heading"
              className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                {hotelView ? "Hotel view" : "Carte"}
              </h2>

              <dl
                className="mt-6 space-y-4 h-full w-full"
                //   style={{ backgroundImage: "url(map.png)" }}
              >
                {!hotelView ? (
                  <img src="map.png" />
                ) : (
                  <video autoPlay loop>
                    <source src="hotelview.mp4" type="video/mp4" />
                  </video>
                )}
              </dl>
            </section>
          )}
        </form>
      </main>
    </div>
  );
}
