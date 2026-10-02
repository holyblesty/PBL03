import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from './halaman/AdminDashboard';
import UserDashboard from './halaman/UserDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigasi sementara untuk tes perpindahan halaman */}
        <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>User Dashboard</Link>
          <Link to="/admin">Admin Dashboard</Link>
        </nav>

        {/* Pengaturan Routing Utama */}
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;