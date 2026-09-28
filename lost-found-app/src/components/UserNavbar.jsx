import React, { useState } from 'react';

export default function UserNavbar({ searchTerm, onSearchChange }) {
    const [showNotifications, setShowNotifications] = useState(false);
    const [hasNewNotif, setHasNewNotif] = useState(true);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            text: 'Jadwal request pengambilan barang "Tumbler Corkcicle" telah diterima dan dikonfirmasi oleh Pamdal.',
            time: '5 menit lalu',
            unread: true
        },
        {
            id: 2,
            text: 'Pengajuan klaim kepemilikan barang "Dompet Hitam Kulit" telah di-ACC oleh admin/Pamdal.',
            time: '2 jam lalu',
            unread: true
        },
        {
            id: 3,
            text: 'Laporan barang hilang baru Anda telah di-ACC dan dipublikasikan oleh Pamdal.',
            time: '1 hari lalu',
            unread: false
        },
    ]);

    const handleOpenNotifications = () => {
        setShowNotifications(!showNotifications);
        setHasNewNotif(false);
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    return (
        <header style={{
            height: '70px',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            boxSizing: 'border-box',
            position: 'relative',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            width: '100%'
        }}>

            {/* 1. Kolom Search Filter di Navbar - Singkron Otomatis ke App.css */}
            <div className="search-input-wrapper">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                    type="text"
                    placeholder="Cari riwayat laporan..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Bagian Kanan: Notifikasi & Profil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* Tombol Lonceng Notifikasi Vektor SVG */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={handleOpenNotifications}
                        style={{
                            background: 'none',
                            border: '1px solid #E5E7EB',
                            cursor: 'pointer',
                            position: 'relative',
                            padding: '8px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F9FAFB',
                            transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        title="Notifikasi"
                    >
                        {/* Mengganti emoji lonceng pudar dengan SVG Outline Profesional */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>

                        {/* Badge Lingkaran Notifikasi Merah Terang */}
                        {hasNewNotif && (
                            <span style={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                width: '9px',
                                height: '9px',
                                backgroundColor: '#DC2626',
                                borderRadius: '50%',
                                border: '2px solid #FFFFFF'
                            }}></span>
                        )}
                    </button>

                    {/* Dropdown Box Notifikasi */}
                    {showNotifications && (
                        <div style={{ position: 'absolute', right: '0', top: '50px', width: '340px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05), 0 4px 6px -2px rgba(0,0,0,0.05)', zIndex: 100, padding: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #F1F5F9', paddingBottom: '10px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>Notifikasi</span>
                                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '500' }}>Semua telah dibaca</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                                {notifications.map((notif) => (
                                    <div key={notif.id} style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', transition: 'all 0.15s ease' }}>
                                        <p style={{ margin: '0 0 6px 0', fontSize: '12.5px', color: '#1F2937', fontWeight: '500', lineHeight: '1.4' }}>{notif.text}</p>
                                        <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '500' }}>{notif.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Pembatas Vertikal */}
                <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB' }}></div>

                {/* Profil Pengguna - Diubah Menjadi Tema Hitam Emas Sinkron */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '750', color: '#111827' }}>
                            Civitas Kampus
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#64748B' }}>
                            Portal Pengguna
                        </p>
                    </div>
                    {/* Avatar Inisial Bulat menggunakan warna dasar Hitam Arang & Kuning Emas */}
                    <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: '#111827',
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '14px',
                        border: '2px solid #E5E7EB'
                    }}>
                        CK
                    </div>
                </div>
            </div>
        </header>
    );
}
