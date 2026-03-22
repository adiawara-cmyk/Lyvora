"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const DoctorMap = dynamic(() => import("@/components/maps/DoctorMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
});

const MOCK_DOCTORS = [
  {
    id: "1",
    name: "Dr. Marie Dubois",
    avatar: null,
    rating: 4.8,
    verified: true,
    specialties: ["Cardiologie", "M\u00e9decine g\u00e9n\u00e9rale"],
    distance: 0,
    lat: 48.8566,
    lng: 2.3522,
    available: true,
  },
];

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
  );
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  );
}

export default function PatientDashboard() {
  const [availableNow, setAvailableNow] = useState(true);
  const [specialty, setSpecialty] = useState("all");
  const [distance, setDistance] = useState(50);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [search, setSearch] = useState("");

  const doctors = MOCK_DOCTORS;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Espace Patient</h1>
              <p className="text-xs text-gray-500">Jean Martin</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4" />
            <span>Paris</span>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <UserIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 border-r border-gray-200 flex flex-col overflow-y-auto">
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un m\u00e9decin, sp\u00e9cialit\u00e9, vi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-4">
              <FilterIcon className="w-4 h-4 text-gray-700" />
              <h2 className="font-semibold text-gray-900">Filtres</h2>
            </div>

            {/* Available now toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-700">Disponible maintenant</span>
              <button
                onClick={() => setAvailableNow(!availableNow)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  availableNow ? "bg-blue-900" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    availableNow ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </div>

            {/* Specialty */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-1.5">
                Sp&eacute;cialit&eacute;
              </label>
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes</option>
                <option value="general">M&eacute;decine g&eacute;n&eacute;rale</option>
                <option value="cardiology">Cardiologie</option>
                <option value="dermatology">Dermatologie</option>
                <option value="pediatrics">P&eacute;diatrie</option>
                <option value="ophthalmology">Ophtalmologie</option>
              </select>
            </div>

            {/* Distance */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-700">Distance max</span>
                <span className="text-sm font-medium text-gray-900">{distance} km</span>
              </div>
              <input
                type="range"
                min={1}
                max={100}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-blue-900"
              />
            </div>

            {/* Reset */}
            <button className="w-full py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              R&eacute;initialiser
            </button>
          </div>

          {/* Results */}
          <div className="px-4 pb-2">
            <p className="text-sm text-blue-600 font-medium">
              {doctors.length} m&eacute;decin(s) trouv&eacute;(s)
            </p>
          </div>

          {/* Doctor Cards */}
          <div className="flex-1 px-4 pb-4 space-y-3">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 font-semibold text-lg">
                      {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">{doc.name}</h3>
                      <span className="text-sm text-gray-400">{doc.distance}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-700">{doc.rating}</span>
                      {doc.verified && (
                        <CheckBadgeIcon className="w-4 h-4 text-green-500 ml-0.5" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {doc.specialties.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="w-full mt-3 py-2.5 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                  R&eacute;server
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Map Area */}
        <main className="flex-1 flex flex-col">
          {/* Map header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              M&eacute;decins disponibles
            </h2>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm ${
                  viewMode === "map"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <MapIcon className="w-4 h-4" />
                Carte
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm border-l border-gray-200 ${
                  viewMode === "list"
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <ListIcon className="w-4 h-4" />
                Liste
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 relative">
            {viewMode === "map" ? (
              <DoctorMap
                doctors={doctors}
                center={[48.8566, 2.3522]}
                zoom={15}
              />
            ) : (
              <div className="p-6 space-y-4">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center text-amber-700 font-semibold">
                        {doc.name.split(" ").slice(1).map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{doc.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600">{doc.rating}</span>
                          </div>
                          <span className="text-gray-300">|</span>
                          <span className="text-sm text-gray-500">
                            {doc.specialties.join(", ")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
                      R&eacute;server
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
