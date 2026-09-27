import React from 'react';

function ReportTable() {
    // Dummy data contoh laporan barang di admin
    const reports = [
        { id: 1, namaBarang: 'Laptop ASUS ROG', kategori: 'Elektronik', lokasi: 'Gedung A', status: 'Menunggu Verifikasi', tanggal: '26 Sep 2026' },
        { id: 2, namaBarang: 'Dompet Kulit Hitam', kategori: 'Aksesoris', lokasi: 'Kantin Utama', status: 'Dipublikasikan', tanggal: '25 Sep 2026' },
        { id: 3, namaBarang: 'Kunci Motor Honda', kategori: 'Kendaraan', lokasi: 'Parkiran Basement', status: 'Dipublikasikan', tanggal: '24 Sep 2026' },
        { id: 4, namaBarang: 'Tumbler Tupperware', kategori: 'Pribadi', lokasi: 'Perpustakaan', status: 'Dikembalikan', tanggal: '23 Sep 2026' },
        { id: 5, namaBarang: 'Jas Lab Kimia', kategori: 'Pakaian', lokasi: 'Laboratorium MIPA', status: 'Menunggu Verifikasi', tanggal: '22 Sep 2026' },
    ];

    return (
        <div className="table-card">
            {/* Bagian Atas Tabel: Judul & Informasi Jumlah Data */}
            <div className="table-header-wrapper">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                        Laporan Barang Terbaru
                    </h3>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                        Daftar barang masuk yang perlu dikelola oleh petugas keamanan.
                    </p>
                </div>
                <span style={{ fontSize: '12px', color: '#6B7280', backgroundColor: '#F3F4F6', padding: '6px 12px', borderRadius: '6px', fontWeight: '600' }}>
                    Menampilkan 5 data terkini
                </span>
            </div>

            {/* Kontainer Tabel Utama */}
            <div style={{ overflowX: 'auto' }}>
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Barang</th>
                            <th>Kategori</th>
                            <th>Lokasi</th>
                            <th>Tanggal</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((item, index) => {
                            // Fungsi mapping dynamic status badge ke CSS class kita
                            let statusClass = 'published'; // Default
                            if (item.status === 'Menunggu Verifikasi') statusClass = 'pending';
                            if (item.status === 'Dikembalikan') statusClass = 'completed';

                            return (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.namaBarang}</td>
                                    <td>{item.kategori}</td>
                                    <td>{item.lokasi}</td>
                                    <td>{item.tanggal}</td>
                                    <td>
                                        {/* Memakai badge dinamis kelas CSS kontras tinggi */}
                                        <span className={`badge ${statusClass}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Bagian Navigasi Pagination Terintegrasi CSS */}
            <div className="pagination-wrapper">
                <span className="pagination-info">
                    Halaman <strong>1</strong> dari <strong>3</strong>
                </span>

                <div className="pagination-buttons">
                    <button className="btn-pagination" disabled>
                        Sebelumnya
                    </button>
                    <button className="btn-pagination-number active">
                        1
                    </button>
                    <button className="btn-pagination-number">
                        2
                    </button>
                    <button className="btn-pagination-number">
                        3
                    </button>
                    <button className="btn-pagination-sidebar btn-pagination">
                        Berikutnya
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportTable;
