
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Memastikan seluruh data sudah diisi
    if (
      !fullName.trim() ||
      !identifier.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      alert('Mohon lengkapi seluruh data pendaftaran!');
      return;
    }

    // Memastikan nomor HP hanya berisi angka
    if (!/^[0-9]{10,15}$/.test(phone.trim())) {
      alert('Nomor HP harus terdiri dari 10–15 angka.');
      return;
    }

    // Memastikan kata sandi dan konfirmasi sama
    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    // Memastikan kata sandi tidak terlalu pendek
    if (password.length < 6) {
      alert('Kata sandi minimal 6 karakter.');
      return;
    }

    // Mengambil akun yang sudah terdaftar
    let accounts = [];

    try {
      accounts = JSON.parse(
        localStorage.getItem('civitasAccounts') || '[]'
      );

      if (!Array.isArray(accounts)) {
        accounts = [];
      }
    } catch {
      alert('Data akun bermasalah. Silakan periksa penyimpanan browser.');
      return;
    }

    // Memeriksa apakah NIK/NIM sudah terdaftar
    const existingAccount = accounts.find(
      (account) =>
        String(account.nikNim).trim().toLowerCase() ===
        identifier.trim().toLowerCase()
    );

    if (existingAccount) {
      alert('NIK/NIM sudah terdaftar. Silakan gunakan NIK/NIM lain.');
      return;
    }

    // Membuat akun Civitas Kampus baru
    const newAccount = {
      nama: fullName.trim(),
      nikNim: identifier.trim(),
      noHp: phone.trim(),
      password: password,
      role: 'civitas',
      fotoProfil: '',
    };

    // Menyimpan akun ke localStorage
    try {
      accounts.push(newAccount);

      localStorage.setItem(
        'civitasAccounts',
        JSON.stringify(accounts)
      );
    } catch {
      alert('Akun gagal disimpan. Periksa penyimpanan browser Anda.');
      return;
    }

    alert('Pendaftaran berhasil! Silakan masuk menggunakan NIK/NIM dan kata sandi Anda.');

    navigate('/login');
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-badge">
          <span className="shield-icon">🎓</span> Civitas Kampus
        </div>

        <h2>Daftar Akun</h2>

        <p className="auth-desc">
          Daftarkan akun Civitas Kampus untuk menggunakan sistem Lost & Found.
        </p>
      </div>

      <form onSubmit={handleRegisterSubmit} className="auth-form">
        {/* Nama Lengkap */}
        <div className="form-group">
          <label htmlFor="fullName">Nama Lengkap</label>
          <input
            type="text"
            id="fullName"
            placeholder="Masukkan nama lengkap Anda"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="name"
            required
          />
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

        {/* Nomor HP */}
        <div className="form-group">
          <label htmlFor="phone">No HP</label>
          <input
            type="tel"
            id="phone"
            placeholder="Masukkan nomor HP"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            inputMode="numeric"
            required
          />
        </div>

        {/* Kata Sandi */}
        <div className="form-group">
          <label htmlFor="password">Kata Sandi</label>
          <input
            type="password"
            id="password"
            placeholder="Buat kata sandi baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        {/* Konfirmasi Kata Sandi */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Ulangi kata sandi"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
          />
        </div>

        <button type="submit" className="btn-primary btn-full">
          Daftar Akun
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Sudah punya akun?{' '}
          <Link to="/login" className="auth-link">
            Masuk sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
