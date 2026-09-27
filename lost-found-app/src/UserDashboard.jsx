import React from 'react';
import UserSidebar from './components/UserSidebar';
import UserNavbar from './components/UserNavbar';
import './App.css'; // Pastikan CSS terpanggil

export default function UserDashboard() {
    const myReports = [
        { id: 1, namaBarang: 'Dompet Hitam Kulit', jenis: 'Kehilangan', tanggal: '26 Sep 2026', status: 'Dipublikasikan' },
        { id: 2, namaBarang: 'Tumbler Corkcicle', jenis: 'Penemuan', tanggal: '24 Sep 2026', status: 'Selesai / Dikembalikan' },
    ];

    return (
        <div className="dashboard-container">
            {/* Sidebar Samping */}
            <UserSidebar />

            {/* Konten Utama */}
            <main className="dashboard-main">
                <UserNavbar />

                <div className="dashboard-content">
                    <div style={{ marginBottom: '24px' }}>
                        <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '700', color: '#111827' }}>Halo, Selamat Datang!</h2>
                        <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Kelola laporan barang hilang atau temuan Anda dengan cepat di sini.</p>
                    </div>

                    <div className="card-stats-container">
                        <div className="dashboard-card">
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>Laporan Kehilangan Aktif</h4>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#2563EB' }}>1</p>
                        </div>
                        <div className="dashboard-card">
                            <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>Barang Temuan Dilaporkan</h4>
                            <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#059669' }}>1</p>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-primary">+ Lapor Barang Hilang</button>
                        <button className="btn-secondary">+ Lapor Barang Temuan</button>
                    </div>

                    <div className="table-card">
                        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Riwayat Laporan Saya</h3>

                        <table className="custom-table">
                            <thead>
                                <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                                    <th style={{ padding: '10px 12px', fontSize: '13px', color: '#4B5563', fontWeight: '600' }}>Nama Barang</th>
                                    <th style={{ padding: '10px 12px', fontSize: '13px', color: '#4B5563', fontWeight: '600' }}>Jenis</th>
                                    <th style={{ padding: '10px 12px', fontSize: '13px', color: '#4B5563', fontWeight: '600' }}>Tanggal</th>
                                    <th style={{ padding: '10px 12px', fontSize: '13px', color: '#4B5563', fontWeight: '600' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myReports.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                                        <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>{item.namaBarang}</td>
                                        <td style={{ padding: '12px', fontSize: '14px', color: '#4B5563' }}>{item.jenis}</td>
                                        <td style={{ padding: '12px', fontSize: '14px', color: '#4B5563' }}>{item.tanggal}</td>
                                        <td style={{ padding: '12px', fontSize: '14px' }}>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                backgroundColor: item.status.includes('Selesai') ? '#DEF7EC' : '#FEF3C7',
                                                color: item.status.includes('Selesai') ? '#03543F' : '#92400E'
                                            }}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}