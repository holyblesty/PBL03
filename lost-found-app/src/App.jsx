import { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import PenggunaDashboard from './PenggunaDashboard';

function App() {
  // Nanti bagian state ini bakal diganti sama data login aslinya Holy
  const [role, setRole] = useState('pengguna');

  return (
    <div>
      {/* Tombol sementara buat ganti-ganti tampilan */}
      <div style={{ padding: '10px', backgroundColor: '#eee', marginBottom: '20px' }}>
        <span>Ubah Tampilan (Simulasi): </span>
        <button onClick={() => setRole('pengguna')} style={{ margin: '0 5px' }}>Dashboard Pengguna</button>
        <button onClick={() => setRole('admin')}>Dashboard Admin</button>
      </div>

      {/* Menampilkan salah satu saja, tidak digabung */}
      {role === 'admin' ? <AdminDashboard /> : <PenggunaDashboard />}
    </div>
  );
}

export default App;