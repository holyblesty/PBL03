import React from 'react';

export default function AdminDashboard() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Dashboard Pamdal (Admin)</h2>
            <p>Ini adalah halaman untuk petugas memverifikasi barang hilang dan temuan.</p>

            <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h3>Daftar Laporan Masuk</h3>
                <p>Belum ada laporan saat ini.</p>
                {/* Nanti di sini kita buatkan tabel daftar barangnya */}
            </div>
        </div>
    );
}