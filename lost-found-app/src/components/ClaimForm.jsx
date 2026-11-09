import React, { useState } from 'react';

export default function ClaimForm({ item, onBack, onSubmitSuccess }) {
    const [claimData, setClaimData] = useState({
        namaLengkap: '',
        identitas: '',
        noHp: '',
        buktiKepemilikan: '',
        tanggalAmbil: '',
        jamAmbil: '',
        catatan: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClaimData({ ...claimData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Pengajuan Klaim:", { barangId: item.id, ...claimData });
        alert(`Pengajuan klaim untuk "${item.namaBarang}" berhasil dikirim! Silakan datang sesuai jadwal untuk verifikasi dengan Pamdal.`);
        if (onSubmitSuccess) onSubmitSuccess();
    };

    return (
        <div className="report-card claim-form-card">
            {/* Header Form */}
            <div className="report-header">
                <button
                    type="button"
                    onClick={onBack}
                    className="claim-form-back-btn"
                >
                    ← Kembali ke Detail
                </button>
                <h2 className="claim-form-title">
                    Form Pengajuan Klaim Kepemilikan
                </h2>
                <p className="claim-form-subtitle">
                    Barang: <strong>{item.namaBarang}</strong> ({item.lokasi})
                </p>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="report-form-body">

                {/* Identitas Pengaju */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">
                            Nama Lengkap <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="text"
                            name="namaLengkap"
                            required
                            placeholder="Masukkan nama lengkapmu"
                            value={claimData.namaLengkap}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            No. Identitas (NIM / NIP / ID Pegawai) <span style={{ color: '#9CA3AF', fontWeight: 'normal' }}>(Opsional)</span>
                        </label>
                        <input
                            type="text"
                            name="identitas"
                            placeholder="Contoh: 33124010xx / NIP (Opsional)"
                            value={claimData.identitas}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                {/* No HP / WhatsApp */}
                <div className="form-group">
                    <label className="form-label">
                        Nomor WhatsApp / HP yang Bisa Dihubungi <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="noHp"
                        required
                        placeholder="Contoh: 081234567890"
                        value={claimData.noHp}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <small style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#6B7280' }}>
                        🔒 Nomor ini bersifat rahasia dan hanya dapat dilihat oleh petugas Pamdal untuk keperluan verifikasi.
                    </small>
                </div>

                {/* Bukti Kepemilikan */}
                <div className="form-group">
                    <label className="form-label">
                        Keterangan / Bukti Kepemilikan <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <textarea
                        name="buktiKepemilikan"
                        required
                        rows="3"
                        placeholder="Jelaskan secara umum tanpa menyebutkan ciri terlalu rinci, untuk menghindari klaim palsu"
                        value={claimData.buktiKepemilikan}
                        onChange={handleChange}
                        className="form-textarea"
                    ></textarea>
                </div>

                {/* Request Jadwal Kunjungan Verifikasi oleh Pamdal */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">
                            Request Tanggal Pengambilan <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="date"
                            name="tanggalAmbil"
                            required
                            value={claimData.tanggalAmbil}
                            onChange={handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Request Jam Kunjungan <span style={{ color: '#EF4444' }}>*</span>
                        </label>
                        <input
                            type="time"
                            name="jamAmbil"
                            min="09:00"
                            max="22:00"
                            required
                            value={claimData.jamAmbil}
                            onChange={handleChange}
                            className="form-input"
                        />
                        <small style={{ display: 'block', marginTop: '4px', fontSize: '11px', color: '#6B7280' }}>
                            ⏰ Jam operasional: 09:00 - 22:00 WIB
                        </small>
                    </div>
                </div>

                {/* Catatan Tambahan */}
                <div className="form-group">
                    <label className="form-label">
                        Catatan Tambahan untuk Petugas Pamdal (Opsional)
                    </label>
                    <input
                        type="text"
                        name="catatan"
                        placeholder="Misal: Saya akan datang setelah jam kuliah selesai."
                        value={claimData.catatan}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                {/* Tombol Aksi */}
                <div className="claim-form-actions">
                    <button type="button" onClick={onBack} className="btn-cancel">
                        Batal
                    </button>
                    <button type="submit" className="btn-submit-gold">
                        Kirim Pengajuan Klaim
                    </button>
                </div>

            </form>
        </div>
    );
}