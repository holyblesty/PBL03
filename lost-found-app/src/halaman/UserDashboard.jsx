/**
 * File: UserDashboard.jsx
 * Fungsi: Menampilkan dashboard pengguna, katalog barang, serta mengelola laporan pengguna melalui localStorage.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React, { useState } from "react";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import ReportForm from "../components/ReportForm";
import ItemDetail from "../components/ItemDetail";
import RiwayatLaporan from "../components/RiwayatLaporan";
import "../App.css";

const DUMMY_REPORTS = [
    {
        id: 1,
        namaBarang: "Dompet Hitam Kulit",
        jenis: "Kehilangan",
        kategori: "Dompet",
        lokasi: "Gedung Utama (Mushola Lantai 1)",
        tanggal: "26 Sep 2026",
        status: "Dipublikasikan",
        foto: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=500&q=80",
        deskripsi: "Dompet kulit warna hitam merek Fossil, berisi Kartu Identitas dan STTM.",
    },
    {
        id: 2,
        namaBarang: "Tumbler Corkcicle",
        jenis: "Penemuan",
        kategori: "Botol Minum",
        lokasi: "Kantin",
        tanggal: "24 Sep 2026",
        status: "Dipublikasikan",
        foto: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80",
        deskripsi: "Tumbler warna biru navy tertinggal di atas meja makan kantin.",
    },
    {
        id: 3,
        namaBarang: "Kunci Motor Honda",
        jenis: "Kehilangan",
        kategori: "Kunci",
        lokasi: "Parkiran",
        tanggal: "27 Sep 2026",
        status: "Dipublikasikan",
        foto: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=500&q=80",
        deskripsi: "Kunci kontak motor Honda Beat dengan gantungan kunci kecil warna merah.",
    },
    {
        id: 4,
        namaBarang: "Laptop ASUS Vivobook",
        jenis: "Kehilangan",
        kategori: "Elektronik",
        lokasi: "Gedung TA",
        tanggal: "28 Sep 2026",
        status: "Dipublikasikan",
        foto: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
        deskripsi: "Laptop ASUS Vivobook warna silver yang tertinggal di ruang kelas.",
    },
    {
        id: 5,
        namaBarang: "Jaket Hitam",
        jenis: "Penemuan",
        kategori: "Pakaian",
        lokasi: "Gedung Utama",
        tanggal: "29 Sep 2026",
        tanggalKejadian: "29 Sep 2026",
        tanggalSelesai: "02 Okt 2026",
        status: "Dikembalikan",
        foto: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&q=80",
        deskripsi: "Jaket hitam ditemukan di area lorong Gedung Utama.",
        pesanPamdal: "Barang telah diserahkan kepada pemilik setelah bukti kepemilikan diverifikasi oleh Pamdal.",
    },
    {
        id: 6,
        namaBarang: "Earphone Wireless",
        jenis: "Penemuan",
        kategori: "Elektronik",
        lokasi: "Smoking Area",
        tanggal: "30 Sep 2026",
        status: "Dipublikasikan",
        foto: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=500&q=80",
        deskripsi: "Earphone wireless putih ditemukan di sekitar Smoking Area.",
    },
];

const KATEGORI_OPTIONS = [
    "Dompet",
    "Botol Minum",
    "Kunci",
    "Elektronik",
    "Pakaian",
    "Aksesoris",
];

const LOKASI_OPTIONS = [
    "Kantin",
    "Mushola",
    "Parkiran",
    "Gedung Utama",
    "Gedung TA",
    "Smoking Area",
    "Gedung Techno",
];

const REPORTS_STORAGE_KEY = "lost_found_user_reports";

const loadUserReports = () => {
    try {
        const savedReports = localStorage.getItem(REPORTS_STORAGE_KEY);
        const parsedReports = savedReports ? JSON.parse(savedReports) : [];

        return Array.isArray(parsedReports) ? parsedReports : [];
    } catch {
        return [];
    }
};

const saveUserReports = (reports) => {
    try {
        localStorage.setItem(
            REPORTS_STORAGE_KEY,
            JSON.stringify(reports)
        );
    } catch {
        throw new Error("Penyimpanan browser penuh atau tidak tersedia.");
    }
};

const fileToDataUrl = (file) => {
    if (!(file instanceof File)) {
        return Promise.resolve(file || "");
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Foto gagal dibaca."));

        reader.readAsDataURL(file);
    });
};

const getReportType = (report) => {
    const type = String(
        report?.jenisLaporan || report?.jenis || ""
    ).toLowerCase();

    if (type === "hilang" || type === "kehilangan") {
        return "Kehilangan";
    }

    if (type === "temuan" || type === "penemuan") {
        return "Penemuan";
    }

    return "";
};

const isReportEditable = (report) => {
    if (!report || report.status === "Dikembalikan") {
        return false;
    }

    const jenis = getReportType(report);

    if (jenis === "Kehilangan") {
        return true;
    }

    return (
        jenis === "Penemuan" &&
        report.status === "Menunggu Penerimaan Barang"
    );
};

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [userReports, setUserReports] = useState(loadUserReports);
    const [editingReport, setEditingReport] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterJenis, setFilterJenis] = useState("Semua");
    const [filterKategori, setFilterKategori] = useState("");
    const [filterLokasi, setFilterLokasi] = useState("");

    const reportsForDisplay = userReports.map((report) => ({
        ...report,
        jenis: getReportType(report),
        tanggal: report.tanggalKejadian || report.tanggal,
        deskripsi: [
            report.merekModel,
            report.warna,
            report.deskripsi,
            report.kronologi,
        ]
            .filter(Boolean)
            .join(" • "),
    }));

    // Data riwayat mencakup laporan pengguna dan dummy yang sudah dikembalikan.
    const historyReports = [
        ...reportsForDisplay,
        ...DUMMY_REPORTS
            .filter((item) => item.status === "Dikembalikan")
            .map((item) => ({
                ...item,
                tanggalKejadian: item.tanggalKejadian || item.tanggal,
                buktiFoto: item.foto,
            })),
    ];

    // Katalog hanya menampilkan laporan dengan status Dipublikasikan.
    const activeReports = [
        ...reportsForDisplay,
        ...DUMMY_REPORTS,
    ].filter((item) => item.status === "Dipublikasikan");

    const persistReports = (updatedReports) => {
        saveUserReports(updatedReports);
        setUserReports(updatedReports);
    };

    const handleSubmitReport = async (payload) => {
        try {
            const foto = await fileToDataUrl(payload.foto);

            if (editingReport) {
                const currentReport = userReports.find(
                    (item) => item.id === editingReport.id
                );

                if (!currentReport || !isReportEditable(currentReport)) {
                    setEditingReport(null);
                    setActiveTab("riwayat-laporan");

                    window.alert(
                        "Laporan ini sudah tidak dapat diedit karena statusnya telah berubah."
                    );

                    return;
                }
            }

            const report = {
                ...payload,
                foto,
                id: editingReport?.id || Date.now(),
                dibuatPada:
                    editingReport?.dibuatPada || new Date().toISOString(),
            };

            const updatedReports = editingReport
                ? userReports.map((item) =>
                    item.id === editingReport.id ? report : item
                )
                : [report, ...userReports];

            persistReports(updatedReports);
            setEditingReport(null);
            setActiveTab("riwayat-laporan");
        } catch (error) {
            window.alert(error.message || "Laporan gagal disimpan.");
        }
    };

    const handleEditReport = (report) => {
        if (!isReportEditable(report)) {
            window.alert(
                "Laporan ini tidak dapat diedit karena statusnya sudah tidak memenuhi ketentuan."
            );
            return;
        }

        setEditingReport(report);
        setSelectedItem(null);
        setActiveTab("laporan");
    };

    const handleDeleteReport = (reportId) => {
        const report = userReports.find(
            (item) => item.id === reportId
        );

        if (!isReportEditable(report)) {
            window.alert(
                "Laporan ini tidak dapat dihapus karena statusnya sudah tidak memenuhi ketentuan."
            );
            return;
        }

        const confirmed = window.confirm(
            "Yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan."
        );

        if (!confirmed) return;

        persistReports(
            userReports.filter((item) => item.id !== reportId)
        );
    };

    const filteredReports = activeReports.filter((item) => {
        const keyword = searchQuery.trim().toLowerCase();

        const matchesSearch =
            String(item.namaBarang || "").toLowerCase().includes(keyword) ||
            String(item.deskripsi || "").toLowerCase().includes(keyword) ||
            String(item.lokasi || "").toLowerCase().includes(keyword);

        const matchesJenis =
            filterJenis === "Semua" || item.jenis === filterJenis;

        const matchesKategori =
            filterKategori === "" || item.kategori === filterKategori;

        const matchesLokasi =
            filterLokasi === "" ||
            String(item.lokasi || "")
                .toLowerCase()
                .includes(filterLokasi.toLowerCase());

        return (
            matchesSearch &&
            matchesJenis &&
            matchesKategori &&
            matchesLokasi
        );
    });

    const resetFilters = () => {
        setSearchQuery("");
        setFilterJenis("Semua");
        setFilterKategori("");
        setFilterLokasi("");
    };

    const jumlahSemua = activeReports.length;

    const jumlahKehilangan = activeReports.filter(
        (item) => item.jenis === "Kehilangan"
    ).length;

    const jumlahPenemuan = activeReports.filter(
        (item) => item.jenis === "Penemuan"
    ).length;

    const renderMainContent = () => {
        if (selectedItem) {
            return (
                <ItemDetail
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                />
            );
        }

        if (activeTab === "laporan") {
            return (
                <ReportForm
                    key={editingReport?.id || "new-report"}
                    initialReport={editingReport}
                    onSubmitReport={handleSubmitReport}
                    onCancelEdit={() => {
                        setEditingReport(null);
                        setActiveTab("riwayat-laporan");
                    }}
                />
            );
        }

        if (activeTab === "riwayat-laporan") {
            return (
                <RiwayatLaporan
                    reports={historyReports}
                    onEdit={handleEditReport}
                    onDelete={handleDeleteReport}
                />
            );
        }

        return (
            <>
                <div
                    className="user-catalog-header"
                    style={{ marginBottom: "24px" }}
                >
                    <h1>Daftar Barang Hilang & Temuan</h1>
                    <p>
                        Temukan barang yang hilang atau bantu mengembalikan
                        barang yang ditemukan di lingkungan kampus.
                    </p>
                </div>

                {/* PANEL PENCARIAN DAN FILTER */}
                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                        padding: "20px",
                        marginBottom: "20px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    }}
                >
                    <div style={{ marginBottom: "16px" }}>
                        <label
                            style={{
                                display: "block",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#374151",
                                marginBottom: "7px",
                            }}
                        >
                            Cari Barang
                        </label>

                        <div
                            className="search-input-wrapper"
                            style={{ width: "100%" }}
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#6B7280"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line
                                    x1="21"
                                    y1="21"
                                    x2="16.65"
                                    y2="16.65"
                                />
                            </svg>

                            <input
                                type="text"
                                placeholder="Cari nama barang, deskripsi, atau lokasi..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "12px",
                        }}
                    >
                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "#374151",
                                    marginBottom: "7px",
                                }}
                            >
                                Kategori
                            </label>

                            <select
                                value={filterKategori}
                                onChange={(e) =>
                                    setFilterKategori(e.target.value)
                                }
                                style={selectStyle}
                            >
                                <option value="">Semua Kategori</option>
                                {KATEGORI_OPTIONS.map((kategori) => (
                                    <option key={kategori} value={kategori}>
                                        {kategori}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                style={{
                                    display: "block",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "#374151",
                                    marginBottom: "7px",
                                }}
                            >
                                Area Lokasi
                            </label>

                            <select
                                value={filterLokasi}
                                onChange={(e) =>
                                    setFilterLokasi(e.target.value)
                                }
                                style={selectStyle}
                            >
                                <option value="">Semua Area Lokasi</option>
                                {LOKASI_OPTIONS.map((lokasi) => (
                                    <option key={lokasi} value={lokasi}>
                                        {lokasi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "end",
                            }}
                        >
                            <button
                                onClick={resetFilters}
                                style={{
                                    ...selectStyle,
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                Reset Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* TAB JENIS LAPORAN */}
                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        borderBottom: "1px solid #E5E7EB",
                        marginBottom: "20px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "25px",
                            overflowX: "auto",
                        }}
                    >
                        {[
                            {
                                label: "Semua",
                                value: "Semua",
                                count: jumlahSemua,
                            },
                            {
                                label: "Kehilangan",
                                value: "Kehilangan",
                                count: jumlahKehilangan,
                            },
                            {
                                label: "Penemuan",
                                value: "Penemuan",
                                count: jumlahPenemuan,
                            },
                        ].map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setFilterJenis(tab.value)}
                                style={{
                                    padding: "12px 4px",
                                    border: "none",
                                    borderBottom:
                                        filterJenis === tab.value
                                            ? "2px solid #2563EB"
                                            : "2px solid transparent",
                                    backgroundColor: "transparent",
                                    color:
                                        filterJenis === tab.value
                                            ? "#2563EB"
                                            : "#6B7280",
                                    fontWeight:
                                        filterJenis === tab.value
                                            ? "700"
                                            : "500",
                                    cursor: "pointer",
                                }}
                            >
                                {tab.label} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontSize: "13px",
                            color: "#6B7280",
                        }}
                    >
                        Menampilkan{" "}
                        <strong style={{ color: "#374151" }}>
                            {filteredReports.length}
                        </strong>{" "}
                        barang aktif
                    </p>
                </div>

                {/* KATALOG BARANG AKTIF */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "20px",
                        marginBottom: "24px",
                    }}
                >
                    {filteredReports.length > 0 ? (
                        filteredReports.map((item) => {
                            const isKehilangan =
                                item.jenis === "Kehilangan";

                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: "12px",
                                        border: "1px solid #E5E7EB",
                                        overflow: "hidden",
                                        boxShadow:
                                            "0 1px 3px rgba(0,0,0,0.05)",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "180px",
                                            backgroundColor: "#F3F4F6",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <img
                                            src={item.foto}
                                            alt={item.namaBarang}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />

                                        <span
                                            style={{
                                                position: "absolute",
                                                top: "12px",
                                                right: "12px",
                                                backgroundColor: isKehilangan
                                                    ? "#FEF3C7"
                                                    : "#D1FAE5",
                                                color: isKehilangan
                                                    ? "#D97706"
                                                    : "#059669",
                                                padding: "5px 10px",
                                                borderRadius: "20px",
                                                fontSize: "11px",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {item.jenis}
                                        </span>
                                    </div>

                                    <div
                                        style={{
                                            padding: "16px",
                                            flex: 1,
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "700",
                                                color: "#1F2937",
                                                margin: "0 0 8px 0",
                                            }}
                                        >
                                            {item.namaBarang}
                                        </h3>

                                        <div style={metaStyle}>
                                            🏷️ {item.kategori}
                                        </div>

                                        <div style={metaStyle}>
                                            📍 {item.lokasi}
                                        </div>

                                        <div style={metaStyle}>
                                            📅 {item.tanggal}
                                        </div>

                                        <p
                                            style={{
                                                fontSize: "13px",
                                                color: "#6B7280",
                                                lineHeight: "1.5",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                                margin: 0,
                                            }}
                                        >
                                            {item.deskripsi}
                                        </p>
                                    </div>

                                    <div style={{ padding: "0 16px 16px" }}>
                                        <button
                                            onClick={() =>
                                                setSelectedItem(item)
                                            }
                                            style={{
                                                width: "100%",
                                                padding: "10px 14px",
                                                backgroundColor: "#2563EB",
                                                color: "#FFFFFF",
                                                border: "none",
                                                borderRadius: "7px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Lihat Detail →
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div
                            style={{
                                gridColumn: "1 / -1",
                                textAlign: "center",
                                padding: "50px 20px",
                                backgroundColor: "#FFFFFF",
                                borderRadius: "12px",
                                border: "1px solid #E5E7EB",
                                color: "#6B7280",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "35px",
                                    marginBottom: "10px",
                                }}
                            >
                                🔍
                            </div>

                            <h3
                                style={{
                                    margin: "0 0 6px",
                                    color: "#374151",
                                    fontSize: "16px",
                                }}
                            >
                                Barang tidak ditemukan
                            </h3>

                            <p style={{ margin: 0, fontSize: "13px" }}>
                                Coba ubah kata kunci atau filter pencarian.
                            </p>
                        </div>
                    )}
                </div>
            </>
        );
    };

    return (
        <div
            className="dashboard-container"
            style={{
                display: "flex",
                width: "100%",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <UserSidebar
                activeTab={activeTab}
                collapsed={sidebarCollapsed}
                onToggle={() =>
                    setSidebarCollapsed((prev) => !prev)
                }
                setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSelectedItem(null);
                }}
            />

            <main
                className="dashboard-main"
                style={{
                    flex: 1,
                    minWidth: 0,
                    height: "100vh",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <UserNavbar />

                <div
                    className="dashboard-content"
                    style={{
                        padding: "24px",
                        flex: 1,
                    }}
                >
                    {renderMainContent()}
                </div>
            </main>
        </div>
    );
}

const selectStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "7px",
    border: "1px solid #D1D5DB",
    backgroundColor: "#FFFFFF",
    color: "#374151",
    fontSize: "13px",
    outline: "none",
};

const metaStyle = {
    fontSize: "12px",
    color: "#6B7280",
    marginBottom: "7px",
};