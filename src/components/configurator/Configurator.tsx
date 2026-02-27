import { useReducer, useMemo } from 'react';
import { configReducer, initialState } from './types';
import StepIndicator from './StepIndicator';
import RegionStep from './RegionStep';
import PoolTypeStep from './PoolTypeStep';
import LocationStep from './LocationStep';
import SizeStep from './SizeStep';
import ExtrasStep from './ExtrasStep';
import TimelineStep from './TimelineStep';
import ContactStep from './ContactStep';
import QuoteReveal from './QuoteReveal';
import { calculateQuote } from '../../utils/calculateQuote';

export default function Configurator() {
  const [state, dispatch] = useReducer(configReducer, initialState);

  const canProceed = useMemo(() => {
    switch (state.currentStep) {
      case 1: return !!state.region;
      case 2: return !!state.poolType;
      case 3: return !!state.location;
      case 4: return !!state.size;
      case 5: return true; // Extras are optional
      case 6: return !!state.timeline;
      case 7: return state.contactName.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactEmail);
      default: return false;
    }
  }, [state]);

  const contactErrors = useMemo(() => {
    const errors: { name?: string; email?: string } = {};
    if (state.currentStep === 7) {
      if (!state.contactName.trim()) errors.name = 'Le nom est requis';
      if (!state.contactEmail.trim()) errors.email = 'L\'e-mail est requis';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactEmail)) errors.email = 'E-mail invalide';
    }
    return errors;
  }, [state.currentStep, state.contactName, state.contactEmail]);

  const handleSubmit = () => {
    if (!state.region || !state.poolType || !state.location || !state.size) return;

    const quote = calculateQuote({
      poolType: state.poolType,
      size: state.size,
      customArea: state.size === 'custom' ? state.customLength * state.customWidth : undefined,
      location: state.location,
      region: state.region,
      extras: state.extras,
    });

    dispatch({ type: 'SUBMIT', payload: quote });
  };

  if (state.isSubmitted && state.quote) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <QuoteReveal
          quote={state.quote}
          state={state}
          onReset={() => dispatch({ type: 'RESET' })}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <StepIndicator currentStep={state.currentStep} />

      <div className="min-h-[400px]">
        {state.currentStep === 1 && (
          <RegionStep selected={state.region} onSelect={(r) => dispatch({ type: 'SET_REGION', payload: r })} />
        )}
        {state.currentStep === 2 && (
          <PoolTypeStep selected={state.poolType} onSelect={(t) => dispatch({ type: 'SET_POOL_TYPE', payload: t })} />
        )}
        {state.currentStep === 3 && (
          <LocationStep selected={state.location} onSelect={(l) => dispatch({ type: 'SET_LOCATION', payload: l })} />
        )}
        {state.currentStep === 4 && (
          <SizeStep
            selected={state.size}
            customLength={state.customLength}
            customWidth={state.customWidth}
            customDepth={state.customDepth}
            onSelect={(s) => dispatch({ type: 'SET_SIZE', payload: s })}
            onCustomLength={(v) => dispatch({ type: 'SET_CUSTOM_LENGTH', payload: v })}
            onCustomWidth={(v) => dispatch({ type: 'SET_CUSTOM_WIDTH', payload: v })}
            onCustomDepth={(v) => dispatch({ type: 'SET_CUSTOM_DEPTH', payload: v })}
          />
        )}
        {state.currentStep === 5 && (
          <ExtrasStep selected={state.extras} onToggle={(id) => dispatch({ type: 'TOGGLE_EXTRA', payload: id })} />
        )}
        {state.currentStep === 6 && (
          <TimelineStep selected={state.timeline} onSelect={(t) => dispatch({ type: 'SET_TIMELINE', payload: t })} />
        )}
        {state.currentStep === 7 && (
          <ContactStep
            name={state.contactName}
            email={state.contactEmail}
            phone={state.contactPhone}
            onName={(v) => dispatch({ type: 'SET_CONTACT_NAME', payload: v })}
            onEmail={(v) => dispatch({ type: 'SET_CONTACT_EMAIL', payload: v })}
            onPhone={(v) => dispatch({ type: 'SET_CONTACT_PHONE', payload: v })}
            errors={contactErrors}
          />
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-10 max-w-3xl mx-auto">
        {state.currentStep > 1 ? (
          <button
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className="px-6 py-3 rounded-lg font-medium transition-colors border-2 cursor-pointer"
            style={{
              fontFamily: 'var(--font-heading)',
              borderColor: 'var(--color-pool-deep)',
              color: 'var(--color-pool-deep)',
            }}
          >
            Précédent
          </button>
        ) : (
          <div />
        )}

        {state.currentStep < 7 ? (
          <button
            onClick={() => dispatch({ type: 'NEXT_STEP' })}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer shadow-md ${
              canProceed
                ? 'hover:-translate-y-0.5 hover:shadow-lg'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              fontFamily: 'var(--font-heading)',
              backgroundColor: canProceed ? 'var(--color-pool-deep)' : '#9CA3AF',
              color: 'white',
            }}
          >
            Suivant
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canProceed}
            className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 cursor-pointer shadow-lg ${
              canProceed
                ? 'hover:-translate-y-0.5 hover:shadow-xl'
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              fontFamily: 'var(--font-heading)',
              backgroundColor: canProceed ? 'var(--color-gold)' : '#9CA3AF',
              color: 'var(--color-charcoal)',
            }}
          >
            Obtenir mon devis
          </button>
        )}
      </div>
    </div>
  );
}
