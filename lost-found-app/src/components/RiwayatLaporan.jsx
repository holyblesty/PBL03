import React, { useMemo, useState } from "react";

const DUMMY_REPORTS = [
    {
        id: 101,
        namaBarang: "Dompet Hitam Kulit",
        jenis: "Kehilangan",
        kategori: "Dompet",
        lokasi: "Gedung Utama",
        tanggalKejadian: "26 Sep 2026",
        status: "Dipublikasikan",
        deskripsi: "Dompet kulit warna hitam merek Fossil.",
        pesanPamdal: "Laporan telah ditampilkan pada katalog barang.",
        buktiFoto: null,
        tanggalSelesai: null,
    },
    {
        id: 102,
        namaBarang: "Tumbler Corkcicle",
        jenis: "Penemuan",
        kategori: "Botol Minum",
        lokasi: "Kantin",
        tanggalKejadian: "24 Sep 2026",
        status: "Dipublikasikan",
        deskripsi:
            "Tumbler warna biru navy tertinggal di meja kantin.",
        pesanPamdal:
            "Barang telah ditampilkan pada katalog. Pemilik dapat mendatangi Pos Pamdal dengan membawa bukti kepemilikan.",
        buktiFoto: null,
        tanggalSelesai: null,
    },
    {
        id: 103,
        namaBarang: "Kunci Motor Honda",
        jenis: "Penemuan",
        kategori: "Kunci",
        lokasi: "Area Parkir Gedung A",
        tanggalKejadian: "20 Okt 2026",
        status: "Menunggu Penerimaan Pamdal",
        deskripsi: "Kunci motor Honda dengan gantungan kunci warna merah.",
        pesanPamdal:
            "Menunggu proses penerimaan barang oleh pamdal. Serahkan barang ke Pos Pamdal; laporan akan dipublikasikan ke katalog setelah barang diterima.",
        buktiFoto: null,
        tanggalSelesai: null,
    },
    {
        id: 201,
        namaBarang: "Jas Lab Kampus",
        jenis: "Kehilangan",
        kategori: "Pakaian",
        lokasi: "Gedung Techno (Lab RPL)",
        tanggalKejadian: "18 Sep 2026",
        status: "Dikembalikan",
        deskripsi:
            "Jas lab tertinggal di kursi laboratorium dan berhasil ditemukan kembali.",
        pesanPamdal: "Pengembalian barang telah dicatat.",
        buktiFoto: null,
        tanggalSelesai: "22 Sep 2026",
    },
];

