import React from 'react';

function ReportTable() {
    // Dummy data contoh laporan
    const reports = [
        { id: 1, namaBarang: 'Laptop ASUS ROG', kategori: 'Elektronik', lokasi: 'Gedung A', status: 'Menunggu Verifikasi', tanggal: '26 Sep 2026' },
        { id: 2, namaBarang: 'Dompet Kulit Hitam', kategori: 'Aksesoris', lokasi: 'Kantin Utama', status: 'Dipublikasikan', tanggal: '25 Sep 2026' },
        { id: 3, namaBarang: 'Kunci Motor Honda', kategori: 'Kendaraan', lokasi: 'Parkiran Basement', status: 'Dipublikasikan', tanggal: '24 Sep 2026' },
        { id: 4, namaBarang: 'Tumbler Tupperware', kategori: 'Pribadi', lokasi: 'Perpustakaan', status: 'Dikembalikan', tanggal: '23 Sep 2026' },
        { id: 5, namaBarang: 'Jas Lab Kimia', kategori: 'Pakaian', lokasi: 'Laboratorium MIPA', status: 'Menunggu Verifikasi', tanggal: '22 Sep 2026' },
    ];

    const tableHeaderStyle = {
        padding: '12px 16px',
        textAlign: 'left',
        fontSize: '13px',
        fontWeight: '600',
        color: '#4B5563',
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#F9FAFB'
    };

    const tableCellStyle = {
        padding: '14px 16px',
        fontSize: '14px',
        color: '#1F2937',
        borderBottom: '1px solid #F3F4F6'
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>Laporan Barang Terbaru</h3>
                <span style={{ fontSize: '12px', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '4px 10px', borderRadius: '6px', fontWeight: '500' }}>
                    Menampilkan 5 data terkini
                </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>No</th>
                            <th style={tableHeaderStyle}>Nama Barang</th>
                            <th style={tableHeaderStyle}>Kategori</th>
                            <th style={tableHeaderStyle}>Lokasi</th>
                            <th style={tableHeaderStyle}>Tanggal</th>
                            <th style={tableHeaderStyle}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((item, index) => (
                            <tr key={item.id} style={{ transition: 'background 0.2s' }}>
                                <td style={tableCellStyle}>{index + 1}</td>
                                <td style={{ ...tableCellStyle, fontWeight: '600' }}>{item.namaBarang}</td>
                                <td style={tableCellStyle}>{item.kategori}</td>
                                <td style={tableCellStyle}>{item.lokasi}</td>
                                <td style={tableCellStyle}>{item.tanggal}</td>
                                <td style={tableCellStyle}>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        backgroundColor:
                                            item.status === 'Dipublikasikan' ? '#DEF7EC' :
                                                item.status === 'Menunggu Verifikasi' ? '#FEF3C7' : '#E5E7EB',
                                        color:
                                            item.status === 'Dipublikasikan' ? '#03543F' :
                                                item.status === 'Menunggu Verifikasi' ? '#92400E' : '#374151'
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bagian Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                <p style={{ margin: 0, fontSize: '13px', color: '#6B7280' }}>
                    Halaman <strong style={{ color: '#111827' }}>1</strong> dari <strong style={{ color: '#111827' }}>3</strong>
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '500', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#F9FAFB', color: '#9CA3AF', cursor: 'not-allowed' }} disabled>
                        Sebelumnya
                    </button>
                    <button style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '500', borderRadius: '6px', border: '1px solid #2563EB', backgroundColor: '#2563EB', color: '#ffffff', cursor: 'pointer' }}>
                        1
                    </button>
                    <button style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '500', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#ffffff', color: '#374151', cursor: 'pointer' }}>
                        2
                    </button>
                    <button style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '500', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#ffffff', color: '#374151', cursor: 'pointer' }}>
                        3
                    </button>
                    <button style={{ padding: '6px 12px', fontSize: '13px', fontWeight: '500', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#ffffff', color: '#374151', cursor: 'pointer' }}>
                        Berikutnya
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportTable;