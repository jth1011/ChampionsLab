#!/usr/bin/env node
/**
 * Scrapes VGC Championship Series events from rk9.gg (official registration platform)
 * and championships.pokemon.com, then cross-compares with our static data.
 *
 * Usage: node scripts/scrape-events.mjs
 */

// ── Our existing static data (import the raw values) ──────────────────────────

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse the static TS file to extract events (quick & dirty, no TS compiler needed)
const tsSource = readFileSync(join(__dirname, '../src/lib/vgc-events.ts'), 'utf-8');

function parseStaticEvents() {
  const events = [];
  // Match each object block in the array
  const objRegex = /\{\s*id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?city:\s*'([^']+)'[\s\S]*?country:\s*'([^']+)'[\s\S]*?startDate:\s*'([^']+)'[\s\S]*?endDate:\s*'([^']+)'[\s\S]*?tier:\s*'([^']+)'[\s\S]*?region:\s*'([^']+)'[\s\S]*?cpPoints:\s*(\d+)/g;
  let m;
  while ((m = objRegex.exec(tsSource)) !== null) {
    events.push({
      id: m[1],
      name: m[2],
      city: m[3],
      country: m[4],
      startDate: m[5],
      endDate: m[6],
      tier: m[7],
      region: m[8],
      cpPoints: parseInt(m[9]),
    });
  }
  return events;
}

// ── Scrape rk9.gg ─────────────────────────────────────────────────────────────

async function scrapeRK9() {
  // Try local cache first, then fetch
  let html;
  const cachePath = '/tmp/rk9-events.html';
  try {
    html = readFileSync(cachePath, 'utf-8');
    console.log(`\n📡 Using cached RK9 data from ${cachePath} (${(html.length/1024).toFixed(0)}KB)`);
  } catch {
    const url = 'https://rk9.gg/events/pokemon';
    console.log(`\n📡 Fetching ${url} ...`);
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`rk9.gg returned ${res.status}`);
    html = await res.text();
  }

  const events = [];

  // RK9 has two DataTables: dtUpcomingEvents and dtPastEvents
  // Each row has: date | image | event name (link) | location | links
  const tableIds = ['dtUpcomingEvents', 'dtPastEvents'];

  for (const tid of tableIds) {
    const tIdx = html.indexOf(`id="${tid}"`);
    if (tIdx < 0) continue;
    const tEnd = html.indexOf('</table>', tIdx);
    const tHtml = html.slice(tIdx, tEnd);

    // Split into rows and parse each
    const rows = tHtml.split(/<tr>/gi).slice(1);

    for (const row of rows) {
      if (row.includes('<th')) continue;

      // Extract cell contents
      const cells = [];
      const cellRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
      let cm;
      while ((cm = cellRegex.exec(row)) !== null) cells.push(cm[1]);

      if (cells.length < 4) continue;

      const dateText = stripHtml(cells[0]).trim();
      const nameMatch = cells[2].match(/<a[^>]*>([^<]+)<\/a>/);
      const name = nameMatch ? nameMatch[1].trim() : stripHtml(cells[2]).trim();
      const hrefMatch = cells[2].match(/href="([^"]+)"/);
      const detailUrl = hrefMatch ? `https://rk9.gg${hrefMatch[1]}` : '';
      const location = stripHtml(cells[3]).trim();

      if (!dateText || !name) continue;
      // Only Pokemon events (skip non-pokemon)
      if (!name.includes('Pok') && !name.includes('POK')) continue;

      const dates = parseDateRange(dateText);
      if (!dates) continue;

      events.push({
        name: name.replace(/\s+/g, ' '),
        location: location.replace(/\s+/g, ' '),
        startDate: dates.start,
        endDate: dates.end,
        detailUrl,
        section: tid === 'dtUpcomingEvents' ? 'upcoming' : 'past',
        source: 'rk9.gg',
      });
    }
  }

  return events;
}

// ── Scrape championships.pokemon.com ──────────────────────────────────────────

