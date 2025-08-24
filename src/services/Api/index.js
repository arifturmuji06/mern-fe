// services/Api/index.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:4000/v1",
  baseURL: "https://remunerasi-api.onrender.com/v1",
});

// Middleware: otomatis tambahkan token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("nama");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ======================
//       ANGGARAN
// ======================

export const fetchCardSummary = (tahun) =>
  api.get(`/anggaran/dashboard/card-summary?tahun=${tahun}`);

export const fetchCardSummaryById = (id, tahun) =>
  api.get(`/anggaran/summary/${id}?tahun=${tahun}`);

export const fetchMyCardSummary = (tahun) =>
  api.get(`/anggaran/me/card-summary?tahun=${tahun}`);

// ======================
//      REMUNERASI
// ======================

export const fetchMyRemun = (tahun) =>
  api.get(`/remunerasi/me?periode=${tahun}`);

export const fetchAllRemun = (tahun) => api.get(`/remunerasi?periode=${tahun}`);

export const fetchRemunById = (id) => api.get(`/remunerasi/${id}`);

export const fetchAllRemunByUserId = (id, tahun) =>
  api.get(`/remunerasi?userId=${id}&periode=${tahun}`);

export const fetchAllRemunHistory = (tahun) =>
  api.get(`/remunerasi?periode=${tahun}`);

export const fetchMyRemunRiwayat = (tahun) =>
  api.get(`/remunerasi/me?periode=${tahun}`);

// ======================
//      USER
// ======================

export const fetchMe = () => api.get(`/users/me`);

export const fetchKaryawanById = (id) => api.get(`/users/${id}`);

export const fetchDaftarKaryawan = () => api.get(`/users`);

export const fetchDaftarKaryawanActive = () => api.get(`/users/active`);

export const fetchDaftarKaryawanInactive = () => api.get(`/users/inactive`);
