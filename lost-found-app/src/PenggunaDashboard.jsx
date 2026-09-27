import React from 'react';

export default function UserDashboard() {
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Dashboard Pengguna</h2>
            <p>Selamat datang! Anda dapat melaporkan kehilangan atau mencari barang temuan di sini.</p>

            <div style={{ marginTop: '20px' }}>
                <button style={{ padding: '10px 15px', marginRight: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    + Lapor Barang Hilang
                </button>
                <button style={{ padding: '10px 15px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Lapor Barang Temuan
                </button>
            </div>
        </div>
    );
}