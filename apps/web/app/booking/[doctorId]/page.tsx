"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { appointmentsApi, doctorsApi } from "@/lib/api";

/* ── Inline SVG Icons ── */

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
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

function VideoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2m-16 0H3m2 0V5m14 0v16M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 4h1m4 0h1" />
    </svg>
  );
}

/* ── Helpers ── */

function getNext7Days(): { date: Date; label: string; dayName: string }[] {
  const days = [];
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      date: d,
      label: `${d.getDate()}/${d.getMonth() + 1}`,
      dayName: dayNames[d.getDay()],
    });
  }
  return days;
}

function generateTimeSlots(): string[] {
  const slots = [];
  for (let h = 9; h <= 16; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
    if (h < 17) slots.push(`${String(h).padStart(2, "0")}:30`);
  }
  return slots;
}

function formatDateFR(date: Date): string {
  return date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ── Page ── */

export default function BookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const doctorId = params.doctorId as string;
  const { user, token } = useAuth();

  const [doctorName, setDoctorName] = useState("Dr. Marie Dubois");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<"presentiel" | "teleconsultation">(
    searchParams.get("type") === "teleconsultation" ? "teleconsultation" : "presentiel"
  );
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = getNext7Days();
  const timeSlots = generateTimeSlots();

  useEffect(() => {
    doctorsApi
      .getById(doctorId)
      .then((data: any) => {
        if (data.firstName && data.lastName) {
          setDoctorName(`Dr. ${data.firstName} ${data.lastName}`);
        }
      })
      .catch(() => {
        /* keep mock name */
      });
  }, [doctorId]);

  const handleConfirm = async () => {
    if (!selectedTime || !token) {
      setError(!token ? "Veuillez vous connecter pour réserver." : "Veuillez sélectionner un créneau.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dateStr = selectedDate.toISOString().split("T")[0];
      await appointmentsApi.create(
        {
          doctorId,
          date: dateStr,
          time: selectedTime,
          type: consultationType,
        },
        token
      );
      setConfirmed(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la réservation.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md w-full text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h2>
          <p className="text-gray-600 mb-1">{doctorName}</p>
          <p className="text-gray-600 mb-1">{formatDateFR(selectedDate)} à {selectedTime}</p>
          <p className="text-sm text-gray-500 mb-6">
            {consultationType === "teleconsultation" ? "Téléconsultation" : "Consultation en présentiel"}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/dashboard"
              className="px-6 py-2 bg-blue-900 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Retour au tableau de bord
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href={`/doctors/${doctorId}`} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Réserver un créneau</h1>
            <p className="text-sm text-gray-500">{doctorName}</p>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Date Picker */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              Choisir une date
            </h2>
            <div className="grid grid-cols-7 gap-2">
              {days.map((d) => {
                const isSelected =
                  selectedDate.toDateString() === d.date.toDateString();
                return (
                  <button
                    key={d.label}
                    onClick={() => {
                      setSelectedDate(d.date);
                      setSelectedTime(null);
                    }}
                    className={`flex flex-col items-center py-3 px-1 rounded-lg border text-sm transition-colors ${
                      isSelected
                        ? "bg-blue-900 text-white border-blue-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    <span className="font-medium text-xs">{d.dayName}</span>
                    <span className="text-lg font-bold mt-0.5">{d.date.getDate()}</span>
                    <span className="text-xs opacity-70">{d.date.toLocaleDateString("fr-FR", { month: "short" })}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Time Slots */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-gray-900 mb-4">
              <ClockIcon className="w-5 h-5 text-blue-600" />
              Choisir un horaire
            </h2>
            <p className="text-sm text-gray-500 mb-4">{formatDateFR(selectedDate)}</p>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                      isSelected
                        ? "bg-blue-900 text-white border-blue-900"
                        : "bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Consultation Type Toggle */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Type de consultation</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setConsultationType("presentiel")}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-lg border-2 transition-colors ${
                consultationType === "presentiel"
                  ? "border-blue-900 bg-blue-50 text-blue-900"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <BuildingIcon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium text-sm">Présentiel</p>
                <p className="text-xs opacity-70">Au cabinet du médecin</p>
              </div>
            </button>
            <button
              onClick={() => setConsultationType("teleconsultation")}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-lg border-2 transition-colors ${
                consultationType === "teleconsultation"
                  ? "border-blue-900 bg-blue-50 text-blue-900"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              <VideoIcon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium text-sm">Téléconsultation</p>
                <p className="text-xs opacity-70">En visioconférence</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recap Card */}
        {selectedTime && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Récapitulatif</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Médecin</p>
                <p className="font-medium text-gray-900">{doctorName}</p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium text-gray-900">{formatDateFR(selectedDate)}</p>
              </div>
              <div>
                <p className="text-gray-500">Heure</p>
                <p className="font-medium text-gray-900">{selectedTime}</p>
              </div>
              <div>
                <p className="text-gray-500">Type</p>
                <p className="font-medium text-gray-900">
                  {consultationType === "teleconsultation" ? "Téléconsultation" : "Présentiel"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Confirm Button */}
        <div className="mt-6">
          <button
            onClick={handleConfirm}
            disabled={!selectedTime || loading}
            className={`w-full py-3 rounded-lg text-sm font-medium transition-colors ${
              selectedTime && !loading
                ? "bg-blue-900 text-white hover:bg-blue-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {loading ? "Réservation en cours..." : "Confirmer la réservation"}
          </button>
        </div>
      </div>
    </div>
  );
}
