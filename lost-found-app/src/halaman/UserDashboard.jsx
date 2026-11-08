/**
 * File: UserDashboard.jsx
 * Fungsi: Mengelola dashboard pengguna, katalog barang, penyimpanan laporan lokal, dan navigasi halaman.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React, { useState } from 'react';
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import ReportForm from "../components/ReportForm";
import ItemDetail from "../components/ItemDetail";
import RiwayatLaporan from "../components/RiwayatLaporan";
import "../App.css";

const DUMMY_REPORTS = [
    {
        id: 1,
        namaBarang: 'Dompet Hitam Kulit',
        jenis: 'Kehilangan',
        kategori: 'Dompet',
        lokasi: 'Gedung Utama (Mushola Lantai 1)',
        tanggal: '26 Sep 2026',
        status: 'Dipublikasikan',
        foto: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80',
        deskripsi: 'Dompet kulit warna hitam merek Fossil, berisi Kartu Identitas dan STTM.'
    },
    {
        id: 2,
        namaBarang: 'Tumbler Corkcicle',
        jenis: 'Penemuan',
        kategori: 'Botol Minum',
        lokasi: 'Kantin',
        tanggal: '24 Sep 2026',
        status: 'Dikembalikan',
        foto: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80',
        deskripsi: 'Tumbler warna biru navy tertinggal di atas meja makan kantin.'
    },
    {
        id: 3,
        namaBarang: 'Kunci Motor Honda',
        jenis: 'Kehilangan',
        kategori: 'Kunci',
        lokasi: 'Parkiran',
        tanggal: '27 Sep 2026',
        status: 'Dipublikasikan',
        foto: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=500&q=80',
        deskripsi: 'Kunci kontak motor Honda Beat dengan gantungan kunci kecil warna merah.'
    }
    ,
    {
        id: 4,
        namaBarang: 'Laptop ASUS Vivobook',
        jenis: 'Kehilangan',
        kategori: 'Elektronik',
        lokasi: 'Gedung TA',
        tanggal: '28 Sep 2026',
        status: 'Dipublikasikan',
        foto: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80',
        deskripsi: 'Laptop ASUS Vivobook warna silver yang tertinggal di ruang kelas.'
    },
    {
        id: 5,
        namaBarang: 'Jaket Hitam',
        jenis: 'Penemuan',
        kategori: 'Pakaian',
        lokasi: 'Gedung Utama',
        tanggal: '29 Sep 2026',
        status: 'Dipublikasikan',
        foto: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80',
        deskripsi: 'Jaket hitam ditemukan di area lorong Gedung Utama.'
    },
    {
        id: 6,
        namaBarang: 'Earphone Wireless',
        jenis: 'Penemuan',
        kategori: 'Elektronik',
        lokasi: 'Smoking Area',
        tanggal: '30 Sep 2026',
        status: 'Dipublikasikan',
        foto: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80',
        deskripsi: 'Earphone wireless putih ditemukan di sekitar Smoking Area.'
    }
];

const REPORTS_STORAGE_KEY = "lost_found_user_reports";

const loadUserReports = () => {
    if (typeof window === 'undefined') return [];

    try {
        const savedReports = window.localStorage.getItem(REPORTS_STORAGE_KEY);
        const parsedReports = savedReports ? JSON.parse(savedReports) : [];
        return Array.isArray(parsedReports) ? parsedReports : [];
    } catch {
        return [];
    }
};

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [userReports, setUserReports] = useState(loadUserReports);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterJenis, setFilterJenis] = useState('Semua');
    const [filterKategori, setFilterKategori] = useState('');
    const [filterLokasi, setFilterLokasi] = useState('');

    // Gabungkan data contoh katalog dengan laporan yang disimpan pengguna.
    // Laporan penemuan yang menunggu penerimaan Pamdal tidak ditampilkan di katalog.
    const allReports = [...userReports, ...DUMMY_REPORTS];
    const activeReports = allReports.filter(
        item => item.status === 'Dipublikasikan'
    );

    const kategoriOptions = [...new Set(
        allReports.map(item => item.kategori).filter(Boolean)
    )];

    const lokasiOptions = [...new Set(
        allReports.map(item => item.lokasi).filter(Boolean)
    )];

    const handleSubmitReport = (payload) => {
        // Hanya simpan data barang yang diperlukan untuk katalog dan riwayat.
        // Data identitas, kontak, alamat, saksi, dan tanda tangan tidak disimpan di localStorage.
        const report = {
            id: Date.now(),
            namaBarang: payload.namaBarang,
            jenis: payload.jenisLaporan === 'hilang' ? 'Kehilangan' : 'Penemuan',
            kategori: payload.kategori,
            lokasi: payload.lokasi,
            tanggal: payload.tanggalKejadian,
            tanggalKejadian: payload.tanggalKejadian,
            status: payload.status,
            foto: payload.foto || '',
            deskripsi: [
                payload.merekModel,
                payload.warna,
                payload.deskripsi || `Laporan dibuat pada ${payload.tanggalKejadian}.`,
            ].filter(Boolean).join(' • '),
            pesanPamdal: payload.status === 'Dipublikasikan'
                ? 'Laporan kehilangan telah dipublikasikan pada katalog.'
                : 'Menunggu barang diserahkan dan diterima oleh Pamdal di Pos Pamdal.',
            tanggalSelesai: null,
        };

        const updatedReports = [report, ...userReports];

        try {
            window.localStorage.setItem(REPORTS_STORAGE_KEY, JSON.stringify(updatedReports));
        } catch {
            throw new Error('Penyimpanan browser penuh atau tidak tersedia. Coba gunakan foto yang lebih kecil atau kosongkan penyimpanan browser.');
        }

        setUserReports(updatedReports);
    };

    const filteredReports = activeReports.filter(item => {
        const keyword = searchQuery.trim().toLowerCase();

        const matchesSearch =
            item.namaBarang.toLowerCase().includes(keyword) ||
            item.deskripsi.toLowerCase().includes(keyword) ||
            item.lokasi.toLowerCase().includes(keyword);

        const matchesJenis =
            filterJenis === 'Semua' || item.jenis === filterJenis;

        const matchesKategori =
            filterKategori === '' || item.kategori === filterKategori;

        const matchesLokasi =
            filterLokasi === '' ||
            item.lokasi.toLowerCase().includes(filterLokasi.toLowerCase());

        return (
            matchesSearch &&
            matchesJenis &&
            matchesKategori &&
            matchesLokasi
        );
    });

    const resetFilters = () => {
        setSearchQuery('');
        setFilterJenis('Semua');
        setFilterKategori('');
        setFilterLokasi('');
    };

    const jumlahSemua = activeReports.length;
    const jumlahKehilangan = activeReports.filter(
        item => item.jenis === 'Kehilangan'
    ).length;
    const jumlahPenemuan = activeReports.filter(
        item => item.jenis === 'Penemuan'
    ).length;

    const renderMainContent = () => {
        if (selectedItem) {
            return (
                <ItemDetail
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                />
            );
        }

        if (activeTab === 'laporan') {
            return <ReportForm onSubmitReport={handleSubmitReport} />;
        }

        if (activeTab === 'riwayat-laporan') {
            return <RiwayatLaporan reports={userReports} />;
        }

        return (
            <>
                <div
                    className="user-catalog-header"
                    style={{ marginBottom: '1.5rem' }}
                >
                    <h1>Daftar Barang Hilang & Temuan</h1>
                    <p>
                        Temukan barang yang hilang atau bantu mengembalikan
                        barang yang ditemukan di lingkungan kampus.
                    </p>
                </div>

                {/* PANEL PENCARIAN DAN FILTER */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    border: '0.0625rem solid #E5E7EB',
                    borderRadius: '0.75rem',
                    padding: '1.25rem',
                    marginBottom: '1.25rem',
                    boxShadow: '0 0.0625rem 0.1875rem rgba(0,0,0,0.04)'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.8125rem',
                            fontWeight: '600',
                            color: '#374151',
                            marginBottom: '0.4375rem'
                        }}>
                            Cari Barang
                        </label>

                        <div
                            className="search-input-wrapper"
                            style={{ width: '100%' }}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#6B7280"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line
                                    x1="21"
                                    y1="21"
                                    x2="16.65"
                                    y2="16.65"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Cari nama barang, deskripsi, atau lokasi..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(12.5rem, 1fr))',
                        gap: '0.75rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.4375rem'
                            }}>
                                Kategori
                            </label>

                            <select
                                value={filterKategori}
                                onChange={e => setFilterKategori(e.target.value)}
                                style={SELECT_STYLE}
                            >
                                <option value="">Semua Kategori</option>
                                {kategoriOptions.map(kategori => (
                                    <option key={kategori} value={kategori}>
                                        {kategori}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.8125rem',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '0.4375rem'
                            }}>
                                Area Lokasi
                            </label>

                            <select
                                value={filterLokasi}
                                onChange={e => setFilterLokasi(e.target.value)}
                                style={SELECT_STYLE}
                            >
                                <option value="">Semua Area Lokasi</option>
                                {lokasiOptions.map(lokasi => (
                                    <option key={lokasi} value={lokasi}>
                                        {lokasi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'end'
                        }}>
                            <button
                                onClick={resetFilters}
                                style={{
                                    ...SELECT_STYLE,
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* TAB JENIS LAPORAN */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderBottom: '0.0625rem solid #E5E7EB',
                    marginBottom: '1.25rem'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '1.5625rem',
                        overflowX: 'auto'
                    }}>
                        {[
                            { label: 'Semua', value: 'Semua', count: jumlahSemua },
                            { label: 'Kehilangan', value: 'Kehilangan', count: jumlahKehilangan },
                            { label: 'Penemuan', value: 'Penemuan', count: jumlahPenemuan }
                        ].map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setFilterJenis(tab.value)}
                                style={{
                                    padding: '0.75rem 0.25rem',
                                    border: 'none',
                                    borderBottom: filterJenis === tab.value
                                        ? '0.125rem solid #2563EB'
                                        : '0.125rem solid transparent',
                                    backgroundColor: 'transparent',
                                    color: filterJenis === tab.value
                                        ? '#2563EB'
                                        : '#6B7280',
                                    fontWeight: filterJenis === tab.value
                                        ? '700'
                                        : '500',
                                    cursor: 'pointer'
                                }}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                }}>
                    <p style={{
                        margin: 0,
                        fontSize: '0.8125rem',
                        color: '#6B7280'
                    }}>
                        Menampilkan{' '}
                        <strong style={{ color: '#374151' }}>
                            {filteredReports.length}
                        </strong>{' '}
                        barang aktif
                    </p>
                </div>

                {/* KATALOG BARANG AKTIF */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(17.5rem, 1fr))',
                    gap: '1.25rem',
                    marginBottom: '1.5rem'
                }}>
                    {filteredReports.length > 0 ? (
                        filteredReports.map(item => {
                            const isKehilangan = item.jenis === 'Kehilangan';

                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '0.75rem',
                                        border: '0.0625rem solid #E5E7EB',
                                        overflow: 'hidden',
                                        boxShadow: '0 0.0625rem 0.1875rem rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <div style={{
                                        position: 'relative',
                                        height: '11.25rem',
                                        backgroundColor: '#F3F4F6',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={item.foto || "https://via.placeholder.com/500?text=Foto+Tidak+Tersedia"}
                                            alt={item.namaBarang}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />

                                        <span style={{
                                            position: 'absolute',
                                            top: '0.75rem',
                                            right: '0.75rem',
                                            backgroundColor: isKehilangan
                                                ? '#FEF3C7'
                                                : '#D1FAE5',
                                            color: isKehilangan
                                                ? '#D97706'
                                                : '#059669',
                                            padding: '0.3125rem 0.625rem',
                                            borderRadius: '1.25rem',
                                            fontSize: '0.6875rem',
                                            fontWeight: '700'
                                        }}>
                                            {item.jenis}
                                        </span>
                                    </div>

                                    <div style={{
                                        padding: '1rem',
                                        flex: 1
                                    }}>
                                        <h3 style={{
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            color: '#1F2937',
                                            margin: '0 0 0.5rem 0'
                                        }}>
                                            {item.namaBarang}
                                        </h3>

                                        <div style={META_STYLE}>
                                            🏷️ {item.kategori}
                                        </div>
                                        <div style={META_STYLE}>
                                            📍 {item.lokasi}
                                        </div>
                                        <div style={META_STYLE}>
                                            📅 {item.tanggal}
                                        </div>

                                        <p style={{
                                            fontSize: '0.8125rem',
                                            color: '#6B7280',
                                            lineHeight: '1.5',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            margin: 0
                                        }}>
                                            {item.deskripsi}
                                        </p>
                                    </div>

                                    <div style={{ padding: '0 1rem 1rem' }}>
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            style={{
                                                width: '100%',
                                                padding: '0.625rem 0.875rem',
                                                backgroundColor: '#2563EB',
                                                color: '#FFFFFF',
                                                border: 'none',
                                                borderRadius: '0.4375rem',
                                                fontSize: '0.75rem',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Lihat Detail →
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '3.125rem 1.25rem',
                            backgroundColor: '#FFFFFF',
                            borderRadius: '0.75rem',
                            border: '0.0625rem solid #E5E7EB',
                            color: '#6B7280'
                        }}>
                            <div style={{
                                fontSize: '2.1875rem',
                                marginBottom: '0.625rem'
                            }}>
                                🔍
                            </div>
                            <h3 style={{
                                margin: '0 0 0.375rem',
                                color: '#374151',
                                fontSize: '1rem'
                            }}>
                                Barang tidak ditemukan
                            </h3>
                            <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                                Coba ubah kata kunci atau filter pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div
            className="dashboard-container"
            style={{
                display: 'flex',
                width: '100%',
                height: '100vh',
                overflow: 'hidden'
            }}
        >
            <UserSidebar
                activeTab={activeTab}
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed((prev) => !prev)}
                setActiveTab={tab => {
                    setActiveTab(tab);
                    setSelectedItem(null);
                }}
            />

            <main
                className="dashboard-main"
                style={{
                    flex: 1,
                    minWidth: 0,
                    height: '100vh',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <UserNavbar />

                <div
                    className="dashboard-content"
                    style={{ padding: '1.5rem', flex: 1 }}
                >
                    {renderMainContent()}
                </div>
            </main>
        </div>
    );
}

const SELECT_STYLE = {
    width: '100%',
    padding: '0.625rem 0.75rem',
    borderRadius: '0.4375rem',
    border: '0.0625rem solid #D1D5DB',
    backgroundColor: '#FFFFFF',
    color: '#374151',
    fontSize: '0.8125rem',
    outline: 'none'
};

const META_STYLE = {
    fontSize: '0.75rem',
    color: '#6B7280',
    marginBottom: '0.4375rem'
};