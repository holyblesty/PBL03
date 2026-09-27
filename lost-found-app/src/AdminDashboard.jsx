import React from 'react';
import Sidebar from './components/Sidebar';
import './App.css';

function AdminDashboard() {
    return (
        <div className="admin-container">
            {/* Sidebar di sebelah kiri */}
            <Sidebar />

            {/* Main Content Area di sebelah kanan */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Dashboard Admin</h1>
                    <p>Selamat datang kembali, Admin!</p>
                </header>

                {/* Kotak Konten Statistik */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Barang Hilang</h3>
                        <p className="stat-blue">12</p>
                    </div>
                    <div className="stat-card">
                        <h3>Barang Ditemukan</h3>
                        <p className="stat-green">8</p>
                    </div>
                    <div className="stat-card">
                        <h3>Total Pengguna</h3>
                        <p className="stat-yellow">45</p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;