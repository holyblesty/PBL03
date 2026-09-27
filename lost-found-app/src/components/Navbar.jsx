import React, { useState } from 'react';

function Navbar() {
    const [isHoveredAdd, setIsHoveredAdd] = useState(false);

    // Warna konsisten dengan palet Sidebar Keamanan sebelumnya
    const colors = {
        bgNavbar: '#ffffff',       // Latar belakang putih bersih agar konten utama kontras
        textMain: '#111827',       // Teks abu-abu arang sangat gelap
        textMuted: '#6B7280',      // Abu-abu redup untuk sub-informasi
        border: '#E5E7EB',         // Garis batas tipis lembut
        addBtnBg: '#111827',       // Hitam arang (senada dengan warna sidebar)
        addBtnHover: '#1F2937',    // Sedikit lebih terang saat di-hover
        accentGold: '#FBBF24'      // Kuning Emas Terang untuk aksen teks/ikon tombol
    };

    return (
        <header style={{
            height: '70px',
            backgroundColor: colors.bgNavbar,
            borderBottom: `1px solid ${colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            width: '100%'
        }}>

            {/* Bagian Kiri: Bar Pencarian Barang Terbuka */}
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', width: '350px' }}>
                <span style={{ position: 'absolute', left: '12px', display: 'flex', alignItems: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.textMuted} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="Cari barang, nomor laporan, atau nama..."
                    style={{
                        width: '100%',
                        padding: '10px 12px 10px 40px',
                        fontSize: '14px',
                        backgroundColor: '#F3F4F6',
                        border: '1px solid transparent',
                        borderRadius: '8px',
                        outline: 'none',
                        color: colors.textMain,
                        fontWeight: '500',
                        transition: 'all 0.15s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.backgroundColor = '#ffffff';
                        e.target.style.borderColor = '#F59E0B'; // Aksen oranye emas saat fokus
                        e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.15)';
                    }}
                    onBlur={(e) => {
                        e.target.style.backgroundColor = '#F3F4F6';
                        e.target.style.borderColor = 'transparent';
                        e.target.style.boxShadow = 'none';
                    }}
                />
            </div>

            {/* Bagian Kanan: Aksi & Informasi Akun Petugas */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

                {/* 1. Tombol Input Barang Baru (Sangat Berguna untuk Alur Lost & Found) */}
                <button
                    onMouseEnter={() => setIsHoveredAdd(true)}
                    onMouseLeave={() => setIsHoveredAdd(false)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: isHoveredAdd ? colors.addBtnHover : colors.addBtnBg,
                        color: colors.accentGold, // Teks warna emas menyala biar kontras di atas tombol hitam
                        border: 'none',
                        padding: '10px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '750', // Dipertebal biar makin jelas dibaca
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'all 0.15s ease-in-out'
                    }}
                    onClick={() => alert('Membuka Formulir Input Laporan Barang Baru...')}
                >
                    {/* Ikon Plus (+) Profesional */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Input Barang
                </button>

                {/* 2. Ikon Notifikasi Laporan Masuk */}
                <button style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    padding: '6px',
                    borderRadius: '5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.textMain} strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    {/* Badge Notifikasi Merah Terang untuk Pengingat Verifikasi Pending */}
                    <span style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '9px',
                        height: '9px',
                        backgroundColor: '#DC2626',
                        borderRadius: '50%',
                        border: '2px solid #ffffff'
                    }}></span>
                </button>

                {/* Pembatas Vertikal */}
                <div style={{ width: '1px', height: '24px', backgroundColor: colors.border }}></div>

                {/* 3. Profil Anggota Keamanan / Admin */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: colors.textMain }}>
                            Bripda Kurniawan
                        </p>
                        <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: colors.textMuted }}>
                            NIP. 19940212
                        </p>
                    </div>
                    {/* Avatar Inisial Petugas */}
                    <div style={{
                        width: '38px',
                        height: '38px',
                        backgroundColor: '#111827',
                        color: colors.accentGold,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        fontWeight: '700',
                        border: '2px solid #E5E7EB'
                    }}>
                        BK
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Navbar;
