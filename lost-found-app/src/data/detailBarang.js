// Detail tambahan per barang (data simulasi, nanti bisa diganti API/database).
// Kunci = kode postingan. Barang yang tidak ada di sini memakai nilai default.
const DETAIL_BARANG = {
  'LF-T-0011': { kategori: 'Elektronik', lokasiSimpan: 'Pos Pamdal Perpustakaan', tglTemuan: '27 Okt 2026, 13.50', tglLapor: '27 Okt 2026, 15.00', jenis: 'Laptop', merek: 'Asus VivoBook', ciri: 'Stiker biru', lokasiLengkap: 'Perpustakaan Lt.1' },
  'LF-T-0010': { kategori: 'Payung', lokasiSimpan: 'Pos Pamdal Pusat', tglTemuan: '26 Okt 2026, 12.10', tglLapor: '26 Okt 2026, 12.30', jenis: 'Payung', merek: '-', ciri: 'Warna biru', lokasiLengkap: 'Kantin' },
  'LF-T-0008': { kategori: 'Botol', lokasiSimpan: 'Pos Pamdal Pusat', tglTemuan: '25 Okt 2026, 10.20', tglLapor: '25 Okt 2026, 10.45', jenis: 'Botol Minum', merek: '-', ciri: '-', lokasiLengkap: 'Lab Komputer' },
  'LF-T-0003': { kategori: 'Kunci', lokasiSimpan: 'Pos Pamdal Gedung B', tglTemuan: '22 Okt 2026, 16.00', tglLapor: '22 Okt 2026, 16.15', jenis: 'Kunci Motor', merek: 'Honda', ciri: 'Gantungan biru', lokasiLengkap: 'Parkiran Gd. B' },
};

// Gabungkan data dasar barang (barangTemuan) dengan detail tambahan
export function ambilDetail(barang) {
  const extra = DETAIL_BARANG[barang.id] || {};
  return {
    kategori: barang.kategori,
    lokasiSimpan: 'Pos Pamdal',
    tglTemuan: barang.tanggal,
    tglLapor: barang.tanggal,
    jenis: barang.nama,
    merek: '-',
    ciri: '-',
    lokasiLengkap: barang.lokasi,
    ...extra,
  };
}

export default DETAIL_BARANG;