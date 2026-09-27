import React, { useState } from 'react';
import UserSidebar from './components/UserSidebar';
import UserNavbar from './components/UserNavbar';
import './App.css';

export default function UserDashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    const myReports = [
        { id: 1, namaBarang: 'Dompet Hitam Kulit', jenis: 'Kehilangan', tanggal: '26 Sep 2026', status: 'Dipublikasikan' },
        { id: 2, namaBarang: 'Tumbler Corkcicle', jenis: 'Penemuan', tanggal: '24 Sep 2026', status: 'Selesai / Dikembalikan' },
    ];

    const filteredReports = myReports.filter((item) =>
        item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jenis.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="dashboard-container">
            <UserSidebar />

            <main className="dashboard-main">
                <UserNavbar />

                <div className="dashboard-content">

                    {/* Header: Bersih tanpa inline style kaku */}
                    <div className="admin-header">
                        <h1>Halo, Selamat Datang!</h1>
                        <p>Kelola laporan barang hilang atau temuan Anda dengan cepat di sini.</p>
                    </div>

                    {/* Statistik Kartu: Memakai utility class warna teks dari App.css */}
                    <div className="card-stats-container">
                        <div className="dashboard-card">
                            <h3>Laporan Kehilangan Aktif</h3>
                            <p className="stat-yellow">1</p>
                        </div>
                        <div className="dashboard-card">
                            <h3>Barang Temuan Dilaporkan</h3>
                            <p className="stat-green">1</p>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="action-buttons">
                        <button className="btn-primary">+ Lapor Barang Hilang</button>
                        <button className="btn-secondary">+ Lapor Barang Temuan</button>
                    </div>

                    {/* Tabel Utama */}
                    <div className="table-card">
                        <div className="table-header-wrapper">
                            <h3>Riwayat Laporan Saya</h3>

                            <div className="search-input-wrapper">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Cari nama barang..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>Nama Barang</th>
                                        <th>Jenis Laporan</th>
                                        <th>Tanggal Masuk</th>
                                        <th>Status Laporan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((item) => {
                                            const isCompleted = item.status.includes('Selesai');
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.namaBarang}</td>
                                                    <td>{item.jenis}</td>
                                                    <td>{item.tanggal}</td>
                                                    <td>
                                                        <span className={`badge ${isCompleted ? 'completed' : 'published'}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '32px' }}>
                                                Tidak ada laporan yang cocok dengan pencarian "{searchQuery}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

