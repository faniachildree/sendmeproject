// i18n.jsx — lightweight translation layer for the global region toggle.
// Covers nav, hero, primary CTAs and a few global strings. Reflects the
// org's reach: English, Español (Brazil/LatAm outreach), Português (Brazil),
// Français, and Kiswahili (Uganda/East Africa).

const LANGS = [
  { code: 'en', label: 'English',   flag: 'EN' },
  { code: 'es', label: 'Español',   flag: 'ES' },
  { code: 'pt', label: 'Português', flag: 'PT' },
  { code: 'fr', label: 'Français',  flag: 'FR' },
  { code: 'sw', label: 'Kiswahili', flag: 'SW' },
];

const STRINGS = {
  en: {
    nav_about: 'About', nav_projects: 'Where We Work', nav_involved: 'Get Involved',
    nav_board: 'Our Team', nav_financials: 'Transparency', nav_contact: 'Contact',
    nav_shop: 'Shop', nav_pictures: 'Gallery',
    give: 'Give', donate: 'Donate',
    hero_sub: 'Mobilizing aid, leadership, and hope — locally and globally. From Arkansas to the nations.',
    cta_involved: 'Get Involved', cta_story: 'Read Our Story',
    pillars: 'Local Heart. Global Impact.',
    reach_title: 'Purpose Starts with Connection.',
  },
  es: {
    nav_about: 'Quiénes Somos', nav_projects: 'Dónde Servimos', nav_involved: 'Participa',
    nav_board: 'Nuestro Equipo', nav_financials: 'Transparencia', nav_contact: 'Contacto',
    give: 'Donar', donate: 'Donar',
    hero_sub: 'Movilizando ayuda, liderazgo y esperanza — local y globalmente. De Arkansas a las naciones.',
    cta_involved: 'Participa', cta_story: 'Nuestra Historia',
    pillars: 'Corazón Local. Impacto Global.',
    reach_title: 'Contáctanos desde cualquier lugar.',
  },
  pt: {
    nav_about: 'Sobre', nav_projects: 'Onde Atuamos', nav_involved: 'Participe',
    nav_board: 'Nossa Equipe', nav_financials: 'Transparência', nav_contact: 'Contato',
    give: 'Doar', donate: 'Doar',
    hero_sub: 'Mobilizando ajuda, liderança e esperança — local e globalmente. De Arkansas às nações.',
    cta_involved: 'Participe', cta_story: 'Nossa História',
    pillars: 'Coração Local. Impacto Global.',
    reach_title: 'Fale conosco de qualquer lugar.',
  },
  fr: {
    nav_about: 'À Propos', nav_projects: 'Où Nous Agissons', nav_involved: 'S\u2019Impliquer',
    nav_board: 'Notre Équipe', nav_financials: 'Transparence', nav_contact: 'Contact',
    give: 'Donner', donate: 'Donner',
    hero_sub: 'Mobiliser l\u2019aide, le leadership et l\u2019espoir — localement et mondialement. De l\u2019Arkansas aux nations.',
    cta_involved: 'S\u2019Impliquer', cta_story: 'Notre Histoire',
    pillars: 'Cœur Local. Impact Mondial.',
    reach_title: 'Contactez-nous où que vous soyez.',
  },
  sw: {
    nav_about: 'Kuhusu', nav_projects: 'Tunakohudumu', nav_involved: 'Shiriki',
    nav_board: 'Timu Yetu', nav_financials: 'Uwazi', nav_contact: 'Wasiliana',
    give: 'Toa', donate: 'Toa',
    hero_sub: 'Kuhamasisha misaada, uongozi, na matumaini — ndani na duniani kote. Kutoka Arkansas hadi mataifa.',
    cta_involved: 'Shiriki', cta_story: 'Hadithi Yetu',
    pillars: 'Moyo wa Ndani. Athari ya Kimataifa.',
    reach_title: 'Wasiliana nasi popote ulipo.',
  },
};

function useT(lang) {
  return React.useCallback((key) => (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key, [lang]);
}

Object.assign(window, { LANGS, STRINGS, useT });
