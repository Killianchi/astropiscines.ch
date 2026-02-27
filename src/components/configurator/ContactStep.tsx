interface Props {
  name: string;
  email: string;
  phone: string;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPhone: (v: string) => void;
  errors: { name?: string; email?: string };
}

export default function ContactStep({ name, email, phone, onName, onEmail, onPhone, errors }: Props) {
  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-lg border ${
      hasError ? 'border-red-400 bg-red-50' : 'border-gray-200'
    } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`;

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep)' }}>
        Vos coordonnées
      </h2>
      <p className="text-center text-gray-500 mb-8">Pour recevoir votre estimation personnalisée</p>
      <div className="max-w-lg mx-auto space-y-5">
        <div>
          <label htmlFor="cfg-name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal)' }}>
            Nom complet *
          </label>
          <input
            id="cfg-name"
            type="text"
            value={name}
            onChange={(e) => onName(e.target.value)}
            className={inputClass(!!errors.name)}
            style={{ '--tw-ring-color': 'var(--color-pool-light)' } as React.CSSProperties}
            placeholder="Jean Dupont"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cfg-email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal)' }}>
            Adresse e-mail *
          </label>
          <input
            id="cfg-email"
            type="email"
            value={email}
            onChange={(e) => onEmail(e.target.value)}
            className={inputClass(!!errors.email)}
            style={{ '--tw-ring-color': 'var(--color-pool-light)' } as React.CSSProperties}
            placeholder="jean.dupont@email.ch"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cfg-phone" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal)' }}>
            Téléphone
          </label>
          <input
            id="cfg-phone"
            type="tel"
            value={phone}
            onChange={(e) => onPhone(e.target.value)}
            className={inputClass(false)}
            style={{ '--tw-ring-color': 'var(--color-pool-light)' } as React.CSSProperties}
            placeholder="+41 XX XXX XX XX"
          />
        </div>
        <div className="flex items-start gap-2 text-sm text-gray-500 mt-4">
          <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Vos données sont protégées et ne seront jamais partagées.
        </div>
      </div>
    </div>
  );
}
