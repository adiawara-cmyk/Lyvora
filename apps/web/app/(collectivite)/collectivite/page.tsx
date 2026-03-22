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

function MapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
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

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function StethoscopeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6v0a6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.4.3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15v1a6 6 0 006 6h.87a2 2 0 001.42-.59l.1-.1A2 2 0 0017 19.87V19a2 2 0 012-2h0a2 2 0 012 2v0a2 2 0 01-2 2" />
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

const stats = [
  { label: "Zones sous-dot\u00e9es", value: "0", icon: AlertIcon, iconBg: "bg-red-100", iconColor: "text-red-500", valueColor: "text-red-600" },
  { label: "M\u00e9decins dans la zone", value: "0", icon: StethoscopeIcon, iconBg: "bg-green-100", iconColor: "text-green-500", valueColor: "text-green-600" },
  { label: "Campagnes en cours", value: "0", icon: CalendarIcon, iconBg: "bg-blue-100", iconColor: "text-blue-500", valueColor: "text-blue-600" },
  { label: "Population couverte", value: "0", icon: UsersIcon, iconBg: "bg-teal-100", iconColor: "text-teal-500", valueColor: "text-teal-600" },
];

export default function CollectiviteDashboard() {
  const [activeTab, setActiveTab] = useState<"zones" | "campagnes" | "medecins">("zones");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-teal-600 rounded-full" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Espace Collectivit&eacute;</h1>
                <p className="text-sm text-gray-500">Administration publique</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-medium rounded-md">
              Collectivit&eacute;
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
          {(["zones", "campagnes", "medecins"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === tab ? "bg-white border border-gray-200 text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {tab === "zones" && "Zones sous-dot\u00e9es (0)"}
              {tab === "campagnes" && "Campagnes sant\u00e9 (0)"}
              {tab === "medecins" && "M\u00e9decins volontaires (0)"}
            </button>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">
                {activeTab === "zones" && "Cartographie des d\u00e9serts m\u00e9dicaux"}
                {activeTab === "campagnes" && "Campagnes de sant\u00e9 locales"}
                {activeTab === "medecins" && "M\u00e9decins disponibles dans la zone"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeTab === "zones" && "Identifiez les zones o\u00f9 l\u2019acc\u00e8s aux soins est insuffisant"}
                {activeTab === "campagnes" && "Organisez des \u00e9v\u00e9nements de sant\u00e9 pour votre territoire"}
                {activeTab === "medecins" && "Coordonnez avec les m\u00e9decins volontaires pr\u00e8s de chez vous"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <RefreshIcon className="w-4 h-4" />
                Actualiser
              </button>
              {activeTab === "campagnes" && (
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Nouvelle campagne
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 text-gray-300 mb-4">
              <MapIcon className="w-full h-full" />
            </div>
            <p className="text-gray-500 font-medium mb-1">
              {activeTab === "zones" && "Aucune zone identifi\u00e9e"}
              {activeTab === "campagnes" && "Aucune campagne cr\u00e9\u00e9e"}
              {activeTab === "medecins" && "Aucun m\u00e9decin trouv\u00e9"}
            </p>
            <p className="text-sm text-gray-400 max-w-md text-center">
              {activeTab === "zones" && "La carte des d\u00e9serts m\u00e9dicaux de votre territoire s\u2019affichera ici"}
              {activeTab === "campagnes" && "Cr\u00e9ez des campagnes de sant\u00e9 pour attirer des m\u00e9decins volontaires"}
              {activeTab === "medecins" && "Les m\u00e9decins disponibles dans votre r\u00e9gion appara\u00eetront ici"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
