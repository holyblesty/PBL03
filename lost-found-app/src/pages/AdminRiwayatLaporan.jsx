import React, { useMemo, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import { ambilSemuaRiwayat } from '../data/riwayatLaporan';
import { formatTanggal } from '../utils/pengambilan';
import '../App.css';
import './AdminBarangHilang.css';
import './AdminRiwayatLaporan.css';

const PER_HALAMAN = 5;

const TAB = [
  { id: 'semua', label: 'Semua' },
  { id: 'hilang', label: 'Barang Hilang' },
  { id: 'temuan', label: 'Barang Temuan' },
  { id: 'dikembalikan', label: 'Dikembalikan' },
];

// '2026-10-29' -> Date
function keTanggal(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

// '2026-10-29' -> '29 Okt 2026'
const teksTanggal = (iso) => formatTanggal(keTanggal(iso));

// '2026-10' -> 'Okt 2026'
const teksBulan = (bulan) => formatTanggal(keTanggal(`${bulan}-01`)).split(' ').slice(1).join(' ');

export default function AdminRiwayatLaporan() {
  const semua = useMemo(() => ambilSemuaRiwayat(), []);

  const [tab, setTab] = useState('semua');
  const [search, setSearch] = useState('');
  const [jenis, setJenis] = useState('');
  const [bulan, setBulan] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  // Pilihan "Rentang Tanggal" diambil dari bulan yang ada di data
  const daftarBulan = useMemo(
    () => [...new Set(semua.map((r) => r.tanggal.slice(0, 7)))].sort().reverse(),
    [semua]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return semua.filter((r) => {
      if (tab === 'hilang' && r.jenis !== 'Hilang') return false;
      if (tab === 'temuan' && r.jenis !== 'Temuan') return false;
      if (tab === 'dikembalikan' && r.status !== 'Dikembalikan') return false;
      if (jenis && r.jenis !== jenis) return false;
      if (bulan && !r.tanggal.startsWith(bulan)) return false;
      if (q && !r.kode.toLowerCase().includes(q) && !r.nama.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [semua, tab, search, jenis, bulan]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_HALAMAN));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_HALAMAN;
  const items = filtered.slice(start, start + PER_HALAMAN);

  const gantiTab = (id) => {
    setTab(id);
    setJenis('');
    setPage(1);
  };

  // Setiap filter berubah, kembali ke halaman 1
  const onFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="bh-wrap">
          <h1 className="bh-title">Riwayat Laporan</h1>
          <p className="bh-sub">Laporan yang sudah selesai ditangani dan tidak lagi dipublikasikan.</p>

          <div className="rl-tabs" role="tablist" aria-label="Filter jenis riwayat">
            {TAB.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={`rl-tab ${tab === t.id ? 'active' : ''}`}
                onClick={() => gantiTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="rl-filters">
            <input
              type="search"
              className="rl-search"
              placeholder="Cari kode / nama barang"
              aria-label="Cari kode atau nama barang"
              value={search}
              onChange={onFilter(setSearch)}
            />
            <select className="rl-select" value={jenis} onChange={onFilter(setJenis)} aria-label="Jenis laporan">
              <option value="">Jenis Laporan</option>
              <option value="Hilang">Hilang</option>
              <option value="Temuan">Temuan</option>
            </select>
            <select className="rl-select" value={bulan} onChange={onFilter(setBulan)} aria-label="Rentang tanggal">
              <option value="">Rentang Tanggal</option>
              {daftarBulan.map((b) => (
                <option key={b} value={b}>{teksBulan(b)}</option>
              ))}
            </select>
          </div>

          <div className="rl-table-wrap">
            <table className="rl-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Barang</th>
                  <th>Jenis</th>
                  <th>Tanggal Selesai</th>
                  <th>Diambil Oleh</th>
                  <th>Petugas</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr><td colSpan={8} className="rl-empty">Tidak ada riwayat yang cocok dengan filter.</td></tr>
                )}
                {items.map((r) => (
                  <tr key={r.kode}>
                    <td>{r.kode}</td>
                    <td>{r.nama}</td>
                    <td>{r.jenis}</td>
                    <td>{teksTanggal(r.tanggal)}</td>
                    <td>{r.pengambil}</td>
                    <td>{r.petugas}</td>
                    <td><span className="rl-badge">{r.status}</span></td>
                    <td>
                      <button type="button" className="rl-detail-btn" onClick={() => setSelected(r)}>
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bh-footer">
            <span>
              {filtered.length === 0
                ? 'Menampilkan 0 riwayat'
                : `Menampilkan ${start + 1}-${Math.min(start + PER_HALAMAN, filtered.length)} dari ${filtered.length} riwayat`}
            </span>

            <div className="bh-pager">
              <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Halaman sebelumnya">‹</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  type="button"
                  className={currentPage === i + 1 ? 'active' : ''}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button type="button" disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Halaman berikutnya">›</button>
            </div>
          </div>
        </main>
      </div>

      {selected && (
        <div className="bh-overlay" onClick={() => setSelected(null)}>
          <div className="bh-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.nama}</h3>

            {selected.foto && <img className="rl-modal-img" src={selected.foto} alt="Foto bukti pengambilan" />}

            <dl>
              <dt>Kode</dt><dd>{selected.kode}</dd>
              <dt>Jenis</dt><dd>{selected.jenis}</dd>
              <dt>Tanggal selesai</dt><dd>{teksTanggal(selected.tanggal)}</dd>
              <dt>Diambil oleh</dt><dd>{selected.pengambil}</dd>
              {selected.nik && (<React.Fragment><dt>NIM / NIK</dt><dd>{selected.nik}</dd></React.Fragment>)}
              {selected.hp && (<React.Fragment><dt>No HP</dt><dd>{selected.hp}</dd></React.Fragment>)}
              {selected.catatan && (<React.Fragment><dt>Catatan</dt><dd>{selected.catatan}</dd></React.Fragment>)}
              <dt>Petugas</dt><dd>{selected.petugas}</dd>
              <dt>Status</dt><dd>{selected.status}</dd>
            </dl>

            {(selected.ttdPengambil || selected.ttdPamdal) && (
              <div className="rl-modal-sign">
                <figure>
                  {selected.ttdPengambil && <img src={selected.ttdPengambil} alt="Tanda tangan pengambil" />}
                  <figcaption>Pengambil</figcaption>
                </figure>
                <figure>
                  {selected.ttdPamdal && <img src={selected.ttdPamdal} alt="Tanda tangan Pamdal" />}
                  <figcaption>Pamdal</figcaption>
                </figure>
              </div>
            )}

            <button type="button" className="bh-btn" style={{ width: '100%' }} onClick={() => setSelected(null)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}