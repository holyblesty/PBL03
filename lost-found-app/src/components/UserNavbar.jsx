import React from 'react';

export default function UserNavbar() {
    return (
        <header style={{ height: '70px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: 0 }}>Dashboard Mahasiswa / Pelapor</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#DBEAFE', color: '#1D4ED8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>
                    U
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Pengguna Kampus</span>
            </div>
        </header>
    );
}