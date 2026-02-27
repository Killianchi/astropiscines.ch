import { useState } from 'react';
import type { Region } from '../../data/pricing';

interface Props {
  selected: Region | null;
  onSelect: (region: Region) => void;
}

export default function RegionStep({ selected, onSelect }: Props) {
  const [showOtherMessage, setShowOtherMessage] = useState(false);

  const regions: { id: Region; label: string; desc: string }[] = [
    { id: 'vaud', label: 'Canton de Vaud', desc: 'Nyon, Lausanne, Morges, Montreux...' },
    { id: 'geneve', label: 'Canton de Genève', desc: 'Genève, Chêne-Bourg, Carouge...' },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Où se situe votre projet ?
      </h2>
      <p className="text-center text-gray-500 mb-8">Sélectionnez votre canton</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {regions.map((r) => (
          <button
            key={r.id}
            onClick={() => { setShowOtherMessage(false); onSelect(r.id); }}
            className={`p-8 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer hover:shadow-lg ${
              selected === r.id && !showOtherMessage
                ? 'border-[var(--color-gold)] bg-[var(--color-pool-surface)] shadow-md'
                : 'border-gray-200 bg-white hover:border-[var(--color-pool-light)]'
            }`}
          >
            <div className="w-16 h-16 mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: selected === r.id && !showOtherMessage ? 'var(--color-pool-deep)' : 'var(--color-pool-surface)' }}>
              <svg className="w-8 h-8" style={{ color: selected === r.id && !showOtherMessage ? 'white' : 'var(--color-pool-deep)' }} fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>
              {r.label}
            </h3>
            <p className="text-sm text-gray-500">{r.desc}</p>
          </button>
        ))}

        {/* Other region option */}
        <button
          onClick={() => setShowOtherMessage(true)}
          className={`p-8 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer hover:shadow-lg ${
            showOtherMessage
              ? 'border-red-300 bg-red-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="w-16 h-16 mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: showOtherMessage ? '#FEE2E2' : 'var(--color-pool-surface)' }}>
            <svg className="w-8 h-8" style={{ color: showOtherMessage ? '#DC2626' : '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>
            Autre canton
          </h3>
          <p className="text-sm text-gray-500">Je suis situé ailleurs en Suisse</p>
        </button>
      </div>

      {/* Message when "Autre" is selected */}
      {showOtherMessage && (
        <div className="mt-8 max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <svg className="w-10 h-10 mx-auto mb-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: '#991B1B' }}>
            Nous n'intervenons pas dans votre région
          </h3>
          <p className="text-sm text-red-700 mb-4">
            Astro Piscines opère exclusivement dans les cantons de <strong>Genève</strong> et de <strong>Vaud</strong>.
            Nous ne sommes malheureusement pas en mesure de réaliser des projets en dehors de ces deux cantons.
          </p>
          <a
            href="/contact/"
            className="inline-block text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--color-pool-deep)', color: 'white' }}
          >
            Nous contacter pour plus d'informations
          </a>
        </div>
      )}
    </div>
  );
}
