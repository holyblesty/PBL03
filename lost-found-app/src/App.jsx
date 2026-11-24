import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminBarangHilang from './pages/AdminBarangHilang';
import AdminBarangTemuan from './pages/AdminBarangTemuan';
import KonfirmasiPenerimaan from './pages/KonfirmasiPenerimaan';
import { getLoginUser } from './data/auth';
import PengambilanBarang from './pages/PengambilanBarang';
import AdminRiwayatLaporan from './pages/AdminRiwayatLaporan';
import Pengaturan from './pages/Pengaturan';

import './App.css';

// Hanya Pamdal yang boleh membuka halaman admin
function PamdalRoute({ children }) {
  const user = getLoginUser();
  return user?.role === 'pamdal' ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Halaman utama */}
        <Route
          path="/"
          element={
            <div className="app-canvas">
              <Navbar />
              <main className="main-content">
                <LandingPage />
              </main>
            </div>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            <div className="app-canvas">
              <Navbar />
              <main className="main-content">
                <Login />
              </main>
            </div>
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            <div className="app-canvas">
              <Navbar />
              <main className="main-content">
                <Register />
              </main>
            </div>
          }
        />

        {/* Dashboard Admin */}
        <Route
          path="/dashboard"
          element={<PamdalRoute><AdminDashboard /></PamdalRoute>}
        />

        {/* Daftar Barang Hilang (Pamdal) */}
        <Route
          path="/barang-hilang"
          element={<PamdalRoute><AdminBarangHilang /></PamdalRoute>}
        />

        {/* Daftar Barang Temuan (Pamdal) */}
        <Route
          path="/barang-temuan"
          element={<PamdalRoute><AdminBarangTemuan /></PamdalRoute>}
        />

        {/* Konfirmasi Penerimaan Barang (Pamdal) */}
        <Route
          path="/konfirmasi-penerimaan"
          element={<PamdalRoute><KonfirmasiPenerimaan /></PamdalRoute>}
        />

                {/* Pengambilan Barang (Pamdal) */}
        <Route
          path="/pengambilan-barang"
          element={<PamdalRoute><PengambilanBarang /></PamdalRoute>}
        />

        {/* Riwayat Laporan (Pamdal) */}
        <Route
          path="/riwayat-laporan"
          element={<PamdalRoute><AdminRiwayatLaporan /></PamdalRoute>}
        />
                {/* Pengaturan (Pamdal) */}
        <Route
          path="/pengaturan"
          element={<PamdalRoute><Pengaturan /></PamdalRoute>}
        />

      </Routes>
    </Router>
  );
}