"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";

interface Doctor {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  specialties: string[];
  verified: boolean;
}

interface DoctorMapProps {
  doctors: Doctor[];
  center: [number, number];
  zoom?: number;
}

export default function DoctorMap({ doctors, center, zoom = 15 }: DoctorMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView(center, zoom);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const doctorIcon = L.divIcon({
      html: `<div style="background:#16a34a;border:3px solid white;border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
      </div>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    doctors.forEach((doc) => {
      L.marker([doc.lat, doc.lng], { icon: doctorIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-size:14px"><strong>${doc.name}</strong><br/><span style="color:#666">${doc.specialties.join(", ")}</span></div>`,
        );
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [doctors, center, zoom]);

  return <div ref={mapRef} className="w-full h-full" />;
}
