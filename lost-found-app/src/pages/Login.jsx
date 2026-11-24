import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ambilAkunPamdal } from '../data/PamdalAkun';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginAs, setLoginAs] = useState('civitas');

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const nikNim = identifier.trim();

    if (!nikNim || !password) {
      alert('Mohon isi NIK/NIM dan kata sandi!');
      return;
    }

    // LOGIN PAMDAL
    if (loginAs === 'pamdal') {
      const pamdal = ambilAkunPamdal().find(
        (item) =>
          item.nikNim === nikNim &&
          item.password === password &&
          item.role === 'admin'
      );

      if (!pamdal) {
        alert('NIK/NIM atau kata sandi Admin/Pamdal salah!');
        return;
      }

      localStorage.setItem(
        'loginUser',
        JSON.stringify({
          ...pamdal,
          role: 'pamdal',
        })
      );

      alert(`Login berhasil. Selamat datang, ${pamdal.nama}!`);
      navigate('/dashboard');
      return;
    }

    // LOGIN CIVITAS KAMPUS
    const accounts = JSON.parse(
      localStorage.getItem('civitasAccounts') || '[]'
    );

    const civitas = accounts.find(
      (item) =>
        item.nikNim === nikNim &&
        item.password === password
    );

    if (!civitas) {
      alert(
        'Akun Civitas Kampus tidak ditemukan atau kata sandi salah. Silakan periksa kembali atau daftar terlebih dahulu.'
      );
      return;
    }

    localStorage.setItem(
      'loginUser',
      JSON.stringify({
        ...civitas,
        role: 'civitas',
      })
    );

    alert(`Login berhasil. Selamat datang, ${civitas.nama}!`);
    navigate('/user-dashboard');
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-badge">
          <span className="shield-icon">🛡️</span>
          Autentikasi Sistem
        </div>

        <h2>Masuk Akun</h2>

        <p className="auth-desc">
          Masuk menggunakan NIK/NIM dan kata sandi yang telah terdaftar.
        </p>
      </div>

      <form onSubmit={handleLoginSubmit} className="auth-form">
        {/* PILIH JENIS AKUN */}
        <div className="form-group">
          <label>Masuk sebagai</label>

          <div className="login-role-switch">
            <button
              type="button"
              className={
                loginAs === 'civitas'
                  ? 'login-role-button active'
                  : 'login-role-button'
              }
              onClick={() => setLoginAs('civitas')}
              aria-pressed={loginAs === 'civitas'}
            >
              Civitas Kampus
            </button>

            <button
              type="button"
              className={
                loginAs === 'pamdal'
                  ? 'login-role-button active'
                  : 'login-role-button'
              }
              onClick={() => setLoginAs('pamdal')}
              aria-pressed={loginAs === 'pamdal'}
            >
              Admin/Pamdal
            </button>
          </div>
        </div>

        {/* NIK / NIM */}
        <div className="form-group">
          <label htmlFor="identifier">NIK / NIM</label>

          <input
            type="text"
            id="identifier"
            placeholder="Masukkan NIK atau NIM"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            autoComplete="username"
            required
          />
        </div>

        {/* KATA SANDI */}
        <div className="form-group">
          <label htmlFor="password">Kata Sandi</label>

          <input
            type="password"
            id="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        <button type="submit" className="btn-primary btn-full">
          Masuk
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Belum memiliki akun?{' '}
          <Link to="/register" className="auth-link">
            Daftar di sini
          </Link>
        </p>

        <small className="pamdal-info">
          Akun Admin/Pamdal digunakan untuk keperluan pengelolaan sistem.
        </small>
      </div>
    </div>
  );
}