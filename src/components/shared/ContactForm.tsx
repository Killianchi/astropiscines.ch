import { useState, type FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const services = [
  'Construction de piscine',
  'Rénovation',
  'Entretien',
  'Espace détente (sauna, hammam, jacuzzi)',
  'Équipements',
  'Pergola',
  'Autre',
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = 'Le nom est requis';
    if (!form.email.trim()) newErrors.email = 'L\'e-mail est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'E-mail invalide';
    if (!form.message.trim()) newErrors.message = 'Le message est requis';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6 rounded-2xl" style={{ backgroundColor: 'var(--color-pool-surface, #E8F4FD)' }}>
        <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-pool-deep, #0B3D6B)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-pool-deep, #0B3D6B)' }}>
          Message envoyé !
        </h3>
        <p style={{ color: '#4B5563' }}>
          Merci pour votre message. Nous vous recontacterons sous 24h.
        </p>
      </div>
    );
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-lg border ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
    } focus:outline-none focus:ring-2 focus:border-transparent transition-colors`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal, #1A1C20)' }}>
            Nom *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass('name')}
            style={{ '--tw-ring-color': 'var(--color-pool-light, #4DB8E8)' } as React.CSSProperties}
            placeholder="Votre nom complet"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal, #1A1C20)' }}>
            E-mail *
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputClass('email')}
            style={{ '--tw-ring-color': 'var(--color-pool-light, #4DB8E8)' } as React.CSSProperties}
            placeholder="votre@email.ch"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal, #1A1C20)' }}>
            Téléphone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass('phone')}
            style={{ '--tw-ring-color': 'var(--color-pool-light, #4DB8E8)' } as React.CSSProperties}
            placeholder="+41 XX XXX XX XX"
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal, #1A1C20)' }}>
            Service souhaité
          </label>
          <select
            id="service"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent transition-colors bg-white"
            style={{ '--tw-ring-color': 'var(--color-pool-light, #4DB8E8)' } as React.CSSProperties}
          >
            <option value="">Sélectionnez un service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-charcoal, #1A1C20)' }}>
          Message *
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={inputClass('message')}
          style={{ '--tw-ring-color': 'var(--color-pool-light, #4DB8E8)' } as React.CSSProperties}
          rows={5}
          placeholder="Décrivez votre projet..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-xl cursor-pointer"
        style={{
          fontFamily: 'var(--font-heading)',
          backgroundColor: 'var(--color-gold, #C8A951)',
          color: 'var(--color-charcoal, #1A1C20)',
        }}
      >
        Envoyer
      </button>
    </form>
  );
}
