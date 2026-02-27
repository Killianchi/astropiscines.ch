export const poolTypes = {
  beton: { label: 'Piscine Béton', baseMin: 50000, baseMax: 70000 },
  coque: { label: 'Piscine Coque', baseMin: 30000, baseMax: 45000 },
  inox: { label: 'Piscine Inox', baseMin: 80000, baseMax: 120000 },
  renovation: { label: 'Rénovation', baseMin: 15000, baseMax: 35000 },
} as const;

export const sizeMultipliers = {
  small: { label: '≤ 25 m²', min: 0.8, max: 1.0 },
  medium: { label: '25 – 50 m²', min: 1.0, max: 1.3 },
  large: { label: '50 m² +', min: 1.3, max: 1.8 },
} as const;

export const indoorPremium = { min: 1.25, max: 1.4 };

export const regionAdjustment = {
  vaud: 1.0,
  geneve: 1.05,
} as const;

export const extras = [
  { id: 'chauffage', label: 'Chauffage', price: 5000 },
  { id: 'couverture', label: 'Couverture automatique', price: 8000 },
  { id: 'led', label: 'Éclairage LED', price: 3000 },
  { id: 'nage', label: 'Nage contre-courant', price: 6000 },
  { id: 'pompe', label: 'Pompe à chaleur', price: 7000 },
  { id: 'filtration', label: 'Filtration premium', price: 4000 },
] as const;

export type PoolType = keyof typeof poolTypes;
export type SizeCategory = keyof typeof sizeMultipliers;
export type Region = keyof typeof regionAdjustment;
export type Location = 'exterieure' | 'interieure';
export type Timeline = 'this-year' | 'next-year' | 'exploring';
export type ExtraId = (typeof extras)[number]['id'];
