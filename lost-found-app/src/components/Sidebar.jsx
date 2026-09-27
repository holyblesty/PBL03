import React from 'react';

function Sidebar() {
    return (
        <aside style={{ width: '250px', backgroundColor: '#1e293b', color: '#fff', padding: '20px', height: '100vh' }}>
            <h2>Lost & Found</h2>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '30px' }}>Admin Panel</p>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="#dashboard" style={{ color: '#fff', textDecoration: 'none', padding: '10px', borderRadius: '5px', backgroundColor: '#334155' }}>Dashboard</a>
                <a href="#laporan" style={{ color: '#94a3b8', textDecoration: 'none', padding: '10px', borderRadius: '5px' }}>Daftar Barang</a>
                <a href="#pengguna" style={{ color: '#94a3b8', textDecoration: 'none', padding: '10px', borderRadius: '5px' }}>Kelola Pengguna</a>
            </nav>
        </aside>
    );
}

export default Sidebar;