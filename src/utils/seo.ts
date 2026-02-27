interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_NAME = 'Astro Piscines';
const DEFAULT_OG_IMAGE = '/og-default.jpg';

export function getSEO(props: SEOProps) {
  return {
    title: `${props.title} | ${SITE_NAME}`,
    description: props.description,
    canonical: props.canonical,
    ogImage: props.ogImage ?? DEFAULT_OG_IMAGE,
    noindex: props.noindex ?? false,
  };
}

export const pageSEO = {
  home: {
    title: 'Constructeur de Piscines à Genève et Vaud',
    description: 'Astro Piscines, constructeur de piscines depuis 1974. Construction, rénovation et entretien de piscines à Genève et dans le canton de Vaud. Devis gratuit.',
  },
  construction: {
    title: 'Construction de Piscines',
    description: 'Construction de piscines sur mesure : béton, coque polyester et inox. Plus de 50 ans d\'expertise à Genève et Vaud.',
  },
  beton: {
    title: 'Piscine Béton sur Mesure',
    description: 'Construction de piscines en béton armé sur mesure. Formes libres, dimensions personnalisées. Expert depuis 1974 à Genève et Vaud.',
  },
  coque: {
    title: 'Piscine Coque Polyester',
    description: 'Installation rapide de piscines coque polyester. Large choix de formes et tailles. Garantie décennale. Genève et Vaud.',
  },
  inox: {
    title: 'Piscine Inox Haut de Gamme',
    description: 'Piscines en acier inoxydable : durabilité exceptionnelle et design contemporain. Le choix premium pour votre projet.',
  },
  renovation: {
    title: 'Rénovation de Piscines',
    description: 'Rénovation complète de piscines : changement de liner, détection de fuites, réparation structurelle. Genève et Vaud.',
  },
  entretien: {
    title: 'Entretien de Piscines',
    description: 'Contrats d\'entretien et maintenance de piscines. Forfaits adaptés à vos besoins. Intervention rapide à Genève et Vaud.',
  },
  espacesDetente: {
    title: 'Espaces Détente',
    description: 'Conception et installation de saunas, hammams et jacuzzis. Créez votre espace bien-être à domicile.',
  },
  sauna: {
    title: 'Installation de Saunas',
    description: 'Saunas sur mesure pour votre intérieur ou extérieur. Installation professionnelle à Genève et Vaud.',
  },
  hammam: {
    title: 'Installation de Hammams',
    description: 'Hammams sur mesure : conception, installation et maintenance. Votre spa oriental à domicile.',
  },
  jacuzzi: {
    title: 'Installation de Jacuzzis',
    description: 'Jacuzzis et spas : vente, installation et entretien. Large gamme de modèles à Genève et Vaud.',
  },
  equipements: {
    title: 'Équipements Piscine',
    description: 'Équipements pour piscines : filtration, chauffage, automatisation, couvertures, éclairage LED. Conseil expert.',
  },
  pergola: {
    title: 'Pergolas Bioclimatiques',
    description: 'Pergolas bioclimatiques sur mesure pour votre terrasse ou espace piscine. Design moderne et fonctionnel.',
  },
  about: {
    title: 'À Propos',
    description: 'Astro Piscines, entreprise familiale depuis 1974. Plus de 500 piscines réalisées à Genève et dans le canton de Vaud.',
  },
  contact: {
    title: 'Contact',
    description: 'Contactez Astro Piscines pour votre projet. Showrooms à Nyon et Chêne-Bourg. Devis gratuit. Tél: 0842 520 520.',
  },
  configurator: {
    title: 'Configurateur de Piscine',
    description: 'Configurez votre piscine en ligne et obtenez une estimation de prix instantanée. Personnalisez type, taille et options.',
  },
  blog: {
    title: 'Blog & Conseils Piscine',
    description: 'Conseils d\'experts pour votre piscine : entretien, construction, rénovation. Articles et guides pratiques.',
  },
} as const;
