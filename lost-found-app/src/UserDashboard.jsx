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
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ margin: '0 0 6px 0', fontSize: '26px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>
                            Halo, Selamat Datang!
                        </h2>
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748B', fontWeight: '500' }}>
                            Kelola laporan barang hilang atau temuan Anda dengan cepat di sini.
                        </p>
                    </div>

                    <div className="card-stats-container">
                        <div className="dashboard-card">
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Laporan Kehilangan Aktif
                            </h4>
                            {/* Mengubah warna teks angka menjadi oranye emas agar kontras dan serasi */}
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: '800', color: '#F59E0B', letterSpacing: '-1px' }}>1</p>
                        </div>
                        <div className="dashboard-card">
                            <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                Barang Temuan Dilaporkan
                            </h4>
                            {/* Mengubah warna teks angka menjadi hijau sukses resmi sesuai palet */}
                            <p style={{ margin: 0, fontSize: '32px', fontWeight: '800', color: '#10B981', letterSpacing: '-1px' }}>1</p>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-primary">+ Lapor Barang Hilang</button>
                        <button className="btn-secondary">+ Lapor Barang Temuan</button>
                    </div>

                    {/* Tabel dengan Kelas CSS Terpisah */}
                    <div className="table-card">
                        <div className="table-header-wrapper">
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                                Riwayat Laporan Saya
                            </h3>

                            <div className="search-input-wrapper">
                                {/* SVG ikon diletakkan di atas input agar meluruskan posisinya */}
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
                                                    <td style={{ fontWeight: '600', color: '#111827' }}>{item.namaBarang}</td>
                                                    <td style={{ color: '#4B5563', fontWeight: '500' }}>{item.jenis}</td>
                                                    <td style={{ color: '#64748B' }}>{item.tanggal}</td>
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
                                            <td colSpan="4" style={{ textAlign: 'center', color: '#64748B', padding: '32px', fontWeight: '600' }}>
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
