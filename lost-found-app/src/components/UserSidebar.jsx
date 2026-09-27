import React from 'react';

export default function UserSidebar() {
    return (
        <aside style={{ width: '260px', minWidth: '260px', backgroundColor: '#FFFFFF', borderRight: '1px solid #E5E7EB', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', boxSizing: 'border-box' }}>
            <div>
                <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#2563EB', margin: '0 0 4px 0' }}>Lost & Found</h1>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>Portal Pengguna Kampus</p>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="#dashboard" style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: '600', fontSize: '14px', textDecoration: 'none' }}>Dashboard</a>
                <a href="#laporan" style={{ padding: '10px 14px', borderRadius: '8px', color: '#4B5563', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>Laporan Saya</a>
                <a href="#riwayat" style={{ padding: '10px 14px', borderRadius: '8px', color: '#4B5563', fontWeight: '500', fontSize: '14px', textDecoration: 'none' }}>Riwayat Selesai</a>
            </nav>
        </aside>
    );
}