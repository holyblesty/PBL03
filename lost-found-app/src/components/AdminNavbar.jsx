
import React, { useState, useRef } from 'react';
import { getLoginUser } from '../data/auth';

function AdminNavbar() {
  const [isHoveredAdd, setIsHoveredAdd] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const currentUser = getLoginUser();
  const photoInputRef = useRef(null);

  const [fotoProfil, setFotoProfil] = useState(
    currentUser?.fotoProfil || ''
  );

  const nama = currentUser?.nama || 'Pamdal';
  const identitas = currentUser?.nikNim || '-';

  const inisial = nama
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((kata) => kata.charAt(0))
    .join('')
    .toUpperCase();

  const colors = {
    bgNavbar: '#FFFFFF',
    textMain: '#111827',
    textMuted: '#64748B',
    border: '#E2E8F0',
    addBtnBg: '#111827',
    addBtnHover: '#1F2937',
    accentGold: '#FBBF24',
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Silakan pilih file gambar.');
      e.target.value = '';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran foto maksimal 2 MB.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const fotoBaru = reader.result;

      const loginUser = JSON.parse(
        localStorage.getItem('loginUser') || 'null'
      );

      if (!loginUser) {
        alert('Data akun tidak ditemukan. Silakan login kembali.');
        return;
      }

      loginUser.fotoProfil = fotoBaru;

      localStorage.setItem(
        'loginUser',
        JSON.stringify(loginUser)
      );

      setFotoProfil(fotoBaru);
      setShowProfileMenu(false);

      alert('Foto profil berhasil diperbarui.');
    };

    reader.onerror = () => {
      alert('Foto gagal dibaca. Silakan coba kembali.');
    };

    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <header
      style={{
        minHeight: '70px',
        backgroundColor: colors.bgNavbar,
               borderBottom: '3px solid #FBBF24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '12px 24px',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Pencarian */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: 'min(350px, 45%)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: '12px',
            color: colors.textMuted,
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          type="search"
          placeholder="Cari barang, nomor laporan, atau nama..."
          aria-label="Cari barang, nomor laporan, atau nama"
          style={{
            width: '100%',
            padding: '10px 12px 10px 40px',
            fontSize: '13px',
            backgroundColor: '#F3F4F6',
            border: '1px solid transparent',
            borderRadius: '8px',
            outline: 'none',
            color: colors.textMain,
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#F59E0B';
            e.currentTarget.style.boxShadow =
              '0 0 0 3px rgba(245, 158, 11, 0.15)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Tombol Buat Laporan dan Notifikasi */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          marginLeft: 'auto',
        }}
      >
        <button
          type="button"
          onMouseEnter={() => setIsHoveredAdd(true)}
          onMouseLeave={() => setIsHoveredAdd(false)}
          onClick={() =>
            window.alert(
              'Form Buat Laporan akan dihubungkan setelah halaman formulir Pamdal dibuat.'
            )
          }
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: isHoveredAdd
              ? colors.addBtnHover
              : colors.addBtnBg,
            color: colors.accentGold,
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <span>＋</span>
          BUAT LAPORAN
        </button>

        <button
          type="button"
          aria-label="Notifikasi"
          title="Notifikasi"
          onClick={() =>
            window.alert('Fitur notifikasi akan dihubungkan nanti.')
          }
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '5px',
            display: 'flex',
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.textMain}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M10 21h4" />
          </svg>

          <span
            style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '7px',
              height: '7px',
              backgroundColor: '#DC2626',
              borderRadius: '50%',
            }}
          />
        </button>

        <div
          style={{
            width: '1px',
            height: '30px',
            backgroundColor: colors.border,
          }}
        />

        {/* Profil Pamdal */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowProfileMenu((prev) => !prev)}
            aria-expanded={showProfileMenu}
            aria-label="Buka pilihan foto profil"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '3px',
            }}
          >
            <div style={{ textAlign: 'right' }}>
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  fontWeight: 700,
                  color: colors.textMain,
                  whiteSpace: 'nowrap',
                }}
              >
                {nama}
              </p>

              <p
                style={{
                  margin: '3px 0 0',
                  fontSize: '11px',
                  color: colors.textMuted,
                }}
              >
                NIK/NIM: {identitas}
              </p>
            </div>

            {fotoProfil ? (
              <img
                src={fotoProfil}
                alt="Foto profil Pamdal"
                style={{
                  width: '38px',
                  height: '38px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #E2E8F0',
                }}
              />
            ) : (
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  flexShrink: 0,
                  backgroundColor: '#111827',
                  color: colors.accentGold,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: '2px solid #E2E8F0',
                }}
              >
                {inisial || 'P'}
              </div>
            )}
          </button>

          {/* Menu profil hanya untuk mengubah foto */}
          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                width: '190px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
              }}
            >
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '9px',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  background: 'transparent',
                  padding: '10px 8px',
                  borderRadius: '5px',
                  fontSize: '13px',
                  color: '#111827',
                  cursor: 'pointer',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
                  <circle cx="10" cy="12" r="3" />
                  <path d="m16 5 3-3 3 3-3 3" />
                  <path d="M19 2v9" />
                </svg>

                Edit Foto Profil
              </button>
            </div>
          )}

          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
