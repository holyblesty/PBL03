import React, { useMemo, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import barangTemuan from '../data/barangTemuan';
import '../App.css';
import './AdminBarangHilang.css';

const ITEMS_PER_PAGE = 6;

const iconProps = {
  viewBox: '0 0 64 64', fill: 'none', stroke: 'currentColor',
  strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round',
};

// Ikon placeholder sesuai kategori (pengganti foto barang)
function ItemIcon({ kategori }) {
  switch (kategori) {
    case 'Dompet':
      return (<svg {...iconProps}><rect x="6" y="16" width="52" height="34" rx="5" /><path d="M6 24h52" /><rect x="38" y="30" width="20" height="12" rx="3" /><circle cx="44" cy="36" r="1.5" /></svg>);
    case 'Laptop':
      return (<svg {...iconProps}><rect x="12" y="12" width="40" height="28" rx="3" /><path d="M4 46h56l-4 6H8l-4-6Z" /></svg>);
    case 'Payung':
      return (<svg {...iconProps}><path d="M6 34C6 18 18 8 32 8s26 10 26 26c-4-5-8-5-13 0-4-5-9-5-13 0-4-5-9-5-13 0-5-5-9-5-13 0Z" /><path d="M32 34v16a5 5 0 0 0 10 0" /></svg>);
    case 'Kartu':
      return (<svg {...iconProps}><rect x="8" y="16" width="48" height="32" rx="4" /><rect x="14" y="24" width="12" height="12" rx="2" /><path d="M32 26h18M32 33h18M14 42h18" /></svg>);
    case 'Botol':
      return (<svg {...iconProps}><rect x="24" y="6" width="16" height="8" rx="2" /><path d="M22 20c0-3 2-6 5-6h10c3 0 5 3 5 6v34a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4V20Z" /><path d="M22 30h20" /></svg>);
    case 'Jam':
      return (<svg {...iconProps}><path d="M24 6h16l2 10H22l2-10ZM24 58h16l2-10H22l2 10Z" /><circle cx="32" cy="32" r="14" /><path d="M32 24v8l5 3" /></svg>);
    case 'Pakaian':
      return (<svg {...iconProps}><path d="M22 8 8 18l6 10 6-3v31h24V25l6 3 6-10-14-10c-2 4-6 6-10 6s-8-2-10-6Z" /><path d="M32 14v42" /></svg>);
    case 'Kunci':
      return (<svg {...iconProps}><circle cx="18" cy="32" r="10" /><circle cx="18" cy="32" r="3" /><path d="M28 32h28M46 32v8M54 32v6" /></svg>);
    default:
      return (<svg {...iconProps}><path d="M32 6 56 18v28L32 58 8 46V18L32 6Z" /><path d="m8 18 24 12 24-12M32 30v28" /></svg>);
  }
}

export default function AdminBarangTemuan() {
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const kategoriList = useMemo(() => [...new Set(barangTemuan.map((b) => b.kategori))], []);
  const lokasiList = useMemo(() => [...new Set(barangTemuan.map((b) => b.lokasi))], []);
  const statusList = useMemo(() => [...new Set(barangTemuan.map((b) => b.status))], []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return barangTemuan.filter(
      (b) =>
        (!q || b.id.toLowerCase().includes(q) || b.nama.toLowerCase().includes(q)) &&
        (!kategori || b.kategori === kategori) &&
        (!lokasi || b.lokasi === lokasi) &&
        (!status || b.status === status)
    );
  }, [search, kategori, lokasi, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const items = filtered.slice(start, start + ITEMS_PER_PAGE);

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
          <h1 className="bh-title">Daftar Barang Temuan</h1>
          <p className="bh-sub">
            Seluruh laporan barang temuan beserta status penerimaannya. Klik kartu atau tombol untuk melihat detail.
          </p>

          <div className="bh-filters">
            <input
              type="search"
              placeholder="Cari kode / nama barang"
              aria-label="Cari kode atau nama barang"
              value={search}
              onChange={onFilter(setSearch)}
            />
            <select value={kategori} onChange={onFilter(setKategori)} aria-label="Kategori">
              <option value="">Kategori</option>
              {kategoriList.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            <select value={lokasi} onChange={onFilter(setLokasi)} aria-label="Lokasi">
              <option value="">Lokasi</option>
              {lokasiList.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
            <select value={status} onChange={onFilter(setStatus)} aria-label="Status">
              <option value="">Status</option>
              {statusList.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <section className="bh-grid">
            {items.length === 0 && <div className="bh-empty">Tidak ada laporan yang cocok dengan filter.</div>}

            {items.map((b) => (
              <article className="bh-card" key={b.id}>
                <div className="bh-photo">
                  <span className="bh-badge">{b.status}</span>
                  <ItemIcon kategori={b.kategori} />
                  <small>[ foto barang ]</small>
                </div>

                <div className="bh-body">
                  <div className="bh-row">
                    <h3 className="bh-name">{b.nama}</h3>
                    <span className="bh-code">{b.id}</span>
                  </div>
                  <div className="bh-loc">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" />
                    </svg>
                    {b.lokasi}
                  </div>
                  <div className="bh-meta">{b.tanggal} · Penemu: {b.penemu}</div>
                  <button type="button" className="bh-btn" onClick={() => setSelected(b)}>
                    Lihat Detail
                  </button>
                </div>
              </article>
            ))}
          </section>

          <div className="bh-footer">
            <span>
              {filtered.length === 0
                ? 'Menampilkan 0 laporan'
                : `Menampilkan ${start + 1}-${Math.min(start + ITEMS_PER_PAGE, filtered.length)} dari ${filtered.length} laporan`}
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
            <dl>
              <dt>Kode</dt><dd>{selected.id}</dd>
              <dt>Kategori</dt><dd>{selected.kategori}</dd>
              <dt>Lokasi</dt><dd>{selected.lokasi}</dd>
              <dt>Tanggal</dt><dd>{selected.tanggal}</dd>
              <dt>Penemu</dt><dd>{selected.penemu}</dd>
              <dt>Status</dt><dd>{selected.status}</dd>
            </dl>
            <button type="button" className="bh-btn" style={{ width: '100%' }} onClick={() => setSelected(null)}>
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}