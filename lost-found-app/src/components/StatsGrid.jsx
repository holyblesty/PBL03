import React from 'react';

function StatsGrid() {
    const cardStyle = {
        backgroundColor: '#ffffff',
        padding: '24px 20px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        textAlign: 'center',
        fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    };

    return (
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
            {/* Kotak 1 */}
            <div className="stat-card" style={cardStyle}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Barang Hilang</h3>
                <p className="stat-blue" style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#2563EB', letterSpacing: '-0.5px' }}>12</p>
            </div>

            {/* Kotak 2 */}
            <div className="stat-card" style={cardStyle}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Barang Ditemukan</h3>
                <p className="stat-green" style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#059669', letterSpacing: '-0.5px' }}>8</p>
            </div>

            {/* Kotak 3 */}
            <div className="stat-card" style={cardStyle}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6B7280', fontWeight: '600' }}>Total Pengguna</h3>
                <p className="stat-yellow" style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#D97706', letterSpacing: '-0.5px' }}>45</p>
            </div>
        </div>
    );
}

export default StatsGrid;