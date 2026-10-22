import React, { useRef, useState } from "react";
import SignaturePad from "./SignaturePad";

const INITIAL_LOST_FORM = {
    namaPelapor: "",
    nomorIdentitas: "",
    tempatLahir: "",
    tanggalLahir: "",
    agama: "",
    alamat: "",
    telepon: "",
    namaBarang: "",
    kategori: "",
    merekModel: "",
    warna: "",
    tanggalKejadian: "",
    waktuKejadian: "",
    lokasi: "",
    kronologi: "",
    ttdPelapor: null,
    namaSaksi: "",
    ttdSaksi: null,
};

const INITIAL_FOUND_FORM = {
    namaPelapor: "",
    nomorIdentitas: "",
    telepon: "",
    namaBarang: "",
    kategori: "",
    merekModel: "",
    warna: "",
    tanggalKejadian: "",
    waktuKejadian: "",
    lokasi: "",
    deskripsi: "",
    kronologi: "",
    ttdPelapor: null,
    namaPamdal: "",
    ttdPamdal: null,
};

const CATEGORIES = [
    "Elektronik",
    "Dokumen dan Identitas",
    "Aksesori",
    "Barang Pribadi",
    "Kunci",
    "Lainnya",
];

const RELIGIONS = [
    "Islam",
    "Kristen",
    "Katolik",
    "Hindu",
    "Buddha",
    "Konghucu",
    "Lainnya",
];

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

// Alur laporan penemuan: barang diserahkan ke pamdal dulu, baru dipublikasikan.
const STATUS_PUBLISHED = "Dipublikasikan";
const STATUS_WAITING_PAMDAL = "Menunggu Penerimaan Pamdal";

