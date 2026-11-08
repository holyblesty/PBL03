/**
 * File: UserNavbar.jsx
 * Fungsi: Menampilkan navigasi atas, profil pengguna, dan panel notifikasi.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

import React, { useState } from 'react';

export default function UserNavbar() {
    const [showNotifications, setShowNotifications] = useState(false);

    const handleOpenNotifications = () => {
        setShowNotifications((previous) => !previous);
    };

    return (
        <header style={{
            height: '4.375rem',
            backgroundColor: '#FFFFFF',
            borderBottom: '0.0625rem solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end', // Diubah jadi flex-end karena search bar-nya dihilangkan
            padding: '0 1.5rem',
            boxSizing: 'border-box',
            position: 'relative',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            width: '100%'
        }}>

            {/* Bagian Kanan: Notifikasi & Profil */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>

                {/* Tombol Lonceng Notifikasi Vektor SVG */}
                <div style={{ position: 'relative' }}>
                    <button
                        onClick={handleOpenNotifications}
                        style={{
                            background: 'none',
                            border: '0.0625rem solid #E5E7EB',
                            cursor: 'pointer',
                            position: 'relative',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F9FAFB',
                            transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F1F5F9'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                        title="Notifikasi"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>

                    </button>

                    {/* Dropdown Box Notifikasi */}
                    {showNotifications && (
                        <div style={{ position: 'absolute', right: '0', top: '3.125rem', width: '21.25rem', backgroundColor: '#FFFFFF', border: '0.0625rem solid #E5E7EB', borderRadius: '0.75rem', boxShadow: '0 0.625rem 0.9375rem -0.1875rem rgba(0,0,0,0.05), 0 0.25rem 0.375rem -0.125rem rgba(0,0,0,0.05)', zIndex: 100, padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', borderBottom: '0.0625rem solid #F1F5F9', paddingBottom: '0.625rem' }}>
                                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#111827' }}>Notifikasi</span>
                            </div>
                            <div style={{ padding: '1.5rem 0.75rem', textAlign: 'center', color: '#64748B', fontSize: '0.75rem' }}>
                                Belum ada notifikasi.
                            </div>
                        </div>
                    )}
                </div>

                {/* Pembatas Vertikal */}
                <div style={{ width: '0.0625rem', height: '1.5rem', backgroundColor: '#E5E7EB' }}></div>

                {/* Profil Pengguna */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '750', color: '#111827' }}>
                            Civitas Kampus
                        </p>
                        <p style={{ margin: 0, fontSize: '0.6875rem', fontWeight: '600', color: '#64748B' }}>
                            Portal Pengguna
                        </p>
                    </div>
                    <div style={{
                        width: '2.375rem',
                        height: '2.375rem',
                        borderRadius: '50%',
                        backgroundColor: '#111827',
                        color: '#FBBF24',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.875rem',
                        border: '0.125rem solid #E5E7EB'
                    }}>
                        CK
                    </div>
                </div>
            </div>
        </header>
    );
}