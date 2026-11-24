
import React from 'react';

const dummyStats = [
  {
    id: 'hilang',
    title: 'Laporan Barang Hilang',
    value: 12,
    color: '#3B82F6',
  },
  {
    id: 'temuan',
    title: 'Laporan Barang Temuan',
    value: 8,
    color: '#10B981',
  },
  {
    id: 'verifikasi',
    title: 'Menunggu Verifikasi',
    value: 5,
    color: '#F59E0B',
  },
  {
    id: 'pengembalian',
    title: 'Barang Dikembalikan',
    value: 3,
    color: '#64748B',
  },
];

function StatsGrid() {
  return (
    <div
      className="stats-grid"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      }}
    >
      {dummyStats.map((stat) => (
        <div className="stat-card" key={stat.id}>
          <h3>{stat.title}</h3>
          <p style={{ color: stat.color }}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default StatsGrid;
