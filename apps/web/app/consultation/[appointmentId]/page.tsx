"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { videoApi, documentsApi } from "@/lib/api";

/* ── Inline SVG Icons ── */

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 01-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function MicOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="1" y1="1" x2="23" y2="23" />
      <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6" />
      <path d="M17 16.95A7 7 0 015 12v-2m14 0v2c0 .28-.02.56-.05.83" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
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

function VideoOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M16 16v1a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2h2m5.66 0H14a2 2 0 012 2v3.34l1 1L23 7v10" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function PhoneOffIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M10.68 13.31a16 16 0 003.41 2.6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 004.02.64 2 2 0 012 2v3.26a2 2 0 01-2.16 2 19.73 19.73 0 01-8.56-2.76 19.58 19.58 0 01-6.06-6.06 19.73 19.73 0 01-2.76-8.56A2 2 0 016.05 2h3.26a2 2 0 012 1.72 12.84 12.84 0 00.64 4.02 2 2 0 01-.45 2.11l-1.27 1.27" />
      <line x1="23" y1="1" x2="1" y2="23" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

/* ── Mock Data ── */

const MOCK_DOCUMENTS = [
  { id: "d1", fileName: "analyse_sang.pdf", type: "Analyse" },
  { id: "d2", fileName: "ordonnance_cardio.pdf", type: "Ordonnance" },
];

/* ── Page ── */

export default function VideoConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;
  const { user, token } = useAuth();

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [sidePanel, setSidePanel] = useState(false);
  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Start timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Load documents
  useEffect(() => {
    if (!token) return;
    documentsApi
      .listByAppointment(appointmentId, token)
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) setDocuments(data);
      })
      .catch(() => {
        /* keep mock data */
      });
  }, [appointmentId, token]);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const handleEnd = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (token) {
      try {
        await videoApi.endSession(appointmentId, token);
      } catch {
        /* ignore */
      }
    }
    router.push(user?.role === "DOCTOR" ? "/doctor" : "/dashboard");
  };

  const participantName = user?.role === "DOCTOR"
    ? "Patient"
    : "Dr. Marie Dubois";

  const jitsiUrl = `https://meet.jit.si/lyvora-${appointmentId}`;

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            <h1 className="text-white font-semibold text-sm">Téléconsultation</h1>
          </div>
          <span className="text-gray-400 text-sm">{participantName}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white font-mono text-sm bg-gray-700 px-3 py-1 rounded-lg">
            {formatTimer(timer)}
          </span>
          <button
            onClick={() => setShowEndConfirm(true)}
            className="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Terminer
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video */}
        <div className="flex-1 relative">
          <iframe
            src={jitsiUrl}
            className="w-full h-full border-0"
            allow="camera; microphone; fullscreen; display-capture"
          />
        </div>

        {/* Side Panel */}
        {sidePanel && (
          <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col">
            <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-white text-sm font-semibold">Documents du patient</h2>
              <button
                onClick={() => setSidePanel(false)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
                >
                  <DocumentIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-white truncate">{doc.fileName}</p>
                    <p className="text-xs text-gray-400">{doc.type}</p>
                  </div>
                </div>
              ))}
              {documents.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">Aucun document partagé.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-center gap-6 px-6 py-4 bg-gray-800 border-t border-gray-700">
        {/* Toggle Side Panel */}
        {!sidePanel && (
          <button
            onClick={() => setSidePanel(true)}
            className="absolute left-6 flex items-center gap-2 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            <DocumentIcon className="w-4 h-4" />
            Documents
            <ChevronLeftIcon className="w-3 h-3" />
          </button>
        )}

        {/* Mic */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isMuted ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={isMuted ? "Activer le micro" : "Couper le micro"}
        >
          {isMuted ? (
            <MicOffIcon className="w-6 h-6 text-white" />
          ) : (
            <MicIcon className="w-6 h-6 text-white" />
          )}
        </button>

        {/* Camera */}
        <button
          onClick={() => setIsCameraOff(!isCameraOff)}
          className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
            isCameraOff ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-600"
          }`}
          title={isCameraOff ? "Activer la caméra" : "Couper la caméra"}
        >
          {isCameraOff ? (
            <VideoOffIcon className="w-6 h-6 text-white" />
          ) : (
            <VideoIcon className="w-6 h-6 text-white" />
          )}
        </button>

        {/* End Call */}
        <button
          onClick={() => setShowEndConfirm(true)}
          className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition-colors"
          title="Terminer l'appel"
        >
          <PhoneOffIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* End Confirmation Modal */}
      {showEndConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Terminer la consultation ?</h3>
            <p className="text-sm text-gray-600 mb-6">
              Êtes-vous sûr de vouloir mettre fin à cette téléconsultation ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndConfirm(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleEnd}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Terminer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
