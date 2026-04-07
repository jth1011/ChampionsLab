export type EventTier = 'regional' | 'international' | 'worlds' | 'special' | 'national' | 'online' | 'community';
export type EventRegion = 'NA' | 'EU' | 'LA' | 'OC' | 'APAC' | 'ONLINE';

export interface VGCEvent {
  id: string;
  name: string;
  city: string;
  country: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  tier: EventTier;
  format: string;
  region: EventRegion;
  registrationUrl: string;
  registrationNote?: string;
  cpPoints: number;
}

export const TIER_LABEL: Record<EventTier, string> = {
  regional:      'Regional',
  international: 'International',
  worlds:        'Worlds',
  special:       'Special',
  national:      'National',
  online:        'Online',
  community:     'Community',
};

export const REGION_LABEL: Record<EventRegion, string> = {
  NA:     'North America',
  EU:     'Europe',
  LA:     'Latin America',
  OC:     'Oceania',
  APAC:   'Asia-Pacific',
  ONLINE: 'Online',
};

// Events NOT covered by the official championships.pokemon.com CrafterCMS API.
// The main Championship Series events (regionals, internationals, worlds) are
// fetched dynamically via src/lib/fetch-events.ts.
export const SUPPLEMENTARY_EVENTS: VGCEvent[] = [

  // ── Online: Grand Challenges ───────────────────────────────────────────────
  {
    id: 'gc-1',
    name: 'Grand Challenge I',
    city: 'Online', country: 'Global',
    startDate: '2025-09-05', endDate: '2025-09-07',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://champions.pokemon.com/en-us/',
    cpPoints: 100,
  },
  {
    id: 'gc-2',
    name: 'Grand Challenge II',
    city: 'Online', country: 'Global',
    startDate: '2025-10-03', endDate: '2025-10-05',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://champions.pokemon.com/en-us/',
    cpPoints: 100,
  },
  {
    id: 'gc-3',
    name: 'Grand Challenge III',
    city: 'Online', country: 'Global',
    startDate: '2025-11-07', endDate: '2025-11-09',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://champions.pokemon.com/en-us/',
    cpPoints: 100,
  },
  {
    id: 'gc-4',
    name: 'Grand Challenge IV',
    city: 'Online', country: 'Global',
    startDate: '2026-01-09', endDate: '2026-01-11',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://champions.pokemon.com/en-us/',
    cpPoints: 100,
  },
  {
    id: 'gc-5',
    name: 'Grand Challenge V',
    city: 'Online', country: 'Global',
    startDate: '2026-02-20', endDate: '2026-02-22',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://champions.pokemon.com/en-us/',
    cpPoints: 100,
  },
  {
    id: 'global-challenge',
    name: 'Global Challenge',
    city: 'Online', country: 'Global',
    startDate: '2026-05-01', endDate: '2026-05-04',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://champions.pokemon.com/en-us/',
    cpPoints: 100,
  },
  {
    id: 'jcs-qualifier',
    name: 'JCS Qualifier',
    city: 'Online', country: 'Japan',
    startDate: '2026-05-10', endDate: '2026-05-10',
    tier: 'online', format: 'VGC 2026', region: 'ONLINE',
    registrationUrl: 'https://www.pokemon.co.jp/ex/pjcs/2026/game/',
    cpPoints: 100,
  },

  // ── APAC Master Ball Leagues & Nationals (not in CMS) ────────────────────
  {
    id: 'nat-philippines-apr26',
    name: 'Philippines Master Ball League',
    city: 'Pasay', country: 'Philippines',
    startDate: '2026-04-25', endDate: '2026-04-26',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://forms.gle/uevCvDZ3HK7Rsjxe9',
    cpPoints: 500,
  },
  {
    id: 'nat-hk-may26',
    name: 'Hong Kong Master Ball League',
    city: 'Wan Chai', country: 'Hong Kong',
    startDate: '2026-05-02', endDate: '2026-05-03',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe8tIHTqPxdReNA250Xs7s_-m2Hld6tGRIln8lG8h77TO0bcg/viewform',
    cpPoints: 500,
  },
  {
    id: 'nat-malaysia-may26',
    name: 'Malaysia Master Ball League',
    city: 'Petaling Jaya', country: 'Malaysia',
    startDate: '2026-05-09', endDate: '2026-05-10',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://forms.gle/LskjdW8TkrLgyBjP7',
    cpPoints: 500,
  },
  {
    id: 'nat-thailand-may26',
    name: 'Thailand Master Ball League',
    city: 'Bangkok', country: 'Thailand',
    startDate: '2026-05-16', endDate: '2026-05-17',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScHIFt4AeyPBKXR6lxGmKvt7thxtPleQ4vEnjZkDBCCdi_hEQ/viewform',
    cpPoints: 500,
  },
  {
    id: 'nat-singapore-may26',
    name: 'Singapore Master Ball League',
    city: 'Downtown Core', country: 'Singapore',
    startDate: '2026-05-23', endDate: '2026-05-24',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://forms.gle/7uzHdFwQNpQ4RupD6',
    cpPoints: 500,
  },
  {
    id: 'nat-korea-may26',
    name: 'Trainers Cup (PTC)',
    city: 'Seoul', country: 'South Korea',
    startDate: '2026-05-24', endDate: '2026-05-25',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://pokemonkorea.co.kr/ptc2026',
    cpPoints: 500,
  },
  {
    id: 'nat-japan-jun26',
    name: 'Japan Championships (JCS)',
    city: 'Yokohama', country: 'Japan',
    startDate: '2026-06-06', endDate: '2026-06-07',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://www.pokemon.co.jp/ex/pjcs/2026/game/',
    cpPoints: 500,
  },
  {
    id: 'nat-taiwan-jun26',
    name: 'Taiwan Master Ball League',
    city: 'Taichung', country: 'Taiwan',
    startDate: '2026-06-13', endDate: '2026-06-14',
    tier: 'national', format: 'VGC 2026', region: 'APAC',
    registrationUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfuy8z2eDOZyQTuq6dwESxDTgWY_zYoFevuqZfymPie_zOhnQ/viewform',
    cpPoints: 500,
  },
];
