"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

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

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );
}

const ROLES = [
  { value: "PATIENT", label: "Patient", description: "Rechercher et r\u00e9server des consultations" },
  { value: "DOCTOR", label: "M\u00e9decin", description: "G\u00e9rer vos disponibilit\u00e9s" },
  { value: "ORG", label: "Organisation", description: "Planifier des missions m\u00e9dicales" },
];

const ROLE_REDIRECTS: Record<string, string> = {
  PATIENT: "/dashboard",
  DOCTOR: "/doctor",
  ADMIN: "/admin",
  ORG: "/organization",
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("PATIENT");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await register({ email, password, firstName, lastName, role });
      router.push(ROLE_REDIRECTS[role] || "/dashboard");
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-xl font-bold">Lyvora</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Rejoignez la
            <br />
            r&eacute;volution sant&eacute;
          </h1>
          <p className="text-blue-200 text-lg max-w-md">
            Cr&eacute;ez votre compte et acc&eacute;dez &agrave; un r&eacute;seau
            mondial de professionnels de sant&eacute;.
          </p>
        </div>

        <p className="text-sm text-blue-300">
          &copy; 2024 Lyvora. Tous droits r&eacute;serv&eacute;s.
        </p>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <MapPinIcon className="w-6 h-6 text-blue-800" />
            <span className="text-xl font-bold text-blue-900">Lyvora</span>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Cr&eacute;er un compte</h2>
            <p className="text-gray-500 mt-2">
              Choisissez votre profil et inscrivez-vous
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Je suis
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`p-3 rounded-lg border text-center transition-all ${
                      role === r.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-medium text-sm">{r.label}</p>
                    <p className="text-xs mt-0.5 opacity-70">{r.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Pr&eacute;nom
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jean"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Martin"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 caract\u00e8res"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Cr\u00e9ation..." : "Cr\u00e9er mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            D&eacute;j&agrave; un compte ?{" "}
            <Link href="/login" className="text-blue-600 font-medium hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
