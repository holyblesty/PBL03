import React, { useState } from 'react';

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [hoveredMenu, setHoveredMenu] = useState(null);

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', path: '#dashboard' },
        { id: 'laporan', name: 'Daftar Barang', path: '#laporan' },
        { id: 'pengguna', name: 'Kelola Pengguna', path: '#pengguna' }
    ];

    // Warna dengan KONTRAS TINGGI (High Contrast)
    const colors = {
        bgSidebar: '#111827',     // Abu-abu arang sangat gelap (hampir hitam), teks putih di atasnya pasti kelihatan jelas
        bgActive: '#1F2937',      // Latar belakang menu aktif yang lebih terang dari background utama
        textActive: '#FBBF24',    // Kuning Emas Terang (Sangat kontras di latar belakang gelap)
        textNormal: '#E2E8F0',    // Putih keabu-abuan terang untuk menu biasa (bukan abu-abu mati)
        accentLine: '#F59E0B',    // Oranye Emas untuk garis penanda
    };

    return (
        <aside style={{
            width: '260px',
            backgroundColor: colors.bgSidebar,
            color: '#FFFFFF',
            padding: '24px 16px',
            height: '100vh',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '4px 0px 10px rgba(0,0,0,0.3)' // Tambah bayangan biar sidebar terpisah dari konten
        }}>
            {/* Header Panel */}
            <div style={{ marginBottom: '32px', paddingLeft: '8px', borderBottom: '1px solid #374151', paddingBottom: '16px' }}>
                <h2 style={{
                    fontSize: '20px', // Diperbesar biar makin jelas
                    fontWeight: '800',
                    margin: '0 0 6px 0',
                    color: '#FFFFFF'
                }}>
                    📦 Lost & Found
                </h2>
                <p style={{
                    fontSize: '12px',
                    color: colors.textActive, // Label admin langsung pakai warna kuning terang
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    margin: 0
                }}>
                    KEAMANAN KAMPUS
                </p>
            </div>

            {/* Navigasi Menu */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {menuItems.map((item) => {
                    const isActive = activeMenu === item.id;
                    const isHovered = hoveredMenu === item.id;

                    return (
                        <a
                            key={item.id}
                            href={item.path}
                            onClick={() => setActiveMenu(item.id)}
                            onMouseEnter={() => setHoveredMenu(item.id)}
                            onMouseLeave={() => setHoveredMenu(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '15px', // Ukuran font dinaikkan ke 15px agar lebih ramah mata
                                fontWeight: isActive ? '700' : '600', // Dibuat lebih tebal semua
                                color: isActive ? colors.textActive : (isHovered ? '#FFFFFF' : colors.textNormal),
                                textDecoration: 'none',
                                padding: '14px 16px', // Padding ditebalkan agar area klik lebih luas
                                borderRadius: '8px',
                                backgroundColor: isActive ? colors.bgActive : (isHovered ? '#1F2937' : 'transparent'),
                                borderLeft: isActive ? `5px solid ${colors.accentLine}` : '5px solid transparent', // Garis indikator dipertebal jadi 5px
                                transition: 'all 0.15s ease-in-out',
                                paddingLeft: isActive ? '11px' : '16px'
                            }}
                        >
                            {item.name}
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;