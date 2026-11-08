
/**
 * File: ItemDetail.jsx
 * Fungsi: Menampilkan informasi lengkap barang yang dipilih dari katalog publik, termasuk lokasi, deskripsi, kronologi, dan status barang.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React from "react";

// Menampilkan informasi detail barang yang dipilih dari katalog publik.
export default function ItemDetail({ item, onBack }) {
    if (!item) return null;

    const jenis = String(item.jenis || item.jenisLaporan || "").toLowerCase();
    const status = String(item.status || "").toLowerCase();
    const kronologi = item.kronologi || item.kronologiKejadian || "";

    const isKehilangan =
        jenis.includes("hilang") || jenis.includes("kehilangan");

    const isReturned = status.includes("dikembalikan");

    return (
        <div className="item-detail-page">
            <div className="item-detail-header" style={{ textAlign: "center" }}>
                <button
                    type="button"
                    className="item-back-button"
                    onClick={onBack}
                    style={{ marginBottom: "8px" }}
                >
                    ← Kembali
                </button>

                <h1>Detail Barang</h1>
                <p>Informasi lengkap mengenai barang yang dilaporkan.</p>
            </div>

            <div className="item-detail-card">
                <div className="item-detail-image-section">
                    <div className="item-detail-image-wrapper">
                        <img
                            src={
                                item.foto ||
                                item.image ||
                                "https://via.placeholder.com/400"
                            }
                            alt={item.namaBarang || "Foto barang"}
                            className="item-detail-image"
                        />

                        <span
                            className={`item-detail-type ${isKehilangan ? "kehilangan" : "penemuan"
                                }`}
                        >
                            {isKehilangan ? "Kehilangan" : "Penemuan"}
                        </span>
                    </div>
                </div>

                <div className="item-detail-content">
                    <div className="item-detail-title-row">
                        <div>
                            <span className="item-detail-category">
                                {item.kategori || "UMUM"}
                            </span>
                            <h2>
                                {item.namaBarang || "Nama barang tidak tersedia"}
                            </h2>
                        </div>

                        <span className="item-detail-status">
                            {item.status || "Dipublikasikan"}
                        </span>
                    </div>

                    <div className="item-detail-info-grid">
                        <div className="item-info-item">
                            <span className="item-info-label">
                                📍 Gedung / Area
                            </span>
                            <strong>{item.lokasi || "-"}</strong>
                        </div>

                        <div className="item-info-item">
                            <span className="item-info-label">
                                🚪 Ruangan / Area Spesifik
                            </span>
                            <strong>{item.ruangan || "-"}</strong>
                        </div>

                        <div className="item-info-item">
                            <span className="item-info-label">
                                📌 Detail Lokasi
                            </span>
                            <strong>{item.detailLokasi || "-"}</strong>
                        </div>

                        <div className="item-info-item">
                            <span className="item-info-label">
                                📅 Tanggal Kejadian
                            </span>
                            <strong>
                                {item.tanggalKejadian ||
                                    item.tanggalLaporan ||
                                    "-"}
                            </strong>
                        </div>
                    </div>

                    <div className="item-description-section">
                        <h3>Deskripsi Barang</h3>
                        <p>
                            {item.deskripsi ||
                                "Tidak ada deskripsi tambahan."}
                        </p>
                    </div>

                    <div className="item-description-section">
                        <h3>Kronologi Kejadian</h3>
                        <p>
                            {kronologi ||
                                "Tidak ada kronologi kejadian yang dicantumkan."}
                        </p>
                    </div>

                    {!isReturned ? (
                        <div className="item-detail-notice">
                            <div className="item-notice-icon">🔒</div>
                            <div>
                                <strong>
                                    {isKehilangan
                                        ? "Menemukan Barang Ini?"
                                        : "Merasa Barang Ini Milikmu?"}
                                </strong>
                                <p>
                                    {isKehilangan
                                        ? "Jika merasa menemukan barang tersebut, silakan lapor ke Pamdal di Pos Pamdal."
                                        : "Jika merasa itu barang Anda, silakan ke Pos Pamdal dengan membawa bukti yang ada."}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="item-detail-notice">
                            <div className="item-notice-icon">✓</div>
                            <div>
                                <strong>Barang Telah Dikembalikan</strong>
                                <p>
                                    Barang ini sudah dikembalikan dan tidak tersedia lagi untuk proses selanjutnya.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="item-detail-actions">
                        <button
                            type="button"
                            className="item-back-secondary"
                            onClick={onBack}
                        >
                            Kembali ke Daftar Barang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
