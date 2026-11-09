import React, { useState } from "react";
import ClaimForm from "./ClaimForm"; // <-- 1. Import ClaimForm

export default function ItemDetail({ item, onBack }) {
    const [isClaiming, setIsClaiming] = useState(false); // <-- 2. State untuk beralih ke form klaim

    if (!item) {
        return null;
    }

    // Jika tombol ajukan klaim ditekan, tampilkan komponen ClaimForm
    if (isClaiming) {
        return (
            <ClaimForm 
                item={item} 
                onBack={() => setIsClaiming(false)} 
                onSubmitSuccess={() => {
                    setIsClaiming(false);
                    onBack(); // Kembali ke dashboard setelah sukses
                }}
            />
        );
    }

    const isKehilangan = item.jenis === "Kehilangan";

    return (
        <div className="item-detail-page">
            {/* HEADER */}
            <div className="item-detail-header">
                <button
                    className="item-back-button"
                    onClick={onBack}
                >
                    ← Kembali
                </button>

                <div>
                    <h1>Detail Barang</h1>
                    <p>Informasi lengkap mengenai barang yang dilaporkan.</p>
                </div>
            </div>

            {/* DETAIL CARD */}
            <div className="item-detail-card">
                {/* FOTO */}
                <div className="item-detail-image-section">
                    <div className="item-detail-image-wrapper">
                        <img
                            src={item.foto}
                            alt={item.namaBarang}
                            className="item-detail-image"
                        />
                        <span className={`item-detail-type ${isKehilangan ? "kehilangan" : "penemuan"}`}>
                            {item.jenis}
                        </span>
                    </div>
                </div>

                {/* INFORMASI */}
                <div className="item-detail-content">
                    <div className="item-detail-title-row">
                        <div>
                            <span className="item-detail-category">
                                {item.kategori || "Tidak ada kategori"}
                            </span>
                            <h2>{item.namaBarang}</h2>
                        </div>
                        <span className="item-detail-status">
                            {item.status}
                        </span>
                    </div>

                    {/* INFORMASI UTAMA */}
                    <div className="item-detail-info-grid">
                        <div className="item-info-item">
                            <span className="item-info-label">📍 Lokasi</span>
                            <strong>{item.lokasi}</strong>
                        </div>
                        <div className="item-info-item">
                            <span className="item-info-label">📅 Tanggal Laporan</span>
                            <strong>{item.tanggal}</strong>
                        </div>
                        <div className="item-info-item">
                            <span className="item-info-label">👤 Pelapor</span>
                            <strong>{item.pelapor || "Tidak diketahui"}</strong>
                        </div>
                        <div className="item-info-item">
                            <span className="item-info-label">🏷️ Kategori</span>
                            <strong>{item.kategori || "Tidak ada"}</strong>
                        </div>
                    </div>

                    {/* DESKRIPSI */}
                    <div className="item-description-section">
                        <h3>Deskripsi Barang</h3>
                        <p>{item.deskripsi || "Tidak ada deskripsi barang."}</p>
                    </div>

                    {/* INFORMASI KEAMANAN */}
                    <div className="item-detail-notice">
                        <div className="item-notice-icon">🔒</div>
                        <div>
                            <strong>Informasi Klaim</strong>
                            <p>
                                Jika kamu merasa barang ini adalah milikmu, ajukan klaim dengan mengisi jadwal kunjungan untuk diverifikasi oleh pihak Pamdal kampus.
                            </p>
                        </div>
                    </div>

                    {/* ACTION */}
                    <div className="item-detail-actions">
                        <button className="item-back-secondary" onClick={onBack}>
                            Kembali
                        </button>

                        {/* Tombol Ajukan Klaim memicu state isClaiming */}
                        {isKehilangan && item.status !== "Selesai / Dikembalikan" && (
                            <button
                                className="item-claim-button"
                                onClick={() => setIsClaiming(true)}
                            >
                                Ajukan Klaim
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}