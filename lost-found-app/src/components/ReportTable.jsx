import React, { useState } from 'react';

function ReportTable() {
    // Data dummy untuk daftar laporan barang hilang/ditemukan
    const [dummyReports] = useState([
        { id: 'LAP-001', namaBarang: 'Dompet Kulit Hitam', kategori: 'Barang Hilang', lokasi: 'Gedung Rektorat Lt. 2', tanggal: '26 Sep 2026', status: 'Menunggu Verifikasi' },
        { id: 'LAP-002', namaBarang: 'Laptop ASUS ROG Strix', kategori: 'Barang Ditemukan', lokasi: 'Perpustakaan Pusat', tanggal: '25 Sep 2026', status: 'Diamankan di Posko' },
        { id: 'LAP-003', namaBarang: 'Kunci Motor Honda Beat', kategori: 'Barang Hilang', lokasi: 'Parkiran Fakultas Teknik', tanggal: '25 Sep 2026', status: 'Selesai / Diambil' },
        { id: 'LAP-004', namaBarang: 'Tumbler Corkcicle Biru', kategori: 'Barang Ditemukan', lokasi: 'Kantin Gedung A', tanggal: '24 Sep 2026', status: 'Menunggu Verifikasi' },
        { id: 'LAP-005', namaBarang: 'Kartu Identitas Mahasiswa (KTM)', kategori: 'Barang Ditemukan', lokasi: 'Lab Komputer Lt. 3', tanggal: '24 Sep 2026', status: 'Selesai / Diambil' },
    ]);

    // Fungsi kecil untuk menentukan warna badge status
    const getStatusBadgeStyle = (status) => {
        if (status.includes('Selesai')) {
            return { backgroundColor: '#DEF7EC', color: '#03543F' };
        } else if (status.includes('Diamankan')) {
            return { backgroundColor: '#E1EFFE', color: '#1E429F' };
        } else {
            return { backgroundColor: '#FEF08A', color: '#713F12' };
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111827' }}>Laporan Barang Terbaru</h3>
                <span style={{ fontSize: '12px', fontWeight: '600', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '20px' }}>
                    Menampilkan 5 data terkini
                </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            <th style={{ padding: '12px 24px' }}>ID Laporan</th>
                            <th style={{ padding: '12px 24px' }}>Nama Barang</th>
                            <th style={{ padding: '12px 24px' }}>Kategori</th>
                            <th style={{ padding: '12px 24px' }}>Lokasi</th>
                            <th style={{ padding: '12px 24px' }}>Tanggal</th>
                            <th style={{ padding: '12px 24px' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyReports.map((row, index) => (
                            <tr
                                key={index}
                                style={{ borderBottom: '1px solid #F3F4F6', transition: 'background-color 0.1s' }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{ padding: '14px 24px', fontWeight: '600', color: '#111827' }}>{row.id}</td>
                                <td style={{ padding: '14px 24px', fontWeight: '600', color: '#1F2937' }}>{row.namaBarang}</td>
                                <td style={{ padding: '14px 24px' }}>
                                    <span style={{
                                        fontWeight: '600',
                                        fontSize: '12px',
                                        color: row.kategori === 'Barang Hilang' ? '#B91C1C' : '#047857'
                                    }}>
                                        {row.kategori}
                                    </span>
                                </td>
                                <td style={{ padding: '14px 24px', color: '#4B5563' }}>{row.lokasi}</td>
                                <td style={{ padding: '14px 24px', color: '#4B5563' }}>{row.tanggal}</td>
                                <td style={{ padding: '14px 24px' }}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        ...getStatusBadgeStyle(row.status)
                                    }}>
                                        {row.status}
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

export default ReportTable;