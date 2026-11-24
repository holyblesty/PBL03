// Fungsi bantu untuk halaman Pengambilan Barang

const BULAN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const pad = (n) => String(n).padStart(2, '0');

// Contoh: 10 Nov 2026
export function formatTanggal(d) {
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

// Contoh: 14.35
export function formatJam(d) {
  return `${pad(d.getHours())}.${pad(d.getMinutes())}`;
}

// Baca daftar (array) dari localStorage dengan aman
export function bacaDaftar(key) {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}