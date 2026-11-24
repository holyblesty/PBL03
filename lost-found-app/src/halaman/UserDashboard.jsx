
/**
 * File: UserDashboard.jsx
 * Fungsi: Menampilkan katalog barang hilang dan temuan dari database MySQL, form laporan, serta riwayat laporan pengguna.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import UserNavbar from "../components/UserNavbar";
import ItemDetail from "../components/ItemDetail";
import ReportForm from "../components/ReportForm";
import UserFooter from "../components/UserFooter";
import RiwayatLaporan from "../components/RiwayatLaporan";
import "../App.css";

// URL API backend
const API_URL = "http://localhost:5000/api/laporan";

export default function UserDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [katalog, setKatalog] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    // Menyimpan laporan pengguna di localStorage
    const [laporanPengguna, setLaporanPengguna] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("laporanPengguna")
            ) || [];
        } catch {
            return [];
        }
    });

    const mainRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [filterJenis, setFilterJenis] = useState("Semua");
    const [filterKategori, setFilterKategori] = useState("");
    const [filterLokasi, setFilterLokasi] = useState("");

    // Mengambil data laporan dari database melalui backend.
    const muatData = useCallback(async () => {
        setLoading(true);
        setLoadError("");

        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(
                    `Permintaan gagal (HTTP ${response.status})`
                );
            }

            const data = await response.json();

            if (!Array.isArray(data)) {
                throw new Error("Format respons API tidak sesuai.");
            }

            // Menyesuaikan nama kolom SQL dengan kebutuhan React.
            const dataKatalog = data.map((report) => ({
                ...report,
                jenis:
                    report.jenis_laporan === "hilang"
                        ? "Kehilangan"
                        : "Penemuan",
                jenisLaporan: report.jenis_laporan,
                namaBarang: report.nama_barang,
                merekModel: report.merek_model,
                tanggalKejadian: report.tanggal_kejadian,
                waktuKejadian: report.waktu_kejadian,
                detailLokasi: report.detail_lokasi,
                foto: report.foto_path,
                tanggal: report.tanggal_kejadian,
                deskripsi: [
                    report.merek_model,
                    report.warna,
                    report.deskripsi,
                ]
                    .filter(Boolean)
                    .join(" • "),
            }));

            setKatalog(dataKatalog);
        } catch (error) {
            setLoadError(
                error.message || "Data gagal dimuat dari server."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Memuat data saat dashboard pertama kali dibuka.
    useEffect(() => {
        muatData();
    }, [muatData]);

    // Menyaring katalog berdasarkan pencarian dan filter.
    const filteredReports = katalog.filter((item) => {
        const keyword = searchQuery.trim().toLowerCase();

        const matchesSearch =
            String(item.namaBarang || "")
                .toLowerCase()
                .includes(keyword) ||
            String(item.deskripsi || "")
                .toLowerCase()
                .includes(keyword) ||
            String(item.lokasi || "")
                .toLowerCase()
                .includes(keyword);

        const matchesJenis =
            filterJenis === "Semua" ||
            item.jenis === filterJenis;

        const matchesKategori =
            filterKategori === "" ||
            item.kategori === filterKategori;

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

    // Navigasi sidebar dan footer.
    const handleNavigate = (tab) => {
        setActiveTab(tab);
        setSelectedItem(null);

        mainRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Menghapus semua filter pencarian.
    const resetFilters = () => {
        setSearchQuery("");
        setFilterJenis("Semua");
        setFilterKategori("");
        setFilterLokasi("");
    };

    // Menghitung jumlah laporan pada katalog.
    const jumlahSemua = katalog.length;

    const jumlahKehilangan = katalog.filter(
        (item) => item.jenis === "Kehilangan"
    ).length;

    const jumlahPenemuan = katalog.filter(
        (item) => item.jenis === "Penemuan"
    ).length;

    // Menyimpan laporan baru dari form.
    const handleSubmitReport = async (payload) => {
        const laporanBaru = {
            ...payload,
            id: Date.now(),
            jenis:
                payload.jenisLaporan === "hilang"
                    ? "Kehilangan"
                    : "Penemuan",
            status:
                payload.jenisLaporan === "hilang"
                    ? "Dipublikasikan"
                    : "Menunggu Penerimaan Barang",
            tanggalKejadian:
                payload.tanggalKejadian || payload.tanggal,
            tanggal:
                payload.tanggalKejadian || payload.tanggal,
        };

        const dataLaporan = [
            laporanBaru,
            ...laporanPengguna,
        ];

        setLaporanPengguna(dataLaporan);

        localStorage.setItem(
            "laporanPengguna",
            JSON.stringify(dataLaporan)
        );

        handleNavigate("riwayat-laporan");
    };

    // Menghapus laporan dari riwayat.
    const handleDeleteReport = (id) => {
        const dataLaporan = laporanPengguna.filter(
            (item) => item.id !== id
        );

        setLaporanPengguna(dataLaporan);

        localStorage.setItem(
            "laporanPengguna",
            JSON.stringify(dataLaporan)
        );
    };

    // Menampilkan detail barang yang dipilih.
    const renderMainContent = () => {
        if (selectedItem) {
            return (
                <ItemDetail
                    item={selectedItem}
                    onBack={() => setSelectedItem(null)}
                />
            );
        }

        // Menampilkan form laporan.
        if (activeTab === "laporan") {
            return (
                <ReportForm
                    onSubmitReport={handleSubmitReport}
                />
            );
        }

        // Menampilkan riwayat laporan pengguna.
        if (activeTab === "riwayat-laporan") {
            return (
                <RiwayatLaporan
                    reports={laporanPengguna}
                    onEdit={(item) => {
                        console.log("Edit laporan:", item);
                    }}
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

                {/* Pesan error jika data gagal diambil */}
                {loadError && (
                    <div
                        role="alert"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            flexWrap: "wrap",
                            backgroundColor: "#FEF2F2",
                            border: "1px solid #FECACA",
                            color: "#B91C1C",
                            borderRadius: "10px",
                            padding: "12px 16px",
                            marginBottom: "20px",
                            fontSize: "13px",
                        }}
                    >
                        <span>⚠️ {loadError}</span>

                        <button
                            type="button"
                            onClick={muatData}
                            style={{
                                padding: "6px 12px",
                                borderRadius: "7px",
                                border: "1px solid #FCA5A5",
                                backgroundColor: "#FFFFFF",
                                color: "#B91C1C",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                        >
                            Coba lagi
                        </button>
                    </div>
                )}

                {/* Status loading */}
                {loading && (
                    <p
                        style={{
                            margin: "0 0 20px",
                            fontSize: "13px",
                            color: "#6B7280",
                        }}
                    >
                        Memuat data dari database...
                    </p>
                )}

                {/* Panel pencarian dan filter */}
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
                                onChange={(e) =>
                                    setSearchQuery(e.target.value)
                                }
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
                            <label style={labelStyle}>
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

                                {[
                                    "Elektronik",
                                    "Dokumen dan Identitas",
                                    "Aksesori",
                                    "Barang Pribadi",
                                    "Kunci",
                                    "Lainnya",
                                ].map((kategori) => (
                                    <option
                                        key={kategori}
                                        value={kategori}
                                    >
                                        {kategori}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={labelStyle}>
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

                                {[
                                    "Kantin",
                                    "Mushola",
                                    "Parkiran",
                                    "Gedung Utama",
                                    "Gedung TA",
                                    "Smoking Area",
                                    "Gedung Techno",
                                ].map((lokasi) => (
                                    <option
                                        key={lokasi}
                                        value={lokasi}
                                    >
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

                {/* Tab jenis laporan */}
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
                                onClick={() =>
                                    setFilterJenis(tab.value)
                                }
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

                {/* Jumlah barang ditampilkan */}
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

                {/* Katalog barang dari database */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "20px",
                        marginBottom: "24px",
                    }}
                >
                    {loading ? null : filteredReports.length > 0 ? (
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
                                    {/* Foto barang */}
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "180px",
                                            backgroundColor: "#F3F4F6",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {item.foto ? (
                                            <img
                                                src={item.foto}
                                                alt={item.namaBarang}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <div
                                                aria-hidden="true"
                                                style={{
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "40px",
                                                    color: "#9CA3AF",
                                                }}
                                            >
                                                📦
                                            </div>
                                        )}

                                        {/* Label jenis laporan */}
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

                                    {/* Informasi barang */}
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
                                                margin: "0 0 8px",
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

                                    {/* Tombol detail */}
                                    <div
                                        style={{
                                            padding: "0 16px 16px",
                                        }}
                                    >
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

                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "13px",
                                }}
                            >
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
                setActiveTab={handleNavigate}
            />

            <main
                ref={mainRef}
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

                <UserFooter onNavigate={handleNavigate} />
            </main>
        </div>
    );
}

// Style label filter
const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "7px",
};

// Style select filter
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

// Style informasi barang
const metaStyle = {
    fontSize: "12px",
    color: "#6B7280",
    marginBottom: "7px",
};
