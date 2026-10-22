import React from "react";

export default function ItemDetail({ item, onBack }) {
    if (!item) return null;

    // Normalisasi data agar pengecekan jenis & status tidak bocor/error
    const jenis = String(item.jenis || item.jenisLaporan || "").toLowerCase();
    const status = String(item.status || "").toLowerCase();

    const isKehilangan = jenis.includes("hilang") || jenis.includes("kehilangan");
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
                {/* SISI KIRI: Foto Barang & Badge Jenis (Penemuan / Kehilangan) */}
                <div className="item-detail-image-section">
                    <div className="item-detail-image-wrapper">
                        <img
                            src={item.foto || item.image || "https://via.placeholder.com/400"}
                            alt={item.namaBarang}
                            className="item-detail-image"
                        />
                        <span className={`item-detail-type ${isKehilangan ? "kehilangan" : "penemuan"}`}>
                            {isKehilangan ? "Kehilangan" : "Penemuan"}
                        </span>
                    </div>
                </div>

                {/* SISI KANAN: Konten Detail */}
                <div className="item-detail-content">
                    <div className="item-detail-title-row">
                        <div>
                            <span className="item-detail-category">{item.kategori || "UMUM"}</span>
                            <h2>{item.namaBarang}</h2>
                        </div>
                        <span className="item-detail-status">{item.status || "Dipublikasikan"}</span>
                    </div>

                    <div className="item-detail-info-grid">
                        <div className="item-info-item">
                            <span className="item-info-label">📍 Lokasi</span>
                            <strong>{item.lokasi || "-"}</strong>
                        </div>
                        <div className="item-info-item">
                            <span className="item-info-label">📅 Tanggal Laporan</span>
                            <strong>{item.tanggalKejadian || item.tanggalLaporan || "-"}</strong>
                        </div>
                        <div className="item-info-item">
                            <span className="item-info-label">👤 Pelapor</span>
                            <strong>{item.namaPelapor || item.pelapor || "Tidak diketahui"}</strong>
                        </div>
                        <div className="item-info-item">
                            <span className="item-info-label">🏷️ Kategori</span>
                            <strong>{item.kategori || "-"}</strong>
                        </div>
                    </div>

                    <div className="item-description-section">
                        <h3>Deskripsi Barang</h3>
                        <p>{item.deskripsi || "Tidak ada deskripsi tambahan."}</p>
                    </div>

                    {/* ============================================================ */}
                    {/* BAGIAN INFORMASI STATUS YANG KAMU MINTA (SISTEM PAMDAL)     */}
                    {/* ============================================================ */}
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

                    {/* Tombol Aksi */}
                    <div className="item-detail-actions">
                        <button type="button" className="item-back-secondary" onClick={onBack}>
                            Kembali ke Daftar Barang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}