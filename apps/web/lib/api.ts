const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface FetchOptions extends RequestInit {
  token?: string;
}

export async function api<T = any>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const { token, headers: customHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((customHeaders as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}/api${endpoint}`, {
    headers,
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// Auth
export const authApi = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
  }) => api("/auth/register", { method: "POST", body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    api("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  refresh: (refreshToken: string) =>
    api("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  me: (token: string) => api("/auth/me", { token }),
};

// Doctors
export const doctorsApi = {
  search: (params: Record<string, string>) => {
    const qs = new URLSearchParams(params).toString();
    return api(`/doctors?${qs}`);
  },

  getById: (id: string) => api(`/doctors/${id}`),
};

// Stats
export const statsApi = {
  getPublic: () => api("/stats"),
};

// Appointments
export const appointmentsApi = {
  create: (data: any, token: string) =>
    api("/appointments", { method: "POST", body: JSON.stringify(data), token }),

  list: (token: string) => api("/appointments", { token }),

  updateStatus: (id: string, status: string, token: string) =>
    api(`/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      token,
    }),
};

// Admin
export const adminApi = {
  getPendingValidations: (token: string) =>
    api("/admin/pending-validations", { token }),

  verifyDoctor: (id: string, status: string, token: string) =>
    api(`/admin/doctors/${id}/verify`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      token,
    }),

  getStats: (token: string) => api("/admin/stats", { token }),

  getRecentActivity: (token: string) => api("/admin/recent-activity", { token }),
};

// Organizations
export const orgsApi = {
  getProfile: (token: string) => api("/organizations/me", { token }),

  createMission: (data: any, token: string) =>
    api("/organizations/missions", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),

  listMissions: (token: string) => api("/organizations/missions", { token }),
};

// Documents
export const documentsApi = {
  upload: async (
    file: File,
    type: string,
    appointmentId: string | undefined,
    token: string,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    if (appointmentId) formData.append("appointmentId", appointmentId);
    const res = await fetch(API_URL + "/api/documents/upload", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },

  list: (token: string) => api("/documents", { token }),

  listByAppointment: (appointmentId: string, token: string) =>
    api(`/documents/appointment/${appointmentId}`, { token }),

  delete: (id: string, token: string) =>
    api(`/documents/${id}`, { method: "DELETE", token }),
};

// Schedule
export const scheduleApi = {
  getSlots: (doctorId: string, date: string) =>
    api(`/schedule/slots/${doctorId}?date=${date}`),

  setWorkingHours: (hours: any, token: string) =>
    api("/schedule/working-hours", {
      method: "POST",
      body: JSON.stringify(hours),
      token,
    }),

  getWorkingHours: (token: string) =>
    api("/schedule/working-hours", { token }),
};

// Video
export const videoApi = {
  createRoom: (appointmentId: string, token: string) =>
    api(`/video/room/${appointmentId}`, { method: "POST", token }),

  getRoom: (appointmentId: string, token: string) =>
    api(`/video/room/${appointmentId}`, { token }),

  endSession: (appointmentId: string, token: string) =>
    api(`/video/room/${appointmentId}/end`, { method: "POST", token }),
};

// Cabinets
export const cabinetsApi = {
  create: (data: any, token: string) =>
    api("/cabinets", { method: "POST", body: JSON.stringify(data), token }),

  getProfile: (token: string) => api("/cabinets/me", { token }),

  createReplacement: (data: any, token: string) =>
    api("/cabinets/replacements", {
      method: "POST",
      body: JSON.stringify(data),
      token,
    }),

  listReplacements: (token: string) =>
    api("/cabinets/replacements", { token }),

  listOpenReplacements: (token: string) =>
    api("/cabinets/replacements/open", { token }),

  applyToReplacement: (id: string, message: string, token: string) =>
    api(`/cabinets/replacements/${id}/apply`, {
      method: "POST",
      body: JSON.stringify({ message }),
      token,
    }),
};

// Reviews
export const reviewsApi = {
  create: (
    doctorId: string,
    rating: number,
    comment: string,
    token: string,
  ) =>
    api(`/doctors/${doctorId}/reviews`, {
      method: "POST",
      body: JSON.stringify({ rating, comment }),
      token,
    }),

  list: (doctorId: string) => api(`/doctors/${doctorId}/reviews`),
};
