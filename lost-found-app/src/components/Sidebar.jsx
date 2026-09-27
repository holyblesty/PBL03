import React, { useState } from 'react';

function Sidebar() {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [hoveredMenu, setHoveredMenu] = useState(null);

    // List menu dengan tambahan properti icon berupa fungsi SVG path
    const menuItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            path: '#dashboard',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" />
                    <rect x="14" y="3" width="7" height="5" />
                    <rect x="14" y="12" width="7" height="9" />
                    <rect x="3" y="16" width="7" height="5" />
                </svg>
            )
        },
        {
            id: 'laporan',
            name: 'Daftar Barang',
            path: '#laporan',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
            )
        },
        {
            id: 'verifikasi',
            name: 'Verifikasi Barang',
            path: '#verifikasi',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
            )
        },
        {
            id: 'jadwal',
            name: 'Jadwal Pengambilan',
            path: '#jadwal',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            )
        },
        {
            id: 'pengguna',
            name: 'Kelola Pengguna',
            path: '#pengguna',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        }
    ];

    const colors = {
        bgSidebar: '#111827',
        bgActive: '#1F2937',
        textActive: '#FBBF24',
        textNormal: '#E2E8F0',
        accentLine: '#F59E0B',
    };

    return (
        <aside style={{
            width: '270px', // Lebar dinaikkan dikit agar muat teks dan ikon dengan leluasa
            backgroundColor: colors.bgSidebar,
            color: '#FFFFFF',
            padding: '24px 16px',
            height: '100vh',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '4px 0px 10px rgba(0,0,0,0.3)'
        }}>
            {/* Header Panel */}
            <div style={{ marginBottom: '32px', paddingLeft: '8px', borderBottom: '1px solid #374151', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    {/* Logo Perisai Keamanan Kampus */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textActive} strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <h2 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                        Lost & Found
                    </h2>
                </div>
                <p style={{
                    fontSize: '11px',
                    color: colors.textActive,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    margin: 0,
                    paddingLeft: '34px' // Meluruskan dengan teks judul
                }}>
                    KEAMANAN KAMPUS
                </p>
            </div>

            {/* Navigasi Menu */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {menuItems.map((item) => {
                    const isActive = activeMenu === item.id;
                    const isHovered = hoveredMenu === item.id;

                    // Menentukan warna ikon secara dinamis
                    const currentIconColor = isActive ? colors.textActive : (isHovered ? '#FFFFFF' : colors.textNormal);

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
                                gap: '12px', // Jarak antara ikon dan teks menu
                                fontSize: '15px',
                                fontWeight: isActive ? '700' : '600',
                                color: currentIconColor,
                                textDecoration: 'none',
                                padding: '14px 16px',
                                borderRadius: '8px',
                                backgroundColor: isActive ? colors.bgActive : (isHovered ? '#1F2937' : 'transparent'),
                                borderLeft: isActive ? `5px solid ${colors.accentLine}` : '5px solid transparent',
                                transition: 'all 0.15s ease-in-out',
                                paddingLeft: isActive ? '11px' : '16px'
                            }}
                        >
                            {/* Render Ikon SVG */}
                            {item.icon(currentIconColor)}
                            <span>{item.name}</span>
                        </a>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;
