import type { SizeCategory } from '../../data/pricing';

interface Props {
  selected: SizeCategory | 'custom' | null;
  customLength: number;
  customWidth: number;
  customDepth: number;
  onSelect: (size: SizeCategory | 'custom') => void;
  onCustomLength: (v: number) => void;
  onCustomWidth: (v: number) => void;
  onCustomDepth: (v: number) => void;
}

const sizes: { id: SizeCategory | 'custom'; label: string; desc: string }[] = [
  { id: 'small', label: 'Petit', desc: '≤ 25 m² — idéal pour les petits jardins' },
  { id: 'medium', label: 'Moyen', desc: '25 – 50 m² — le format familial' },
  { id: 'large', label: 'Grand', desc: '50 m² + — pour les grands espaces' },
  { id: 'custom', label: 'Sur mesure', desc: 'Entrez vos dimensions exactes' },
];

export default function SizeStep({ selected, customLength, customWidth, customDepth, onSelect, onCustomLength, onCustomWidth, onCustomDepth }: Props) {
  const customArea = customLength * customWidth;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Quelle taille de bassin ?
      </h2>
      <p className="text-center text-gray-500 mb-8">Choisissez une taille ou entrez vos dimensions</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
        {sizes.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={`p-4 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer hover:shadow-md ${
              selected === s.id
                ? 'border-[var(--color-gold)] bg-[var(--color-pool-surface)]'
                : 'border-gray-200 bg-white hover:border-[var(--color-pool-light)]'
            }`}
          >
            <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>
              {s.label}
            </h3>
            <p className="text-xs text-gray-500">{s.desc}</p>
          </button>
        ))}
      </div>

      {selected === 'custom' && (
        <div className="max-w-lg mx-auto bg-[var(--color-pool-surface)] rounded-2xl p-6 mt-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-charcoal)' }}>Longueur (m)</label>
              <input
                type="number"
                min={2}
                max={25}
                step={0.5}
                value={customLength}
                onChange={(e) => onCustomLength(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-center"
                style={{ '--tw-ring-color': 'var(--color-pool-light)' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-charcoal)' }}>Largeur (m)</label>
              <input
                type="number"
                min={2}
                max={15}
                step={0.5}
                value={customWidth}
                onChange={(e) => onCustomWidth(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-center"
                style={{ '--tw-ring-color': 'var(--color-pool-light)' } as React.CSSProperties}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: 'var(--color-charcoal)' }}>Profondeur (m)</label>
              <input
                type="number"
                min={0.8}
                max={3}
                step={0.1}
                value={customDepth}
                onChange={(e) => onCustomDepth(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 text-center"
                style={{ '--tw-ring-color': 'var(--color-pool-light)' } as React.CSSProperties}
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-500">Surface : </span>
            <span className="text-lg font-bold" style={{ color: 'var(--color-pool-deep)' }}>{customArea.toFixed(1)} m²</span>
          </div>
        </div>
      )}
    </div>
  );
}
