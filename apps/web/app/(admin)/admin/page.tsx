"use client";

import { useState } from "react";
import Link from "next/link";

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function CheckBadgeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307z" clipRule="evenodd" />
    </svg>
  );
}

function OrgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

const MOCK_DOCTORS = [
  {
    id: "1",
    name: "Dr. Marie Dubois",
    specialty: "cardiology",
    city: "Paris",
    online: true,
    verified: true,
    avatar: "MD",
    avatarBg: "from-amber-200 to-amber-300",
  },
  {
    id: "2",
    name: "Dr. Amadou Diallo",
    specialty: "pediatrics",
    city: "Dakar",
    online: true,
    verified: true,
    avatar: "AD",
    avatarBg: "from-teal-200 to-teal-300",
  },
  {
    id: "3",
    name: "Dr. Elena Rodriguez",
    specialty: "gynecology",
    city: "Madrid",
    online: false,
    verified: true,
    avatar: "ER",
    avatarBg: "from-rose-200 to-rose-300",
  },
  {
    id: "4",
    name: "Dr. Kenji Tanaka",
    specialty: "orthopedics",
    city: "Tokyo",
    online: true,
    verified: true,
    avatar: "KT",
    avatarBg: "from-sky-200 to-sky-300",
  },
  {
    id: "5",
    name: "Dr. Fatima Al-Mansouri",
    specialty: "dermatology",
    city: "Dubai",
    online: true,
    verified: true,
    avatar: "FA",
    avatarBg: "from-violet-200 to-violet-300",
  },
];

const MOCK_ORGS = [
  {
    id: "1",
    name: "M\u00e9decins Sans Fronti\u00e8res - Section France",
    type: "ngo",
    location: "Paris, France",
    verified: true,
  },
  {
    id: "2",
    name: "Minist\u00e8re de la Sant\u00e9 - Mali",
    type: "government",
    location: "Bamako, Mali",
    verified: true,
  },
];

export default function AdminDashboard() {
  const [validationTab, setValidationTab] = useState<"medecins" | "organisations">("medecins");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration Lyvora</h1>
                <p className="text-sm text-gray-500">Tableau de bord global</p>
              </div>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-red-500 text-white text-sm font-medium rounded-md">
            Admin
          </span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Validations en attente */}
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="font-semibold text-gray-900">Validations en attente</h2>
                <p className="text-sm text-gray-500">
                  M&eacute;decins et organisations &agrave; valider
                </p>
              </div>
              <span className="w-7 h-7 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setValidationTab("medecins")}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  validationTab === "medecins"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                M&eacute;decins
              </button>
              <button
                onClick={() => setValidationTab("organisations")}
                className={`flex-1 py-3 text-sm font-medium text-center transition-colors ${
                  validationTab === "organisations"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Organisations
              </button>
            </div>

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <p className="text-sm">Aucune validation en attente</p>
            </div>
          </div>

          {/* Activite recente */}
          <div className="bg-white border border-gray-200 rounded-xl">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Activit&eacute; r&eacute;cente</h2>
              <p className="text-sm text-gray-500">M&eacute;decins r&eacute;cemment inscrits</p>
            </div>

            <div className="divide-y divide-gray-100">
              {MOCK_DOCTORS.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${doc.avatarBg} flex items-center justify-center text-sm font-semibold text-gray-700`}
                    >
                      {doc.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{doc.name}</p>
                      <p className="text-xs text-gray-500">
                        {doc.specialty} &bull; {doc.city}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            doc.online ? "bg-green-500" : "bg-gray-400"
                          }`}
                        />
                        <span className="text-xs text-gray-500">
                          {doc.online ? "En ligne" : "Hors ligne"}
                        </span>
                      </div>
                    </div>
                  </div>
                  {doc.verified && (
                    <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Organisations partenaires */}
        <div className="bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">Organisations partenaires</h2>
              <p className="text-sm text-gray-500">ONG et institutions sanitaires</p>
            </div>
            <span className="w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {MOCK_ORGS.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
            {MOCK_ORGS.map((org) => (
              <div
                key={org.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <OrgIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{org.name}</p>
                    <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded mt-1">
                      {org.type}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      <MapPinIcon className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-xs text-gray-500">{org.location}</span>
                    </div>
                  </div>
                </div>
                {org.verified && (
                  <CheckBadgeIcon className="w-5 h-5 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
