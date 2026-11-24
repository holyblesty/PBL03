import React from 'react';
import { Link } from 'react-router-dom';
import { formatTanggal, formatJam } from '../../utils/pengambilan';

// Langkah 4: pengambilan berhasil dicatat
export default function PengambilanBerhasil({ barang, selesai, onBaru }) {
  return (
    <div className="pb-card pb-done">
      <div className="pb-done-icon">✓</div>
      <h2 className="pb-card-title center">Pengambilan Berhasil Dicatat</h2>
      <p className="pb-hint center">Data pengambilan, tanda tangan, dan foto bukti telah tersimpan.</p>
      <dl>
        <dt>Kode Postingan</dt><dd>{barang.id}</dd>
        <dt>Barang</dt><dd>{barang.nama}</dd>
        <dt>Diambil oleh</dt><dd>{selesai.pengambil}</dd>
        <dt>Waktu</dt><dd>{formatTanggal(selesai.waktu)}, {formatJam(selesai.waktu)}</dd>
      </dl>
      <p style={{ fontSize: 12, margin: '0 0 6px' }}>
        Status barang: <span className="pb-badge">Dikembalikan</span>
      </p>
      <p className="pb-hint">Postingan tidak lagi dipublikasikan dan masuk ke Riwayat Laporan.</p>
      <div className="pb-done-actions">
                <Link to="/riwayat-laporan" className="pb-btn outline">Lihat Riwayat</Link>
        <button type="button" className="pb-btn" onClick={onBaru}>Pengambilan Barang</button>
      </div>
    </div>
  );
}