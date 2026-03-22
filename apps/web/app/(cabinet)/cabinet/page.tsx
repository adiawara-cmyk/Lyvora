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

function CabinetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
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

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.49 9A9 9 0 005.64 5.64L4 4m16 16l-1.64-1.64A9 9 0 013.51 15" />
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

function ClipboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const stats = [
  { label: "Demandes ouvertes", value: "0", icon: ClipboardIcon, iconBg: "bg-cyan-100", iconColor: "text-cyan-500", valueColor: "text-cyan-600" },
  { label: "Candidatures re\u00e7ues", value: "0", icon: UsersIcon, iconBg: "bg-blue-100", iconColor: "text-blue-500", valueColor: "text-blue-600" },
  { label: "Remplacements trouv\u00e9s", value: "0", icon: CheckIcon, iconBg: "bg-green-100", iconColor: "text-green-500", valueColor: "text-green-600" },
  { label: "M\u00e9decins contact\u00e9s", value: "0", icon: SearchIcon, iconBg: "bg-purple-100", iconColor: "text-purple-500", valueColor: "text-purple-600" },
];

export default function CabinetDashboard() {
  const [activeTab, setActiveTab] = useState<"demandes" | "candidatures">("demandes");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-cyan-600 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Espace Cabinet</h1>
                <p className="text-sm text-gray-500">Cabinet M&eacute;dical Saint-Lazare</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-medium rounded-md">
              Cabinet
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-0 mb-6">
          <button onClick={() => setActiveTab("demandes")} className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "demandes" ? "bg-white border border-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            Mes demandes (0)
          </button>
          <button onClick={() => setActiveTab("candidatures")} className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === "candidatures" ? "bg-white border border-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
            Candidatures (0)
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">
                {activeTab === "demandes" ? "Recherche de rempla\u00e7ants" : "Candidatures re\u00e7ues"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeTab === "demandes" ? "Publiez des demandes pour trouver des m\u00e9decins rempla\u00e7ants" : "G\u00e9rez les candidatures des m\u00e9decins int\u00e9ress\u00e9s"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <RefreshIcon className="w-4 h-4" />
                Actualiser
              </button>
              {activeTab === "demandes" && (
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Nouvelle demande
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 text-gray-300 mb-4">
              <CabinetIcon className="w-full h-full" />
            </div>
            <p className="text-gray-500 font-medium mb-1">
              {activeTab === "demandes" ? "Aucune demande cr\u00e9\u00e9e" : "Aucune candidature"}
            </p>
            <p className="text-sm text-gray-400 max-w-md text-center">
              {activeTab === "demandes"
                ? "Publiez une demande de rempla\u00e7ant avec la sp\u00e9cialit\u00e9 et les dates souhait\u00e9es"
                : "Les m\u00e9decins int\u00e9ress\u00e9s par vos offres appara\u00eetront ici"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
