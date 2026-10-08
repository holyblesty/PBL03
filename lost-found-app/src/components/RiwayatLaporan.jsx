import React, { useState } from 'react';

export default function RiwayatLaporan() {
    // Data dummy laporan pengguna dengan berbagai status verifikasi Pamdal
    const [myReports] = useState([
        {
            id: 101,
            namaBarang: 'Dompet Hitam Kulit',
            jenis: 'Kehilangan',
            kategori: 'Dompet',
            lokasi: 'Gedung Utama',
            tanggalKejadian: '26 Sep 2026',
            status: 'Menunggu Verifikasi',
            deskripsi: 'Dompet kulit warna hitam merek Fossil.',
            pesanPamdal: 'Laporan sedang dalam antrean pemeriksaan oleh petugas keamanan.'
        },
        {
            id: 102,
            namaBarang: 'Tumbler Corkcicle',
            jenis: 'Penemuan',
            kategori: 'Botol Minum',
            lokasi: 'Kantin',
            tanggalKejadian: '24 Sep 2026',
            status: 'Disetujui', // Sudah di-ACC Pamdal
            deskripsi: 'Tumbler warna biru navy tertinggal di meja kantin.',
            pesanPamdal: '✅ Laporan di-ACC! Barang telah divalidasi dan ditayangkan ke katalog publik.'
        },
        {
            id: 103,
            namaBarang: 'Kunci Motor Hilang',
            jenis: 'Kehilangan',
            kategori: 'Kunci',
            lokasi: 'Parkiran',
            tanggalKejadian: '20 Sep 2026',
            status: 'Ditolak', // Ditolak Pamdal
            deskripsi: 'Kunci motor tertinggal.',
            pesanPamdal: '❌ Laporan ditolak: Foto dan deskripsi barang terlalu tidak jelas, mohon buat laporan ulang dengan detail yang benar.'
        }
    ]);

    // Fungsi untuk menentukan warna dan gaya badge status
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Menunggu Verifikasi':
                return { bg: '#FEF3C7', color: '#B45309', border: '#F59E0B' };
            case 'Disetujui':
                return { bg: '#D1FAE5', color: '#065F46', border: '#10B981' };
            case 'Ditolak':
                return { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444' };
            default:
                return { bg: '#F3F4F6', color: '#374151', border: '#D1D5DB' };
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1F2937', margin: '0 0 6px 0' }}>
                    Riwayat & Status Verifikasi Laporan
                </h2>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                    Cek notifikasi dan status persetujuan laporan barang yang telah kamu kirimkan ke Pamdal.
                </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {myReports.map((item) => {
                    const style = getStatusStyle(item.status);
                    return (
                        <div
                            key={item.id}
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '12px',
                                border: '1px solid #E5E7EB',
                                padding: '20px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                                borderLeft: `5px solid ${style.border}`
                            }}
                        >
                            {/* Baris Atas: Nama & Badge Status */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '10px' }}>
                                <div>
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase' }}>
                                        {item.jenis} • #{item.id}
                                    </span>
                                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1F2937', margin: '2px 0 0 0' }}>
                                        {item.namaBarang}
                                    </h3>
                                </div>
                                <span style={{
                                    backgroundColor: style.bg,
                                    color: style.color,
                                    padding: '5px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {item.status}
                                </span>
                            </div>

                            {/* Detail Ringkas */}
                            <div style={{ fontSize: '13px', color: '#4B5563', marginBottom: '12px' }}>
                                📍 <strong>Lokasi:</strong> {item.lokasi} | 📅 <strong>Tanggal:</strong> {item.tanggalKejadian}
                            </div>

                            {/* Kotak Notifikasi / Catatan dari Pamdal */}
                            <div style={{
                                backgroundColor: style.bg,
                                color: style.color,
                                padding: '12px 14px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                lineHeight: '1.5',
                                fontWeight: '500'
                            }}>
                                <strong>Notifikasi Pamdal:</strong> {item.pesanPamdal}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}