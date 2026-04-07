import type { Metadata } from 'next';
import { EventsCalendar } from './events-calendar';
import { fetchCMSEvents, fetchLimitlessTournaments } from '@/lib/fetch-events';
import { SUPPLEMENTARY_EVENTS, type VGCEvent } from '@/lib/vgc-events';

// Revalidate once per day so the past/upcoming split stays accurate
// without needing a full redeploy.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'VGC Calendar - Champions Lab',
  description: 'Full Season 2025-2026 VGC event calendar. Browse upcoming Regionals, Internationals, Nationals, and Special Championships with registration links and CP points.',
  alternates: { canonical: 'https://championslab.xyz/events' },
};

export default async function EventsPage() {
  // Fetch official events and biggest upcoming community tournaments in parallel
  const [cmsEvents, communityTournaments] = await Promise.all([
    fetchCMSEvents(),
    fetchLimitlessTournaments(5),
  ]);

  // Convert Limitless tournaments into VGCEvent objects
  const communityEvents: VGCEvent[] = communityTournaments.map((t) => {
    const date = t.date ? t.date.slice(0, 10) : '';
    return {
      id: `limitless-${t.id}`,
      name: t.name,
      city: 'Online',
      country: '',
      startDate: date,
      endDate: date,
      tier: 'community',
      format: 'VGC 2026',
      region: 'ONLINE',
      registrationUrl: `https://play.limitlesstcg.com/tournament/${t.id}/details`,
      registrationNote: `${t.players.toLocaleString()} registered`,
      cpPoints: 0,
    };
  });

  // Merge all sources then sort by date
  const allEvents = [
    ...cmsEvents,
    ...SUPPLEMENTARY_EVENTS,
    ...communityEvents,
  ].sort((a, b) => a.startDate.localeCompare(b.startDate));

  // Compute today on the server so SSR and client share the same reference date.
  const todayISO = new Date().toISOString().slice(0, 10);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EventsCalendar events={allEvents} todayISO={todayISO} />
    </div>
  );
}
