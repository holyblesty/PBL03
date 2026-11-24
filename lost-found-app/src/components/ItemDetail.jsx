/**
 * File: ItemDetail.jsx
 * Fungsi: Menampilkan informasi lengkap barang yang dipilih dari katalog publik, termasuk lokasi, deskripsi, kronologi, dan status barang.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React from "react";

// Menampilkan informasi detail barang yang dipilih dari katalog publik.
const FOTO_KOSONG =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">' +
        '<rect width="100%" height="100%" fill="#F3F4F6"/>' +
        '<text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" ' +
        'fill="#9CA3AF" text-anchor="middle" dominant-baseline="middle">' +
        'Foto tidak tersedia</text></svg>'
    );

export default function ItemDetail({ item, onBack }) {
    if (!item) return null;

    const jenis = String(
        item.jenis || item.jenisLaporan || ""
    ).toLowerCase();

    const status = String(item.status || "").toLowerCase();

    const kronologi = String(
        item.kronologi || item.kronologiKejadian || ""
    ).trim();

    const deskripsiAsli = String(item.deskripsi || "").trim();

    const isKehilangan =
        jenis.includes("hilang") ||
        jenis.includes("kehilangan");

    const isReturned = status.includes("dikembalikan");

    // Menghapus teks kronologi yang ikut tersimpan di deskripsi.
    const escapeRegExp = (value) =>
        value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const deskripsiBersih = kronologi
        ? deskripsiAsli
            .replace(
                new RegExp(escapeRegExp(kronologi), "gi"),
                ""
            )
            .replace(
                /(?:\s*[•·|,;]\s*){2,}/g,
                " • "
            )
            .replace(
                /(?:\s*[•·|,;]\s*)+$/g,
                ""
            )
            .replace(
                /^(?:\s*[•·|,;]\s*)+/g,
                ""
            )
            .trim()
        : deskripsiAsli;

    return (
        <div className="item-detail-page">
            <div
                className="item-detail-header"
                style={{ textAlign: "center" }}
            >
                <button
                    type="button"
                    className="item-back-button"
                    onClick={onBack}
                    style={{ marginBottom: "8px" }}
                >
                    ← Kembali
                </button>

                <h1>Detail Barang</h1>
                <p>
                    Informasi lengkap mengenai barang yang dilaporkan.
                </p>
            </div>

            <div className="item-detail-card">
                <div className="item-detail-image-section">
                    <div className="item-detail-image-wrapper">
                        <img
                            src={
                                item.foto ||
                                item.image ||
                                FOTO_KOSONG
                            }
                            alt={item.namaBarang || "Foto barang"}
                            className="item-detail-image"
                        />

                        <span
                            className={`item-detail-type ${isKehilangan
                                ? "kehilangan"
                                : "penemuan"
                                }`}
                        >
                            {isKehilangan
                                ? "Kehilangan"
                                : "Penemuan"}
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
                                {item.namaBarang ||
                                    "Nama barang tidak tersedia"}
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
                        <h3>Ciri-ciri Barang</h3>
                        <p>
                            {deskripsiBersih ||
                                "Tidak ada ciri-ciri barang yang dicantumkan."}
                        </p>
                    </div>

                    {kronologi && (
                        <div className="item-description-section">
                            <h3>
                                {isKehilangan
                                    ? "Kronologi Kehilangan"
                                    : "Kronologi Penemuan"}
                            </h3>
                            <p>{kronologi}</p>
                        </div>
                    )}

                    {!isReturned ? (
                        <div className="item-detail-notice">
                            <div className="item-notice-icon">
                                🔒
                            </div>

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
                            <div className="item-notice-icon">
                                ✓
                            </div>

                            <div>
                                <strong>
                                    Barang Telah Dikembalikan
                                </strong>

                                <p>
                                    Barang ini sudah dikembalikan dan
                                    tidak tersedia lagi untuk proses
                                    selanjutnya.
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