async function scrapeChampionships() {
  const url = 'https://championships.pokemon.com/en-us/events';
  console.log(`📡 Fetching ${url} ...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`championships.pokemon.com returned ${res.status}`);
  const html = await res.text();

  const events = [];

  // The page has event cards with structure like:
  // "Prague Pokémon Regional Championships 2026 Apr 25–26 Regional & Special Championships"
  // Each followed by an "Event Details" link

  // Extract event blocks - look for event detail links and grab nearby text
  const cardRegex = /(?:Event will be broadcast\s*)?([\w\s'()\-–.,]+?(?:Championships?|Championships|Worlds|World Championships)[^<]*?)\s+((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.\s]+\d+[-–]\d+(?:,?\s*\d{4})?)\s+((?:Regional|International|World|Online|Special)[^<]*?)\s*\[Event Details\]\(([^)]+)\)/gi;

  // Work with the plain‐text‐ish version from the fetch
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

  const simpleRegex = /([\w\s'–\-().]+?(?:Championships|Championship|Worlds)[^{]*?)\s+((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s*\d+[-–]\d+(?:,?\s*\d+)?)\s+((?:Regional|International|World|Online|Special)[^h]*?)Event Details/gi;

  let m;
  while ((m = simpleRegex.exec(text)) !== null) {
    const name = m[1].trim().replace(/\s+/g, ' ');
    const dateStr = m[2].trim();
    const type = m[3].trim();

    // Skip UNITE events
    if (name.includes('UCS') || name.includes('UNITE')) continue;

    events.push({
      name,
      dateStr,
      type: type.replace(/\s+/g, ' '),
      source: 'championships.pokemon.com',
    });
  }

  return events;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
}

function parseDateRange(text) {
  // Handles: "April 3-5, 2026", "February 27-March 1, 2026", "November 21-23, 2025"
  const months = { January: '01', February: '02', March: '03', April: '04', May: '05', June: '06', July: '07', August: '08', September: '09', October: '10', November: '11', December: '12' };

  // "Month day-day, year"
  let m = text.match(/(\w+)\s+(\d+)[-–](\d+),?\s+(\d{4})/);
  if (m && months[m[1]]) {
    const mon = months[m[1]];
    const year = m[4];
    return {
      start: `${year}-${mon}-${String(m[2]).padStart(2, '0')}`,
      end: `${year}-${mon}-${String(m[3]).padStart(2, '0')}`,
    };
  }

  // "Month day-Month day, year"
  m = text.match(/(\w+)\s+(\d+)[-–](\w+)\s+(\d+),?\s+(\d{4})/);
  if (m && months[m[1]] && months[m[3]]) {
    const year = m[5];
    return {
      start: `${year}-${months[m[1]]}-${String(m[2]).padStart(2, '0')}`,
      end: `${year}-${months[m[3]]}-${String(m[4]).padStart(2, '0')}`,
    };
  }

  return null;
}

function normalizeEventName(name) {
  return name
    .toLowerCase()
    .replace(/pokémon|pokemon/gi, '')
    .replace(/20\d{2}/g, '')
    .replace(/regional|special|international|championships?/gi, '')
    .replace(/[^a-z]/g, '')
    .trim();
}

function normalizeCityForMatch(city) {
  return city
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .trim();
}

// ── Cross-compare ─────────────────────────────────────────────────────────────

function crossCompare(staticEvents, scrapedRK9, scrapedOfficial) {
  console.log('\n' + '═'.repeat(70));
  console.log('  CROSS-COMPARISON REPORT');
  console.log('═'.repeat(70));

  console.log(`\n📊 Data counts:`);
  console.log(`   Static (vgc-events.ts):      ${staticEvents.length} events`);
  console.log(`   Scraped (rk9.gg):            ${scrapedRK9.length} events`);
  console.log(`   Scraped (championships.com):  ${scrapedOfficial.length} events`);

  // Separate static into categories
  const staticOnline = staticEvents.filter(e => e.tier === 'online');
  const staticNational = staticEvents.filter(e => e.tier === 'national');
  const staticChampionship = staticEvents.filter(e => !['online', 'national'].includes(e.tier));

  console.log(`\n   Static breakdown:`);
  console.log(`     Championship Series (Regional/International/Special/Worlds): ${staticChampionship.length}`);
  console.log(`     Online (Grand Challenges):  ${staticOnline.length}`);
  console.log(`     National (APAC):            ${staticNational.length}`);

  // Match static Championship events against RK9
  console.log('\n' + '─'.repeat(70));
  console.log('  MATCHING STATIC vs RK9.GG (Championship Series events)');
  console.log('─'.repeat(70));

  const matched = [];
  const staticOnly = [];
  const rk9Only = [...scrapedRK9];

  for (const se of staticChampionship) {
    const normCity = normalizeCityForMatch(se.city);
    const normName = normalizeEventName(se.name);

    let bestMatch = null;
    let bestIdx = -1;

    for (let i = 0; i < rk9Only.length; i++) {
      const re = rk9Only[i];
      const rNormName = normalizeEventName(re.name);
      const rNormLoc = normalizeCityForMatch(re.location);

      // Match by city appearing in location string
      if (rNormLoc.includes(normCity) || normCity.includes(rNormLoc.split(',')[0]?.trim())) {
        // Also try date match
        if (re.startDate === se.startDate || !re.startDate) {
          bestMatch = re;
          bestIdx = i;
          break;
        }
        // City matches but date differs - still likely
        if (!bestMatch) {
          bestMatch = re;
          bestIdx = i;
        }
      }

      // Fallback: name similarity
      if (rNormName.includes(normCity) || normName.includes(rNormLoc.split(',')[0]?.trim())) {
        if (!bestMatch) {
          bestMatch = re;
          bestIdx = i;
        }
      }
    }

    if (bestMatch) {
      matched.push({ static: se, rk9: bestMatch });
      rk9Only.splice(bestIdx, 1);
    } else {
      staticOnly.push(se);
    }
  }

  // Print matched events with date comparison
  let dateMatches = 0;
  let dateMismatches = 0;

  for (const { static: se, rk9: re } of matched) {
    const dateOk = re.startDate === se.startDate && re.endDate === se.endDate;
    if (dateOk) {
      dateMatches++;
      console.log(`  ✅ ${se.name}`);
      console.log(`     Static: ${se.startDate} → ${se.endDate} | RK9: ${re.startDate} → ${re.endDate}`);
    } else if (re.startDate) {
      dateMismatches++;
      console.log(`  ⚠️  ${se.name}`);
      console.log(`     Static: ${se.startDate} → ${se.endDate}`);
      console.log(`     RK9:    ${re.startDate} → ${re.endDate}  ← DATE MISMATCH`);
    } else {
      dateMatches++;
      console.log(`  ✅ ${se.name} (no date from RK9 to compare)`);
    }
  }

  console.log(`\n  📈 Matched: ${matched.length}/${staticChampionship.length} | Dates OK: ${dateMatches} | Mismatches: ${dateMismatches}`);

  if (staticOnly.length > 0) {
    console.log(`\n  ℹ️  Events in OUR data but NOT on RK9 (${staticOnly.length}):`);
    for (const e of staticOnly) {
      console.log(`     - ${e.name} (${e.startDate}, ${e.tier}, ${e.region})`);
    }
  }

  if (rk9Only.length > 0) {
    console.log(`\n  🆕 Events on RK9 but NOT in our data (${rk9Only.length}):`);
    for (const e of rk9Only) {
      console.log(`     - ${e.name} (${e.startDate || 'no date'}, ${e.location})`);
    }
  }

  // Match static against championships.pokemon.com
  console.log('\n' + '─'.repeat(70));
  console.log('  MATCHING STATIC vs CHAMPIONSHIPS.POKEMON.COM');
  console.log('─'.repeat(70));

  const officialUnmatched = [];
  for (const oe of scrapedOfficial) {
    const normName = normalizeEventName(oe.name);
    const found = staticChampionship.some(se => {
      const sn = normalizeEventName(se.name);
      const sc = normalizeCityForMatch(se.city);
      return normName.includes(sc) || sc.includes(normName.slice(0, 5));
    });
    if (found) {
      console.log(`  ✅ ${oe.name} (${oe.dateStr})`);
    } else {
      officialUnmatched.push(oe);
      console.log(`  🆕 ${oe.name} (${oe.dateStr}) ← NOT IN OUR DATA`);
    }
  }

  // Extra events we have (online, national, etc.)
  console.log('\n' + '─'.repeat(70));
  console.log('  EXTRA EVENTS IN OUR DATA (not on official sites)');
  console.log('─'.repeat(70));
  console.log(`\n  Online / Grand Challenges (${staticOnline.length}):`);
  for (const e of staticOnline) {
    console.log(`     📶 ${e.name} (${e.startDate})`);
  }
  console.log(`\n  National / APAC Master Ball League (${staticNational.length}):`);
  for (const e of staticNational) {
    console.log(`     🏆 ${e.name} – ${e.city}, ${e.country} (${e.startDate})`);
  }

  console.log('\n' + '═'.repeat(70));
  console.log('  SUMMARY');
  console.log('═'.repeat(70));
  console.log(`  Total static events:     ${staticEvents.length}`);
  console.log(`  Championship matched:    ${matched.length}/${staticChampionship.length}`);
  console.log(`  Date matches:            ${dateMatches}`);
  console.log(`  Date mismatches:         ${dateMismatches}`);
  console.log(`  Missing from RK9:        ${staticOnly.length}`);
  console.log(`  Missing from our data:   ${rk9Only.length}`);
  console.log(`  Online events (ours):    ${staticOnline.length}`);
  console.log(`  National events (ours):  ${staticNational.length}`);
  console.log('═'.repeat(70));
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🔎 VGC Events Scraper & Cross-Comparator');
  console.log('  Comparing our static data against official sources...\n');

  const staticEvents = parseStaticEvents();
  console.log(`✅ Parsed ${staticEvents.length} events from vgc-events.ts`);

  let rk9Events = [];
  try {
    rk9Events = await scrapeRK9();
    console.log(`✅ Scraped ${rk9Events.length} events from rk9.gg`);
  } catch (err) {
    console.log(`❌ Failed to scrape rk9.gg: ${err.message}`);
  }

  let officialEvents = [];
  try {
    officialEvents = await Promise.race([
      scrapeChampionships(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 10s')), 10000)),
    ]);
    console.log(`✅ Scraped ${officialEvents.length} events from championships.pokemon.com`);
  } catch (err) {
    console.log(`⚠️  Skipping championships.pokemon.com: ${err.message}`);
  }

  crossCompare(staticEvents, rk9Events, officialEvents);
}

main().catch(console.error);
