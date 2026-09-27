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
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '700', color: '#111827' }}>Halo, Selamat Datang!</h2>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Kelola laporan barang hilang atau temuan Anda dengan cepat di sini.</p>
                    </div>

                    <div className="card-stats-container">
                        <div className="dashboard-card">
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>Laporan Kehilangan Aktif</h4>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#2563EB' }}>1</p>
                        </div>
                        <div className="dashboard-card">
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>Barang Temuan Dilaporkan</h4>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#059669' }}>1</p>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-primary">+ Lapor Barang Hilang</button>
                        <button className="btn-secondary">+ Lapor Barang Temuan</button>
                    </div>

                    {/* Tabel dengan Kelas CSS Terpisah */}
                    <div className="table-card">
                        <div className="table-header-wrapper">
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Riwayat Laporan Saya</h3>

                            <div className="search-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Cari nama barang..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>Nama Barang</th>
                                        <th>Jenis</th>
                                        <th>Tanggal</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((item) => {
                                            const isCompleted = item.status.includes('Selesai');
                                            return (
                                                <tr key={item.id}>
                                                    <td style={{ fontWeight: '600' }}>{item.namaBarang}</td>
                                                    <td style={{ color: '#4B5563' }}>{item.jenis}</td>
                                                    <td style={{ color: '#6B7280' }}>{item.tanggal}</td>
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
                                            <td colSpan="4" style={{ textAlign: 'center', color: '#6B7280', padding: '32px' }}>
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