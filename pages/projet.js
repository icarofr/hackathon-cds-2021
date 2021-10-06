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
  const [reservation, setReservation] = useState(false);
  console.log(results);
  return (
    <div className="bg-white">
      {/* Mobile menu */}

      {reservation ? (
        <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Félicitations, votre réservation est confirmée ! #58904
          </h1>

          <div className="text-center text-xl mt-16">
            Retrouver la concretisation de votre projet :{" "}
          </div>
          <img src="qr.png" className="w-64 h-64 mx-auto mt-8" />
        </main>
      ) : (
        <main className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Nos projets du moment
          </h1>
          <div className="sm:grid sm:grid-cols-3 mt-10 sm:gap-x-2">
            <div
              className="border rounded-full h-96 overflow-hidden"
              onClick={() => setReservation(true)}
            >
              <img src="img1.png" className="h-full w-full" />
            </div>
            <div
              className="border rounded-full h-96 overflow-hidden"
              onClick={() => setReservation(true)}
            >
              {" "}
              <img src="img2.png" className="h-full w-full" />
            </div>
            <div
              className="border rounded-full h-96 overflow-hidden"
              onClick={() => setReservation(true)}
            >
              {" "}
              <img src="img3.png" className="h-full w-full" />
            </div>
            <div className="text-center m-2">
              École Bioclimatique à Tazentoute au Maroc
            </div>
            <div className="text-center m-2">
              Développer une filière durable de coquillages au Sénégal
            </div>
            <div className="text-center m-2">
              Cultures comestibles et solidareté dans le 19ème arrondissement de
              Paris
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
