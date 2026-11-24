import React from 'react';

// Pertanyaan verifikasi (diekspor agar bisa dipakai pemeriksaan di halaman utama)
export const PERTANYAAN = [
  { key: 'bukti', teks: 'Pengklaim menunjukkan bukti kepemilikan?', ya: 'Ya', tidak: 'Tidak' },
  { key: 'ciri', teks: 'Bukti sesuai ciri fisik & data laporan?', ya: 'Sesuai', tidak: 'Tidak sesuai' },
  { key: 'identitas', teks: 'Identitas pengklaim cocok dengan bukti?', ya: 'Cocok', tidak: 'Tidak cocok' },
];

// Langkah 2: verifikasi kepemilikan
export default function PengambilanVerifikasi({
  barang, detail, pengklaim, setPengklaim, jawaban, setJawaban,
  catatan, setCatatan, hasil, setHasil, errVerif, onLanjut, onTolak, onKembali,
}) {
  return (
    <div className="pb-two">
      <div className="pb-card pb-summary">
        <h3 className="pb-card-title">Ringkasan Barang</h3>
        <div className="pb-summary-photo">Foto Barang</div>
        <p><strong>{barang.id} · {barang.nama}</strong></p>
        <p>Kategori: {detail.kategori}</p>
        <p>Lokasi temuan: {detail.lokasiLengkap}</p>
        <p>Ciri: {detail.merek !== '-' ? `${detail.merek}, ` : ''}{detail.ciri}</p>
      </div>

      <div className="pb-card">
        <h3 className="pb-card-title">Data Pengklaim</h3>
        <div className="pb-grid2">
          <div>
            <label className="pb-label" htmlFor="vNama">Nama Pengklaim</label>
            <input id="vNama" className="pb-input" placeholder="Nama lengkap" value={pengklaim.nama} onChange={(e) => setPengklaim({ ...pengklaim, nama: e.target.value })} />
          </div>
          <div>
            <label className="pb-label" htmlFor="vNik">NIM / NIK</label>
            <input id="vNik" className="pb-input" placeholder="NIM atau NIK" value={pengklaim.nik} onChange={(e) => setPengklaim({ ...pengklaim, nik: e.target.value })} />
          </div>
        </div>

        <h3 className="pb-section">Pertanyaan Verifikasi</h3>
        {PERTANYAAN.map((p, i) => (
          <div className="pb-q" key={p.key}>
            <span>{i + 1}. {p.teks}</span>
            <label className="pb-radio">
              <input type="radio" name={p.key} checked={jawaban[p.key] === 'ya'} onChange={() => setJawaban({ ...jawaban, [p.key]: 'ya' })} />
              {p.ya}
            </label>
            <label className="pb-radio">
              <input type="radio" name={p.key} checked={jawaban[p.key] === 'tidak'} onChange={() => setJawaban({ ...jawaban, [p.key]: 'tidak' })} />
              {p.tidak}
            </label>
          </div>
        ))}

        <label className="pb-label" htmlFor="catatan">Catatan Verifikasi (opsional)</label>
        <textarea id="catatan" className="pb-textarea" placeholder="Tulis catatan hasil pemeriksaan bukti..." value={catatan} onChange={(e) => setCatatan(e.target.value)} />

        <h3 className="pb-section">Hasil Verifikasi</h3>
        <div className="pb-result-row">
          <label className="pb-radio">
            <input type="radio" name="hasil" checked={hasil === 'valid'} onChange={() => setHasil('valid')} /> Valid
          </label>
          <label className="pb-radio">
            <input type="radio" name="hasil" checked={hasil === 'tidak'} onChange={() => setHasil('tidak')} /> Tidak Valid
          </label>
        </div>

        {errVerif && <p className="pb-error" role="alert">{errVerif}</p>}

        <div className="pb-btn-row">
          <button type="button" className="pb-btn" onClick={onLanjut}>Lanjut ke Form Pengambilan</button>
          <button type="button" className="pb-btn outline" onClick={onTolak}>Tidak Valid - Barang Tidak Diserahkan</button>
        </div>
        <button type="button" className="pb-link" onClick={onKembali}>← Kembali ke pencarian</button>
      </div>
    </div>
  );
}