import type { Location } from '../../data/pricing';

interface Props {
  selected: Location | null;
  onSelect: (loc: Location) => void;
}

export default function LocationStep({ selected, onSelect }: Props) {
  const locations: { id: Location; label: string; desc: string; icon: string }[] = [
    { id: 'exterieure', label: 'Extérieure', desc: 'Profitez du plein air avec une piscine dans votre jardin', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'interieure', label: 'Intérieure', desc: 'Nagez toute l\'année dans le confort de votre maison', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  ];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Piscine intérieure ou extérieure ?
      </h2>
      <p className="text-center text-gray-500 mb-8">L'emplacement influence le coût et les options disponibles</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => onSelect(loc.id)}
            className={`p-8 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer hover:shadow-lg ${
              selected === loc.id
                ? 'border-[var(--color-gold)] bg-[var(--color-pool-surface)] shadow-md'
                : 'border-gray-200 bg-white hover:border-[var(--color-pool-light)]'
            }`}
          >
            <div className="w-16 h-16 mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: selected === loc.id ? 'var(--color-pool-deep)' : 'var(--color-pool-surface)' }}>
              <svg className="w-8 h-8" style={{ color: selected === loc.id ? 'white' : 'var(--color-pool-deep)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={loc.icon} />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>
              {loc.label}
            </h3>
            <p className="text-sm text-gray-500">{loc.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
