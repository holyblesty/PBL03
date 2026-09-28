import React, { useState } from 'react';
import UserSidebar from './components/UserSidebar';
import UserNavbar from './components/UserNavbar';
import './App.css';

export default function UserDashboard({ onSelectDetailItem }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterJenis, setFilterJenis] = useState('Semua'); // 'Semua', 'Kehilangan', 'Penemuan'

    // Data dummy seluruh barang hilang & temuan (Feed Publik)
    const allReports = [
        {
            id: 1,
            namaBarang: 'Dompet Hitam Kulit',
            jenis: 'Kehilangan',
            lokasi: 'Gedung Serbaguna Kampus A',
            tanggal: '26 Sep 2026',
            pelapor: 'Budi Santoso',
            status: 'Dipublikasikan',
            foto: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80',
            deskripsi: 'Dompet kulit warna hitam merek Fossil, berisi Kartu Identitas dan STTM.'
        },
        {
            id: 2,
            namaBarang: 'Tumbler Corkcicle',
            jenis: 'Penemuan',
            lokasi: 'Kantin Utama',
            tanggal: '24 Sep 2026',
            pelapor: 'Siti Aminah',
            status: 'Selesai / Dikembalikan',
            foto: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
            deskripsi: 'Tumbler warna biru navy tertinggal di atas meja makan kantin.'
        },
        {
            id: 3,
            namaBarang: 'Kunci Motor Honda',
            jenis: 'Kehilangan',
            lokasi: 'Parkiran Fakultas Teknik',
            tanggal: '27 Sep 2026',
            pelapor: 'Ahmad Fauzi',
            status: 'Dipublikasikan',
            foto: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=500&q=80',
            deskripsi: 'Kunci kontak motor Honda Beat dengan gantungan kunci kecil warna merah.'
        },
    ];

    // 1. Logika Filter Pencarian & Jenis Laporan
    const filteredReports = allReports.filter((item) => {
        const matchesSearch = item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.lokasi.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterJenis === 'Semua' || item.jenis === filterJenis;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="dashboard-container">
            <UserSidebar />

            <main className="dashboard-main">
                <UserNavbar />

                <div className="dashboard-content">

                    {/* Header */}
                    <div className="admin-header" style={{ marginBottom: '20px' }}>
                        <h1>Cari Barang Hilang & Temuan</h1>
                        <p>Temukan barang Anda yang hilang atau bantu kembalikan barang temuan kepada pemiliknya.</p>
                    </div>

                    {/* Filter & Search Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                        {/* Tab Filter Jenis */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {['Semua', 'Kehilangan', 'Penemuan'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilterJenis(type)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '6px',
                                        border: filterJenis === type ? '1px solid #2563eb' : '1px solid #D1D5DB',
                                        backgroundColor: filterJenis === type ? '#2563eb' : '#FFFFFF',
                                        color: filterJenis === type ? '#FFFFFF' : '#374151',
                                        fontWeight: '600',
                                        fontSize: '13px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        {/* Input Pencarian */}
                        <div className="search-input-wrapper" style={{ minWidth: '260px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari nama barang atau lokasi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Grid List Barang */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                        {filteredReports.length > 0 ? (
                            filteredReports.map((item) => {
                                const isKehilangan = item.jenis === 'Kehilangan';
                                return (
                                    <div
                                        key={item.id}
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '10px',
                                            border: '1px solid #E5E7EB',
                                            overflow: 'hidden',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <div>
                                            <div style={{ position: 'relative', height: '160px', backgroundColor: '#F3F4F6' }}>
                                                <img
                                                    src={item.foto}
                                                    alt={item.namaBarang}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                                <span style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    backgroundColor: isKehilangan ? '#FEF3C7' : '#D1FAE5',
                                                    color: isKehilangan ? '#D97706' : '#059669',
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '11px',
                                                    fontWeight: '700'
                                                }}>
                                                    {item.jenis}
                                                </span>
                                            </div>

                                            <div style={{ padding: '16px' }}>
                                                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1F2937', marginBottom: '6px' }}>{item.namaBarang}</h3>
                                                <p style={{ fontSize: '13px', color: '#4B5563', marginBottom: '8px' }}>📍 {item.lokasi}</p>
                                                <p style={{ fontSize: '13px', color: '#6B7280', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                    {item.deskripsi}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ padding: '0 16px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{item.tanggal}</span>
                                            <button
                                                onClick={() => onSelectDetailItem && onSelectDetailItem(item)}
                                                style={{
                                                    padding: '6px 14px',
                                                    backgroundColor: '#2563eb',
                                                    color: '#FFFFFF',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Lihat Detail
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '10px', border: '1px solid #E5E7EB', color: '#6B7280' }}>
                                Tidak ada barang yang cocok dengan pencarian "{searchQuery}"
                            </div>
                        )}
                    </div>

                </div>
            </main>
        </div>
    );
}