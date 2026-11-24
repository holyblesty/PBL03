import React, { useEffect, useMemo, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import barangMenunggu from '../data/barangMenunggu';
import '../App.css';
import './AdminBarangHilang.css';
import './KonfirmasiPenerimaan.css';

const ITEMS_PER_PAGE = 5;

const ALASAN_CEPAT = [
  'Barang fisik tidak diserahkan ke Pos Pamdal',
  'Data atau foto laporan tidak sesuai dengan barang',
  'Laporan ganda (sudah pernah dilaporkan)',
  'Barang tidak memenuhi ketentuan penitipan',
];

// Simpan keputusan pembatalan agar bisa dibaca di sisi pelapor
function simpanPembatalan(barang, alasan) {
  try {
    const lama = JSON.parse(localStorage.getItem('penerimaanDibatalkan') || '[]');
    const daftar = Array.isArray(lama) ? lama : [];
    daftar.push({
      id: barang.id,
      nama: barang.nama,
      penemu: barang.penemu,
      alasan,
      status: 'Dibatalkan',
      waktu: new Date().toISOString(),
    });
    localStorage.setItem('penerimaanDibatalkan', JSON.stringify(daftar));
  } catch (error) {
    console.error('Gagal menyimpan pembatalan:', error);
  }
}

export default function KonfirmasiPenerimaan() {
  const [daftar, setDaftar] = useState(barangMenunggu);
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('detail');
  const [alasan, setAlasan] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return daftar;
    return daftar.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.nama.toLowerCase().includes(q) ||
        b.penemu.toLowerCase().includes(q)
    );
  }, [daftar, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const items = filtered.slice(start, start + ITEMS_PER_PAGE);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(input);
    setPage(1);
  };

  const bukaTinjau = (barang) => {
    setSelected(barang);
    setMode('detail');
    setAlasan('');
    setError('');
  };

  const tutupModal = () => {
    setSelected(null);
    setMode('detail');
    setAlasan('');
    setError('');
  };

  const handleKonfirmasi = () => {
    setDaftar((prev) => prev.filter((b) => b.id !== selected.id));
    setToast(`${selected.nama} (${selected.id}) dikonfirmasi diterima dan akan dipublikasikan.`);
    tutupModal();
  };

  const handleBatalkan = () => {
    const teks = alasan.trim();

    if (teks.length < 5) {
      setError('Alasan pembatalan wajib diisi (minimal 5 karakter).');
      return;
    }

    simpanPembatalan(selected, teks);
    setDaftar((prev) => prev.filter((b) => b.id !== selected.id));
    setToast(`${selected.nama} (${selected.id}) dibatalkan. Laporan tidak dipublikasikan dan pelapor diberi tahu.`);
    tutupModal();
  };

  const infoHalaman =
    filtered.length === 0
      ? 'Menampilkan 0 laporan'
      : `Menampilkan ${start + 1}-${Math.min(start + ITEMS_PER_PAGE, filtered.length)} dari ${filtered.length} laporan`;

  const pesanKosong =
    daftar.length === 0
      ? 'Semua laporan sudah diproses. Tidak ada yang menunggu.'
      : 'Tidak ada laporan yang cocok dengan pencarian.';

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="bh-wrap">
          <h1 className="bh-title">Konfirmasi Penerimaan Barang</h1>
          <p className="bh-sub">
            Cari laporan penemuan dari civitas yang menyerahkan barang ke Pos Pamdal.
          </p>

          <div className="kp-banner">
            {daftar.length} laporan menunggu penerimaan barang fisik di Pos Pamdal
          </div>

          <form className="kp-search" onSubmit={handleSearch}>
            <div className="kp-search-field">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                placeholder="Cari kode postingan atau nama penemu..."
                aria-label="Cari kode postingan atau nama penemu"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button type="submit" className="kp-search-btn">Cari</button>
          </form>

          <div className="kp-table-wrap">
            <table className="kp-table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Barang</th>
                  <th>Penemu</th>
                  <th>Lokasi Temuan</th>
                  <th>Tanggal Lapor</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="kp-empty">{pesanKosong}</td>
                  </tr>
                ) : (
                  items.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.nama}</td>
                      <td>{b.penemu}</td>
                      <td>{b.lokasi}</td>
                      <td>{b.tanggal}</td>
                      <td><span className="kp-status">{b.status}</span></td>
                      <td>
                        <button type="button" className="kp-tinjau" onClick={() => bukaTinjau(b)}>
                          Tinjau
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bh-footer">
            <span>{infoHalaman}</span>

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
        <div className="bh-overlay" onClick={tutupModal}>
          <div className="bh-modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <h3>{mode === 'detail' ? 'Tinjau Penerimaan Barang' : 'Batalkan Penerimaan'}</h3>

            <dl>
              <dt>Kode</dt><dd>{selected.id}</dd>
              <dt>Nama Barang</dt><dd>{selected.nama}</dd>
              <dt>Penemu</dt><dd>{selected.penemu}</dd>
              <dt>Lokasi Temuan</dt><dd>{selected.lokasi}</dd>
              <dt>Tanggal Lapor</dt><dd>{selected.tanggal}</dd>
              <dt>Status</dt><dd>{selected.status}</dd>
            </dl>

            {mode === 'detail' ? (
              <>
                <p className="kp-note">
                  Pastikan barang fisik sudah diterima di Pos Pamdal sebelum mengonfirmasi.
                  Jika barang tidak diserahkan atau data tidak sesuai, batalkan laporan ini.
                </p>
                <div className="kp-actions">
                  <button type="button" className="bh-btn kp-secondary" onClick={tutupModal}>
                    Tutup
                  </button>
                  <button type="button" className="bh-btn kp-danger" onClick={() => setMode('tolak')}>
                    Batalkan / Tolak
                  </button>
                  <button type="button" className="bh-btn" onClick={handleKonfirmasi}>
                    Konfirmasi Diterima
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="kp-warning">
                  Laporan ini tidak akan dikonfirmasi dan tidak dipublikasikan. Alasan akan
                  disampaikan kepada pelapor.
                </p>

                <label className="kp-label" htmlFor="alasanCepat">Pilih alasan cepat (opsional)</label>
                <select
                  id="alasanCepat"
                  className="kp-field"
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      setAlasan(e.target.value);
                      setError('');
                    }
                  }}
                >
                  <option value="">-- Pilih alasan --</option>
                  {ALASAN_CEPAT.map((a) => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>

                <label className="kp-label" htmlFor="alasan">Alasan pembatalan *</label>
                <textarea
                  id="alasan"
                  className="kp-field"
                  rows={3}
                  placeholder="Tulis alasan kenapa laporan tidak bisa dikonfirmasi / dipublikasikan..."
                  value={alasan}
                  onChange={(e) => {
                    setAlasan(e.target.value);
                    setError('');
                  }}
                />
                {error && <p className="kp-error" role="alert">{error}</p>}

                <div className="kp-actions">
                  <button
                    type="button"
                    className="bh-btn kp-secondary"
                    onClick={() => {
                      setMode('detail');
                      setError('');
                    }}
                  >
                    Kembali
                  </button>
                  <button type="button" className="bh-btn kp-danger" onClick={handleBatalkan}>
                    Ya, Batalkan Laporan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {toast && <div className="kp-toast" role="status">{toast}</div>}
    </div>
  );
}