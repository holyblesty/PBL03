/**
 * File: RiwayatLaporan.jsx
 * Fungsi: Menampilkan riwayat laporan milik pengguna beserta filter dan detail laporan.
  * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React, { useMemo, useState } from "react";

const STATUS_STYLES = {
    Dipublikasikan: {
        bg: "#DBEAFE",
        color: "#1D4ED8",
        border: "#3B82F6",
    },
    "Menunggu Penerimaan Barang": {
        bg: "#FFEDD5",
        color: "#C2410C",
        border: "#F97316",
    },
    Dikembalikan: {
        bg: "#D1FAE5",
        color: "#065F46",
        border: "#10B981",
    },
};

const DEFAULT_STATUS_STYLE = {
    bg: "#F3F4F6",
    color: "#374151",
    border: "#D1D5DB",
};

export default function RiwayatLaporan({ reports = [] }) {
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [filterStatus, setFilterStatus] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const getStatusStyle = (status) =>
        STATUS_STYLES[status] || DEFAULT_STATUS_STYLE;

    const isFinished = (item) =>
        item.status === "Dikembalikan";

    const activeCount = reports.filter(
        (item) => !isFinished(item)
    ).length;

    const finishedCount = reports.filter(
        isFinished
    ).length;

    const filteredReports = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return reports.filter((item) => {
            const matchesStatus =
                filterStatus === "Semua" ||
                (filterStatus === "Aktif" &&
                    !isFinished(item)) ||
                (filterStatus === "Selesai" &&
                    isFinished(item));

            const searchableValues = [
                item.namaBarang,
                item.jenis,
                item.kategori,
                item.lokasi,
                item.deskripsi,
                item.status,
            ];

            const matchesSearch =
                !query ||
                searchableValues.some((value) =>
                    String(value ?? "")
                        .toLowerCase()
                        .includes(query)
                );

            return matchesStatus && matchesSearch;
        });
    }, [reports, filterStatus, searchQuery]);

    // DETAIL LAPORAN
    if (selectedDetail) {
        const style = getStatusStyle(
            selectedDetail.status
        );

        return (
            <div
                style={{
                    width: "100%",
                    maxWidth: "56.25rem",
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    textAlign: "left",
                }}
            >
                {/* TOMBOL KEMBALI */}
                <button
                    type="button"
                    className="riwayat-back-button"
                    onClick={() => setSelectedDetail(null)}
                >
                    ← Kembali ke Riwayat Laporan
                </button>

                {/* KARTU DETAIL */}
                <section
                    style={{
                        display: "block",
                        width: "100%",
                        minWidth: 0,
                        backgroundColor: "#FFFFFF",
                        borderRadius: "0.75rem",
                        border: "0.0625rem solid #E5E7EB",
                        padding: "1.5rem",
                        boxShadow:
                            "0 0.0625rem 0.1875rem rgba(0,0,0,0.04)",
                        textAlign: "left",
                    }}
                >
                    {/* JUDUL DAN STATUS */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "0.75rem",
                            flexWrap: "wrap",
                            marginBottom: "1.125rem",
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    fontSize: "0.6875rem",
                                    fontWeight: "700",
                                    color: "#6B7280",
                                    textTransform: "uppercase",
                                }}
                            >
                                {selectedDetail.jenis} ·
                                {" "}Laporan #{selectedDetail.id}
                            </span>

                            <h2
                                style={{
                                    fontSize: "1.375rem",
                                    fontWeight: "800",
                                    color: "#1F2937",
                                    margin: "0.3125rem 0 0",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                {selectedDetail.namaBarang}
                            </h2>
                        </div>

                        <span
                            style={{
                                display: "inline-block",
                                backgroundColor: style.bg,
                                color: style.color,
                                padding: "0.375rem 0.75rem",
                                borderRadius: "1.25rem",
                                fontSize: "0.75rem",
                                fontWeight: "700",
                            }}
                        >
                            {selectedDetail.status}
                        </span>
                    </div>

                    {/* INFORMASI BARANG */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(min(11.25rem, 100%), 1fr))",
                            gap: "0.75rem",
                            fontSize: "0.8125rem",
                            color: "#4B5563",
                            backgroundColor: "#F8FAFC",
                            padding: "1rem",
                            borderRadius: "0.5rem",
                            marginBottom: "1.125rem",
                        }}
                    >
                        <div>
                            🏷️ <strong>Kategori:</strong>{" "}
                            {selectedDetail.kategori}
                        </div>

                        <div>
                            📍 <strong>Lokasi:</strong>{" "}
                            {selectedDetail.lokasi}
                        </div>

                        <div>
                            📅 <strong>Tanggal kejadian:</strong>{" "}
                            {selectedDetail.tanggalKejadian}
                        </div>

                        {selectedDetail.tanggalSelesai && (
                            <div>
                                ✓ <strong>Tanggal selesai:</strong>{" "}
                                {selectedDetail.tanggalSelesai}
                            </div>
                        )}
                    </div>

                    {/* DESKRIPSI */}
                    <div
                        style={{
                            marginBottom: "1.125rem",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "0.875rem",
                                fontWeight: "700",
                                color: "#1F2937",
                                margin: "0 0 0.375rem",
                            }}
                        >
                            Deskripsi Barang
                        </h4>

                        <p
                            style={{
                                fontSize: "0.8125rem",
                                color: "#4B5563",
                                margin: 0,
                                lineHeight: 1.6,
                                overflowWrap: "anywhere",
                            }}
                        >
                            {selectedDetail.deskripsi}
                        </p>
                    </div>

                    {/* INFORMASI STATUS */}
                    <div
                        style={{
                            marginBottom: "1.25rem",
                            backgroundColor: style.bg,
                            color: style.color,
                            padding: "0.75rem 0.875rem",
                            borderRadius: "0.5rem",
                            fontSize: "0.8125rem",
                            lineHeight: 1.6,
                            borderLeft:
                                `0.25rem solid ${style.border} `,
                            overflowWrap: "anywhere",
                        }}
                    >
                        <strong>Informasi status:</strong>{" "}
                        {selectedDetail.pesanPamdal ||
                            `Status laporan: ${selectedDetail.status}.`}
                    </div>

                    {/* STATUS PENYELESAIAN */}
                    <div
                        style={{
                            borderTop: "0.0625rem solid #E5E7EB",
                            paddingTop: "1.125rem",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "0.9375rem",
                                fontWeight: "700",
                                color: "#1F2937",
                                margin: "0 0 0.625rem",
                            }}
                        >
                            ℹ️ Status Penyelesaian
                        </h4>

                        <div
                            style={{
                                padding: "1rem",
                                backgroundColor: "#F8FAFC",
                                borderRadius: "0.5rem",
                                border: "0.0625rem solid #E5E7EB",
                                fontSize: "0.8125rem",
                                color: "#4B5563",
                                lineHeight: 1.6,
                            }}
                        >
                            {isFinished(selectedDetail) ? (
                                <>
                                    <strong>
                                        Barang telah dikembalikan
                                        ke pemilik!
                                    </strong>

                                    <p
                                        style={{
                                            margin: "0.25rem 0 0",
                                        }}
                                    >
                                        Terima kasih atas laporan
                                        Anda. Pengembalian barang
                                        telah dicatat oleh tim
                                        Pamdal.
                                    </p>
                                </>
                            ) : (
                                <p
                                    style={{
                                        margin: 0,
                                    }}
                                >
                                    Laporan ini masih aktif.
                                    Catatan dan proses serah terima
                                    akan diselesaikan oleh tim
                                    Pamdal di pos pengamanan.
                                </p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    // HALAMAN UTAMA RIWAYAT LAPORAN
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "56.25rem",
                margin: "0 auto",
                textAlign: "left",
            }}
        >
            {/* HEADER */}
            <header
                style={{
                    marginBottom: "1.375rem",
                    textAlign: "left",
                }}
            >
                <h2
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "800",
                        color: "var(--text-main, #1F2937)",
                        margin: "0 0 0.375rem",
                    }}
                >
                    Riwayat Laporan
                </h2>

                <p
                    style={{
                        fontSize: "0.875rem",
                        color: "var(--text-muted, #6B7280)",
                        margin: 0,
                        lineHeight: 1.5,
                    }}
                >
                    Pantau laporan kehilangan dan penemuan,
                    status terkini, serta informasi penyelesaian
                    jika tersedia.
                </p>
            </header>

            {/* RINGKASAN */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(8.125rem, 1fr))",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
                }}
            >
                {[
                    {
                        label: "Semua Laporan",
                        value: reports.length,
                        key: "Semua",
                    },
                    {
                        label: "Laporan Aktif",
                        value: activeCount,
                        key: "Aktif",
                    },
                    {
                        label: "Selesai",
                        value: finishedCount,
                        key: "Selesai",
                    },
                ].map((summary) => (
                    <button
                        key={summary.key}
                        type="button"
                        onClick={() =>
                            setFilterStatus(summary.key)
                        }
                        aria-pressed={
                            filterStatus === summary.key
                        }
                        style={{
                            display: "block",
                            width: "100%",
                            minWidth: 0,
                            textAlign: "left",
                            padding: "1rem",
                            borderRadius: "0.625rem",
                            border:
                                filterStatus === summary.key
                                    ? "0.125rem solid #F59E0B"
                                    : "0.0625rem solid #E5E7EB",
                            backgroundColor: "#FFFFFF",
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "1.5rem",
                                fontWeight: "800",
                                color: "#1F2937",
                            }}
                        >
                            {summary.value}
                        </div>

                        <div
                            style={{
                                fontSize: "0.75rem",
                                color: "#6B7280",
                                marginTop: "0.25rem",
                            }}
                        >
                            {summary.label}
                        </div>
                    </button>
                ))}
            </div>

            {/* PENCARIAN DAN FILTER */}
            <div
                style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginBottom: "1.125rem",
                    alignItems: "center",
                }}
            >
                <input
                    type="text"
                    className="form-input"
                    value={searchQuery}
                    onChange={(event) =>
                        setSearchQuery(event.target.value)
                    }
                    placeholder="Cari nama, kategori, atau lokasi..."
                    aria-label="Cari laporan"
                    style={{
                        flex: "1 1 15rem",
                        minWidth: 0,
                        backgroundColor: "#FFFFFF",
                        color: "#111827",
                    }}
                />

                <select
                    value={filterStatus}
                    onChange={(event) =>
                        setFilterStatus(event.target.value)
                    }
                    aria-label="Filter status laporan"
                    className="form-select"
                    style={{
                        width: "auto",
                        minWidth: "9.375rem",
                    }}
                >
                    <option value="Semua">
                        Semua Status
                    </option>
                    <option value="Aktif">Aktif</option>
                    <option value="Selesai">Selesai</option>
                </select>
            </div>

            {/* DAFTAR LAPORAN */}
            {filteredReports.length > 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.875rem",
                    }}
                >
                    {filteredReports.map((item) => {
                        const style = getStatusStyle(
                            item.status
                        );

                        return (
                            <article
                                key={item.id}
                                style={{
                                    width: "100%",
                                    minWidth: 0,
                                    backgroundColor: "#FFFFFF",
                                    borderRadius: "0.75rem",
                                    border: "0.0625rem solid #E5E7EB",
                                    padding: "1.125rem",
                                    boxShadow:
                                        "0 0.0625rem 0.1875rem rgba(0,0,0,0.04)",
                                    borderLeft:
                                        `0.3125rem solid ${style.border} `,
                                }}
                            >
                                {/* JUDUL DAN STATUS */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        gap: "0.75rem",
                                        flexWrap: "wrap",
                                        marginBottom: "0.625rem",
                                    }}
                                >
                                    <div
                                        style={{
                                            minWidth: 0,
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                gap: "0.5rem",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                marginBottom: "0.3125rem",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "0.625rem",
                                                    fontWeight: "700",
                                                    padding: "0.25rem 0.4375rem",
                                                    borderRadius: "0.25rem",
                                                    backgroundColor:
                                                        item.jenis ===
                                                            "Kehilangan"
                                                            ? "#FEF3C7"
                                                            : "#D1FAE5",
                                                    color:
                                                        item.jenis ===
                                                            "Kehilangan"
                                                            ? "#92400E"
                                                            : "#065F46",
                                                }}
                                            >
                                                {item.jenis}
                                            </span>

                                            <span
                                                style={{
                                                    fontSize: "0.6875rem",
                                                    color: "#6B7280",
                                                }}
                                            >
                                                ID: #{item.id}
                                            </span>
                                        </div>

                                        <h3
                                            style={{
                                                fontSize: "1.0625rem",
                                                fontWeight: "700",
                                                color: "#1F2937",
                                                margin: 0,
                                                overflowWrap: "anywhere",
                                            }}
                                        >
                                            {item.namaBarang}
                                        </h3>
                                    </div>

                                    <span
                                        style={{
                                            flexShrink: 0,
                                            backgroundColor: style.bg,
                                            color: style.color,
                                            padding: "0.3125rem 0.625rem",
                                            borderRadius: "1.25rem",
                                            fontSize: "0.6875rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                {/* INFORMASI SINGKAT */}
                                <div
                                    style={{
                                        display: "flex",
                                        gap: "0.5rem 1.125rem",
                                        flexWrap: "wrap",
                                        fontSize: "0.75rem",
                                        color: "#4B5563",
                                        marginBottom: "0.75rem",
                                    }}
                                >
                                    <span>
                                        🏷️ {item.kategori}
                                    </span>

                                    <span>
                                        📍 {item.lokasi}
                                    </span>

                                    <span>
                                        📅 {item.tanggalKejadian}
                                    </span>
                                </div>

                                <p
                                    style={{
                                        fontSize: "0.8125rem",
                                        color: "#4B5563",
                                        lineHeight: 1.55,
                                        margin: "0 0 0.75rem",
                                    }}
                                >
                                    {item.pesanPamdal ||
                                        `Status laporan: ${item.status}.`}
                                </p>

                                {/* TOMBOL DETAIL */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        borderTop:
                                            "0.0625rem solid #F3F4F6",
                                        paddingTop: "0.75rem",
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedDetail(item)
                                        }
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "0.5625rem 0.8125rem",
                                            backgroundColor: "#2563EB",
                                            color: "#FFFFFF",
                                            border: "none",
                                            borderRadius: "0.4375rem",
                                            fontFamily: "inherit",
                                            fontSize: "0.75rem",
                                            fontWeight: "600",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Lihat Detail →
                                    </button>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div
                    style={{
                        textAlign: "center",
                        padding: "2.25rem 1.25rem",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "0.75rem",
                        border: "0.0625rem solid #E5E7EB",
                        color: "#6B7280",
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 0.375rem",
                            fontWeight: "700",
                            color: "#374151",
                        }}
                    >
                        Tidak ada laporan yang cocok
                    </p>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "0.8125rem",
                        }}
                    >
                        Coba ubah filter status atau kata kunci
                        pencarian.
                    </p>
                </div>
            )}

        </div>
    );
}