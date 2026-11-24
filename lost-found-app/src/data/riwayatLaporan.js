import { bacaDaftar } from '../utils/pengambilan';

// Data simulasi riwayat laporan yang sudah selesai (nanti bisa diganti API/database).
// tanggal memakai format YYYY-MM-DD supaya mudah diurutkan dan difilter.
const RIWAYAT_AWAL = [
  { kode: 'LF-T-0011', nama: 'Laptop Asus', jenis: 'Temuan', tanggal: '2026-10-29', pengambil: 'Nama Pengambil', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-T-0005', nama: 'Tumbler Biru', jenis: 'Temuan', tanggal: '2026-10-28', pengambil: 'Tia Lestari', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-T-0004', nama: 'Jam Tangan', jenis: 'Temuan', tanggal: '2026-10-27', pengambil: 'Hadi Putra', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-H-0010', nama: 'Power Bank', jenis: 'Hilang', tanggal: '2026-10-26', pengambil: 'Lia Maharani', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-T-0002', nama: 'Kunci Motor', jenis: 'Temuan', tanggal: '2026-10-25', pengambil: 'Fajar S.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-H-0007', nama: 'Payung Hitam', jenis: 'Hilang', tanggal: '2026-10-24', pengambil: 'Nita S.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-T-0001', nama: 'Dompet Cokelat', jenis: 'Temuan', tanggal: '2026-10-23', pengambil: 'Rudi H.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-H-0004', nama: 'Kacamata', jenis: 'Hilang', tanggal: '2026-10-22', pengambil: 'Yoga P.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-T-0006', nama: 'Kartu Mahasiswa', jenis: 'Temuan', tanggal: '2026-10-21', pengambil: 'Dewi A.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-H-0003', nama: 'Topi Hitam', jenis: 'Hilang', tanggal: '2026-10-20', pengambil: 'Bagas R.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-T-0007', nama: 'Botol Minum', jenis: 'Temuan', tanggal: '2026-10-19', pengambil: 'Maya S.', petugas: 'ROY', status: 'Dikembalikan' },
  { kode: 'LF-H-0002', nama: 'Earphone', jenis: 'Hilang', tanggal: '2026-10-18', pengambil: 'Tegar W.', petugas: 'ROY', status: 'Dikembalikan' },
];

const pad = (n) => String(n).padStart(2, '0');

// Date -> 'YYYY-MM-DD' memakai zona waktu lokal
function tanggalLokal(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Gabungkan data simulasi dengan pengambilan yang benar-benar dicatat Pamdal
// lewat halaman Pengambilan Barang (tersimpan di localStorage).
// Kalau kodenya sama, data asli dari Pamdal menggantikan data simulasi.
export function ambilSemuaRiwayat() {
  const nyata = bacaDaftar('riwayatPengambilan')
    .map((r) => ({ r, waktu: new Date(r.waktu) }))
    .filter(({ waktu }) => !Number.isNaN(waktu.getTime()))
    .map(({ r, waktu }) => ({
      kode: r.kode,
      nama: r.barang,
      jenis: String(r.kode).startsWith('LF-H') ? 'Hilang' : 'Temuan',
      tanggal: tanggalLokal(waktu),
      pengambil: r.pengambil,
      petugas: r.petugas,
      status: 'Dikembalikan',
      nik: r.nik,
      hp: r.hp,
      instansi: r.instansi,
      catatan: r.catatan,
      foto: r.foto,
      ttdPengambil: r.ttdPengambil,
      ttdPamdal: r.ttdPamdal,
    }));

  const kodeNyata = new Set(nyata.map((r) => r.kode));
  const awal = RIWAYAT_AWAL.filter((r) => !kodeNyata.has(r.kode));

  return [...nyata, ...awal].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export default RIWAYAT_AWAL;