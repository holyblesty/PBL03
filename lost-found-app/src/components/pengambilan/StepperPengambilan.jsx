import React from 'react';

const STEPS = ['Cari kode', 'Verifikasi', 'Form pengambilan'];

// langkah: 1 = cari, 2 = verifikasi, 3 = form pengambilan
export default function StepperPengambilan({ langkah }) {
  return (
    <ol className="pb-stepper">
      {STEPS.map((nama, i) => {
        const no = i + 1;
        const status = langkah > no ? 'done' : langkah === no ? 'active' : '';
        return (
          <li key={nama} className={`pb-step ${status}`}>
            <span className="pb-step-circle">{langkah > no ? '✓' : no}</span>
            <span className="pb-step-label">{nama}</span>
            {no < STEPS.length && <span className="pb-step-line" />}
          </li>
        );
      })}
    </ol>
  );
}