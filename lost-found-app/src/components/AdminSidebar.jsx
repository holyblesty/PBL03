import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../data/auth';

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      id: 'barang-hilang',
      name: 'Daftar Barang Hilang',
      path: '/barang-hilang',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="7" />
          <path d="m16 16 4 4" />
        </svg>
      ),
    },
    {
      id: 'barang-temuan',
      name: 'Daftar Barang Temuan',
      path: '/barang-temuan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z" />
          <path d="m3 8 9 5 9-5M12 13v8" />
        </svg>
      ),
    },
    {
      id: 'konfirmasi-penerimaan',
      name: 'Konfirmasi Penerimaan Barang',
      path: '/konfirmasi-penerimaan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="m8 12 3 3 5-6" />
        </svg>
      ),
    },
    {
      id: 'pengambilan-barang',
      name: 'Pengambilan Barang',
      path: '/pengambilan-barang',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 7h18v13H3z" />
          <path d="M8 7V4h8v3M12 11v5m-3-3 3 3 3-3" />
        </svg>
      ),
    },
    {
      id: 'riwayat-laporan',
      name: 'Riwayat Laporan',
      path: '#riwayat-laporan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2M3 5v5h5" />
        </svg>
      ),
    },
    {
      id: 'settings',
      name: 'Settings',
      path: '#settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" />
        </svg>
      ),
    },
  ];

  const activeId =
    menuItems.find((item) => item.path === location.pathname)?.id ||
    'dashboard';

  const handleLogout = () => {
    const yakin = window.confirm(
      'Apakah kamu yakin ingin keluar dari akun Pamdal?'
    );

    if (!yakin) return;

    logout();
    navigate('/login', { replace: true });
  };

  return (
    <aside
      style={{
        width: '250px',
        minWidth: '250px',
        flexShrink: 0,
        minHeight: '100vh',
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111827',
        color: '#E2E8F0',
        borderRight: '3px solid #FBBF24',
        padding: '12px 10px',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', Tahoma, sans-serif",
        overflowY: 'auto',
      }}
    >
      {/* Logo dan nama aplikasi */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          minHeight: '60px',
          padding: '0 8px 12px',
          borderBottom: '1px solid #374151',
          marginBottom: '10px',
        }}
      >
        <div
          style={{
            width: '22px',
            height: '22px',
            flexShrink: 0,
            border: '2px solid #FBBF24',
            borderRadius: '4px',
            backgroundColor: 'transparent',
          }}
        />

        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.3,
              fontWeight: 800,
              color: '#FFFFFF',
            }}
          >
            Lost &amp; Found
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: '8px',
              color: '#FBBF24',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            KEAMANAN KAMPUS
          </p>
        </div>
      </div>

      {/* Menu navigasi */}
      <nav
        aria-label="Navigasi Pamdal"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          flex: 1,
        }}
      >
        {menuItems.map((item) => {
          const isActive = activeId === item.id;

          return (
            <Link
              key={item.id}
              to={item.path.startsWith('/') ? item.path : location.pathname + item.path}
              aria-current={isActive ? 'page' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                minHeight: '35px',
                padding: '8px 9px',
                borderRadius: '6px',
                boxSizing: 'border-box',
                backgroundColor: isActive ? '#FBBF24' : 'transparent',
                color: isActive ? '#111827' : '#CBD5E1',
                textDecoration: 'none',
                fontSize: '12px',
                lineHeight: 1.35,
                fontWeight: isActive ? 700 : 500,
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(event) => {
                if (!isActive) {
                  event.currentTarget.style.backgroundColor = '#1F2937';
                  event.currentTarget.style.color = '#FFFFFF';
                }
              }}
              onMouseLeave={(event) => {
                if (!isActive) {
                  event.currentTarget.style.backgroundColor = 'transparent';
                  event.currentTarget.style.color = '#CBD5E1';
                }
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '14px',
                  height: '14px',
                  flexShrink: 0,
                }}
              >
                {React.cloneElement(item.icon, {
                  width: 14,
                  height: 14,
                  strokeWidth: 1.7,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                })}
              </span>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout di bagian bawah */}
      <div
        style={{
          borderTop: '1px solid #374151',
          paddingTop: '8px',
          marginTop: '12px',
        }}
      >
        <button
          type="button"
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            width: '100%',
            minHeight: '30px',
            padding: '7px 9px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: 'transparent',
            color: '#E2E8F0',
            fontSize: '12px',
            fontWeight: 600,
            textAlign: 'left',
            cursor: 'pointer',
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.backgroundColor = '#1F2937';
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <path d="m9 9 6 6m0-6-6 6" />
          </svg>

          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;