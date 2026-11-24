import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "./AdminVerifikasi.css";

const laporanData = [
  {
    no: 1,
    nomor: "P001",
    namaBarang: "Dompet Hitam",
    jenisBarang: "Dompet",
    pelapor: "Andi Pratama",
    statusPengguna: "Mahasiswa",
    waktu: "2026-10-01 14:30",
  },
  {
    no: 2,
    nomor: "P002",
    namaBarang: "Tumbler Biru",
    jenisBarang: "Minuman",
    pelapor: "Siti Rahma",
    statusPengguna: "Mahasiswa",
    waktu: "2026-10-02 09:15",
  },
  {
    no: 3,
    nomor: "P003",
    namaBarang: "Jam Tangan",
    jenisBarang: "Aksesori",
    pelapor: "Budi Santoso",
    statusPengguna: "Dosen",
    waktu: "2026-10-02 11:20",
  },
  {
    no: 4,
    nomor: "P004",
    namaBarang: "Earphone",
    jenisBarang: "Elektronik",
    pelapor: "Rina Marlina",
    statusPengguna: "Mahasiswa",
    waktu: "2026-10-03 16:05",
  },
  {
    no: 5,
    nomor: "P005",
    namaBarang: "Kunci Motor",
    jenisBarang: "Kunci",
    pelapor: "Dika Saputra",
    statusPengguna: "Staff",
    waktu: "2026-10-04 08:40",
  },
];

function AdminVerifikasi() {
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua Kategori");
  const [status, setStatus] = useState("Semua Status");

  const filteredData = laporanData.filter((laporan) => {
    const searchValue = search.toLowerCase();

    const cocokSearch =
      laporan.nomor.toLowerCase().includes(searchValue) ||
      laporan.namaBarang.toLowerCase().includes(searchValue) ||
      laporan.pelapor.toLowerCase().includes(searchValue);

    const cocokKategori =
      kategori === "Semua Kategori" ||
      laporan.jenisBarang === kategori;

    return cocokSearch && cocokKategori;
  });

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="verifikasi-page">
          <div className="page-header">
            <h1>Verifikasi Laporan Barang</h1>
            <p>
              Periksa dan tentukan status laporan barang yang masuk ke sistem.
            </p>
          </div>

          <div className="filter-container">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Cari nomor laporan, nama barang, atau nama pelapor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option>Semua Kategori</option>
              <option>Dompet</option>
              <option>Minuman</option>
              <option>Aksesori</option>
              <option>Elektronik</option>
              <option>Kunci</option>
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Menunggu Verifikasi</option>
            </select>
          </div>

          <section className="report-section">
            <div className="section-header">
              <h2>Laporan Menunggu Verifikasi</h2>
              <span>{filteredData.length} laporan</span>
            </div>

            <div className="table-wrapper">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nomor Laporan</th>
                    <th>Nama Barang</th>
                    <th>Jenis Barang</th>
                    <th>Pelapor</th>
                    <th>Status</th>
                    <th>Waktu</th>
                    <th>Foto</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredData.map((laporan) => (
                    <tr key={laporan.nomor}>
                      <td>{laporan.no}</td>
                      <td>{laporan.nomor}</td>
                      <td>{laporan.namaBarang}</td>
                      <td>{laporan.jenisBarang}</td>

                      <td>
                        <div className="pelapor-cell">
                          <strong>{laporan.pelapor}</strong>
                          <small>{laporan.statusPengguna}</small>
                        </div>
                      </td>

                      <td>
                        <span className="status-badge">
                          Menunggu Verifikasi
                        </span>
                      </td>

                      <td>{laporan.waktu}</td>

                      <td>
                        <div className="photo-placeholder">
                          ▧
                        </div>
                      </td>

                      <td>
                        <button
                          className="btn-lihat"
                          onClick={() =>
                            alert(
                              `Detail laporan ${laporan.nomor} akan dibuat pada tahap berikutnya.`
                            )
                          }
                        >
                          Lihat
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan="9" className="empty-data">
                        Tidak ada laporan yang ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span>
                Menampilkan 1 - {filteredData.length} dari{" "}
                {filteredData.length} data
              </span>

              <div className="pagination">
                <button>‹</button>
                <button className="active-page">1</button>
                <button>›</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminVerifikasi;