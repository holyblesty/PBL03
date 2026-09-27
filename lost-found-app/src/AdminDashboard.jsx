import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import StatsGrid from './components/StatsGrid';
import ReportTable from './components/ReportTable';
import './App.css';

function AdminDashboard() {
    return (
        <div className="admin-container">
            {/* Sidebar di sebelah kiri */}
            <Sidebar />

            {/* Area Kanan: Dibagi jadi Navbar di atas & Main Content di bawah */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>

                {/* Panggil Navbar */}
                <Navbar />

                {/* Main Content Area di sebelah kanan */}
                <main className="admin-main">
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