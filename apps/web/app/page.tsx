import Link from "next/link";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function PatientIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

function OrgIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

function CommunityIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M12 6v6l4 2" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

const profiles = [
  {
    title: "Patient",
    description: "Trouvez un m\u00e9decin pr\u00e8s de chez vous",
    icon: PatientIcon,
    color: "bg-blue-900",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    href: "/dashboard",
  },
  {
    title: "M\u00e9decin",
    description: "G\u00e9rez vos disponibilit\u00e9s et consultations",
    icon: StethoscopeIcon,
    color: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    href: "/doctor",
  },
  {
    title: "Cabinet",
    description: "Trouvez des m\u00e9decins rempla\u00e7ants",
    icon: CabinetIcon,
    color: "bg-cyan-600",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    href: "/cabinet",
  },
  {
    title: "Organisation",
    description: "Planifiez des missions m\u00e9dicales",
    icon: OrgIcon,
    color: "bg-purple-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    href: "/organization",
  },
  {
    title: "Collectivit\u00e9",
    description: "Luttez contre les d\u00e9serts m\u00e9dicaux",
    icon: CommunityIcon,
    color: "bg-teal-600",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    href: "/collectivite",
  },
  {
    title: "Admin",
    description: "G\u00e9rez la plateforme",
    icon: ShieldIcon,
    color: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    href: "/admin",
  },
];

const steps = [
  {
    number: 1,
    title: "G\u00e9olocalisation",
    description:
      "Le syst\u00e8me d\u00e9tecte votre position et trouve les m\u00e9decins disponibles pr\u00e8s de vous.",
    color: "bg-blue-600",
  },
  {
    number: 2,
    title: "Filtrage intelligent",
    description:
      "Filtrez par sp\u00e9cialit\u00e9, langue parl\u00e9e, note et disponibilit\u00e9.",
    color: "bg-green-500",
  },
  {
    number: 3,
    title: "R\u00e9servation instantan\u00e9e",
    description:
      "R\u00e9servez en quelques clics, en pr\u00e9sentiel ou en t\u00e9l\u00e9consultation.",
    color: "bg-purple-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-5 h-5 text-blue-800" />
              <span className="text-lg font-bold text-blue-900">Lyvora</span>
            </div>
            <div className="flex items-center gap-5">
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChartIcon className="w-4 h-4" />
                Vue d&apos;Ensemble
              </Link>
              <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <GlobeIcon className="w-4 h-4" />
                FR
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section — compact */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50" />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-400 via-teal-400 to-blue-300 opacity-60" />

        <div className="relative max-w-4xl mx-auto px-4 py-8 sm:py-10 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-4">
            <div className="w-9 h-9 bg-blue-800 rounded-lg flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-blue-900 leading-none">Lyvora</h1>
              <p className="text-[11px] text-gray-500">Healthcare, Anywhere</p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 leading-tight mb-3">
            Trouvez un m&eacute;decin disponible
            <br />
            &agrave; moins d&apos;1 heure
          </h2>

          <p className="text-gray-600 max-w-xl mx-auto mb-5 text-sm sm:text-base">
            La premi&egrave;re plateforme mondiale qui connecte patients et
            m&eacute;decins en temps r&eacute;el, pour lutter contre les
            d&eacute;serts m&eacute;dicaux.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-2.5 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm"
          >
            Commencer maintenant
            <ArrowRightIcon className="w-4 h-4" />
          </Link>

          <p className="text-xs text-gray-400 mt-2">
            Connectez-vous pour acc&eacute;der &agrave; votre espace
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 text-xs text-gray-700">
              <MapPinIcon className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-semibold">87 pays</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 text-xs text-gray-700">
              <StethoscopeIcon className="w-3.5 h-3.5 text-green-600" />
              <span className="font-semibold">45,672 m&eacute;decins</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 text-xs text-gray-700">
              <ClockIcon className="w-3.5 h-3.5 text-purple-600" />
              <span className="font-semibold">12 min de r&eacute;ponse</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles Section — 6 cards in 2x3 or 3x2 grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
          Choisissez votre profil
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {profiles.map((profile) => (
            <Link
              key={profile.title}
              href={profile.href}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:shadow-lg transition-shadow group"
            >
              <div
                className={`w-10 h-10 ${profile.iconBg} rounded-full flex items-center justify-center mx-auto mb-2.5`}
              >
                <profile.icon className={`w-5 h-5 ${profile.iconColor}`} />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                {profile.title}
              </h4>
              <p className="text-[11px] text-gray-500 mb-3 leading-snug">
                {profile.description}
              </p>
              <span
                className={`block w-full py-1.5 ${profile.color} text-white rounded-md text-xs font-medium group-hover:opacity-90 transition-opacity`}
              >
                Acc&eacute;der &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works — compact horizontal */}
      <section className="max-w-4xl mx-auto px-4 pb-10">
        <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
          Comment &ccedil;a fonctionne ?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div
                className={`w-10 h-10 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3`}
              >
                <span className="text-white text-sm font-bold">
                  {step.number}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{step.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-700">Lyvora</span> -
            R&eacute;volutionner l&apos;acc&egrave;s aux soins dans le monde
          </p>
        </div>
      </footer>
    </div>
  );
}
