import React, { useState } from 'react';

function ReportTable() {
    // 1. State untuk melacak halaman aktif saat ini di sisi admin
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Batas maksimal baris data per halaman admin

    // Dummy data contoh laporan barang di admin (diperbanyak untuk simulasi)
    const reports = [
        { id: 1, namaBarang: 'Laptop ASUS ROG', kategori: 'Elektronik', lokasi: 'Gedung A', status: 'Menunggu Verifikasi', tanggal: '26 Sep 2026' },
        { id: 2, namaBarang: 'Dompet Kulit Hitam', kategori: 'Aksesoris', lokasi: 'Kantin Utama', status: 'Dipublikasikan', tanggal: '25 Sep 2026' },
        { id: 3, namaBarang: 'Kunci Motor Honda', kategori: 'Kendaraan', lokasi: 'Parkiran Basement', status: 'Dipublikasikan', tanggal: '24 Sep 2026' },
        { id: 4, namaBarang: 'Tumbler Tupperware', kategori: 'Pribadi', lokasi: 'Perpustakaan', status: 'Dikembalikan', tanggal: '23 Sep 2026' },
        { id: 5, namaBarang: 'Jas Lab Kimia', kategori: 'Pakaian', lokasi: 'Laboratorium MIPA', status: 'Menunggu Verifikasi', tanggal: '22 Sep 2026' },
    ];

    // 2. Rumus Matematika Pemotongan Data per Halaman Admin
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem);

    // Hitung total halaman yang dihasilkan
    const totalPages = Math.ceil(reports.length / itemsPerPage);

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
                        {/* Merender data potongan (currentItems) secara dinamis */}
                        {currentItems.map((item, index) => {
                            let statusClass = 'published';
                            if (item.status === 'Menunggu Verifikasi') statusClass = 'pending';
                            if (item.status === 'Dikembalikan') statusClass = 'completed';

                            return (
                                <tr key={item.id}>
                                    {/* Kalkulasi nomor urut agar tetap berlanjut di halaman 2 */}
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{item.namaBarang}</td>
                                    <td>{item.kategori}</td>
                                    <td>{item.lokasi}</td>
                                    <td>{item.tanggal}</td>
                                    <td>
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

            {/* 3. BAGIAN NAVIGASI PAGINATION (SEKARANG SUDAH DINAMIS & SAMA DENGAN USER) */}
            <div className="pagination-wrapper">
                <span className="pagination-info">
                    Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, reports.length)} dari {reports.length} data
                </span>

                <div className="pagination-buttons">
                    {/* Tombol Sebelumnya */}
                    <button
                        className="btn-pagination"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                    >
                        Sebelumnya
                    </button>

                    {/* Urutan Angka Halaman Dinamis */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn-pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Tombol Berikutnya */}
                    <button
                        className="btn-pagination"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                    >
                        Berikutnya
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReportTable;
