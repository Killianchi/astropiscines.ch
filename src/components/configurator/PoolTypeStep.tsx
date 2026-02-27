import { poolTypes, type PoolType } from '../../data/pricing';
import { formatPrice } from '../../utils/formatPrice';

interface Props {
  selected: PoolType | null;
  onSelect: (type: PoolType) => void;
}

const typeDescriptions: Record<PoolType, string> = {
  beton: 'Forme libre, sur mesure, durabilité maximale',
  coque: 'Installation rapide, large choix de formes',
  inox: 'Design contemporain, durabilité exceptionnelle',
  renovation: 'Remise en état complète de votre piscine',
};

const typeIcons: Record<PoolType, string> = {
  beton: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16',
  coque: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  inox: 'M13 10V3L4 14h7v7l9-11h-7z',
  renovation: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
};

export default function PoolTypeStep({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Quel type de piscine souhaitez-vous ?
      </h2>
      <p className="text-center text-gray-500 mb-8">Choisissez le type de construction</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {(Object.entries(poolTypes) as [PoolType, typeof poolTypes[PoolType]][]).map(([key, data]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer hover:shadow-lg ${
              selected === key
                ? 'border-[var(--color-gold)] bg-[var(--color-pool-surface)] shadow-md'
                : 'border-gray-200 bg-white hover:border-[var(--color-pool-light)]'
            }`}
          >
            <div className="w-12 h-12 mb-3 rounded-xl flex items-center justify-center" style={{ backgroundColor: selected === key ? 'var(--color-pool-deep)' : 'var(--color-pool-surface)' }}>
              <svg className="w-6 h-6" style={{ color: selected === key ? 'white' : 'var(--color-pool-deep)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={typeIcons[key]} />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>
              {data.label}
            </h3>
            <p className="text-sm text-gray-500 mb-2">{typeDescriptions[key]}</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-gold)' }}>
              À partir de {formatPrice(data.baseMin)}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
