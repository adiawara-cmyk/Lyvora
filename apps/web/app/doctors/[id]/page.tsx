"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { doctorsApi } from "@/lib/api";

/* ── Inline SVG Icons ── */

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

function StarOutlineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function AcademicCapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
    </svg>
  );
}

/* ── Mock Data ── */

const MOCK_DOCTOR = {
  id: "1",
  firstName: "Marie",
  lastName: "Dubois",
  email: "marie.dubois@lyvora.fr",
  specialties: ["Cardiologie", "Médecine interne"],
  languages: ["Français", "Anglais", "Espagnol"],
  bio: "Cardiologue expérimentée avec plus de 15 ans de pratique. Diplômée de la Faculté de Médecine de Paris, je me spécialise dans la prévention et le traitement des maladies cardiovasculaires. Mon approche est centrée sur le patient, combinant expertise médicale et écoute attentive.",
  verified: true,
  available: true,
  rating: 4.8,
  reviewCount: 47,
  city: "Paris",
  address: "15 Rue de la Santé, 75013 Paris",
  diplomas: [
    "Doctorat en Médecine - Université Paris Descartes (2008)",
    "DES Cardiologie - CHU Pitié-Salpêtrière (2012)",
    "Diplôme Universitaire Échocardiographie (2013)",
  ],
  tarifs: [
    { type: "Consultation", price: 50 },
    { type: "Téléconsultation", price: 35 },
    { type: "Consultation de suivi", price: 40 },
  ],
  horaires: [
    { day: "Lundi", hours: "09:00 - 17:00" },
    { day: "Mardi", hours: "09:00 - 17:00" },
    { day: "Mercredi", hours: "09:00 - 13:00" },
    { day: "Jeudi", hours: "09:00 - 17:00" },
    { day: "Vendredi", hours: "09:00 - 16:00" },
    { day: "Samedi", hours: "Fermé" },
    { day: "Dimanche", hours: "Fermé" },
  ],
  reviews: [
    {
      id: "r1",
      author: "Jean P.",
      rating: 5,
      date: "2025-12-15",
      comment: "Excellent médecin, très à l'écoute et professionnelle. Je recommande vivement.",
    },
    {
      id: "r2",
      author: "Sophie L.",
      rating: 4,
      date: "2025-11-28",
      comment: "Bonne prise en charge, explications claires. Le temps d'attente était un peu long.",
    },
    {
      id: "r3",
      author: "Pierre M.",
      rating: 5,
      date: "2025-10-10",
      comment: "Dr. Dubois est une cardiologue exceptionnelle. Diagnostic précis et suivi remarquable.",
    },
  ],
};

/* ── Helper ── */

function renderStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-400" />);
    } else {
      stars.push(<StarOutlineIcon key={i} className="w-5 h-5 text-gray-300" />);
    }
  }
  return stars;
}

/* ── Page ── */

export default function DoctorProfilePage() {
  const params = useParams();
  const id = params.id as string;

  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    doctorsApi
      .getById(id)
      .then((data) => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(() => {
        setDoctor(MOCK_DOCTOR);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900" />
      </div>
    );
  }

  if (!doctor) return null;

  const initials = `${(doctor.firstName || "M")[0]}${(doctor.lastName || "D")[0]}`;
  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-lg font-bold text-gray-900">Profil Médecin</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/booking/${doctor.id || id}`}
              className="flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
              Réserver un créneau
            </Link>
            <Link
              href={`/booking/${doctor.id || id}?type=teleconsultation`}
              className="flex items-center gap-2 px-4 py-2 border border-blue-900 text-blue-900 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              <VideoIcon className="w-4 h-4" />
              Téléconsultation
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Left Column */}
          <div className="w-1/3">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-3xl mb-4">
                  {initials}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-gray-900">{fullName}</h2>
                  {doctor.verified && <CheckBadgeIcon className="w-5 h-5 text-green-500" />}
                </div>
                <p className="text-sm text-gray-500 mb-4">{doctor.city || "Paris"}</p>

                {/* Online Status */}
                {doctor.available && (
                  <div className="flex items-center gap-2 mb-5">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-sm text-green-600 font-medium">En ligne</span>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex">{renderStars(doctor.rating || 0)}</div>
                  <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
                  <span className="text-sm text-gray-400">({doctor.reviewCount || doctor.reviews?.length || 0} avis)</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Spécialités</h3>
                <div className="flex flex-wrap gap-2">
                  {(doctor.specialties || []).map((s: string) => (
                    <span key={s} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                  <GlobeIcon className="w-4 h-4" />
                  Langues
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(doctor.languages || ["Français"]).map((l: string) => (
                    <span key={l} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-2/3 space-y-6">
            {/* Bio */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Biographie</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {doctor.bio || "Aucune biographie renseignée."}
              </p>
            </section>

            {/* Tarifs */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tarifs</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-gray-500 font-medium">Type de consultation</th>
                    <th className="text-right py-2 text-gray-500 font-medium">Prix</th>
                  </tr>
                </thead>
                <tbody>
                  {(doctor.tarifs || MOCK_DOCTOR.tarifs).map((t: any, i: number) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 text-gray-700">{t.type}</td>
                      <td className="py-3 text-right font-semibold text-gray-900">{t.price} &euro;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Horaires */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Horaires</h3>
              <table className="w-full text-sm">
                <tbody>
                  {(doctor.horaires || MOCK_DOCTOR.horaires).map((h: any, i: number) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 text-gray-700 font-medium w-1/3">{h.day}</td>
                      <td className={`py-2.5 ${h.hours === "Fermé" ? "text-red-500" : "text-gray-600"}`}>
                        {h.hours}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Avis */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avis patients</h3>

              {/* Average */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                <div className="text-4xl font-bold text-gray-900">{doctor.rating || 0}</div>
                <div>
                  <div className="flex">{renderStars(doctor.rating || 0)}</div>
                  <p className="text-sm text-gray-500 mt-1">
                    {doctor.reviewCount || doctor.reviews?.length || 0} avis
                  </p>
                </div>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {(doctor.reviews || MOCK_DOCTOR.reviews).map((review: any) => (
                  <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">{review.author}</span>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex mb-2">{renderStars(review.rating)}</div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Diplômes */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AcademicCapIcon className="w-5 h-5 text-gray-600" />
                Diplômes et formations
              </h3>
              <ul className="space-y-2">
                {(doctor.diplomas || MOCK_DOCTOR.diplomas).map((d: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
