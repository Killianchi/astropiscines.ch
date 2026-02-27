import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPriceRange } from '../../utils/formatPrice';
import { poolTypes, type ExtraId, extras as extrasData } from '../../data/pricing';
import type { ConfigState } from './types';

interface Props {
  quote: { min: number; max: number };
  state: ConfigState;
  onReset: () => void;
}

export default function QuoteReveal({ quote, state, onReset }: Props) {
  const [phase, setPhase] = useState<'ripple' | 'draw' | 'counter' | 'done'>('ripple');
  const [countMin, setCountMin] = useState(0);
  const [countMax, setCountMax] = useState(0);
  const rafRef = useRef<number>(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const t1 = setTimeout(() => setPhase('draw'), 1500);
    const t2 = setTimeout(() => {
      setPhase('counter');

      // Start count-up animation
      const duration = 1500;
      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        setCountMin(Math.round(eased * quote.min));
        setCountMax(Math.round(eased * quote.max));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setPhase('done');
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const summaryItems = [
    { label: 'Région', value: state.region === 'vaud' ? 'Canton de Vaud' : 'Canton de Genève' },
    { label: 'Type', value: state.poolType ? poolTypes[state.poolType].label : '' },
    { label: 'Emplacement', value: state.location === 'interieure' ? 'Intérieure' : 'Extérieure' },
    { label: 'Taille', value: state.size === 'custom' ? `${state.customLength}×${state.customWidth}m (${(state.customLength * state.customWidth).toFixed(0)}m²)` : state.size === 'small' ? '≤ 25 m²' : state.size === 'medium' ? '25 – 50 m²' : '50 m² +' },
    ...(state.extras.length > 0 ? [{ label: 'Options', value: state.extras.map((id: ExtraId) => extrasData.find(e => e.id === id)?.label).join(', ') }] : []),
  ];

  return (
    <div className="relative min-h-[600px] flex items-center justify-center">
      {/* Phase 1: Water Ripple */}
      <AnimatePresence>
        {(phase === 'ripple' || phase === 'draw') && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-3xl"
            style={{ background: 'linear-gradient(135deg, var(--color-pool-deep), var(--color-pool-medium))' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="absolute rounded-full border border-white/20"
                style={{
                  width: '100px',
                  height: '100px',
                  animation: `quoteRipple 2.5s ease-out ${i * 0.4}s infinite`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 2: Pool Outline Draw */}
      <AnimatePresence>
        {phase === 'draw' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg width="300" height="200" viewBox="0 0 300 200" className="pool-draw-svg">
              <rect
                x="20" y="20" width="260" height="160" rx="40" ry="40"
                fill="none"
                stroke="var(--color-gold, #C8A951)"
                strokeWidth="3"
                className="pool-outline"
              />
              <rect
                x="20" y="20" width="260" height="160" rx="40" ry="40"
                className="pool-fill"
                fill="var(--color-pool-light, #4DB8E8)"
                opacity="0"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3-4: Price Counter + Card */}
      {(phase === 'counter' || phase === 'done') && (
        <motion.div
          className="w-full max-w-xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="rounded-3xl border-2 overflow-hidden bg-white shadow-2xl" style={{ borderColor: 'var(--color-gold)' }}>
            {/* Price header */}
            <div className="p-8 text-center" style={{ background: 'linear-gradient(135deg, var(--color-pool-deep), var(--color-pool-medium))' }}>
              <p className="text-sm text-white/80 mb-2 uppercase tracking-wider font-medium">Votre estimation</p>
              <p className="text-4xl sm:text-5xl font-bold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {formatPriceRange(countMin, countMax)}
              </p>
            </div>

            {/* Summary */}
            <div className="p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--color-pool-deep)' }}>
                Résumé de votre configuration
              </h3>
              <dl className="space-y-2 mb-6">
                {summaryItems.map((item) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <dt className="text-gray-500">{item.label}</dt>
                    <dd className="font-medium" style={{ color: 'var(--color-charcoal)' }}>{item.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Disclaimer */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-gray-500">
                Cette estimation est indicative et basée sur les informations fournies. Un devis détaillé sera établi après une visite technique.
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <a
                  href="/contact/"
                  className="block w-full py-4 rounded-xl font-semibold text-center text-lg transition-all hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    backgroundColor: 'var(--color-gold)',
                    color: 'var(--color-charcoal)',
                  }}
                >
                  Prendre rendez-vous
                </a>
                <button
                  onClick={onReset}
                  className="block w-full py-3 rounded-xl font-medium text-center transition-colors border-2 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    borderColor: 'var(--color-pool-deep)',
                    color: 'var(--color-pool-deep)',
                  }}
                >
                  Modifier ma configuration
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                Ou appelez-nous au{' '}
                <a href="tel:0842520520" className="font-medium" style={{ color: 'var(--color-pool-deep)' }}>0842 520 520</a>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <style>{`
        @keyframes quoteRipple {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(6); opacity: 0; }
        }
        .pool-outline {
          stroke-dasharray: 880;
          stroke-dashoffset: 880;
          animation: drawPool 2s ease-in-out forwards;
        }
        .pool-fill {
          animation: fillPool 1s ease-in-out 1.5s forwards;
        }
        @keyframes drawPool {
          to { stroke-dashoffset: 0; }
        }
        @keyframes fillPool {
          to { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
