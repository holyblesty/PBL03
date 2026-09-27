import React from 'react';

function StatsGrid() {
    return (
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            <div className="stat-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Barang Hilang</h3>
                <p className="stat-blue" style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#2563EB' }}>12</p>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Barang Ditemukan</h3>
                <p className="stat-green" style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#059669' }}>8</p>
            </div>
            <div className="stat-card" style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Total Pengguna</h3>
                <p className="stat-yellow" style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#D97706' }}>45</p>
            </div>
        </div>
    );
}

export default StatsGrid;