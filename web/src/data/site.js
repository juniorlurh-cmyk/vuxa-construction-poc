// Verified public facts only — sourced from the Google Maps listing,
// Cylex directory and review platforms. Anything not publicly verifiable
// (CIPC number, CIDB grade, project list) is left out of the marketing copy
// and tracked in the README verification register instead.

export const SITE = {
  name: 'Vuxa Project & Construction',
  short: 'Vuxa P&C',
  city: 'Sunnyside, Pretoria',
  address: '308 Eden South, 99 Bourke Street, Sunnyside, Pretoria 0002',
  phoneDisplay: '068 097 7407',
  phoneTel: '+27680977407',
  phoneAlt: '076 293 6840', // secondary number on directory listings
  email: 'muvhalidan@gmail.com', // directory-listed contact email
  hours: 'Mon–Fri · 08:00–17:00',
  rating: '4.6',
  reviewCount: '8',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Vuxa+project+and+construction+99+Bourke+Street+Sunnyside+Pretoria',
  mapsEmbed:
    'https://maps.google.com/maps?q=99+Bourke+Street,+Sunnyside,+Pretoria+0002&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

// Actual review excerpts from the public Google listing (Oct 2022).
export const REVIEWS = [
  {
    quote: 'Very amazing job when it comes to traffic counts',
    stars: 5,
  },
  {
    quote: 'Everything we asked to be done was done as we pictured',
    stars: 5,
  },
  {
    quote: 'Good quality — their service still needs to improve on performance',
    stars: 3,
  },
];

export function tel() {
  return `tel:${SITE.phoneTel}`;
}
export function wa(text) {
  return `https://wa.me/27680977407?text=${encodeURIComponent(text || 'Hi Vuxa — I would like to discuss a project.')}`;
}
export function mailto(subject, body) {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}?${params.join('&')}`;
}
