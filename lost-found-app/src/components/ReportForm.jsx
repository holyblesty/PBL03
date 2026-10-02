import React, { useState } from 'react';

export default function ReportForm() {
    const [jenisLaporan, setJenisLaporan] = useState('Kehilangan');
    const [formData, setFormData] = useState({
        namaBarang: '',
        kategori: 'Elektronik',
        lokasi: '',
        tanggal: '',
        deskripsi: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Laporan Dikirim:", { jenisLaporan, ...formData });
        alert("Laporan berhasil dikirim dan menunggu verifikasi petugas keamanan kampus!");
    };

    return (
        <div className="report-card">

            {/* Header Form */}
            <div className="report-header">
                <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>
                    Buat Laporan Barang
                </h2>
                <p style={{ fontSize: '13px', color: '#9CA3AF', margin: 0 }}>
                    Laporkan barang Anda yang hilang atau serahkan informasi barang temuan di area kampus.
                </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="report-form-body">

                {/* Pilihan Jenis Laporan */}
                <div style={{ marginBottom: '24px' }}>
                    <label className="form-label" style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Jenis Laporan
                    </label>
                    <div className="toggle-container">
                        <button
                            type="button"
                            onClick={() => setJenisLaporan('Kehilangan')}
                            className="btn-toggle-lost"
                            style={{
                                border: jenisLaporan === 'Kehilangan' ? '2px solid #F59E0B' : '1px solid #D1D5DB',
                                backgroundColor: jenisLaporan === 'Kehilangan' ? '#FEF3C7' : '#FFFFFF',
                                color: jenisLaporan === 'Kehilangan' ? '#92400E' : '#4B5563',
                            }}
                        >
                            🔍 Barang Hilang (Kehilangan)
                        </button>
                        <button
                            type="button"
                            onClick={() => setJenisLaporan('Penemuan')}
                            className="btn-toggle-lost"
                            style={{
                                border: jenisLaporan === 'Penemuan' ? '2px solid #059669' : '1px solid #D1D5DB',
                                backgroundColor: jenisLaporan === 'Penemuan' ? '#D1FAE5' : '#FFFFFF',
                                color: jenisLaporan === 'Penemuan' ? '#047857' : '#4B5563',
                            }}
                        >
                            📦 Barang Temuan
                        </button>
                    </div>
                </div>

                {/* Baris 1: Nama Barang & Kategori */}
                <div className="form-row">
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">
                            Nama Barang <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="namaBarang"
                            required
                            placeholder="Contoh: Dompet Hitam / Tumbler Biru"
                            value={formData.namaBarang}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">
                            Kategori Barang <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <select
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="Elektronik">Elektronik (Laptop, HP, TWS)</option>
                            <option value="Aksesoris & Dompet">Aksesoris & Dompet</option>
                            <option value="Kunci & Kendaraan">Kunci & Kendaraan</option>
                            <option value="Buku & Alat Tulis">Buku & Alat Tulis</option>
                            <option value="Lainnya">Lainnya</option>
                        </select>
                    </div>
                </div>

                {/* Baris 2: Lokasi & Tanggal */}
                <div className="form-row">
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">
                            Lokasi Kehilangan / Ditemukan <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="lokasi"
                            required
                            placeholder="Contoh: Kantin Utama / Parkiran Teknik"
                            value={formData.lokasi}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">
                            Tanggal Kejadian <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="date"
                            name="tanggal"
                            required
                            value={formData.tanggal}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="form-group">
                    <label className="form-label">
                        Deskripsi & Ciri-ciri Khusus <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                        name="deskripsi"
                        required
                        rows="4"
                        placeholder="Jelaskan warna, merek, stiker khusus, atau isi penting di dalam barang..."
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-textarea"
                    ></textarea>
                </div>

                {/* Upload Foto */}
                <div className="form-group" style={{ marginBottom: '28px' }}>
                    <label className="form-label">
                        Unggah Foto Barang (Opsional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ fontSize: '13px', color: '#4B5563' }}
                    />
                    <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '4px 0 0 0' }}>Format yang didukung: JPG, PNG. Maksimal ukuran 2MB.</p>
                </div>

                {/* Tombol Aksi */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                    <button type="button" className="btn-cancel">
                        Batal
                    </button>
                    <button type="submit" className="btn-submit-gold">
                        Kirim Laporan
                    </button>
                </div>

            </form>
        </div>
    );
}