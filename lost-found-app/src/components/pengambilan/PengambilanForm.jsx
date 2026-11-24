import React from 'react';
import SignaturePad from './SignaturePad';
import CameraBox from './CameraBox';
import { formatTanggal, formatJam } from '../../utils/pengambilan';

// Langkah 3: form pengambilan (data pengambil, tanda tangan, foto bukti)
export default function PengambilanForm({
  detail, form, setForm, waktu, foto, setFoto, setTtdPengambil, setTtdPamdal,
  kelengkapan, lengkap, errForm, namaPamdal, idPamdal, onSimpan,
}) {
  const setF = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <div className="pb-two form">
      <div className="pb-stack">
        <div className="pb-card">
          <h3 className="pb-card-title">Data Pengambil</h3>
          <div className="pb-grid2">
            <div>
              <label className="pb-label" htmlFor="fNama">Nama Pemilik</label>
              <input id="fNama" className="pb-input" placeholder="Nama lengkap" value={form.nama} onChange={setF('nama')} />
            </div>
            <div>
              <label className="pb-label" htmlFor="fInstansi">Instansi / Jurusan</label>
              <input id="fInstansi" className="pb-input" placeholder="Mis. Informatika" value={form.instansi} onChange={setF('instansi')} />
            </div>
            <div>
              <label className="pb-label" htmlFor="fNik">NIM / NIK / No. KTP</label>
              <input id="fNik" className="pb-input" placeholder="Nomor identitas" value={form.nik} onChange={setF('nik')} />
            </div>
            <div>
              <label className="pb-label" htmlFor="fHp">No HP</label>
              <input id="fHp" className="pb-input" placeholder="08xx-xxxx-xxxx" value={form.hp} onChange={setF('hp')} />
            </div>
          </div>
          <div className="pb-grid3">
            <div>
              <label className="pb-label">Lokasi</label>
              <input className="pb-input" readOnly value="Pos Pamdal (otomatis)" />
            </div>
            <div>
              <label className="pb-label">Tanggal</label>
              <input className="pb-input" readOnly value={`${formatTanggal(waktu)} (otomatis)`} />
            </div>
            <div>
              <label className="pb-label">Jam</label>
              <input className="pb-input" readOnly value={`${formatJam(waktu)} (otomatis)`} />
            </div>
          </div>

          <h3 className="pb-section">Daftar Barang (otomatis dari postingan)</h3>
          <table className="pb-table">
            <thead>
              <tr><th>No</th><th>Jenis</th><th>Merek</th><th>Keterangan</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>{detail.jenis}</td><td>{detail.merek}</td><td>{detail.ciri}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="pb-card">
          <h3 className="pb-card-title">Tanda Tangan Elektronik</h3>
          <div className="pb-sign-grid">
            <SignaturePad label="Pengambil Barang" caption={`${form.nama || 'Nama'} / ${form.nik || 'NIM-NIK'}`} onChange={setTtdPengambil} />
            <SignaturePad label="Petugas Pamdal" caption={`${namaPamdal} / ${idPamdal}`} onChange={setTtdPamdal} />
          </div>
        </div>
      </div>

      <div className="pb-stack">
        <div className="pb-card">
          <h3 className="pb-card-title">Foto Bukti Pengambilan</h3>
          <CameraBox foto={foto} onChange={setFoto} />
        </div>

        <div className="pb-card">
          <h3 className="pb-card-title">Kelengkapan Form</h3>
          {kelengkapan.map((k) => (
            <label className="pb-check" key={k.label}>
              <input type="checkbox" checked={k.ok} readOnly disabled />
              {k.label}
            </label>
          ))}
          {errForm && <p className="pb-error" role="alert">{errForm}</p>}
          <button type="button" className="pb-btn full" disabled={!lengkap} onClick={onSimpan}>Simpan &amp; Selesaikan</button>
          <p className="pb-hint">Aktif jika semua kelengkapan terpenuhi</p>
        </div>
      </div>
    </div>
  );
}