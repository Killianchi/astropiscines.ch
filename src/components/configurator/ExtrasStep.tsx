import { extras as extrasData, type ExtraId } from '../../data/pricing';
import { formatPrice } from '../../utils/formatPrice';

interface Props {
  selected: ExtraId[];
  onToggle: (id: ExtraId) => void;
}

const extraIcons: Record<string, string> = {
  chauffage: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z',
  couverture: 'M3 4h18M3 8h18M3 12h18M3 16h18M3 20h18',
  led: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  nage: 'M13 7l5 5m0 0l-5 5m5-5H6',
  pompe: 'M13 10V3L4 14h7v7l9-11h-7z',
  filtration: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
};

export default function ExtrasStep({ selected, onToggle }: Props) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Des options supplémentaires ?
      </h2>
      <p className="text-center text-gray-500 mb-8">Sélectionnez les équipements souhaités (optionnel)</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {extrasData.map((extra) => {
          const isSelected = selected.includes(extra.id);
          return (
            <button
              key={extra.id}
              onClick={() => onToggle(extra.id)}
              className={`p-5 rounded-xl border-2 text-left transition-all duration-300 cursor-pointer hover:shadow-md ${
                isSelected
                  ? 'border-[var(--color-gold)] bg-[var(--color-pool-surface)]'
                  : 'border-gray-200 bg-white hover:border-[var(--color-pool-light)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: isSelected ? 'var(--color-pool-deep)' : 'var(--color-pool-surface)' }}>
                  <svg className="w-5 h-5" style={{ color: isSelected ? 'white' : 'var(--color-pool-deep)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={extraIcons[extra.id] || ''} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-charcoal)' }}>{extra.label}</h3>
                  <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--color-gold)' }}>+ {formatPrice(extra.price)}</p>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                  isSelected ? 'border-[var(--color-gold)] bg-[var(--color-gold)]' : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