export default function ReportForm({ onBack, onSubmitReport }) {
    const [page, setPage] = useState("pilihan");
    const [lostForm, setLostForm] = useState({ ...INITIAL_LOST_FORM });
    const [foundForm, setFoundForm] = useState({ ...INITIAL_FOUND_FORM });
    const [lostPhoto, setLostPhoto] = useState(null);
    const [foundPhoto, setFoundPhoto] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [photoError, setPhotoError] = useState("");
    const [signatureErrors, setSignatureErrors] = useState({});
    const [signatureDrafts, setSignatureDrafts] = useState({});
    const [resetCount, setResetCount] = useState(0);
    const uploadRef = useRef(null);

    const photoInputRef = useRef(null);

    const isLost = page === "hilang";
    const currentForm = isLost ? lostForm : foundForm;
    const currentPhoto = isLost ? lostPhoto : foundPhoto;

    const setCurrentForm = isLost ? setLostForm : setFoundForm;
    const setCurrentPhoto = isLost ? setLostPhoto : setFoundPhoto;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentForm((previous) => ({
            ...previous,
            [name]: value,
        }));
        setError("");
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("File harus berupa gambar.");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_PHOTO_SIZE) {
            setError("Ukuran foto maksimal 5 MB.");
            event.target.value = "";
            return;
        }

        setCurrentPhoto(file);
        setPhotoError("");
        setError("");
    };

    const handleSignatureChange = (key, dataUrl) => {
        setCurrentForm((previous) => ({
            ...previous,
            [key]: dataUrl,
        }));
        setSignatureErrors((previous) => ({ ...previous, [key]: "" }));
        setError("");
    };

    const handleSignatureDraft = (key, hasDraft) => {
        setSignatureDrafts((previous) =>
            previous[key] === hasDraft ? previous : { ...previous, [key]: hasDraft }
        );
    };

    const handleReset = () => {
        if (isLost) {
            setLostForm({ ...INITIAL_LOST_FORM });
            setLostPhoto(null);
        } else {
            setFoundForm({ ...INITIAL_FOUND_FORM });
            setFoundPhoto(null);
        }

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
        setConfirmed(false);
        setPhotoError("");
        setSignatureErrors({});
        setSignatureDrafts({});
        setResetCount((count) => count + 1);
        setError("");
    };

    const handleBackToChoices = () => {
        setPhotoError("");
        setSignatureErrors({});
        setPage("pilihan");
        setError("");
    };

    const handleSubmit = (event) => {
        event?.preventDefault();
        setError("");

        setPhotoError("");

        if (!isLost && !currentPhoto) {
            setPhotoError("Foto barang temuan wajib diunggah.");
            uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        const requiredFields = isLost
            ? [
                "namaPelapor",
                "nomorIdentitas",
                "telepon",
                "namaBarang",
                "kategori",
                "tanggalKejadian",
                "waktuKejadian",
                "lokasi",
                "kronologi",
            ]
            : [
                "namaPelapor",
                "nomorIdentitas",
                "telepon",
                "namaBarang",
                "kategori",
                "tanggalKejadian",
                "waktuKejadian",
                "lokasi",
                "deskripsi",
                "kronologi",
                "namaPamdal",
            ];

        const hasEmptyField = requiredFields.some(
            (field) => !String(currentForm[field] ?? "").trim()
        );

        if (hasEmptyField) {
            setError("Lengkapi semua kolom wajib yang bertanda *.");
            return;
        }

        const signatureFields = isLost
            ? [
                { key: "ttdPelapor", label: "pelapor", required: true },
                { key: "ttdSaksi", label: "saksi", required: false },
            ]
            : [
                { key: "ttdPelapor", label: "pelapor", required: true },
                { key: "ttdPamdal", label: "pamdal", required: true },
            ];

        const nextSignatureErrors = {};
        signatureFields.forEach(({ key, label, required }) => {
            if (signatureDrafts[key]) {
                nextSignatureErrors[key] =
                    `Tanda tangan ${label} sudah digambar tetapi belum disimpan. Tekan Simpan atau Ulang.`;
            } else if (required && !currentForm[key]) {
                nextSignatureErrors[key] =
                    `Tanda tangan ${label} wajib diisi, lalu tekan Simpan.`;
            }
        });

        const firstSignatureError = signatureFields.find(({ key }) => nextSignatureErrors[key]);
        if (firstSignatureError) {
            setSignatureErrors(nextSignatureErrors);
            setError("Lengkapi tanda tangan yang diperlukan.");
            document
                .getElementById(`ttd-${firstSignatureError.key}`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }
        setSignatureErrors({});

        if (!confirmed) {
            setError("Centang pernyataan konfirmasi terlebih dahulu.");
            return;
        }

        const payload = {
            jenisLaporan: isLost ? "hilang" : "temuan",
            ...currentForm,
            foto: currentPhoto,
            status: isLost ? STATUS_PUBLISHED : STATUS_WAITING_PAMDAL,
            // Laporan penemuan baru tampil di katalog setelah pamdal mencentang "barang diterima".
            ...(isLost ? {} : { diterimaPamdal: false }),
        };

        setLoading(true);
        try {
            if (typeof onSubmitReport === "function") {
                onSubmitReport(payload);
            } else {
                console.log("Pratinjau laporan:", payload);
            }
            setSuccess(true);
        } catch (err) {
            setError(err?.message || "Laporan gagal dikirim. Silakan coba kembali.");
        } finally {
            setLoading(false);
        }
    };

    const renderField = (name, label, placeholder = "", options = {}) => {
        const isRequired = Boolean(options.required);
        const value = currentForm[name] ?? "";

        return (
            <div className={`form-group ${options.full ? "form-full" : ""}`} key={name}>
                <label className="form-label" htmlFor={name}>
                    {label} {isRequired && <span>*</span>}
                </label>

                {options.type === "select" ? (
                    <select
                        id={name}
                        name={name}
                        className="form-select"
                        value={value}
                        onChange={handleInputChange}
                    >
                        <option value="">Pilih {label.toLowerCase()}</option>
                        {options.data?.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                ) : options.type === "textarea" ? (
                    <textarea
                        id={name}
                        name={name}
                        className="form-textarea"
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        rows={options.rows || 3}
                    />
                ) : (
                    <input
                        id={name}
                        name={name}
                        type={options.type || "text"}
                        className="form-input"
                        value={value}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                    />
                )}
            </div>
        );
    };

    const renderSectionHeader = (number, title, description) => (
        <div className="form-section-heading" key={number}>
            <span className="section-number">{number}</span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );

    if (success) {
        return (
            <div className="report-page">
                <section className="report-card report-result">
                    <div className="result-icon">✓</div>
                    <h2>Laporan Berhasil Dikirim</h2>
                    <p>
                        {isLost
                            ? "Laporan kamu berhasil dicatat ke dalam sistem."
                            : "Laporan penemuan kamu sudah dicatat, tetapi belum tampil di katalog publik."}
                    </p>
                    <div className="result-status">
                        <span>Status laporan</span>
                        <strong>{isLost ? STATUS_PUBLISHED : STATUS_WAITING_PAMDAL}</strong>
                    </div>

                    {!isLost && (
                        <div className="report-notice result-pending-notice">
                            <strong>Menunggu proses penerimaan barang oleh pamdal</strong>
                            <p>
                                Laporan akan dipublikasikan ke katalog setelah barang diterima pamdal.
                                Langkah selanjutnya:
                            </p>
                            <ol className="result-steps">
                                <li>Serahkan barang yang kamu temukan ke Pos Pamdal.</li>
                                <li>Pamdal memeriksa barang dan menandai laporan sebagai &quot;barang diterima&quot;.</li>
                                <li>Setelah itu, laporan otomatis tampil di katalog publik.</li>
                            </ol>
                        </div>
                    )}
                    <button
                        type="button"
                        className="btn-submit-gold"
                        onClick={() => {
                            setSuccess(false);
                            handleReset();
                            setPage("pilihan");
                        }}
                    >
                        Kembali ke Pilihan Borang
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="report-page">
            <div className="report-page-heading">
                {page !== "pilihan" && (
                    <button type="button" className="report-back-button" onClick={handleBackToChoices}>
                        ← Kembali ke Pilihan Borang
                    </button>
                )}
                <h1 style={{ color: "var(--text-main)" }}>Laporan Barang</h1>
                <p>
                    {page === "pilihan"
                        ? "Pilih jenis laporan sesuai kondisi barang."
                        : "Isi informasi dengan benar agar laporan tercatat dengan lengkap."}
                </p>
            </div>

            {page === "pilihan" ? (
                <section className="report-card">
                    <header className="report-header">
                        <div className="report-header-icon">▤</div>
                        <div>
                            <h2 className="report-form-header-title">Pilih Jenis Laporan</h2>
                            <p className="report-form-header-desc">
                                Apakah kamu kehilangan barang atau menemukan barang?
                            </p>
                        </div>
                    </header>
                    <div className="report-form-body">
                        <div className="report-choice-grid">
                            <button
                                type="button"
                                className="report-choice-card lost-choice"
                                onClick={() => {
                                    setPage("hilang");
                                    setError("");
                                }}
                            >
                                <span className="report-choice-icon">⌕</span>
                                <span className="report-choice-title">Borang Berita Acara Kehilangan</span>
                                <span className="report-choice-description">Untuk melaporkan barang milikmu yang hilang.</span>
                                <span className="report-choice-link">Buat Laporan Kehilangan →</span>
                            </button>

                            <button
                                type="button"
                                className="report-choice-card found-choice"
                                onClick={() => {
                                    setPage("temuan");
                                    setError("");
                                }}
                            >
                                <span className="report-choice-icon">▣</span>
                                <span className="report-choice-title">Borang Penemuan Barang</span>
                                <span className="report-choice-description">Untuk melaporkan barang yang kamu temukan.</span>
                                <span className="report-choice-link">Buat Laporan Penemuan →</span>
                            </button>
                        </div>

                        <div className="report-notice" style={{ maxWidth: "450px", margin: "24px auto 0" }}>
                            <strong>Perlu diketahui</strong>
                            <p>
                                Data pribadi dan kontak pelapor tidak ditampilkan pada katalog publik.
                                Pastikan informasi yang kamu masukkan benar.
                            </p>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="report-card">
                    <header className="report-header">
                        <div className="report-header-icon">{isLost ? "⌕" : "▣"}</div>
                        <div>
                            <h2 className="report-form-header-title">
                                {isLost ? "Borang Berita Acara Kehilangan" : "Borang Penemuan Barang"}
                            </h2>
                            <p className="report-form-header-desc">
                                {isLost
                                    ? "Lengkapi data pelapor dan informasi barang yang hilang."
                                    : "Lengkapi data penemu dan informasi barang yang ditemukan."}
                            </p>
                        </div>
                    </header>

                    <div className="report-form-body">
                        <form onSubmit={handleSubmit} noValidate>
                            {renderSectionHeader(
                                "01",
                                isLost ? "Data Pelapor" : "Data Penemu",
                                "Informasi identitas orang yang membuat laporan."
                            )}

                            <div className="form-grid">
                                {renderField("namaPelapor", "Nama Lengkap", "Masukkan nama lengkap", { required: true })}
                                {renderField("nomorIdentitas", "NIM / NIK / No. Identitas", "Masukkan nomor identitas", { required: true })}

                                {isLost && (
                                    <>
                                        {renderField("tempatLahir", "Tempat Lahir", "Contoh: Batam")}
                                        {renderField("tanggalLahir", "Tanggal Lahir", "", { type: "date" })}
                                        {renderField("agama", "Agama", "", { type: "select", data: RELIGIONS })}
                                    </>
                                )}

                                {renderField("telepon", "Nomor Telepon", "Nomor yang bisa dihubungi", { required: true })}

                                {isLost && renderField("alamat", "Alamat", "Alamat tempat tinggal", { full: true, type: "textarea" })}
                            </div>

                            {renderSectionHeader(
                                "02",
                                isLost ? "Informasi Barang Hilang" : "Informasi Penemuan",
                                isLost ? "Jelaskan barang yang hilang dan kapan kejadiannya." : "Jelaskan kapan dan di mana barang ditemukan."
                            )}

                            <div className="form-grid">
                                {renderField("namaBarang", "Nama Barang", "Contoh: Dompet atau kunci motor", { required: true })}
                                {renderField("kategori", "Kategori", "", { type: "select", data: CATEGORIES, required: true })}
                                {renderField("merekModel", "Merek / Model", "Jika diketahui")}
                                {renderField("warna", "Warna", "Contoh: Hitam")}
                                {renderField("tanggalKejadian", isLost ? "Tanggal Kehilangan" : "Tanggal Penemuan", "", { type: "date", required: true })}
                                {renderField("waktuKejadian", "Perkiraan Waktu", "", { type: "time", required: true })}
                                {renderField("lokasi", isLost ? "Lokasi Kehilangan" : "Lokasi Penemuan", "Contoh: Area parkir gedung A", { full: true, required: true })}

                                {!isLost &&
                                    renderField("deskripsi", "Deskripsi Barang", "Jelaskan ciri-ciri barang secara spesifik", {
                                        full: true,
                                        type: "textarea",
                                        required: true,
                                    })}

                                {renderField(
                                    "kronologi",
                                    isLost ? "Kronologi Kehilangan" : "Kronologi Penemuan",
                                    isLost ? "Ceritakan kapan terakhir melihat barang..." : "Ceritakan bagaimana barang ditemukan...",
                                    { full: true, type: "textarea", required: true, rows: 4 }
                                )}

                                <div className="form-group form-full">
                                    <label className="form-label">
                                        Foto Barang {isLost ? "(Opsional)" : "*"}
                                    </label>

                                    <div
                                        ref={uploadRef}
                                        className={`report-upload-area${photoError ? " has-error" : ""}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => photoInputRef.current?.click()}
                                    >
                                        <span className="upload-symbol">↑</span>
                                        <strong>
                                            {currentPhoto ? currentPhoto.name : "Klik untuk memilih foto"}
                                        </strong>
                                        <span>Format gambar, maksimal 5 MB</span>
                                    </div>

                                    {photoError && (
                                        <p className="field-error" role="alert">
                                            ⚠️ {photoError}
                                        </p>
                                    )}

                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handlePhotoChange}
                                    />

                                    {currentPhoto && (
                                        <button
                                            type="button"
                                            className="remove-photo-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentPhoto(null);
                                                if (photoInputRef.current) {
                                                    photoInputRef.current.value = "";
                                                }
                                                setError("");
                                            }}
                                        >
                                            Hapus foto
                                        </button>
                                    )}
                                </div>
                            </div>

                            {renderSectionHeader(
                                "03",
                                "Tanda Tangan",
                                isLost
                                    ? "Tanda tangan pelapor wajib diisi, tanda tangan saksi bersifat opsional."
                                    : "Tanda tangan pelapor dan pamdal wajib diisi."
                            )}

                            <div className="form-grid">
                                <div className="signature-cell">
                                    <SignaturePad
                                        key={`${page}-ttdPelapor-${resetCount}`}
                                        id="ttd-ttdPelapor"
                                        label="Tanda Tangan Pelapor"
                                        required
                                        value={currentForm.ttdPelapor}
                                        onChange={(dataUrl) => handleSignatureChange("ttdPelapor", dataUrl)}
                                        onDraftChange={(hasDraft) => handleSignatureDraft("ttdPelapor", hasDraft)}
                                        error={signatureErrors.ttdPelapor}
                                    />
                                </div>

                                {isLost ? (
                                    <div className="signature-cell">
                                        {renderField("namaSaksi", "Nama Saksi (Opsional)", "Nama lengkap saksi")}
                                        <SignaturePad
                                            key={`${page}-ttdSaksi-${resetCount}`}
                                            id="ttd-ttdSaksi"
                                            label="Tanda Tangan Saksi"
                                            value={currentForm.ttdSaksi}
                                            onChange={(dataUrl) => handleSignatureChange("ttdSaksi", dataUrl)}
                                            onDraftChange={(hasDraft) => handleSignatureDraft("ttdSaksi", hasDraft)}
                                            error={signatureErrors.ttdSaksi}
                                        />
                                    </div>
                                ) : (
                                    <div className="signature-cell">
                                        {renderField("namaPamdal", "Nama Pamdal", "Nama lengkap pamdal", { required: true })}
                                        <SignaturePad
                                            key={`${page}-ttdPamdal-${resetCount}`}
                                            id="ttd-ttdPamdal"
                                            label="Tanda Tangan Pamdal"
                                            required
                                            value={currentForm.ttdPamdal}
                                            onChange={(dataUrl) => handleSignatureChange("ttdPamdal", dataUrl)}
                                            onDraftChange={(hasDraft) => handleSignatureDraft("ttdPamdal", hasDraft)}
                                            error={signatureErrors.ttdPamdal}
                                        />
                                    </div>
                                )}
                            </div>

                            {!isLost && (
                                <div className="report-notice">
                                    <strong>Barang harus diserahkan ke pamdal</strong>
                                    <p>
                                        Setelah laporan dikirim, serahkan barang ke Pos Pamdal. Laporan baru
                                        dipublikasikan ke katalog setelah pamdal menandai barang sebagai diterima.
                                    </p>
                                </div>
                            )}

                            <div className="report-notice">
                                <strong>Privasi dan kelengkapan data</strong>
                                <p>
                                    Informasi pribadi dan nomor telepon tidak ditampilkan pada katalog publik.
                                    Pastikan informasi barang yang kamu laporkan benar dan lengkap.
                                </p>
                            </div>

                            <label className="report-confirmation">
                                <input
                                    type="checkbox"
                                    checked={confirmed}
                                    onChange={(e) => {
                                        setConfirmed(e.target.checked);
                                        setError("");
                                    }}
                                />
                                <span>Saya menyatakan informasi yang diisi benar sesuai pengetahuan saya.</span>
                            </label>

                            {error && (
                                <div className="report-error" role="alert">
                                    ⚠️ {error}
                                </div>
                            )}

                            <div className="report-form-actions">
                                <button type="button" className="btn-cancel" onClick={handleReset} disabled={loading}>
                                    Reset Formulir
                                </button>
                                <button type="button" className="btn-submit-gold" onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Mengirim..." : "Kirim Laporan →"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </div>
    );
}