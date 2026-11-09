import React, { useState } from 'react';

export default function RiwayatSelesai() {
    // Data dummy barang dengan status selesai / sudah dikembalikan
    const [riwayatSelesaiList] = useState([
        {
            id: 201,
            namaBarang: 'Tumbler Corkcicle',
            jenis: 'Penemuan',
            kategori: 'Botol Minum',
            lokasi: 'Kantin Utama',
            tanggalSelesai: '25 Sep 2026',
            status: 'Selesai / Dikembalikan',
            deskripsi: 'Tumbler warna biru navy telah diambil oleh pemilik sah setelah diverifikasi Pamdal.',
            penerima: 'Siti Aminah'
        },
        {
            id: 202,
            namaBarang: 'Jas Lab Kampus',
            jenis: 'Kehilangan',
            kategori: 'Pakaian',
            lokasi: 'Gedung Techno (Lab RPL)',
            tanggalSelesai: '22 Sep 2026',
            status: 'Selesai / Dikembalikan',
            deskripsi: 'Jas lab tertinggal di kursi lab dan berhasil ditemukan kembali.',
            penerima: 'Ahmad Fauzi'
        }
    ]);

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                    Riwayat Selesai
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>
                    Daftar laporan barang hilang atau temuan yang proses klaim dan pengembaliannya sudah tuntas.
                </p>
            </div>

            {/* Daftar Riwayat Selesai */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {riwayatSelesaiList.length > 0 ? (
                    riwayatSelesaiList.map((item) => {
                        const isKehilangan = item.jenis === 'Kehilangan';
                        return (
                            <div
                                key={item.id}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '12px',
                                    border: '1px solid var(--border-color)',
                                    padding: '20px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                                    borderLeft: '5px solid #10B981' // Aksen hijau tanda sukses/selesai
                                }}
                            >
                                {/* Header Card */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                            <span style={{
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                backgroundColor: isKehilangan ? '#FEF3C7' : '#D1FAE5',
                                                color: isKehilangan ? '#B45309' : '#065F46'
                                            }}>
                                                {item.jenis}
                                            </span>
                                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                                                ID: #{item.id}
                                            </span>
                                        </div>
                                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                                            {item.namaBarang}
                                        </h3>
                                    </div>

                                    {/* Status Badge */}
                                    <span style={{
                                        backgroundColor: '#E0E7FF',
                                        color: '#3730A3',
                                        padding: '6px 12px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                        🎉 Selesai / Dikembalikan
                                    </span>
                                </div>

                                {/* Detail Informasi */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', backgroundColor: '#F8FAFC', padding: '12px', borderRadius: '8px' }}>
                                    <div>🏷️ <strong>Kategori:</strong> {item.kategori}</div>
                                    <div>📍 <strong>Lokasi:</strong> {item.lokasi}</div>
                                    <div>📅 <strong>Tanggal Selesai:</strong> {item.tanggalSelesai}</div>
                                </div>

                                <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 10px 0', lineHeight: '1.5' }}>
                                    {item.deskripsi}
                                </p>

                                <div style={{ fontSize: '12px', color: '#059669', fontWeight: '600', backgroundColor: '#D1FAE5', padding: '8px 12px', borderRadius: '6px', display: 'inline-block' }}>
                                    ✓ Proses verifikasi Pamdal & penyerahan barang telah selesai.
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                        <p style={{ margin: 0 }}>Belum ada riwayat barang selesai.</p>
                    </div>
                )}
            </div>
        </div>
    );
}