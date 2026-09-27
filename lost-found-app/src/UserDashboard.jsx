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
            {/* Sidebar Samping */}
            <UserSidebar />

            {/* Konten Utama */}
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

                    {/* Kartu Tabel dengan Desain Modern */}
                    <div className="table-card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #E5E7EB', borderRadius: '12px', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>

                        {/* Header Atas Tabel & Search Bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #F3F4F6', flexWrap: 'wrap', gap: '12px' }}>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Riwayat Laporan Saya</h3>

                            <div style={{ position: 'relative', width: '260px' }}>
                                <input
                                    type="text"
                                    placeholder="Cari nama barang..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px 8px 36px',
                                        fontSize: '13px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB',
                                        outline: 'none',
                                        boxSizing: 'border-box',
                                        backgroundColor: '#F9FAFB',
                                        transition: 'all 0.15s ease'
                                    }}
                                />
                                <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                        </div>

                        {/* Wrapper Tabel */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                                        <th style={{ padding: '12px 24px', fontSize: '12px', color: '#4B5563', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nama Barang</th>
                                        <th style={{ padding: '12px 20px', fontSize: '12px', color: '#4B5563', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jenis</th>
                                        <th style={{ padding: '12px 20px', fontSize: '12px', color: '#4B5563', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tanggal</th>
                                        <th style={{ padding: '12px 24px', fontSize: '12px', color: '#4B5563', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReports.length > 0 ? (
                                        filteredReports.map((item, index) => (
                                            <tr
                                                key={item.id}
                                                style={{
                                                    borderBottom: index !== filteredReports.length - 1 ? '1px solid #F3F4F6' : 'none',
                                                    transition: 'background-color 0.15s ease'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                            >
                                                <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                                                    {item.namaBarang}
                                                </td>
                                                <td style={{ padding: '16px 20px', fontSize: '14px', color: '#4B5563' }}>
                                                    {item.jenis}
                                                </td>
                                                <td style={{ padding: '16px 20px', fontSize: '14px', color: '#6B7280' }}>
                                                    {item.tanggal}
                                                </td>
                                                <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        alignItem: 'center',
                                                        padding: '5px 12px',
                                                        borderRadius: '9999px',
                                                        fontSize: '12px',
                                                        fontWeight: '600',
                                                        backgroundColor: item.status.includes('Selesai') ? '#DEF7EC' : '#FEF3C7',
                                                        color: item.status.includes('Selesai') ? '#03543F' : '#92400E'
                                                    }}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>
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