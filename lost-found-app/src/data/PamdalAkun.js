import adminData from './AdminData';
import { getLoginUser } from './auth';

// Akun Pamdal bawaan ada di AdminData.js (data tetap).
// Perubahan dari halaman Pengaturan (profil, foto, kata sandi) disimpan di
// localStorage dengan kunci 'pamdalAkun', lalu digabung dengan data bawaan.
const KEY = 'pamdalAkun';

function bacaPerubahan() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

// Semua akun Pamdal = data bawaan + perubahan yang pernah disimpan.
// Dipakai juga oleh halaman Login supaya kata sandi baru berlaku.
export function ambilAkunPamdal() {
  const perubahan = bacaPerubahan();
  return adminData.map((akun) => ({ nip: '', email: '', ...akun, ...(perubahan[akun.id] || {}) }));
}

// Akun milik Pamdal yang sedang login (null kalau tidak ketemu)
export function ambilAkunLogin() {
  const user = getLoginUser();
  if (!user) return null;
  return ambilAkunPamdal().find((akun) => akun.id === user.id) || null;
}

// Simpan perubahan ke daftar akun, sekaligus ke data login yang aktif
function simpanPerubahan(id, perubahan) {
  try {
    const semua = bacaPerubahan();
    semua[id] = { ...(semua[id] || {}), ...perubahan };
    localStorage.setItem(KEY, JSON.stringify(semua));

    const user = getLoginUser();
    if (user && user.id === id) {
      localStorage.setItem('loginUser', JSON.stringify({ ...user, ...perubahan }));
    }
    return true;
  } catch (err) {
    console.error('Gagal menyimpan perubahan akun:', err);
    return false;
  }
}

// data: { nama, nip, nikNim, noHp, email, fotoProfil }
export function simpanProfilPamdal(id, data) {
  return simpanPerubahan(id, data);
}

export function ubahKataSandiPamdal(id, passwordBaru) {
  return simpanPerubahan(id, { password: passwordBaru });
}