
/**
 * File: ReportForm.jsx
 * Fungsi: Menyediakan formulir pelaporan kehilangan dan penemuan barang, termasuk validasi, unggah foto, tanda tangan digital, pengeditan laporan, dan penggunaan kembali data identitas formulir sebelumnya.
 * Pembuat: Tim PBLIF03_MA03 (Jesina Holyblesty Simatupang dan Vivian Sarah Diva Alisianoi)
 */

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
    ruangan: "",
    detailLokasi: "",
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
    ruangan: "",
    detailLokasi: "",
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

const LOCATION_OPTIONS = [
    "Kantin",
    "Mushola",
    "Parkiran",
    "Gedung Utama",
    "Gedung TA",
    "Smoking Area",
    "Gedung Techno",
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
const STATUS_PUBLISHED = "Dipublikasikan";
const STATUS_WAITING_PAMDAL = "Menunggu Penerimaan Barang";
const PREVIOUS_FORM_STORAGE_KEY = "lost_found_previous_form_data";

// Menentukan jenis laporan yang sedang diedit.
const getReportType = (report) => {
    const type = String(
        report?.jenisLaporan || report?.jenis || ""
    ).toLowerCase();

    return ["hilang", "kehilangan"].includes(type)
        ? "hilang"
        : "temuan";
};

// Menyesuaikan data lokasi laporan lama.
const getInitialLocationData = (report) => {
    const oldLocation = String(report?.lokasi || "");
    const isKnownLocation = LOCATION_OPTIONS.includes(oldLocation);

    return {
        lokasi: isKnownLocation
            ? oldLocation
            : oldLocation
                ? "Lainnya"
                : "",
        ruangan: report?.ruangan || (!isKnownLocation ? oldLocation : ""),
        detailLokasi: report?.detailLokasi || "",
    };
};

// Mengambil hanya data identitas yang dapat digunakan kembali.
const getReusableFormData = (formType, formData) => {
    const fields =
        formType === "hilang"
            ? [
                "namaPelapor",
                "nomorIdentitas",
                "tempatLahir",
                "tanggalLahir",
                "agama",
                "alamat",
                "telepon",
            ]
            : [
                "namaPelapor",
                "nomorIdentitas",
                "telepon",
            ];

    return Object.fromEntries(
        fields.map((field) => [
            field,
            formData?.[field] || "",
        ])
    );
};

// Membaca data identitas sebelumnya.
const getAllPreviousFormData = () => {
    try {
        return JSON.parse(
            localStorage.getItem(PREVIOUS_FORM_STORAGE_KEY) || "{}"
        );
    } catch (error) {
        console.error("Data sebelumnya gagal dibaca:", error);
        return {};
    }
};

// Mengambil data identitas berdasarkan jenis laporan.
const getPreviousFormData = (formType) =>
    getAllPreviousFormData()[formType] || null;

// Menyimpan hanya data identitas.
const savePreviousFormData = (formType, formData) => {
    try {
        const previousData = getAllPreviousFormData();

        localStorage.setItem(
            PREVIOUS_FORM_STORAGE_KEY,
            JSON.stringify({
                ...previousData,
                [formType]: getReusableFormData(formType, formData),
            })
        );
    } catch (error) {
        console.error("Data identitas gagal disimpan:", error);
    }
};

// Mengubah foto lama menjadi format yang dapat ditampilkan.
const getPhotoName = (photo) => {
    if (photo instanceof File) return photo.name;
    if (typeof photo === "string" && photo) return "Foto sebelumnya";
    return "";
};

export default function ReportForm({
    onBack,
    onSubmitReport,
    initialReport = null,
    onCancelEdit,
}) {
    const isEditing = Boolean(initialReport);
    const initialType = isEditing
        ? getReportType(initialReport)
        : null;

    const [page, setPage] = useState(initialType || "pilihan");

    const [lostForm, setLostForm] = useState(() => ({
        ...INITIAL_LOST_FORM,
        ...(initialType === "hilang" ? initialReport : {}),
        ...(initialType === "hilang"
            ? getInitialLocationData(initialReport)
            : {}),
    }));

    const [foundForm, setFoundForm] = useState(() => ({
        ...INITIAL_FOUND_FORM,
        ...(initialType === "temuan" ? initialReport : {}),
        ...(initialType === "temuan"
            ? getInitialLocationData(initialReport)
            : {}),
    }));

    const [lostPhoto, setLostPhoto] = useState(
        initialType === "hilang" ? initialReport?.foto || null : null
    );

    const [foundPhoto, setFoundPhoto] = useState(
        initialType === "temuan" ? initialReport?.foto || null : null
    );

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [photoError, setPhotoError] = useState("");
    const [signatureErrors, setSignatureErrors] = useState({});
    const [signatureDrafts, setSignatureDrafts] = useState({});
    const [resetCount, setResetCount] = useState(0);

    const [hasPreviousData, setHasPreviousData] = useState(
        Boolean(getPreviousFormData(initialType || "hilang"))
    );

    const photoInputRef = useRef(null);

    const isLost = page === "hilang";
    const currentForm = isLost ? lostForm : foundForm;
    const currentPhoto = isLost ? lostPhoto : foundPhoto;
    const setCurrentForm = isLost ? setLostForm : setFoundForm;
    const setCurrentPhoto = isLost ? setLostPhoto : setFoundPhoto;

    // Menggunakan kembali data identitas sebelumnya.
    const handleUsePreviousData = () => {
        const formType = isLost ? "hilang" : "temuan";
        const previousData = getPreviousFormData(formType);

        if (!previousData) {
            setHasPreviousData(false);
            setError("Belum ada data identitas sebelumnya.");
            return;
        }

        setCurrentForm((previous) => ({
            ...previous,
            ...previousData,
        }));

        setError("");
    };

    // Mengubah nilai input formulir.
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setCurrentForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    // Memvalidasi foto yang diunggah.
    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setPhotoError("File harus berupa gambar.");
            event.target.value = "";
            return;
        }

        if (file.size > MAX_PHOTO_SIZE) {
            setPhotoError("Ukuran foto maksimal 5 MB.");
            event.target.value = "";
            return;
        }

        setCurrentPhoto(file);
        setPhotoError("");
        setError("");
    };

    // Menyimpan tanda tangan digital.
    const handleSignatureChange = (key, dataUrl) => {
        setCurrentForm((previous) => ({
            ...previous,
            [key]: dataUrl,
        }));

        setSignatureErrors((previous) => ({
            ...previous,
            [key]: "",
        }));

        setError("");
    };

    // Memeriksa tanda tangan yang belum disimpan.
    const handleSignatureDraft = (key, hasDraft) => {
        setSignatureDrafts((previous) => ({
            ...previous,
            [key]: hasDraft,
        }));
    };

    // Mengembalikan formulir ke kondisi awal.
    const handleReset = () => {
        if (isEditing) {
            setCurrentForm({
                ...(isLost ? INITIAL_LOST_FORM : INITIAL_FOUND_FORM),
                ...initialReport,
                ...getInitialLocationData(initialReport),
            });

            setCurrentPhoto(initialReport?.foto || null);
        } else if (isLost) {
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

    // Kembali atau membatalkan pengeditan.
    const handleBackToChoices = () => {
        setPhotoError("");
        setSignatureErrors({});
        setError("");

        if (isEditing) {
            if (typeof onCancelEdit === "function") {
                onCancelEdit();
            } else if (typeof onBack === "function") {
                onBack();
            }
            return;
        }

        setPage("pilihan");
    };

    // Memvalidasi dan mengirim laporan.
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setPhotoError("");

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
                "ruangan",
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
                "ruangan",
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
                    `Tanda tangan ${label} belum disimpan. Tekan Simpan atau Ulang.`;
            } else if (required && !currentForm[key]) {
                nextSignatureErrors[key] =
                    `Tanda tangan ${label} wajib diisi.`;
            }
        });

        const firstSignatureError = signatureFields.find(
            ({ key }) => nextSignatureErrors[key]
        );

        if (firstSignatureError) {
            setSignatureErrors(nextSignatureErrors);
            setError("Lengkapi tanda tangan yang diperlukan.");

            document
                .getElementById(`ttd-${firstSignatureError.key}`)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

            return;
        }

        setSignatureErrors({});

        if (!confirmed) {
            setError("Centang pernyataan konfirmasi terlebih dahulu.");
            return;
        }

        const payload = {
            ...currentForm,
            jenisLaporan: isLost ? "hilang" : "temuan",
            foto: currentPhoto,
            status: isEditing
                ? initialReport.status
                : isLost
                    ? STATUS_PUBLISHED
                    : STATUS_WAITING_PAMDAL,
            ...(isLost ? {} : {
                diterimaPamdal: isEditing
                    ? initialReport.diterimaPamdal ?? false
                    : false,
            }),
        };

        setLoading(true);

        try {
            if (typeof onSubmitReport === "function") {
                await onSubmitReport(payload);
            } else {
                console.log("Pratinjau laporan:", payload);
            }

            savePreviousFormData(
                isLost ? "hilang" : "temuan",
                currentForm
            );

            setSuccess(true);
        } catch (err) {
            setError(
                err?.message || "Laporan gagal dikirim. Silakan coba kembali."
            );
        } finally {
            setLoading(false);
        }
    };

    // Membuat komponen input formulir.
    const renderField = (name, label, placeholder = "", options = {}) => {
        const value = currentForm[name] ?? "";

        return (
            <div
                className={`form-group ${options.full ? "form-full" : ""}`}
                key={name}
            >
                <label className="form-label" htmlFor={name}>
                    {label} {options.required && <span>*</span>}
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

    // Membuat judul setiap bagian formulir.
    const renderSectionHeader = (number, title, description) => (
        <div className="form-section-heading" key={number}>
            <span className="section-number">{number}</span>
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );

    // Tampilan setelah laporan berhasil dikirim atau diperbarui.
    if (success) {
        return (
            <div className="report-page">
                <section className="report-card report-result">
                    <div className="result-icon">✓</div>
                    <h2>
                        {isEditing
                            ? "Laporan Berhasil Diperbarui"
                            : "Laporan Berhasil Dikirim"}
                    </h2>

                    <p>
                        {isEditing
                            ? "Perubahan laporan kamu berhasil disimpan."
                            : isLost
                                ? "Laporan kamu berhasil dicatat ke dalam sistem."
                                : "Laporan penemuan kamu sudah dicatat, tetapi belum tampil di katalog publik."}
                    </p>

                    <div className="result-status">
                        <span>Status laporan</span>
                        <strong>
                            {isEditing
                                ? initialReport.status
                                : isLost
                                    ? STATUS_PUBLISHED
                                    : STATUS_WAITING_PAMDAL}
                        </strong>
                    </div>

                    {!isLost && !isEditing && (
                        <div className="report-notice result-pending-notice">
                            <strong>
                                Menunggu proses penerimaan barang oleh Pamdal
                            </strong>
                            <p>
                                Laporan akan dipublikasikan ke katalog setelah barang diterima.
                            </p>
                            <ol className="result-steps">
                                <li>Serahkan barang yang ditemukan ke Pos Pamdal.</li>
                                <li>Pamdal memeriksa dan menandai barang sebagai diterima.</li>
                                <li>Laporan kemudian tampil di katalog publik.</li>
                            </ol>
                        </div>
                    )}

                    <button
                        type="button"
                        className="btn-submit-gold"
                        onClick={() => {
                            if (isEditing) {
                                onCancelEdit?.();
                                return;
                            }

                            setSuccess(false);
                            handleReset();
                            setPage("pilihan");
                        }}
                    >
                        {isEditing
                            ? "Kembali ke Riwayat Laporan"
                            : "Kembali ke Pilihan Borang"}
                    </button>
                </section>
            </div>
        );
    }

    return (
        <div className="report-page">
            <div className="report-page-heading">
                {page !== "pilihan" && (
                    <button
                        type="button"
                        className="report-back-button"
                        onClick={handleBackToChoices}
                    >
                        ← {isEditing
                            ? "Batal Edit"
                            : "Kembali ke Pilihan Borang"}
                    </button>
                )}

                <h1 style={{ color: "var(--text-main)" }}>
                    {isEditing ? "Edit Laporan" : "Laporan Barang"}
                </h1>

                <p>
                    {page === "pilihan"
                        ? "Pilih jenis laporan sesuai kondisi barang."
                        : isEditing
                            ? "Perbarui informasi laporan yang ingin diubah."
                            : "Isi informasi dengan benar agar laporan tercatat dengan lengkap."}
                </p>
            </div>

            {page === "pilihan" ? (
                <section className="report-card">
                    <header className="report-header">
                        <div className="report-header-icon">▤</div>
                        <div>
                            <h2 className="report-form-header-title">
                                Pilih Jenis Laporan
                            </h2>
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
                                    setHasPreviousData(
                                        Boolean(getPreviousFormData("hilang"))
                                    );
                                    setError("");
                                }}
                            >
                                <span className="report-choice-icon">⌕</span>
                                <span className="report-choice-title">
                                    Borang Berita Acara Kehilangan
                                </span>
                                <span className="report-choice-description">
                                    Untuk melaporkan barang milikmu yang hilang.
                                </span>
                                <span className="report-choice-link">
                                    Buat Laporan Kehilangan →
                                </span>
                            </button>

                            <button
                                type="button"
                                className="report-choice-card found-choice"
                                onClick={() => {
                                    setPage("temuan");
                                    setHasPreviousData(
                                        Boolean(getPreviousFormData("temuan"))
                                    );
                                    setError("");
                                }}
                            >
                                <span className="report-choice-icon">▣</span>
                                <span className="report-choice-title">
                                    Borang Penemuan Barang
                                </span>
                                <span className="report-choice-description">
                                    Untuk melaporkan barang yang kamu temukan.
                                </span>
                                <span className="report-choice-link">
                                    Buat Laporan Penemuan →
                                </span>
                            </button>
                        </div>

                        <div
                            className="report-notice"
                            style={{
                                maxWidth: "450px",
                                margin: "24px auto 0",
                            }}
                        >
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
                        <div className="report-header-icon">
                            {isLost ? "⌕" : "▣"}
                        </div>
                        <div>
                            <h2 className="report-form-header-title">
                                {isLost
                                    ? "Borang Berita Acara Kehilangan"
                                    : "Borang Penemuan Barang"}
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
                            {!isEditing && hasPreviousData && (
                                <div
                                    className="report-notice"
                                    style={{
                                        marginBottom: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "14px",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <div>
                                        <strong>
                                            Data identitas sebelumnya tersedia
                                        </strong>
                                        <p style={{ marginBottom: 0 }}>
                                            Data barang, foto, dan tanda tangan tetap diisi kembali.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn-submit-gold"
                                        onClick={handleUsePreviousData}
                                        disabled={loading}
                                    >
                                        Gunakan Data Sebelumnya
                                    </button>
                                </div>
                            )}

                            {renderSectionHeader(
                                "01",
                                isLost ? "Data Pelapor" : "Data Penemu",
                                "Informasi identitas orang yang membuat laporan."
                            )}

                            <div className="form-grid">
                                {renderField(
                                    "namaPelapor",
                                    "Nama Lengkap",
                                    "Masukkan nama lengkap",
                                    { required: true }
                                )}

                                {renderField(
                                    "nomorIdentitas",
                                    "NIM / NIK / No. Identitas",
                                    "Masukkan nomor identitas",
                                    { required: true }
                                )}

                                {isLost && (
                                    <>
                                        {renderField(
                                            "tempatLahir",
                                            "Tempat Lahir",
                                            "Contoh: Batam"
                                        )}
                                        {renderField(
                                            "tanggalLahir",
                                            "Tanggal Lahir",
                                            "",
                                            { type: "date" }
                                        )}
                                        {renderField(
                                            "agama",
                                            "Agama",
                                            "",
                                            {
                                                type: "select",
                                                data: RELIGIONS,
                                            }
                                        )}
                                    </>
                                )}

                                {renderField(
                                    "telepon",
                                    "Nomor Telepon",
                                    "Nomor yang bisa dihubungi",
                                    { required: true }
                                )}

                                {isLost &&
                                    renderField(
                                        "alamat",
                                        "Alamat",
                                        "Alamat tempat tinggal",
                                        {
                                            full: true,
                                            type: "textarea",
                                        }
                                    )}
                            </div>

                            {renderSectionHeader(
                                "02",
                                isLost
                                    ? "Informasi Barang Hilang"
                                    : "Informasi Penemuan",
                                isLost
                                    ? "Jelaskan barang yang hilang dan kapan kejadiannya."
                                    : "Jelaskan kapan dan di mana barang ditemukan."
                            )}

                            <div className="form-grid">
                                {renderField(
                                    "namaBarang",
                                    "Nama Barang",
                                    "Contoh: Dompet atau kunci motor",
                                    { required: true }
                                )}

                                {renderField(
                                    "kategori",
                                    "Kategori",
                                    "",
                                    {
                                        type: "select",
                                        data: CATEGORIES,
                                        required: true,
                                    }
                                )}

                                {renderField(
                                    "merekModel",
                                    "Merek / Model",
                                    "Jika diketahui"
                                )}

                                {renderField(
                                    "warna",
                                    "Warna",
                                    "Contoh: Hitam"
                                )}

                                {renderField(
                                    "tanggalKejadian",
                                    isLost ? "Tanggal Kehilangan" : "Tanggal Penemuan",
                                    "",
                                    {
                                        type: "date",
                                        required: true,
                                    }
                                )}

                                {renderField(
                                    "waktuKejadian",
                                    "Perkiraan Waktu",
                                    "",
                                    {
                                        type: "time",
                                        required: true,
                                    }
                                )}

                                {renderField(
                                    "lokasi",
                                    "Gedung / Area",
                                    "",
                                    {
                                        type: "select",
                                        data: LOCATION_OPTIONS,
                                        full: true,
                                        required: true,
                                    }
                                )}

                                {renderField(
                                    "ruangan",
                                    "Ruangan / Area Spesifik",
                                    "Contoh: Ruang 203, Laboratorium Komputer, dekat kasir",
                                    {
                                        full: true,
                                        required: true,
                                    }
                                )}

                                {renderField(
                                    "detailLokasi",
                                    "Detail Lokasi (Opsional)",
                                    "Contoh: Di atas meja paling belakang atau dekat pintu",
                                    {
                                        full: true,
                                    }
                                )}

                                {!isLost &&
                                    renderField(
                                        "deskripsi",
                                        "Deskripsi Barang",
                                        "Jelaskan ciri-ciri barang secara spesifik",
                                        {
                                            full: true,
                                            type: "textarea",
                                            required: true,
                                        }
                                    )}

                                {renderField(
                                    "kronologi",
                                    isLost
                                        ? "Kronologi Kehilangan"
                                        : "Kronologi Penemuan",
                                    isLost
                                        ? "Ceritakan kapan terakhir melihat barang..."
                                        : "Ceritakan bagaimana barang ditemukan...",
                                    {
                                        full: true,
                                        type: "textarea",
                                        required: true,
                                        rows: 4,
                                    }
                                )}

                                <div className="form-group form-full">
                                    <label className="form-label">
                                        Foto Barang (Opsional)
                                    </label>

                                    <div
                                        className={`report-upload-area${photoError ? " has-error" : ""}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => photoInputRef.current?.click()}
                                    >
                                        <span className="upload-symbol">↑</span>
                                        <strong>
                                            {getPhotoName(currentPhoto) ||
                                                "Klik untuk memilih foto"}
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
                                            onClick={() => {
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
                                    : "Tanda tangan pelapor dan Pamdal wajib diisi."
                            )}

                            <div className="form-grid">
                                <div className="signature-cell">
                                    <SignaturePad
                                        key={`${page}-ttdPelapor-${resetCount}`}
                                        id="ttd-ttdPelapor"
                                        label="Tanda Tangan Pelapor"
                                        required
                                        value={currentForm.ttdPelapor}
                                        onChange={(value) =>
                                            handleSignatureChange("ttdPelapor", value)
                                        }
                                        onDraftChange={(value) =>
                                            handleSignatureDraft("ttdPelapor", value)
                                        }
                                        error={signatureErrors.ttdPelapor}
                                    />
                                </div>

                                {isLost ? (
                                    <div className="signature-cell">
                                        {renderField(
                                            "namaSaksi",
                                            "Nama Saksi (Opsional)",
                                            "Nama lengkap saksi"
                                        )}
                                        <SignaturePad
                                            key={`${page}-ttdSaksi-${resetCount}`}
                                            id="ttd-ttdSaksi"
                                            label="Tanda Tangan Saksi"
                                            value={currentForm.ttdSaksi}
                                            onChange={(value) =>
                                                handleSignatureChange("ttdSaksi", value)
                                            }
                                            onDraftChange={(value) =>
                                                handleSignatureDraft("ttdSaksi", value)
                                            }
                                            error={signatureErrors.ttdSaksi}
                                        />
                                    </div>
                                ) : (
                                    <div className="signature-cell">
                                        {renderField(
                                            "namaPamdal",
                                            "Nama Pamdal",
                                            "Nama lengkap Pamdal",
                                            { required: true }
                                        )}
                                        <SignaturePad
                                            key={`${page}-ttdPamdal-${resetCount}`}
                                            id="ttd-ttdPamdal"
                                            label="Tanda Tangan Pamdal"
                                            required
                                            value={currentForm.ttdPamdal}
                                            onChange={(value) =>
                                                handleSignatureChange("ttdPamdal", value)
                                            }
                                            onDraftChange={(value) =>
                                                handleSignatureDraft("ttdPamdal", value)
                                            }
                                            error={signatureErrors.ttdPamdal}
                                        />
                                    </div>
                                )}
                            </div>

                            {!isLost && (
                                <div className="report-notice">
                                    <strong>Barang harus diserahkan ke Pamdal</strong>
                                    <p>
                                        Setelah laporan dikirim, serahkan barang ke Pos Pamdal.
                                        Laporan baru dipublikasikan setelah Pamdal menerima barang.
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
                                    onChange={(event) => {
                                        setConfirmed(event.target.checked);
                                        setError("");
                                    }}
                                />
                                <span>
                                    Saya menyatakan informasi yang diisi benar sesuai pengetahuan saya.
                                </span>
                            </label>

                            {error && (
                                <div className="report-error" role="alert">
                                    ⚠️ {error}
                                </div>
                            )}

                            <div className="report-form-actions">
                                <button
                                    type="button"
                                    className="btn-cancel"
                                    onClick={handleReset}
                                    disabled={loading}
                                >
                                    {isEditing ? "Batalkan Perubahan" : "Reset Formulir"}
                                </button>

                                <button
                                    type="submit"
                                    className="btn-submit-gold"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Menyimpan..."
                                        : isEditing
                                            ? "Simpan Perubahan →"
                                            : "Kirim Laporan →"}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            )}
        </div>
    );
}
