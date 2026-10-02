import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import StatsGrid from '../components/StatsGrid';
import '../App.css';

function AdminDashboard() {
    return (
        <div className="admin-container">
            <AdminSidebar />

            <div className="admin-main" style={{ padding: 0 }}>
                <AdminNavbar />

                <main className="dashboard-content">
                    {/* Header Sambutan */}
                    <header className="admin-header" style={{ marginBottom: '24px' }}>
                        <h1>Dashboard Utama</h1>
                        <p>Selamat datang, Admin. Berikut ringkasan operasional sistem kehilangan dan penemuan barang kampus.</p>
                    </header>

                    {/* 1. Kotak Statistik (Metrik Utama) */}
                    <StatsGrid />

                    {/* 2. Tombol Pintasan Cepat (Quick Actions) Biar Gak Kosong */}
                    <div style={{ marginTop: '24px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                            Aksi Cepat Petugas
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                            <button style={{
                                padding: '12px 16px',
                                backgroundColor: '#111827',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <span>+ Catat Temuan Baru</span>
                                <span>→</span>
                            </button>
                            <button style={{
                                padding: '12px 16px',
                                backgroundColor: '#F3F4F6',
                                color: '#111827',
                                border: '1px solid #D1D5DB',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                textAlign: 'left',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <span>Verifikasi Klaim (2)</span>
                                <span>→</span>
                            </button>
                        </div>
                    </div>

                    {/* 3. Feed Aktivitas Ringkas (Pengganti Tabel Besar yang Bikin Pusing) */}
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '10px',
                        padding: '20px',
                        marginTop: '24px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: 0 }}>
                                Aktivitas Terbaru Sistem
                            </h3>
                            <span style={{ fontSize: '12px', color: '#6B7280' }}>Pembaruan real-time</span>
                        </div>

                        {/* List Aktivitas Kecil */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F3F4F6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                                    <span style={{ fontSize: '14px', color: '#374151' }}>Klaim baru untuk barang <strong>Dompet Hitam</strong></span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>10 m lalu</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid #F3F4F6' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                                    <span style={{ fontSize: '14px', color: '#374151' }}>Barang <strong>Tumbler Biru</strong> berhasil diambil pemilik</span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>1 jam lalu</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div>
                                    <span style={{ fontSize: '14px', color: '#374151' }}>1 barang masuk masa arsip lewat 30 hari</span>
                                </div>
                                <span style={{ fontSize: '12px', color: '#9CA3AF' }}>Kemarin</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;