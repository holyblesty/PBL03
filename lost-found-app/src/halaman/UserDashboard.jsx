import React, { useState } from 'react';
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import ReportForm from "../components/ReportForm";
import ItemDetail from "../components/ItemDetail";
import RiwayatLaporan from "../components/RiwayatLaporan";
import RiwayatSelesai from "../components/RiwayatSelesai"; // <-- Diimpor di sini
import "../App.css";

export default function UserDashboard() {
    // ==========================================
    // STATE
    // ==========================================
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedItem, setSelectedItem] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterJenis, setFilterJenis] = useState('Semua');
    const [filterKategori, setFilterKategori] = useState('');
    const [filterLokasi, setFilterLokasi] = useState('');

    // ==========================================
    // DATA DUMMY
    // ==========================================
    const allReports = [
        {
            id: 1,
            namaBarang: 'Dompet Hitam Kulit',
            jenis: 'Kehilangan',
            kategori: 'Dompet',
            lokasi: 'Gedung Utama (Mushola Lantai 1)',
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
            kategori: 'Botol Minum',
            lokasi: 'Kantin',
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
            kategori: 'Kunci',
            lokasi: 'Parkiran',
            tanggal: '27 Sep 2026',
            pelapor: 'Ahmad Fauzi',
            status: 'Dipublikasikan',
            foto: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=500&q=80',
            deskripsi: 'Kunci kontak motor Honda Beat dengan gantungan kunci kecil warna merah.'
        },
    ];

    const kategoriOptions = ['Dompet', 'Botol Minum', 'Kunci', 'Elektronik', 'Pakaian', 'Aksesoris'];

    // Opsi filter lokasi area utama kampus
    const lokasiOptions = [
        'Kantin',
        'Mushola',
        'Parkiran',
        'Gedung Utama',
        'Gedung TA',
        'Smoking Area',
        'Gedung Techno'
    ];

    // ==========================================
    // FILTER DATA
    // ==========================================
    const filteredReports = allReports.filter((item) => {
        const keyword = searchQuery.toLowerCase();
        const matchesSearch = item.namaBarang.toLowerCase().includes(keyword) ||
            item.deskripsi.toLowerCase().includes(keyword) ||
            item.lokasi.toLowerCase().includes(keyword);
        const matchesJenis = filterJenis === 'Semua' || item.jenis === filterJenis;
        const matchesKategori = filterKategori === '' || item.kategori === filterKategori;
        const matchesLokasi = filterLokasi === '' || item.lokasi.toLowerCase().includes(filterLokasi.toLowerCase());

        return matchesSearch && matchesJenis && matchesKategori && matchesLokasi;
    });

    const resetFilters = () => {
        setSearchQuery('');
        setFilterJenis('Semua');
        setFilterKategori('');
        setFilterLokasi('');
    };

    const jumlahSemua = allReports.length;
    const jumlahKehilangan = allReports.filter(item => item.jenis === 'Kehilangan').length;
    const jumlahPenemuan = allReports.filter(item => item.jenis === 'Penemuan').length;

    // ==========================================
    // RENDER KONTEN UTAMA
    // ==========================================
    const renderMainContent = () => {
        if (selectedItem) {
            return (
                <ItemDetail
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                    onClaim={(item) => alert(`Pengajuan klaim untuk barang "${item.namaBarang}" berhasil dikirim ke Pamdal!`)}
                />
            );
        }

        if (activeTab === 'laporan') {
            return <ReportForm />;
        }

        // Sambungkan ke komponen Riwayat Laporan Saya
        if (activeTab === 'riwayat-laporan') {
            return <RiwayatLaporan />;
        }

        // Sambungkan ke komponen Riwayat Selesai
        if (activeTab === 'riwayat') {
            return <RiwayatSelesai />;
        }

        return (
            <>
                <div className="user-catalog-header" style={{ marginBottom: '24px' }}>
                    <h1>Daftar Barang Hilang & Temuan</h1>
                    <p>Temukan barang yang hilang atau bantu mengembalikan barang yang ditemukan di lingkungan kampus.</p>
                </div>

                {/* FILTER PANEL */}
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '7px' }}>Cari Barang</label>
                        <div className="search-input-wrapper" style={{ width: '100%' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Cari nama barang, deskripsi, atau lokasi spesifik (misal: ruang pesawat, mushola)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '7px' }}>Kategori</label>
                            <select
                                value={filterKategori}
                                onChange={(e) => setFilterKategori(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: '7px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#374151', fontSize: '13px', outline: 'none' }}
                            >
                                <option value="">Semua Kategori</option>
                                {kategoriOptions.map((kategori) => (
                                    <option key={kategori} value={kategori}>{kategori}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '7px' }}>Area Lokasi</label>
                            <select
                                value={filterLokasi}
                                onChange={(e) => setFilterLokasi(e.target.value)}
                                style={{ width: '100%', padding: '10px 12px', borderRadius: '7px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#374151', fontSize: '13px', outline: 'none' }}
                            >
                                <option value="">Semua Area Lokasi</option>
                                {lokasiOptions.map((lokasi) => (
                                    <option key={lokasi} value={lokasi}>{lokasi}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'end' }}>
                            <button
                                onClick={resetFilters}
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '7px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', color: '#374151', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* TAB JENIS LAPORAN */}
                <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', gap: '25px', overflowX: 'auto' }}>
                        <button
                            onClick={() => setFilterJenis('Semua')}
                            style={{ padding: '12px 4px', border: 'none', borderBottom: filterJenis === 'Semua' ? '2px solid #2563EB' : '2px solid transparent', backgroundColor: 'transparent', color: filterJenis === 'Semua' ? '#2563EB' : '#6B7280', fontWeight: filterJenis === 'Semua' ? '700' : '500', cursor: 'pointer' }}
                        >
                            Semua ({jumlahSemua})
                        </button>
                        <button
                            onClick={() => setFilterJenis('Kehilangan')}
                            style={{ padding: '12px 4px', border: 'none', borderBottom: filterJenis === 'Kehilangan' ? '2px solid #2563EB' : '2px solid transparent', backgroundColor: 'transparent', color: filterJenis === 'Kehilangan' ? '#2563EB' : '#6B7280', fontWeight: filterJenis === 'Kehilangan' ? '700' : '500', cursor: 'pointer' }}
                        >
                            Kehilangan ({jumlahKehilangan})
                        </button>
                        <button
                            onClick={() => setFilterJenis('Penemuan')}
                            style={{ padding: '12px 4px', border: 'none', borderBottom: filterJenis === 'Penemuan' ? '2px solid #2563EB' : '2px solid transparent', backgroundColor: 'transparent', color: filterJenis === 'Penemuan' ? '#2563EB' : '#6B7280', fontWeight: filterJenis === 'Penemuan' ? '700' : '500', cursor: 'pointer' }}
                        >
                            Penemuan ({jumlahPenemuan})
                        </button>
                    </div>
                </div>

                {/* HASIL FILTER INFO */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                        Menampilkan <strong style={{ color: '#374151' }}>{filteredReports.length}</strong> barang aktif
                    </p>
                </div>

                {/* GRID BARANG */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    {filteredReports.length > 0 ? (
                        filteredReports.map((item) => {
                            const isKehilangan = item.jenis === 'Kehilangan';
                            return (
                                <div key={item.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ position: 'relative', height: '180px', backgroundColor: '#F3F4F6', overflow: 'hidden' }}>
                                        <img src={item.foto} alt={item.namaBarang} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: isKehilangan ? '#FEF3C7' : '#D1FAE5', color: isKehilangan ? '#D97706' : '#059669', padding: '5px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                                            {item.jenis}
                                        </span>
                                    </div>

                                    <div style={{ padding: '16px', flex: 1 }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937', margin: '0 0 8px 0' }}>{item.namaBarang}</h3>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '7px' }}>🏷️ {item.kategori}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '7px' }}>📍 {item.lokasi}</div>
                                        <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '10px' }}>📅 {item.tanggal}</div>
                                        <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', margin: 0 }}>
                                            {item.deskripsi}
                                        </p>
                                    </div>

                                    <div style={{ padding: '0 16px 16px 16px' }}>
                                        <button
                                            onClick={() => setSelectedItem(item)}
                                            style={{ width: '100%', padding: '10px 14px', backgroundColor: '#2563EB', color: '#FFFFFF', border: 'none', borderRadius: '7px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                                        >
                                            Lihat Detail →
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 20px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', color: '#6B7280' }}>
                            <div style={{ fontSize: '35px', marginBottom: '10px' }}>🔍</div>
                            <h3 style={{ margin: '0 0 6px 0', color: '#374151', fontSize: '16px' }}>Barang tidak ditemukan</h3>
                            <p style={{ margin: 0, fontSize: '13px' }}>Coba ubah kata kunci atau filter pencarian.</p>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div className="dashboard-container" style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
            <UserSidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedItem(null); }} />

            <main className="dashboard-main" style={{ flex: 1, height: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                <UserNavbar />
                <div className="dashboard-content" style={{ padding: '24px', flex: 1 }}>
                    {renderMainContent()}
                </div>
            </main>
        </div>
    );
}