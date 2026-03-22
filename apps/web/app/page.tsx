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
    description: "Trouvez un m\u00e9decin disponible pr\u00e8s de chez vous",
    icon: PatientIcon,
    color: "bg-blue-900",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "M\u00e9decin",
    description: "G\u00e9rez votre disponibilit\u00e9 et vos consultations",
    icon: StethoscopeIcon,
    color: "bg-green-500",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Organisation",
    description: "Planifiez des missions m\u00e9dicales",
    icon: OrgIcon,
    color: "bg-purple-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Admin",
    description: "G\u00e9rez la plateforme et les validations",
    icon: ShieldIcon,
    color: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

const steps = [
  {
    number: 1,
    title: "G\u00e9olocalisation",
    description:
      "Le syst\u00e8me d\u00e9tecte automatiquement votre position et trouve les m\u00e9decins disponibles pr\u00e8s de vous.",
    color: "bg-blue-600",
  },
  {
    number: 2,
    title: "Filtrage intelligent",
    description:
      "Filtrez par sp\u00e9cialit\u00e9, langue parl\u00e9e, note, et disponibilit\u00e9 imm\u00e9diate ou future.",
    color: "bg-green-500",
  },
  {
    number: 3,
    title: "R\u00e9servation instantan\u00e9e",
    description:
      "R\u00e9servez votre consultation en quelques clics, en pr\u00e9sentiel ou en t\u00e9l\u00e9consultation.",
    color: "bg-purple-500",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-6 h-6 text-blue-800" />
              <span className="text-xl font-bold text-blue-900">Lyvora</span>
            </div>
            <div className="flex items-center gap-6">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50" />
        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-400 via-teal-400 to-blue-300 opacity-60" />

        <div className="relative max-w-4xl mx-auto px-4 py-20 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center">
              <HeartIcon className="w-7 h-7 text-green-400" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-blue-900">Lyvora</h1>
              <p className="text-xs text-gray-500">Healthcare, Anywhere</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl font-bold text-blue-900 leading-tight mb-6">
            Trouvez un m&eacute;decin disponible
            <br />
            &agrave; moins d&apos;1 heure
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-lg">
            La premi&egrave;re plateforme mondiale qui connecte patients et
            m&eacute;decins en temps r&eacute;el, partout dans le monde, pour
            lutter contre les d&eacute;serts m&eacute;dicaux.
          </p>

          {/* CTA Button */}
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors text-base"
          >
            Commencer maintenant
            <ArrowRightIcon className="w-4 h-4" />
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            Connectez-vous pour acc&eacute;der aux dashboards Patient,
            M&eacute;decin, Organisation ou Admin
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPinIcon className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">87 pays</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <StethoscopeIcon className="w-4 h-4 text-green-600" />
              <span className="font-semibold">45,672 m&eacute;decins</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ClockIcon className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">12 min de r&eacute;ponse</span>
            </div>
          </div>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-10">
          Choisissez votre profil
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {profiles.map((profile) => (
            <div
              key={profile.title}
              className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div
                className={`w-12 h-12 ${profile.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <profile.icon className={`w-6 h-6 ${profile.iconColor}`} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {profile.title}
              </h4>
              <p className="text-sm text-gray-500 mb-5">
                {profile.description}
              </p>
              <Link
                href={`/login?role=${profile.title.toLowerCase()}`}
                className={`block w-full py-2.5 ${profile.color} text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity`}
              >
                Acc&eacute;der &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Comment &ccedil;a fonctionne ?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div
                className={`w-14 h-14 ${step.color} rounded-full flex items-center justify-center mx-auto mb-5`}
              >
                <span className="text-white text-xl font-bold">
                  {step.number}
                </span>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Lyvora</span> -
            R&eacute;volutionner l&apos;acc&egrave;s aux soins dans le monde
          </p>
        </div>
      </footer>
    </div>
  );
}
