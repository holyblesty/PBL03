import React, { useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import ProfilPamdal from '../components/pengaturan/ProfilPamdal';
import UbahKataSandi from '../components/pengaturan/UbahKataSandi';
import { ambilAkunLogin } from '../data/PamdalAkun';
import '../App.css';
import './AdminBarangHilang.css';
import './Pengaturan.css';

export default function Pengaturan() {
  const [akun, setAkun] = useState(() => ambilAkunLogin());

  // Baca ulang akun setelah ada perubahan tersimpan
  const segarkan = () => setAkun(ambilAkunLogin());

  // Navbar membaca foto hanya saat dibuat, jadi dibuat ulang kalau nama/foto berubah
  const kunciNavbar = `${akun?.nama || ''}|${akun?.fotoProfil ? akun.fotoProfil.length : 0}`;

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar key={kunciNavbar} />

        <main className="bh-wrap">
          <h1 className="bh-title">Pengaturan</h1>
          <p className="bh-sub">Kelola profil akun Pamdal dan keamanan akun.</p>

          {akun ? (
            <div className="pg-grid">
              <ProfilPamdal akun={akun} onTersimpan={segarkan} />
              <UbahKataSandi akun={akun} onTersimpan={segarkan} />
            </div>
          ) : (
            <p className="pg-msg err" role="alert">Data akun tidak ditemukan. Silakan login kembali.</p>
          )}
        </main>
      </div>
    </div>
  );
}