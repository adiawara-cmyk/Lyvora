"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { documentsApi } from "@/lib/api";

/* ── Inline SVG Icons ── */

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
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

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

/* ── Types & Constants ── */

type DocType = "Analyse" | "Ordonnance" | "Rapport" | "Diplôme" | "Autre";

const TYPE_COLORS: Record<DocType, string> = {
  Analyse: "bg-purple-100 text-purple-700",
  Ordonnance: "bg-green-100 text-green-700",
  Rapport: "bg-blue-100 text-blue-700",
  "Diplôme": "bg-amber-100 text-amber-700",
  Autre: "bg-gray-100 text-gray-600",
};

const FILTER_TABS = ["Tous", "Analyses", "Ordonnances", "Rapports"] as const;

interface Document {
  id: string;
  fileName: string;
  type: DocType;
  date: string;
  size: string;
}

const MOCK_DOCUMENTS: Document[] = [
  {
    id: "d1",
    fileName: "analyse_sang_mars2025.pdf",
    type: "Analyse",
    date: "2025-03-15",
    size: "1.2 Mo",
  },
  {
    id: "d2",
    fileName: "ordonnance_cardio.pdf",
    type: "Ordonnance",
    date: "2025-02-28",
    size: "340 Ko",
  },
  {
    id: "d3",
    fileName: "rapport_echo_cardiaque.pdf",
    type: "Rapport",
    date: "2025-01-10",
    size: "2.8 Mo",
  },
];

/* ── Page ── */

export default function DocumentsPage() {
  const { user, token } = useAuth();

  const [documents, setDocuments] = useState<Document[]>(MOCK_DOCUMENTS);
  const [selectedType, setSelectedType] = useState<DocType>("Analyse");
  const [filter, setFilter] = useState<string>("Tous");
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredDocs = documents.filter((doc) => {
    if (filter === "Tous") return true;
    if (filter === "Analyses") return doc.type === "Analyse";
    if (filter === "Ordonnances") return doc.type === "Ordonnance";
    if (filter === "Rapports") return doc.type === "Rapport";
    return true;
  });

  const handleFileUpload = async (file: File) => {
    if (!token) return;
    setUploading(true);
    try {
      await documentsApi.upload(file, selectedType, undefined, token);
      // Add to local list as mock
      const newDoc: Document = {
        id: `d${Date.now()}`,
        fileName: file.name,
        type: selectedType,
        date: new Date().toISOString().split("T")[0],
        size: file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} Mo`
          : `${Math.round(file.size / 1024)} Ko`,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    } catch {
      // Fallback: add mock entry locally
      const newDoc: Document = {
        id: `d${Date.now()}`,
        fileName: file.name,
        type: selectedType,
        date: new Date().toISOString().split("T")[0],
        size: file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} Mo`
          : `${Math.round(file.size / 1024)} Ko`,
      };
      setDocuments((prev) => [newDoc, ...prev]);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await documentsApi.delete(id, token);
    } catch {
      /* continue with local delete */
    }
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Mes Documents</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Upload Zone */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Type de document</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as DocType)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Analyse">Analyse</option>
                <option value="Ordonnance">Ordonnance</option>
                <option value="Rapport">Rapport</option>
                <option value="Diplôme">Diplôme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
            }`}
          >
            <UploadIcon className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">
              {uploading ? "Envoi en cours..." : "Glissez vos fichiers ici ou cliquez pour sélectionner"}
            </p>
            <p className="text-xs text-gray-400">PDF, JPG, PNG — max 10 Mo</p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
                e.target.value = "";
              }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab
                  ? "bg-blue-900 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Document List */}
        <div className="space-y-3">
          {filteredDocs.length === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <DocumentIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Aucun document dans cette catégorie.</p>
            </div>
          )}

          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DocumentIcon className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{doc.fileName}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${TYPE_COLORS[doc.type]}`}>
                      {doc.type}
                    </span>
                    <span className="text-xs text-gray-400">{doc.date}</span>
                    <span className="text-xs text-gray-400">{doc.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Télécharger">
                  <DownloadIcon className="w-4 h-4 text-gray-500" />
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Supprimer"
                >
                  <TrashIcon className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
