import React, { useCallback, useEffect, useRef, useState } from 'react';

// Foto bukti pengambilan. Memakai kamera; jika tidak tersedia, pilih file gambar.
// foto = data URL, onChange(dataUrl | '')
export default function CameraBox({ foto, onChange }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileRef = useRef(null);
  const [kameraAktif, setKameraAktif] = useState(false);

  const matikan = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setKameraAktif(false);
  }, []);

  const nyalakan = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setKameraAktif(true);
    } catch {
      setKameraAktif(false);
    }
  }, []);

  useEffect(() => {
    nyalakan();
    return matikan;
  }, [nyalakan, matikan]);

  const ambilFoto = () => {
    const video = videoRef.current;
    if (kameraAktif && video?.videoWidth) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      onChange(canvas.toDataURL('image/jpeg', 0.85));
      matikan();
    } else {
      // Kamera tidak tersedia: pakai file dari perangkat
      fileRef.current?.click();
    }
  };

  const ulangi = () => {
    onChange('');
    nyalakan();
  };

  const pilihFile = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <>
      <div className="pb-camera">
        {foto && <img src={foto} alt="Foto bukti pengambilan" />}
        <video ref={videoRef} autoPlay playsInline muted style={{ display: !foto && kameraAktif ? 'block' : 'none' }} />
        {!foto && !kameraAktif && <span>Pratinjau kamera eksternal</span>}
      </div>
      <div className="pb-camera-actions">
        <button type="button" className="pb-btn" onClick={ambilFoto} disabled={Boolean(foto)}>Ambil Foto</button>
        <button type="button" className="pb-btn outline" onClick={ulangi} disabled={!foto}>Ulangi</button>
      </div>
      <p className="pb-hint">Foto diambil langsung dari kamera eksternal dan otomatis terunggah ke sistem.</p>
      <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={pilihFile} style={{ display: 'none' }} />
    </>
  );
}