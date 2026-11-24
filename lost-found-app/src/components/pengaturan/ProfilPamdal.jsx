import React, { useRef, useState } from 'react';
import { simpanProfilPamdal } from '../../data/PamdalAkun';

const UKURAN_FOTO = 256;
const MAKS_FILE = 2 * 1024 * 1024; // 2 MB

// Foto dipotong persegi dan diperkecil supaya muat di localStorage
function perkecilFoto(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File gagal dibaca'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gambar gagal dimuat'));
      img.onload = () => {
        const sisi = Math.min(img.width, img.height);
        const canvas = document.createElement('canvas');
        canvas.width = UKURAN_FOTO;
        canvas.height = UKURAN_FOTO;
        canvas
          .getContext('2d')
          .drawImage(img, (img.width - sisi) / 2, (img.height - sisi) / 2, sisi, sisi, 0, 0, UKURAN_FOTO, UKURAN_FOTO);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const POLA_HP = /^(\+62|62|0)8[0-9]{8,12}$/;
const POLA_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Kartu "Profil Pamdal"
export default function ProfilPamdal({ akun, onTersimpan }) {
  const fileRef = useRef(null);
  const [form, setForm] = useState({
    nama: akun.nama || '',
    nip: akun.nip || '',
    nikNim: akun.nikNim || '',
    noHp: akun.noHp || '',
    email: akun.email || '',
  });
  const [foto, setFoto] = useState(akun.fotoProfil || '');
  const [pesan, setPesan] = useState(null); // { tipe: 'ok' | 'err', teks }

  const setF = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setPesan(null);
  };

  const inisial = (form.nama || 'P')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((kata) => kata.charAt(0))
    .join('')
    .toUpperCase();

  const pilihFoto = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPesan({ tipe: 'err', teks: 'Silakan pilih file gambar.' });
      return;
    }
    if (file.size > MAKS_FILE) {
      setPesan({ tipe: 'err', teks: 'Ukuran foto maksimal 2 MB.' });
      return;
    }
    try {
      setFoto(await perkecilFoto(file));
      setPesan(null);
    } catch {
      setPesan({ tipe: 'err', teks: 'Foto gagal dibaca. Silakan coba foto lain.' });
    }
  };

  const simpan = (e) => {
    e.preventDefault();
    const data = {
      nama: form.nama.trim(),
      nip: form.nip.trim(),
      nikNim: form.nikNim.trim(),
      noHp: form.noHp.trim(),
      email: form.email.trim(),
    };

    if (!data.nama || !data.nikNim) {
      setPesan({ tipe: 'err', teks: 'Nama lengkap dan NIK / NIM wajib diisi.' });
      return;
    }
    if (data.noHp && !POLA_HP.test(data.noHp.replace(/[\s-]/g, ''))) {
      setPesan({ tipe: 'err', teks: 'Format No HP tidak valid. Contoh: 081234567890.' });
      return;
    }
    if (data.email && !POLA_EMAIL.test(data.email)) {
      setPesan({ tipe: 'err', teks: 'Format email tidak valid. Contoh: nama@kampus.ac.id.' });
      return;
    }

    const berhasil = simpanProfilPamdal(akun.id, { ...data, fotoProfil: foto });
    if (!berhasil) {
      setPesan({ tipe: 'err', teks: 'Perubahan gagal disimpan. Coba lagi.' });
      return;
    }
    setPesan({ tipe: 'ok', teks: 'Profil berhasil diperbarui.' });
    onTersimpan();
  };

  return (
    <form className="pg-card" onSubmit={simpan}>
      <h2 className="pg-card-title">Profil Pamdal</h2>

      <div className="pg-avatar-row">
        <div className="pg-avatar">
          {foto ? <img src={foto} alt="Foto profil Pamdal" /> : inisial}
        </div>
        <button type="button" className="pg-btn-outline" onClick={() => fileRef.current?.click()}>
          Ganti Foto
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={pilihFoto} style={{ display: 'none' }} />
      </div>

      <div className="pg-form-grid">
        <div>
          <label className="pg-label" htmlFor="pgNama">Nama Lengkap</label>
          <input id="pgNama" className="pg-input" value={form.nama} onChange={setF('nama')} />
        </div>
        <div>
          <label className="pg-label" htmlFor="pgNip">NIP</label>
          <input id="pgNip" className="pg-input" placeholder="NIP petugas Pamdal" value={form.nip} onChange={setF('nip')} />
        </div>
        <div>
          <label className="pg-label" htmlFor="pgNik">NIK / NIM</label>
          <input id="pgNik" className="pg-input" value={form.nikNim} onChange={setF('nikNim')} />
        </div>
        <div>
          <label className="pg-label" htmlFor="pgHp">No HP</label>
          <input id="pgHp" className="pg-input" placeholder="08xx-xxxx-xxxx" value={form.noHp} onChange={setF('noHp')} />
        </div>
        <div className="pg-full">
          <label className="pg-label" htmlFor="pgEmail">Email</label>
          <input id="pgEmail" type="email" className="pg-input" placeholder="email@kampus.ac.id" value={form.email} onChange={setF('email')} />
        </div>
      </div>

      {pesan && (
        <p className={`pg-msg ${pesan.tipe}`} role={pesan.tipe === 'err' ? 'alert' : 'status'}>{pesan.teks}</p>
      )}

      <button type="submit" className="pg-btn">Simpan Perubahan</button>
    </form>
  );
}