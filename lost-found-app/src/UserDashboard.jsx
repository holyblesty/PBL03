import React, { useState } from 'react';
import UserSidebar from './components/UserSidebar';
import UserNavbar from './components/UserNavbar';
import './App.css';

export default function UserDashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    // State untuk Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const myReports = [
        { id: 1, namaBarang: 'Dompet Hitam Kulit', jenis: 'Kehilangan', tanggal: '26 Sep 2026', status: 'Dipublikasikan' },
        { id: 2, namaBarang: 'Tumbler Corkcicle', jenis: 'Penemuan', tanggal: '24 Sep 2026', status: 'Selesai / Dikembalikan' },
    ];

    // 1. Logika Filter Pencarian
    const filteredReports = myReports.filter((item) =>
        item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.jenis.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Logika Pemotongan Data untuk Pagination
    const totalPages = Math.ceil(filteredReports.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentReports = filteredReports.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="dashboard-container">
            <UserSidebar />

            <main className="dashboard-main">
                <UserNavbar />

                <div className="dashboard-content">

                    {/* Header */}
                    <div className="admin-header">
                        <h1>Halo, Selamat Datang!</h1>
                        <p>Kelola laporan barang hilang atau temuan Anda dengan cepat di sini.</p>
                    </div>

                    {/* Statistik Kartu */}
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
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setCurrentPage(1); // Reset ke halaman 1 saat mengetik pencarian
                                    }}
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
                                    {currentReports.length > 0 ? (
                                        currentReports.map((item) => {
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

                        {/* Komponen Pagination di Bawah Tabel */}
                        <div className="pagination-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid #E5E7EB' }}>
                            <span style={{ fontSize: '13px', color: '#6B7280' }}>
                                Menampilkan {filteredReports.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredReports.length)} dari {filteredReports.length} data
                            </span>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '13px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        backgroundColor: currentPage === 1 ? '#F3F4F6' : '#FFFFFF',
                                        color: currentPage === 1 ? '#9CA3AF' : '#374151',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Sebelumnya
                                </button>

                                <span style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '600', color: '#374151', display: 'flex', alignItems: 'center' }}>
                                    Hal. {currentPage} dari {totalPages}
                                </span>

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '13px',
                                        borderRadius: '6px',
                                        border: '1px solid #D1D5DB',
                                        backgroundColor: (currentPage === totalPages || totalPages === 0) ? '#F3F4F6' : '#FFFFFF',
                                        color: (currentPage === totalPages || totalPages === 0) ? '#9CA3AF' : '#374151',
                                        cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Berikutnya
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}