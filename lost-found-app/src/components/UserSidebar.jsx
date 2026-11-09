import React, { useState } from 'react';

// Terima activeTab dan setActiveTab sebagai props dari parent component
export default function UserSidebar({ activeTab, setActiveTab }) {
    const [hoveredMenu, setHoveredMenu] = useState(null);

    // List menu disesuaikan untuk kebutuhan Pengguna Kampus
    const menuItems = [
        {
            id: 'dashboard',
            name: 'Dashboard Portal',
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
            name: 'Buat Laporan', // Disesuaikan untuk form laporan (US-04/US-05)
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
            )
        },
        {
            id: 'riwayat-laporan',
            name: 'Riwayat Laporan Saya',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 8v4l3 3" />
                    <circle cx="12" cy="12" r="9" />
                </svg>
            )
        },
        {
            id: 'riwayat',
            name: 'Riwayat Selesai',
            icon: (color) => (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
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
            width: '270px',
            minWidth: '270px',
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textActive} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
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
                    paddingLeft: '34px'
                }}>
                    PORTAL PENGGUNA KAMPUS
                </p>
            </div>

            {/* Navigasi Menu */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {menuItems.map((item) => {
                    // Menggunakan activeTab dari props parent
                    const isActive = activeTab === item.id;
                    const isHovered = hoveredMenu === item.id;
                    const currentIconColor = isActive ? colors.textActive : (isHovered ? '#FFFFFF' : colors.textNormal);

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)} // Mengubah state di parent
                            onMouseEnter={() => setHoveredMenu(item.id)}
                            onMouseLeave={() => setHoveredMenu(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                fontSize: '15px',
                                fontWeight: isActive ? '700' : '600',
                                color: currentIconColor,
                                background: 'none',
                                border: 'none',
                                width: '100%',
                                textAlign: 'left',
                                cursor: 'pointer',
                                padding: '14px 16px',
                                borderRadius: '8px',
                                backgroundColor: isActive ? colors.bgActive : (isHovered ? '#1F2937' : 'transparent'),
                                borderLeft: isActive ? `5px solid ${colors.accentLine}` : '5px solid transparent',
                                transition: 'all 0.15s ease-in-out',
                                paddingLeft: isActive ? '11px' : '16px'
                            }}
                        >
                            {item.icon(currentIconColor)}
                            <span>{item.name}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}