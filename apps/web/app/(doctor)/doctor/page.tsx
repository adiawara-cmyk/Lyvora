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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.49 9A9 9 0 005.64 5.64L4 4m16 16l-1.64-1.64A9 9 0 013.51 15" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
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

const stats = [
  {
    label: "Disponibilit\u00e9s",
    value: "0",
    icon: CalendarIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    label: "Demandes orgs",
    value: "0",
    icon: ClipboardIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
  },
  {
    label: "Patients/semaine",
    value: "0",
    icon: UsersIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    label: "Satisfaction",
    value: "4.8/5",
    icon: StarIcon,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-500",
  },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState<"disponibilites" | "demandes">("disponibilites");

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
                <h1 className="text-xl font-bold text-gray-900">Espace M&eacute;decin</h1>
                <p className="text-sm text-blue-600">Dr. Marie Martin</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-md">
              <CheckBadgeIcon className="w-3.5 h-3.5" />
              V&eacute;rifi&eacute;
            </span>
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
              MM
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-6">
          <button
            onClick={() => setActiveTab("disponibilites")}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "disponibilites"
                ? "bg-white border border-gray-200 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Mes disponibilit&eacute;s (0)
          </button>
          <button
            onClick={() => setActiveTab("demandes")}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "demandes"
                ? "bg-white border border-gray-200 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Demandes organisations (0)
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-gray-200 rounded-xl">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">
                {activeTab === "disponibilites"
                  ? "Mes disponibilit\u00e9s g\u00e9olocalis\u00e9es"
                  : "Demandes des organisations"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeTab === "disponibilites"
                  ? "D\u00e9finissez vos p\u00e9riodes de disponibilit\u00e9 \u00e0 travers le monde"
                  : "Consultez les demandes de m\u00e9decins des organisations"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <RefreshIcon className="w-4 h-4" />
                Actualiser
              </button>
              {activeTab === "disponibilites" && (
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Ajouter une disponibilit&eacute;
                </button>
              )}
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 text-gray-300 mb-4">
              <CalendarIcon className="w-full h-full" />
            </div>
            <p className="text-gray-500 font-medium mb-1">
              {activeTab === "disponibilites"
                ? "Aucune disponibilit\u00e9 d\u00e9finie"
                : "Aucune demande re\u00e7ue"}
            </p>
            <p className="text-sm text-gray-400 max-w-md text-center">
              {activeTab === "disponibilites"
                ? "Ajoutez vos p\u00e9riodes de disponibilit\u00e9 pour que les patients et organisations puissent vous trouver"
                : "Les organisations publieront des demandes de m\u00e9decins auxquelles vous pourrez r\u00e9pondre"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
