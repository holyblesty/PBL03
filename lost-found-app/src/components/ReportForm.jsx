import React, { useState } from 'react';

export default function ReportForm() {
    const [jenisLaporan, setJenisLaporan] = useState('Kehilangan');
    const [isSubmitted, setIsSubmitted] = useState(false); // State untuk layar sukses/menunggu verifikasi
    const [formData, setFormData] = useState({
        namaBarang: '',
        kategori: 'Elektronik',
        lokasi: '',
        tanggal: '',
        deskripsi: '',
    });

    // Array kategori yang ringkas
    const kategoriList = [
        'Elektronik',
        'Aksesoris & Dompet',
        'Kunci & Kendaraan',
        'Buku & Alat Tulis',
        'Lainnya'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Laporan Dikirim:", { jenisLaporan, ...formData });
        // Ubah state menjadi true untuk menampilkan halaman pemberitahuan verifikasi
        setIsSubmitted(true);
    };

    // Jika laporan sudah dikirim, tampilkan halaman pemberitahuan menunggu verifikasi Pamdal
    if (isSubmitted) {
        return (
            <div className="report-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '50px', marginBottom: '16px' }}>⏳</div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1F2937', marginBottom: '10px' }}>
                    Laporan Berhasil Dikirim!
                </h2>
                <p style={{ fontSize: '14px', color: '#4B5563', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                    Terima kasih telah melapor. Laporan barang <strong>{jenisLaporan.toLowerCase()}</strong> kamu untuk <strong>{formData.namaBarang}</strong> sedang menunggu proses verifikasi oleh petugas Pamdal kampus.
                </p>
                <div style={{ backgroundColor: '#FEF3C7', color: '#B45309', padding: '14px', borderRadius: '8px', fontSize: '13px', maxWidth: '450px', margin: '0 auto 24px auto', borderLeft: '4px solid #F59E0B', textAlign: 'left' }}>
                    ℹ️ Harap tunggu, laporan sedang diverifikasi oleh Pamdal. Setelah disetujui, laporan akan otomatis tayang di katalog publik.
                </div>
                <button
                    type="button"
                    onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ namaBarang: '', kategori: 'Elektronik', lokasi: '', tanggal: '', deskripsi: '' });
                    }}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2563EB',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '7px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '13px'
                    }}
                >
                    Buat Laporan Baru
                </button>
            </div>
        );
    }

    // Tampilan form normal sebelum dikirim
    return (
        <div className="report-card">

            {/* Header Form */}
            <div className="report-header">
                <h2 className="report-form-header-title">
                    Buat Laporan Barang
                </h2>
                <p className="report-form-header-desc">
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
                            Barang Hilang (Kehilangan)
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
                            Barang Temuan
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
                            {kategoriList.map((kat) => (
                                <option key={kat} value={kat}>
                                    {kat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group" style={{ margin: 0 }}>
                        <label className="form-label">
                            Lokasi Kehilangan / Ditemukan <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="lokasi"
                            required
                            placeholder="Contoh: Gedung Serbaguna Kampus A / Lab Komputer"
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
                        placeholder="Jelaskan secara umum, tidak perlu terlalu rinci agar terhindar dari orang yang mengaku-ngaku."
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-textarea"
                    ></textarea>
                </div>

                {/* Upload Foto */}
                <div className="form-group" style={{ marginBottom: '28px', textAlign: 'center' }}>
                    <label className="form-label" style={{ display: 'block', marginBottom: '12px', textAlign: 'center' }}>
                        Unggah Foto Barang (Opsional)
                    </label>
                    <div className="upload-container-center" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <input
                            type="file"
                            id="upload-foto"
                            accept="image/*"
                            className="input-file-hidden"
                        />
                        <label htmlFor="upload-foto" className="btn-upload-custom">
                            Pilih Berkas Foto
                        </label>
                        <span className="upload-note">
                            Format JPG, PNG (Maks. 2MB)
                        </span>
                    </div>
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