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

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
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

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
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
    label: "Demandes actives",
    value: 0,
    icon: TargetIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
    valueColor: "text-purple-600",
  },
  {
    label: "M\u00e9decins disponibles",
    value: 0,
    icon: StethoscopeIcon,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    valueColor: "text-green-600",
  },
  {
    label: "Total candidatures",
    value: 0,
    icon: UsersIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    valueColor: "text-blue-600",
  },
  {
    label: "Zones couvertes",
    value: 0,
    icon: MapPinIcon,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    valueColor: "text-orange-600",
  },
];

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState<"demandes" | "medecins">("demandes");

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
                <h1 className="text-xl font-bold text-gray-900">Espace Organisation</h1>
                <p className="text-sm text-gray-500">ONG Sant&eacute;</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-md">
              <CheckBadgeIcon className="w-3.5 h-3.5" />
              V&eacute;rifi&eacute;e
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md">
              ONG
            </span>
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
                <p className={`text-3xl font-bold ${stat.valueColor}`}>{stat.value}</p>
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
            onClick={() => setActiveTab("demandes")}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "demandes"
                ? "bg-white border border-gray-200 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Mes demandes (0)
          </button>
          <button
            onClick={() => setActiveTab("medecins")}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "medecins"
                ? "bg-white border border-gray-200 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            M&eacute;decins disponibles (0)
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-white border border-gray-200 rounded-xl">
          {/* Card Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <div>
              <h2 className="font-semibold text-gray-900">
                {activeTab === "demandes"
                  ? "Mes demandes de m\u00e9decins"
                  : "M\u00e9decins disponibles"}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeTab === "demandes"
                  ? "G\u00e9rez vos demandes pour recruter des m\u00e9decins volontaires"
                  : "Parcourez les m\u00e9decins disponibles dans votre zone"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <RefreshIcon className="w-4 h-4" />
                Actualiser
              </button>
              {activeTab === "demandes" && (
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  <PlusIcon className="w-4 h-4" />
                  Nouvelle demande
                </button>
              )}
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 text-gray-300 mb-4">
              <TargetIcon className="w-full h-full" />
            </div>
            <p className="text-gray-500 font-medium mb-1">
              {activeTab === "demandes"
                ? "Aucune demande cr\u00e9\u00e9e"
                : "Aucun m\u00e9decin disponible"}
            </p>
            <p className="text-sm text-gray-400">
              {activeTab === "demandes"
                ? "Cr\u00e9ez une demande pour recruter des m\u00e9decins volontaires"
                : "Aucun m\u00e9decin n'est disponible dans votre zone actuellement"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
