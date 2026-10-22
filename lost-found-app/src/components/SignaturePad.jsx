import React, { useEffect, useRef, useState } from "react";
import SignaturePadLib from "signature_pad";

/**
 * Kolom tanda tangan (mouse, touchpad, atau layar sentuh).
 *
 * Props:
 * - id          : id elemen pembungkus (dipakai untuk scroll ke kolom saat error)
 * - label       : judul kolom
 * - required    : tampilkan tanda * (wajib) atau "(Opsional)"
 * - value       : data URL PNG tanda tangan yang sudah disimpan (atau null)
 * - onChange    : (dataUrl | null) => void, dipanggil saat Simpan / Ulang
 * - onDraftChange : (boolean) => void, true jika sudah ada coretan yang belum disimpan
 * - error       : pesan error untuk kolom ini
 */
export default function SignaturePad({
    id,
    label,
    required = false,
    value = null,
    onChange,
    onDraftChange,
    error = "",
}) {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const padRef = useRef(null);
    const [hasInk, setHasInk] = useState(false);

    const isSaved = Boolean(value);

    // Simpan callback terbaru di ref supaya effect inisialisasi tidak perlu dijalankan ulang.
    const draftCallbackRef = useRef(onDraftChange);
    useEffect(() => {
        draftCallbackRef.current = onDraftChange;
    }, [onDraftChange]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;
        if (!canvas || !wrapper) return undefined;

        const pad = new SignaturePadLib(canvas, {
            penColor: "#111827",
            minWidth: 0.8,
            maxWidth: 2.6,
        });
        padRef.current = pad;

        const syncInk = () => {
            const filled = !pad.isEmpty();
            setHasInk(filled);
            draftCallbackRef.current?.(filled);
        };
        pad.addEventListener("endStroke", syncInk);

        // Sesuaikan resolusi canvas dengan ukuran tampil + pixel ratio (biar tidak buram di HP).
        const resizeCanvas = () => {
            const width = wrapper.clientWidth;
            const height = wrapper.clientHeight;
            if (!width || !height) return;

            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            const previous = pad.toData();

            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.getContext("2d").scale(ratio, ratio);

            pad.clear();
            if (previous.length) pad.fromData(previous);
        };

        resizeCanvas();
        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(wrapper);

        return () => {
            observer.disconnect();
            pad.removeEventListener("endStroke", syncInk);
            pad.off();
            padRef.current = null;
            draftCallbackRef.current?.(false);
        };
    }, []);

    // Kunci pad jika tanda tangan sudah disimpan, aktifkan lagi saat diulang.
    useEffect(() => {
        const pad = padRef.current;
        if (!pad) return;
        if (isSaved) pad.off();
        else pad.on();
    }, [isSaved]);

    const handleClear = () => {
        padRef.current?.clear();
        setHasInk(false);
        draftCallbackRef.current?.(false);
        if (isSaved) onChange?.(null);
    };

    const handleSave = () => {
        const pad = padRef.current;
        if (!pad || pad.isEmpty()) return;
        onChange?.(pad.toDataURL("image/png"));
        setHasInk(false);
        draftCallbackRef.current?.(false);
    };

    return (
        <div className="form-group signature-group" id={id}>
            <label className="form-label">
                {label} {required ? <span>*</span> : <em className="signature-optional">(Opsional)</em>}
            </label>

            <div
                ref={wrapperRef}
                className={`signature-box${error ? " has-error" : ""}${isSaved ? " is-saved" : ""}`}
            >
                <canvas ref={canvasRef} className="signature-canvas" aria-label={label} />

                {!hasInk && !isSaved && (
                    <span className="signature-placeholder">Tanda tangan di sini</span>
                )}

                {isSaved && (
                    <>
                        <img className="signature-preview" src={value} alt={`${label} tersimpan`} />
                        <span className="signature-badge">✓ Tersimpan</span>
                    </>
                )}
            </div>

            <div className="signature-actions">
                <button
                    type="button"
                    className="signature-btn signature-btn-clear"
                    onClick={handleClear}
                    disabled={!hasInk && !isSaved}
                >
                    Ulang
                </button>
                <button
                    type="button"
                    className="signature-btn signature-btn-save"
                    onClick={handleSave}
                    disabled={!hasInk || isSaved}
                >
                    Simpan
                </button>
            </div>

            <p className="signature-hint">
                {isSaved
                    ? "Tanda tangan sudah disimpan. Tekan Ulang jika ingin menggantinya."
                    : "Gunakan jari (HP/tablet) atau mouse/touchpad, lalu tekan Simpan."}
            </p>

            {error && (
                <p className="field-error" role="alert">
                    ⚠️ {error}
                </p>
            )}
        </div>
    );
}
