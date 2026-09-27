import React, { useState } from 'react';

export default function UserNavbar() {
    const [showNotifications, setShowNotifications] = useState(false);

    // Data notifikasi yang mencakup semua skenario (jadwal diterima, klaim di-ACC, laporan di-ACC)
    const notifications = [
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
    ];

    return (
        <header style={{ height: '70px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', boxSizing: 'border-box', position: 'relative' }}>
            {/* Judul Universal & Kolom Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: 0 }}>Dashboard Pengguna Kampus</h2>

                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Cari barang hilang/temuan..."
                        style={{ padding: '6px 12px 6px 32px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '13px', outline: 'none', width: '220px', backgroundColor: '#F9FAFB' }}
                    />
                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', fontSize: '13px' }}>🔍</span>
                </div>
            </div>

            {/* Bagian Kanan: Notifikasi & Profil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* Tombol Lonceng Notifikasi */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', position: 'relative', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        🔔
                        {/* Indikator Titik Merah */}
                        <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: '#EF4444', borderRadius: '50%' }}></span>
                    </button>

                    {/* Dropdown Box Notifikasi */}
                    {showNotifications && (
                        <div style={{ position: 'absolute', right: '0', top: '45px', width: '340px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 100, padding: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
                                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>Notifikasi</span>
                                <span style={{ fontSize: '11px', color: '#2563EB', cursor: 'pointer', fontWeight: '600' }}>Tandai sudah dibaca</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                                {notifications.map((notif) => (
                                    <div key={notif.id} style={{ padding: '10px', borderRadius: '6px', backgroundColor: notif.unread ? '#EFF6FF' : '#F9FAFB', border: '1px solid #E5E7EB' }}>
                                        <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#1F2937', fontWeight: notif.unread ? '600' : '400', lineHeight: '1.4' }}>{notif.text}</p>
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