import React, { useEffect, useRef, useState } from 'react';
import SignaturePadLib from 'signature_pad';

// Kotak tanda tangan elektronik memakai library signature_pad.
// onChange menerima data URL PNG (atau '' kalau dihapus).
export default function SignaturePad({ label, caption, onChange }) {
  const canvasRef = useRef(null);
  const padRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const [signed, setSigned] = useState(false);

  // Selalu pakai onChange terbaru tanpa perlu membuat ulang pad
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const pad = new SignaturePadLib(canvas, {
      penColor: '#111827',
      minWidth: 0.8,
      maxWidth: 2.2,
    });
    padRef.current = pad;

    // Sesuaikan resolusi canvas dengan ukuran tampil dan layar retina
    const sesuaikanUkuran = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const data = pad.toData();
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      pad.clear();
      if (data.length) pad.fromData(data);
    };
    sesuaikanUkuran();
    window.addEventListener('resize', sesuaikanUkuran);

    // Setelah satu coretan selesai, kirim gambar ke halaman induk
    const selesaiCoret = () => {
      setSigned(!pad.isEmpty());
      onChangeRef.current(pad.isEmpty() ? '' : pad.toDataURL('image/png'));
    };
    pad.addEventListener('endStroke', selesaiCoret);

    return () => {
      window.removeEventListener('resize', sesuaikanUkuran);
      pad.removeEventListener('endStroke', selesaiCoret);
      pad.off();
    };
  }, []);

  const hapus = () => {
    padRef.current?.clear();
    setSigned(false);
    onChangeRef.current('');
  };

  return (
    <div className="pb-sign">
      <div className="pb-sign-box">
        <button type="button" className="pb-sign-clear" onClick={hapus}>Hapus</button>
        <canvas ref={canvasRef} className="pb-sign-canvas" />
        {!signed && <div className="pb-sign-placeholder">Area tanda tangan</div>}
        <div className="pb-sign-line" />
      </div>
      <div className="pb-sign-label"><strong>{label}</strong></div>
      <div className="pb-sign-caption">{caption}</div>
    </div>
  );
}