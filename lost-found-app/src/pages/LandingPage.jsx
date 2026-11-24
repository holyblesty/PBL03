import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <section className="landing-container">
      <div className="hero-card">
        <div className="hero-badge">
          <span className="shield-icon">🛡️</span> Sistem Keamanan & Ketertiban Kampus
        </div>
        <h1 className="hero-title">Sistem Informasi Lost & Found</h1>
        <p className="hero-subtitle">
          Website resmi pengelolaan barang hilang dan temuan di lingkungan kampus.
          Gunakan fasilitas ini untuk melaporkan atau mengklaim barang Anda secara aman dan terverifikasi.
        </p>
        <div className="hero-actions">
          <button className="btn-primary btn-large" onClick={() => navigate('/login')}>
            Masuk ke Akun
          </button>
          <button className="btn-outline btn-large" onClick={() => navigate('/register')}>
            Daftar Akun Civitas Kampus
          </button>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <h3>📢 Laporkan Kehilangan</h3>
          <p>Buat laporan barang hilang secara cepat dengan rincian lokasi dan bukti kepemilikan.</p>
        </div>
        <div className="feature-card">
          <h3>📦 Penanganan oleh Pamdal</h3>
          <p>Setiap barang temuan dikelola dan diverifikasi ketat oleh Satuan Pengamanan Kampus (Security).</p>
        </div>
        <div className="feature-card">
          <h3>📅 Penjadwalan Klaim</h3>
          <p>Pengambilan barang di pos keamanan diatur melalui sistem penjadwalan terpadu.</p>
        </div>
      </div>
    </section>
  );
}