const STATUS_STYLES = {
    Dipublikasikan: {
        bg: "#DBEAFE",
        color: "#1D4ED8",
        border: "#3B82F6",
    },
    "Menunggu Penerimaan Pamdal": {
        bg: "#FFEDD5",
        color: "#C2410C",
        border: "#F97316",
    },
    "Menunggu Verifikasi": {
        bg: "#FEF3C7",
        color: "#B45309",
        border: "#F59E0B",
    },
    "Sedang Diklaim": {
        bg: "#EDE9FE",
        color: "#6D28D9",
        border: "#8B5CF6",
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

export default function RiwayatLaporan() {
    const [myReports] = useState(DUMMY_REPORTS);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [filterStatus, setFilterStatus] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");

    const getStatusStyle = (status) =>
        STATUS_STYLES[status] || DEFAULT_STATUS_STYLE;

    const isFinished = (item) =>
        item.status === "Dikembalikan";

    const activeCount = myReports.filter(
        (item) => !isFinished(item)
    ).length;

    const finishedCount = myReports.filter(
        isFinished
    ).length;

    const filteredReports = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return myReports.filter((item) => {
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
    }, [myReports, filterStatus, searchQuery]);

    // DETAIL LAPORAN
    if (selectedDetail) {
        const style = getStatusStyle(
            selectedDetail.status
        );

        return (
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
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
                        borderRadius: "12px",
                        border: "1px solid #E5E7EB",
                        padding: "24px",
                        boxShadow:
                            "0 1px 3px rgba(0,0,0,0.04)",
                        textAlign: "left",
                    }}
                >
                    {/* JUDUL DAN STATUS */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            gap: "12px",
                            flexWrap: "wrap",
                            marginBottom: "18px",
                        }}
                    >
                        <div>
                            <span
                                style={{
                                    fontSize: "11px",
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
                                    fontSize: "22px",
                                    fontWeight: "800",
                                    color: "#1F2937",
                                    margin: "5px 0 0",
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
                                padding: "6px 12px",
                                borderRadius: "20px",
                                fontSize: "12px",
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
                                "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
                            gap: "12px",
                            fontSize: "13px",
                            color: "#4B5563",
                            backgroundColor: "#F8FAFC",
                            padding: "16px",
                            borderRadius: "8px",
                            marginBottom: "18px",
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
                            marginBottom: "18px",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "14px",
                                fontWeight: "700",
                                color: "#1F2937",
                                margin: "0 0 6px",
                            }}
                        >
                            Deskripsi Barang
                        </h4>

                        <p
                            style={{
                                fontSize: "13px",
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
                            marginBottom: "20px",
                            backgroundColor: style.bg,
                            color: style.color,
                            padding: "12px 14px",
                            borderRadius: "8px",
                            fontSize: "13px",
                            lineHeight: 1.6,
                            borderLeft:
                                `4px solid ${style.border} `,
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
                            borderTop: "1px solid #E5E7EB",
                            paddingTop: "18px",
                        }}
                    >
                        <h4
                            style={{
                                fontSize: "15px",
                                fontWeight: "700",
                                color: "#1F2937",
                                margin: "0 0 10px",
                            }}
                        >
                            ℹ️ Status Penyelesaian
                        </h4>

                        <div
                            style={{
                                padding: "16px",
                                backgroundColor: "#F8FAFC",
                                borderRadius: "8px",
                                border: "1px solid #E5E7EB",
                                fontSize: "13px",
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
                                            margin: "4px 0 0",
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
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "left",
            }}
        >
            {/* HEADER */}
            <header
                style={{
                    marginBottom: "22px",
                    textAlign: "left",
                }}
            >
                <h2
                    style={{
                        fontSize: "24px",
                        fontWeight: "800",
                        color: "var(--text-main, #1F2937)",
                        margin: "0 0 6px",
                    }}
                >
                    Riwayat Laporan
                </h2>

                <p
                    style={{
                        fontSize: "14px",
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
                        "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: "12px",
                    marginBottom: "20px",
                }}
            >
                {[
                    {
                        label: "Semua Laporan",
                        value: myReports.length,
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
                            padding: "16px",
                            borderRadius: "10px",
                            border:
                                filterStatus === summary.key
                                    ? "2px solid #F59E0B"
                                    : "1px solid #E5E7EB",
                            backgroundColor: "#FFFFFF",
                            cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "24px",
                                fontWeight: "800",
                                color: "#1F2937",
                            }}
                        >
                            {summary.value}
                        </div>

                        <div
                            style={{
                                fontSize: "12px",
                                color: "#6B7280",
                                marginTop: "4px",
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
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "18px",
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
                        flex: "1 1 240px",
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
                        minWidth: "150px",
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
                        gap: "14px",
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
                                    borderRadius: "12px",
                                    border: "1px solid #E5E7EB",
                                    padding: "18px",
                                    boxShadow:
                                        "0 1px 3px rgba(0,0,0,0.04)",
                                    borderLeft:
                                        `5px solid ${style.border} `,
                                }}
                            >
                                {/* JUDUL DAN STATUS */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        gap: "12px",
                                        flexWrap: "wrap",
                                        marginBottom: "10px",
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
                                                gap: "8px",
                                                alignItems: "center",
                                                flexWrap: "wrap",
                                                marginBottom: "5px",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: "10px",
                                                    fontWeight: "700",
                                                    padding: "4px 7px",
                                                    borderRadius: "4px",
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
                                                    fontSize: "11px",
                                                    color: "#6B7280",
                                                }}
                                            >
                                                ID: #{item.id}
                                            </span>
                                        </div>

                                        <h3
                                            style={{
                                                fontSize: "17px",
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
                                            padding: "5px 10px",
                                            borderRadius: "20px",
                                            fontSize: "11px",
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
                                        gap: "8px 18px",
                                        flexWrap: "wrap",
                                        fontSize: "12px",
                                        color: "#4B5563",
                                        marginBottom: "12px",
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
                                        fontSize: "13px",
                                        color: "#4B5563",
                                        lineHeight: 1.55,
                                        margin: "0 0 12px",
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
                                            "1px solid #F3F4F6",
                                        paddingTop: "12px",
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
                                            padding: "9px 13px",
                                            backgroundColor: "#2563EB",
                                            color: "#FFFFFF",
                                            border: "none",
                                            borderRadius: "7px",
                                            fontFamily: "inherit",
                                            fontSize: "12px",
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
                        padding: "36px 20px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        border: "1px solid #E5E7EB",
                        color: "#6B7280",
                    }}
                >
                    <p
                        style={{
                            margin: "0 0 6px",
                            fontWeight: "700",
                            color: "#374151",
                        }}
                    >
                        Tidak ada laporan yang cocok
                    </p>

                    <p
                        style={{
                            margin: 0,
                            fontSize: "13px",
                        }}
                    >
                        Coba ubah filter status atau kata kunci
                        pencarian.
                    </p>
                </div>
            )}

            {/* CATATAN DATA */}
            <p
                style={{
                    marginTop: "18px",
                    fontSize: "11px",
                    color: "#9CA3AF",
                    lineHeight: 1.5,
                }}
            >
                Catatan: halaman ini masih menggunakan data
                dummy. Setelah backend terhubung, data akan
                diambil dari laporan milik pengguna yang sedang
                login.
            </p>
        </div>
    );
}