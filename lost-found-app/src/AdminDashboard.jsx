import React from 'react';
import Sidebar from './components/AdminSidebar';
import Navbar from './components/AdminNavbar';
import StatsGrid from './components/StatsGrid';
import ReportTable from './components/ReportTable';
import './App.css';

function AdminDashboard() {
    return (
        <div className="admin-container">
            {/* Sidebar di sebelah kiri (terkunci flex-shrink) */}
            <Sidebar />

            {/* Area Kanan: Menggunakan admin-main agar sistem scroll-y terkunci otomatis */}
            <div className="admin-main" style={{ padding: 0 }}>

                {/* Panggil Navbar */}
                <Navbar />

                {/* Kontainer Konten Utama */}
                <main className="dashboard-content">
                    <header className="admin-header">
                        <h1>Dashboard Admin</h1>
                        <p>Selamat datang kembali, Admin!</p>
                    </header>

                    {/* Komponen Kotak Statistik */}
                    <StatsGrid />

                    {/* Komponen Tabel Laporan dengan .map() */}
                    <ReportTable />
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
