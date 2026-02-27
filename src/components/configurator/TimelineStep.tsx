import type { Timeline } from '../../data/pricing';

interface Props {
  selected: Timeline | null;
  onSelect: (t: Timeline) => void;
}

const timelines: { id: Timeline; label: string; desc: string; icon: string }[] = [
  { id: 'this-year', label: 'Cette année', desc: 'Je souhaite commencer les travaux rapidement', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'next-year', label: 'L\'année prochaine', desc: 'Je planifie pour la saison suivante', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { id: 'exploring', label: 'Je me renseigne', desc: 'Je compare les options et les prix', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
];

export default function TimelineStep({ selected, onSelect }: Props) {
  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Quand souhaitez-vous réaliser votre projet ?
      </h2>
      <p className="text-center text-gray-500 mb-8">Cela nous aide à planifier votre projet</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {timelines.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 cursor-pointer hover:shadow-lg ${
              selected === t.id
                ? 'border-[var(--color-gold)] bg-[var(--color-pool-surface)] shadow-md'
                : 'border-gray-200 bg-white hover:border-[var(--color-pool-light)]'
            }`}
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ backgroundColor: selected === t.id ? 'var(--color-pool-deep)' : 'var(--color-pool-surface)' }}>
              <svg className="w-7 h-7" style={{ color: selected === t.id ? 'white' : 'var(--color-pool-deep)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={t.icon} />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-charcoal)' }}>
              {t.label}
            </h3>
            <p className="text-sm text-gray-500">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
