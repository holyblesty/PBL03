const NAV_LINKS = [
  { tab: "dashboard", label: "Katalog barang" },
  { tab: "laporan", label: "Buat laporan" },
  { tab: "riwayat-laporan", label: "Riwayat laporan" },
];

const POS_PAMDAL = [
  "Pos utama (dekat gerbang masuk)",
  "Gedung Utama",
  "Gedung TA",
];

export default function UserFooter({ onNavigate }) {
  return (
    <footer className="user-footer">
      <div className="user-footer__inner">
        <div className="user-footer__brand">
          <p className="user-footer__name">Siap PBL</p>
          <p className="user-footer__desc">
            Sistem informasi lost &amp; found kampus. Laporkan barang hilang
            atau temuan, lalu ambil di Pos Pamdal.
          </p>
        </div>

        <nav className="user-footer__nav" aria-label="Navigasi footer">
          <p className="user-footer__heading">Menu</p>
          <ul>
            {NAV_LINKS.map((item) => (
              <li key={item.tab}>
                <button type="button" onClick={() => onNavigate?.(item.tab)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="user-footer__contact">
          <p className="user-footer__heading">Lokasi Pos Pamdal</p>
          <ul className="user-footer__list">
            {POS_PAMDAL.map((pos) => (
              <li key={pos}>{pos}</li>
            ))}
          </ul>
          <p>Serahkan barang temuan ke pos paling depan (Pos Mawar).</p>
          <p>
            Bawa bukti kepemilikan saat mengambil barang, misalnya STNK untuk
            kunci motor.
          </p>
          <p>
            Barang temuan biasanya disimpan di pos hingga 30 hari. Setelah itu,
            hubungi pengawas Pamdal atau BMN.
          </p>
        </div>
      </div>

      <div className="user-footer__bottom">
        <p>&copy; {new Date().getFullYear()} Siap PBL: Lost &amp; Found Kampus</p>
      </div>
    </footer>
  );
}