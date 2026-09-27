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
        <header style={{ height: '70px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', boxSizing: 'border-box', position: 'relative' }}>

            {/* 1. Kolom Search Filter di Navbar */}
            <div style={{ position: 'relative', width: '280px' }}>
                <input
                    type="text"
                    placeholder="Cari riwayat laporan..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
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

            {/* Bagian Kanan: Notifikasi & Profil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* Tombol Lonceng Notifikasi */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={handleOpenNotifications}
                        style={{ background: 'none', border: '1px solid #E5E7EB', cursor: 'pointer', fontSize: '16px', position: 'relative', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', transition: 'background 0.2s' }}
                        title="Notifikasi"
                    >
                        🔔
                        {hasNewNotif && (
                            <span style={{ position: 'absolute', top: '2px', right: '2px', width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%' }}></span>
                        )}
                    </button>

                    {/* Dropdown Box Notifikasi */}
                    {showNotifications && (
                        <div style={{ position: 'absolute', right: '0', top: '50px', width: '340px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 100, padding: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>Notifikasi</span>
                                <span style={{ fontSize: '11px', color: '#6B7280' }}>Semua telah dibaca</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                                {notifications.map((notif) => (
                                    <div key={notif.id} style={{ padding: '10px', borderRadius: '6px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#1F2937', fontWeight: '400', lineHeight: '1.4' }}>{notif.text}</p>
                                        <span style={{ fontSize: '10px', color: '#6B7280' }}>{notif.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profil Pengguna */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>
                        U
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Civitas Kampus</span>
                </div>
            </div>
        </header>
    );
}