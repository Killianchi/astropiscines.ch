export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: 'Construction',
    href: '/construction/',
    children: [
      { label: 'Piscine Béton', href: '/construction/piscine-beton/' },
      { label: 'Piscine Coque', href: '/construction/piscine-coque/' },
      { label: 'Piscine Inox', href: '/construction/piscine-inox/' },
    ],
  },
  { label: 'Rénovation', href: '/renovation/' },
  { label: 'Entretien', href: '/entretien/' },
  {
    label: 'Espaces Détente',
    href: '/espaces-detente/',
    children: [
      { label: 'Sauna', href: '/espaces-detente/sauna/' },
      { label: 'Hammam', href: '/espaces-detente/hammam/' },
      { label: 'Jacuzzi', href: '/espaces-detente/jacuzzi/' },
    ],
  },
  { label: 'Équipements', href: '/equipements/' },
  { label: 'Pergola', href: '/pergola/' },
  { label: 'À propos', href: '/a-propos/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNav = {
  services: [
    { label: 'Construction piscine', href: '/construction/' },
    { label: 'Rénovation', href: '/renovation/' },
    { label: 'Entretien', href: '/entretien/' },
    { label: 'Espaces détente', href: '/espaces-detente/' },
    { label: 'Équipements', href: '/equipements/' },
    { label: 'Pergola', href: '/pergola/' },
  ],
  company: [
    { label: 'À propos', href: '/a-propos/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Configurateur', href: '/configurateur/' },
  ],
  contact: {
    phone: '0842 520 520',
    email: 'info@astro-piscines.ch',
    locations: [
      { name: 'Nyon', address: 'Route de Saint-Cergue 293, 1260 Nyon' },
      { name: 'Chêne-Bourg', address: 'Chemin de la Mousse 131, 1225 Chêne-Bourg' },
    ],
  },
};
