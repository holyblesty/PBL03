import React from 'react';

function StatsGrid() {
    return (
        /* Menghapus gridTemplate manual karena sistem auto-fit responsif sudah ditangani oleh .stats-grid di App.css */
        <div className="stats-grid">

            {/* Kotak 1: Barang Hilang */}
            <div className="stat-card">
                <h3>Barang Hilang</h3>
                {/* Menggunakan kelas bawaan .stat-blue untuk warna info umum kebiruan */}
                <p className="stat-blue">12</p>
            </div>

            {/* Kotak 2: Barang Ditemukan */}
            <div className="stat-card">
                <h3>Barang Ditemukan</h3>
                {/* Menggunakan kelas bawaan .stat-green untuk warna hijau sukses resmi */}
                <p className="stat-green">8</p>
            </div>

            {/* Kotak 3: Total Pengguna */}
            <div className="stat-card">
                <h3>Total Pengguna</h3>
                {/* Menggunakan kelas bawaan .stat-yellow untuk warna oranye emas penanda */}
                <p className="stat-yellow">45</p>
            </div>

        </div>
    );
}

export default StatsGrid;
