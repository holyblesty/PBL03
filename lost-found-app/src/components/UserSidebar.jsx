/**
 * File: UserSidebar.jsx
 * Fungsi: Menampilkan navigasi samping dan menu halaman pengguna.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React, { useState } from 'react';

// Terima activeTab dan setActiveTab sebagai props dari parent component
export default function UserSidebar({ activeTab, setActiveTab, collapsed = false, onToggle }) {
    const [hoveredMenu, setHoveredMenu] = useState(null);

    // List menu disesuaikan untuk kebutuhan Pengguna Kampus
    const MENU_ITEMS = [
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

    const COLORS = {
        bgSidebar: '#111827',
        bgActive: '#1F2937',
        textActive: '#FBBF24',
        textNormal: '#E2E8F0',
        accentLine: '#F59E0B',
    };

    return (
        <aside style={{
            width: collapsed ? '4.75rem' : '16.875rem',
            minWidth: collapsed ? '4.75rem' : '16.875rem',
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'width 0.25s ease, min-width 0.25s ease',
            backgroundColor: COLORS.bgSidebar,
            color: '#FFFFFF',
            padding: collapsed ? '1.5rem 0.625rem' : '1.5rem 1rem',
            height: '100vh',
            boxSizing: 'border-box',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            boxShadow: '0.25rem 0rem 0.625rem rgba(0,0,0,0.3)'
        }}>
            {/* Header Panel */}
            <div style={{ position: 'relative', marginBottom: '2rem', paddingLeft: collapsed ? '0' : '0.5rem', borderBottom: '0.0625rem solid #374151', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: '0.625rem', marginBottom: collapsed ? '0' : '0.375rem' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={COLORS.textActive} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5" />
                    </svg>
                    {!collapsed && (
                        <h2 style={{ fontSize: '1.1875rem', fontWeight: '800', margin: 0, color: '#FFFFFF', letterSpacing: '0.0312rem' }}>
                            Lost & Found
                        </h2>
                    )}
                </div>
                {!collapsed && (
                    <p style={{
                        fontSize: '0.6875rem',
                        color: COLORS.textActive,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.0938rem',
                        margin: 0,
                        paddingLeft: '2.125rem'
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
                        width: '1.75rem',
                        height: '1.75rem',
                        margin: collapsed ? '0.875rem auto 0' : 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '0.0625rem solid #374151',
                        borderRadius: '0.375rem',
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
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {MENU_ITEMS.map((item) => {
                    // Menggunakan activeTab dari props parent
                    const isActive = activeTab === item.id;
                    const isHovered = hoveredMenu === item.id;
                    const currentIconColor = isActive ? COLORS.textActive : (isHovered ? '#FFFFFF' : COLORS.textNormal);

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
                                gap: collapsed ? '0' : '0.75rem',
                                fontSize: '0.9375rem',
                                fontWeight: isActive ? '700' : '600',
                                color: currentIconColor,
                                background: 'none',
                                border: 'none',
                                width: '100%',
                                textAlign: 'left',
                                cursor: 'pointer',
                                padding: collapsed ? '0.875rem 0' : '0.875rem 1rem',
                                borderRadius: '0.5rem',
                                backgroundColor: isActive ? COLORS.bgActive : (isHovered ? '#1F2937' : 'transparent'),
                                borderLeft: isActive ? `0.3125rem solid ${COLORS.accentLine}` : '0.3125rem solid transparent',
                                transition: 'all 0.15s ease-in-out',
                                paddingLeft: collapsed ? '0' : (isActive ? '0.6875rem' : '1rem')
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