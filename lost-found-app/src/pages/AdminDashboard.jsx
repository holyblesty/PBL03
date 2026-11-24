
import React from 'react';
import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import StatsGrid from '../components/StatsGrid';
import { getLoginUser } from '../data/auth';
import '../App.css';

function AdminDashboard() {
  const currentUser = getLoginUser();
  const namaPamdal = currentUser?.nama || 'Pamdal';

  const activities = [
    {
      id: 1,
      color: '#F59E0B',
      message: (
        <>
          Laporan temuan baru menunggu penerimaan: <strong>Dompet Hitam (LF-T-0012)</strong>
        </>
      ),
      time: '10 menit lalu',
    },
    {
      id: 2,
      color: '#10B981',
      message: (
        <>
          Barang <strong>Tumbler Biru (LF-T-0005)</strong> berhasil diambil pemilik
        </>
      ),
      time: '1 jam lalu',
    },
    {
      id: 3,
      color: '#64748B',
      message: (
        <>
          Postingan <strong>Laptop Asus</strong> dipublikasikan setelah penerimaan dikonfirmasi
        </>
      ),
      time: 'Kemarin',
    },
  ];

  const quickActionStyle = {
    padding: '12px 16px',
    backgroundColor: '#111827',
    color: '#FFFFFF',
    border: '1px solid #111827',
    borderRadius: '6px',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    fontSize: '13px',
    minHeight: '42px',
  };

  const quickActionOutlineStyle = {
    ...quickActionStyle,
    backgroundColor: '#FFFFFF',
    color: '#111827',
    border: '1px solid #111827',
  };

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <main className="dashboard-content">
          <header
            className="admin-header"
            style={{ marginBottom: '24px', textAlign: 'left' }}
          >
            <h1>Dashboard Utama</h1>
            <p>
              Selamat datang, {namaPamdal}. Berikut ringkasan
              operasional sistem kehilangan dan penemuan barang kampus.
            </p>
          </header>

          <StatsGrid />

          <section style={{ marginTop: '24px' }}>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '12px',
              }}
            >
              Aksi Cepat Pamdal
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/konfirmasi-penerimaan';
                }}
                style={quickActionStyle}
              >
                <span>Konfirmasi Penerimaan Barang (5)</span>
                <span>➜</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = '/pengambilan-barang';
                }}
                style={quickActionOutlineStyle}
              >
                <span>Pengambilan Barang</span>
                <span>➜</span>
              </button>
            </div>
          </section>

          <section
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '24px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                flexWrap: 'wrap',
              }}
            >
              <h3
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#111827',
                }}
              >
                Aktivitas Terbaru Sistem
              </h3>

              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Data simulasi
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    paddingBottom:
                      index !== activities.length - 1 ? '12px' : 0,
                    borderBottom:
                      index !== activities.length - 1
                        ? '1px solid #E2E8F0'
                        : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#374151',
                      fontSize: '13px',
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: activity.color,
                        flexShrink: 0,
                      }}
                    />

                    <span>{activity.message}</span>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      color: '#64748B',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
