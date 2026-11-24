import React from 'react';
import StepperPengambilan from './StepperPengambilan';

// Langkah 1: cari kode postingan + tampilkan hasil
export default function PengambilanCari({ kode, setKode, error, setError, pesan, barang, detail, onCari, onAmbil }) {
  return (
    <>
      {pesan && <p className="pb-warn" role="status">{pesan}</p>}

      <form className="pb-card strong pb-center" onSubmit={onCari}>
        <h2 className="pb-card-title center">Cari Postingan Barang Temuan</h2>
        <p className="pb-hint center">Minta civitas menunjukkan kode postingan yang menurutnya adalah barangnya.</p>
        <label className="pb-label" htmlFor="kodePostingan">Kode Postingan</label>
        <input
          id="kodePostingan"
          className="pb-input"
          placeholder="Contoh: LF-T-0012"
          value={kode}
          onChange={(e) => {
            setKode(e.target.value);
            setError('');
          }}
        />
        {error && <p className="pb-error" role="alert">{error}</p>}
        <button type="submit" className="pb-btn full">Cari Postingan</button>
      </form>

      <StepperPengambilan langkah={1} />

      {!barang && !error && (
        <div className="pb-placeholder">
          <strong>Hasil pencarian akan tampil di sini</strong>
          Hanya postingan berstatus Dipublikasikan yang dapat diklaim.
        </div>
      )}

      {barang && detail && (
        <div className="pb-card" style={{ marginTop: 6 }}>
          <div className="pb-result">
            <div className="pb-photo">Foto Barang</div>
            <div>
              <div className="pb-result-top">
                <span className="pb-badge">{barang.status}</span>
                <span className="pb-code">{barang.id}</span>
              </div>
              <h2 className="pb-item-name">{barang.nama}</h2>
              <div className="pb-info-grid">
                <div className="pb-info"><small>Lokasi</small><strong>{detail.lokasiLengkap}</strong></div>
                <div className="pb-info"><small>Lokasi penyimpanan</small><strong>{detail.lokasiSimpan}</strong></div>
                <div className="pb-info"><small>Tanggal temuan</small><strong>{detail.tglTemuan}</strong></div>
                <div className="pb-info"><small>Tanggal lapor</small><strong>{detail.tglLapor}</strong></div>
              </div>
              <div className="pb-right">
                <button type="button" className="pb-btn" onClick={onAmbil}>Ambil Barang</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}