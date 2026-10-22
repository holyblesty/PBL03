import React, { useState } from 'react';

// Terima activeTab dan setActiveTab sebagai props dari parent component
export default function UserSidebar({ activeTab, setActiveTab, collapsed = false, onToggle }) {
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
            width: collapsed ? '76px' : '270px',
            minWidth: collapsed ? '76px' : '270px',
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'width 0.25s ease, min-width 0.25s ease',
            backgroundColor: colors.bgSidebar,
            color: '#FFFFFF',
            padding: collapsed ? '24px 10px' : '24px 16px',
            height: '100vh',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '4px 0px 10px rgba(0,0,0,0.3)'
        }}>
            {/* Header Panel */}
            <div style={{ position: 'relative', marginBottom: '32px', paddingLeft: collapsed ? '0' : '8px', borderBottom: '1px solid #374151', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: '10px', marginBottom: collapsed ? '0' : '6px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={colors.textActive} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
                    </svg>
                    {!collapsed && (
                        <h2 style={{ fontSize: '19px', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '0.5px' }}>
                            Lost & Found
                        </h2>
                    )}
                </div>
                {!collapsed && (
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
                )}
                {/* Tombol buka/tutup sidebar */}
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}
                    title={collapsed ? 'Buka sidebar' : 'Tutup sidebar'}
                    style={{
                        position: collapsed ? 'static' : 'absolute',
                        top: 0,
                        right: 0,
                        width: '28px',
                        height: '28px',
                        margin: collapsed ? '14px auto 0' : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid #374151',
                        borderRadius: '6px',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points={collapsed ? '9 18 15 12 9 6' : '15 18 9 12 15 6'} />
                    </svg>
                </button>
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
                            title={collapsed ? item.name : undefined}
                            aria-label={item.name}
                            onClick={() => setActiveTab(item.id)} // Mengubah state di parent
                            onMouseEnter={() => setHoveredMenu(item.id)}
                            onMouseLeave={() => setHoveredMenu(null)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: collapsed ? 'center' : 'flex-start',
                                gap: collapsed ? '0' : '12px',
                                fontSize: '15px',
                                fontWeight: isActive ? '700' : '600',
                                color: currentIconColor,
                                background: 'none',
                                border: 'none',
                                width: '100%',
                                textAlign: 'left',
                                cursor: 'pointer',
                                padding: collapsed ? '14px 0' : '14px 16px',
                                borderRadius: '8px',
                                backgroundColor: isActive ? colors.bgActive : (isHovered ? '#1F2937' : 'transparent'),
                                borderLeft: isActive ? `5px solid ${colors.accentLine}` : '5px solid transparent',
                                transition: 'all 0.15s ease-in-out',
                                paddingLeft: collapsed ? '0' : (isActive ? '11px' : '16px')
                            }}
                        >
                            {item.icon(currentIconColor)}
                            {!collapsed && <span style={{ whiteSpace: 'nowrap' }}>{item.name}</span>}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}