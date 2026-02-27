const stepLabels = ['Région', 'Type', 'Lieu', 'Taille', 'Options', 'Délai', 'Contact'];

interface Props {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-1 mb-10">
      {stepLabels.map((label, i) => {
        const step = i + 1;
        const isActive = step === currentStep;
        const isComplete = step < currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isComplete
                    ? 'bg-[var(--color-pool-deep)] text-white'
                    : isActive
                    ? 'bg-[var(--color-gold)] text-[var(--color-charcoal)] shadow-lg scale-110'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`text-xs mt-1 hidden sm:block ${
                  isActive ? 'text-[var(--color-pool-deep)] font-semibold' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div
                className={`w-6 sm:w-10 h-0.5 mx-1 transition-colors ${
                  isComplete ? 'bg-[var(--color-pool-deep)]' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
