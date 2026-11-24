import React, { useState } from 'react';
import { ubahKataSandiPamdal } from '../../data/PamdalAkun';

const KOSONG = { lama: '', baru: '', konfirmasi: '' };

// Kartu "Ubah Kata Sandi"
export default function UbahKataSandi({ akun, onTersimpan }) {
  const [form, setForm] = useState(KOSONG);
  const [pesan, setPesan] = useState(null); // { tipe: 'ok' | 'err', teks }

  const setF = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setPesan(null);
  };

  const ubah = (e) => {
    e.preventDefault();

    if (!form.lama || !form.baru || !form.konfirmasi) {
      setPesan({ tipe: 'err', teks: 'Semua kolom kata sandi wajib diisi.' });
      return;
    }
    if (form.lama !== akun.password) {
      setPesan({ tipe: 'err', teks: 'Kata sandi lama salah.' });
      return;
    }
    if (form.baru.length < 6) {
      setPesan({ tipe: 'err', teks: 'Kata sandi baru minimal 6 karakter.' });
      return;
    }
    if (form.baru === form.lama) {
      setPesan({ tipe: 'err', teks: 'Kata sandi baru tidak boleh sama dengan yang lama.' });
      return;
    }
    if (form.baru !== form.konfirmasi) {
      setPesan({ tipe: 'err', teks: 'Konfirmasi kata sandi baru tidak sama.' });
      return;
    }

    if (!ubahKataSandiPamdal(akun.id, form.baru)) {
      setPesan({ tipe: 'err', teks: 'Kata sandi gagal disimpan. Coba lagi.' });
      return;
    }
    setForm(KOSONG);
    setPesan({ tipe: 'ok', teks: 'Kata sandi berhasil diubah. Gunakan kata sandi baru saat login berikutnya.' });
    onTersimpan();
  };

  return (
    <form className="pg-card" onSubmit={ubah}>
      <h2 className="pg-card-title">Ubah Kata Sandi</h2>

      <div className="pg-stack">
        <div>
          <label className="pg-label" htmlFor="pgLama">Kata Sandi Lama</label>
          <input id="pgLama" type="password" className="pg-input" autoComplete="current-password" placeholder="••••••••" value={form.lama} onChange={setF('lama')} />
        </div>
        <div>
          <label className="pg-label" htmlFor="pgBaru">Kata Sandi Baru</label>
          <input id="pgBaru" type="password" className="pg-input" autoComplete="new-password" placeholder="Kata sandi baru" value={form.baru} onChange={setF('baru')} />
        </div>
        <div>
          <label className="pg-label" htmlFor="pgKonfirmasi">Konfirmasi Kata Sandi Baru</label>
          <input id="pgKonfirmasi" type="password" className="pg-input" autoComplete="new-password" placeholder="Ulangi kata sandi baru" value={form.konfirmasi} onChange={setF('konfirmasi')} />
        </div>
      </div>

      {pesan && (
        <p className={`pg-msg ${pesan.tipe}`} role={pesan.tipe === 'err' ? 'alert' : 'status'}>{pesan.teks}</p>
      )}

      <button type="submit" className="pg-btn">Ubah Kata Sandi</button>
    </form>
  );
}