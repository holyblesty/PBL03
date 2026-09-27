import React from 'react';

export default function UserDashboard() {
    const myReports = [
        { id: 1, namaBarang: 'Dompet Hitam Kulit', jenis: 'Kehilangan', tanggal: '26 Sep 2026', status: 'Dipublikasikan' },
        { id: 2, namaBarang: 'Tumbler Corkcicle', jenis: 'Penemuan', tanggal: '24 Sep 2026', status: 'Selesai / Dikembalikan' },
    ];

    const cardStyle = {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        flex: 1,
        textAlign: 'center'
    };

    return (
        <div style={{ padding: '32px', fontFamily: "Inter, Poppins, sans-serif", backgroundColor: '#F9FAFB', minHeight: '100vh', boxSizing: 'border-box' }}>
            {/* Header sambutan */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '24px', fontWeight: '700', color: '#111827' }}>Dashboard Pengguna</h2>
                <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Selamat datang kembali! Kelola laporan barang hilang atau temuan Anda di sini.</p>
            </div>

            {/* Tombol Aksi Cepat (CTA) & Stats Ringkas */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
                <div style={cardStyle}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>Laporan Kehilangan Aktif</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#2563EB' }}>1</p>
                </div>
                <div style={cardStyle}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#6B7280', fontWeight: '600' }}>Barang Temuan Dilaporkan</h4>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#059669' }}>1</p>
                </div>
            </div>

            {/* Tombol Utama */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
                <button style={{ padding: '10px 18px', backgroundColor: '#2563EB', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    + Lapor Barang Hilang
                </button>
                <button style={{ padding: '10px 18px', backgroundColor: '#ffffff', color: '#374151', border: '1px solid #D1D5DB', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                    + Lapor Barang Temuan
                </button>
            </div>

            {/* Bagian Riwayat Laporan Pengguna */}
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700', color: '#111827' }}>Riwayat Laporan Saya</h3>

                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
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
    );
}