import React, { useMemo, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import StepperPengambilan from '../components/pengambilan/StepperPengambilan';
import PengambilanCari from '../components/pengambilan/PengambilanCari';
import PengambilanVerifikasi, { PERTANYAAN } from '../components/pengambilan/PengambilanVerifikasi';
import PengambilanForm from '../components/pengambilan/PengambilanForm';
import PengambilanBerhasil from '../components/pengambilan/PengambilanBerhasil';
import barangTemuan from '../data/barangTemuan';
import { ambilDetail } from '../data/detailBarang';
import { getLoginUser } from '../data/auth';
import { bacaDaftar } from '../utils/pengambilan';
import '../App.css';
import './AdminBarangHilang.css';
import './PengambilanBarang.css';

const JUDUL = {
  1: 'Pengambilan Barang',
  2: 'Verifikasi Kepemilikan',
  3: 'Form Pengambilan Barang',
  4: 'Pengambilan Barang',
};

const FORM_KOSONG = { nama: '', instansi: '', nik: '', hp: '' };

// Halaman pengatur alur. Tampilan tiap langkah ada di components/pengambilan/.
export default function PengambilanBarang() {
  const pamdal = getLoginUser();
  const namaPamdal = pamdal?.nama || 'Pamdal';
  const idPamdal = pamdal?.nikNim || '-';

  const [langkah, setLangkah] = useState(1); // 1 cari, 2 verifikasi, 3 form, 4 berhasil
  const [kode, setKode] = useState('');
  const [error, setError] = useState('');
  const [barang, setBarang] = useState(null);
  const [dikembalikan, setDikembalikan] = useState(() => bacaDaftar('barangDikembalikan'));
  const [pesan, setPesan] = useState('');

  // verifikasi
  const [pengklaim, setPengklaim] = useState({ nama: '', nik: '' });
  const [jawaban, setJawaban] = useState({});
  const [catatan, setCatatan] = useState('');
  const [hasil, setHasil] = useState('');
  const [errVerif, setErrVerif] = useState('');

  // form pengambilan
  const [form, setForm] = useState(FORM_KOSONG);
  const [waktu, setWaktu] = useState(() => new Date());
  const [foto, setFoto] = useState('');
  const [ttdPengambil, setTtdPengambil] = useState('');
  const [ttdPamdal, setTtdPamdal] = useState('');
  const [errForm, setErrForm] = useState('');
  const [selesai, setSelesai] = useState(null);

  const detail = useMemo(() => (barang ? ambilDetail(barang) : null), [barang]);

  const kelengkapan = [
    { label: 'Foto bukti terunggah', ok: Boolean(foto) },
    { label: 'Tanda tangan pengambil', ok: Boolean(ttdPengambil) },
    { label: 'Tanda tangan Pamdal', ok: Boolean(ttdPamdal) },
  ];
  const lengkap = kelengkapan.every((k) => k.ok);

  const resetSemua = () => {
    setLangkah(1);
    setKode('');
    setError('');
    setBarang(null);
    setPengklaim({ nama: '', nik: '' });
    setJawaban({});
    setCatatan('');
    setHasil('');
    setErrVerif('');
    setForm(FORM_KOSONG);
    setFoto('');
    setTtdPengambil('');
    setTtdPamdal('');
    setErrForm('');
    setSelesai(null);
  };

  /* ----- Langkah 1 ----- */
  const cariKode = (e) => {
    e.preventDefault();
    setPesan('');
    const q = kode.trim().toUpperCase();
    if (!q) {
      setError('Masukkan kode postingan terlebih dahulu.');
      setBarang(null);
      return;
    }
    const ketemu = barangTemuan.find((b) => b.id.toUpperCase() === q);
    if (!ketemu) {
      setError(`Kode ${q} tidak ditemukan.`);
      setBarang(null);
      return;
    }
    if (ketemu.status === 'Dikembalikan' || dikembalikan.includes(ketemu.id)) {
      setError(`${ketemu.id} sudah dikembalikan kepada pemiliknya.`);
      setBarang(null);
      return;
    }
    if (ketemu.status !== 'Dipublikasikan') {
      setError(`${ketemu.id} berstatus "${ketemu.status}". Hanya postingan berstatus Dipublikasikan yang dapat diklaim.`);
      setBarang(null);
      return;
    }
    setError('');
    setBarang(ketemu);
  };

  /* ----- Langkah 2 ----- */
  const lanjutKeForm = () => {
    if (!pengklaim.nama.trim() || !pengklaim.nik.trim()) {
      setErrVerif('Nama dan NIM / NIK pengklaim wajib diisi.');
      return;
    }
    if (PERTANYAAN.some((p) => !jawaban[p.key])) {
      setErrVerif('Jawab ketiga pertanyaan verifikasi terlebih dahulu.');
      return;
    }
    if (hasil !== 'valid') {
      setErrVerif('Pilih hasil verifikasi "Valid" untuk melanjutkan.');
      return;
    }
    if (PERTANYAAN.some((p) => jawaban[p.key] !== 'ya')) {
      setErrVerif('Masih ada jawaban verifikasi yang tidak sesuai, hasil tidak bisa Valid.');
      return;
    }
    setErrVerif('');
    setForm((f) => ({ ...f, nama: pengklaim.nama, nik: pengklaim.nik }));
    setWaktu(new Date());
    setLangkah(3);
  };

  const tolakVerifikasi = () => {
    const kodeBatal = barang.id;
    resetSemua();
    setPesan(`Pengambilan ${kodeBatal} dibatalkan: verifikasi tidak valid / barang tidak diserahkan.`);
  };

  /* ----- Langkah 3 ----- */
  const simpan = () => {
    if (!form.nama.trim() || !form.nik.trim() || !form.hp.trim()) {
      setErrForm('Nama, nomor identitas, dan No HP pengambil wajib diisi.');
      return;
    }
    setErrForm('');
    const sekarang = new Date();
    const catat = {
      kode: barang.id,
      barang: barang.nama,
      pengambil: form.nama.trim(),
      nik: form.nik.trim(),
      hp: form.hp.trim(),
      instansi: form.instansi.trim(),
      petugas: namaPamdal,
      catatan: catatan.trim(),
      foto,
      ttdPengambil,
      ttdPamdal,
      waktu: sekarang.toISOString(),
    };
    try {
      const riwayat = bacaDaftar('riwayatPengambilan');
      riwayat.push(catat);
      localStorage.setItem('riwayatPengambilan', JSON.stringify(riwayat));
      const baru = [...dikembalikan, barang.id];
      localStorage.setItem('barangDikembalikan', JSON.stringify(baru));
      setDikembalikan(baru);
    } catch (err) {
      console.error('Gagal menyimpan data pengambilan:', err);
      setErrForm('Penyimpanan penuh. Hapus data lama atau perkecil ukuran foto, lalu coba lagi.');
      return;
    }
    setSelesai({ pengambil: form.nama.trim(), waktu: sekarang });
    setLangkah(4);
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="bh-wrap">
          <h1 className="bh-title">{JUDUL[langkah]}</h1>
          {langkah === 1 && (
            <p className="bh-sub">Cari postingan berdasarkan kode yang ditunjukkan civitas kampus.</p>
          )}
          {(langkah === 2 || langkah === 3) && (
            <div style={{ marginTop: 14 }}>
              <StepperPengambilan langkah={langkah} />
            </div>
          )}

          {langkah === 1 && (
            <PengambilanCari
              kode={kode}
              setKode={setKode}
              error={error}
              setError={setError}
              pesan={pesan}
              barang={barang}
              detail={detail}
              onCari={cariKode}
              onAmbil={() => setLangkah(2)}
            />
          )}

          {langkah === 2 && (
            <PengambilanVerifikasi
              barang={barang}
              detail={detail}
              pengklaim={pengklaim}
              setPengklaim={setPengklaim}
              jawaban={jawaban}
              setJawaban={setJawaban}
              catatan={catatan}
              setCatatan={setCatatan}
              hasil={hasil}
              setHasil={setHasil}
              errVerif={errVerif}
              onLanjut={lanjutKeForm}
              onTolak={tolakVerifikasi}
              onKembali={() => setLangkah(1)}
            />
          )}

          {langkah === 3 && (
            <PengambilanForm
              detail={detail}
              form={form}
              setForm={setForm}
              waktu={waktu}
              foto={foto}
              setFoto={setFoto}
              setTtdPengambil={setTtdPengambil}
              setTtdPamdal={setTtdPamdal}
              kelengkapan={kelengkapan}
              lengkap={lengkap}
              errForm={errForm}
              namaPamdal={namaPamdal}
              idPamdal={idPamdal}
              onSimpan={simpan}
            />
          )}

          {langkah === 4 && selesai && (
            <PengambilanBerhasil barang={barang} selesai={selesai} onBaru={resetSemua} />
          )}
        </main>
      </div>
    </div>
  );
}