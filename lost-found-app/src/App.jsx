import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './halaman/UserDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Pengaturan Routing Utama */}
        <Routes>
          <Route path="/" element={<UserDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;