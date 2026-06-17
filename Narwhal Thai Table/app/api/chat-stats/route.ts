import { getStore } from '@netlify/blobs';
import { STATS_STORE, STATS_KEY, type LogEntry } from '@/lib/chatLog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* Owner-only stats. Locked behind STATS_TOKEN env var; access with
   /api/chat-stats?key=YOUR_TOKEN . Returns aggregated pilot analytics. */

export async function GET(req: Request) {
  const token = process.env.STATS_TOKEN;
  const key = new URL(req.url).searchParams.get('key') || '';
  if (!token || key !== token) {
    return new Response('Not found', { status: 404 });
  }

  let logs: LogEntry[] = [];
  try {
    const store = getStore({ name: STATS_STORE, consistency: 'strong' });
    const arr = await store.get(STATS_KEY, { type: 'json' });
    if (Array.isArray(arr)) logs = arr as LogEntry[];
  } catch {
    /* empty / not yet created */
  }

  const byDay: Record<string, number> = {};
  const dishCount: Record<string, number> = {};
  const flagged: { ts: string; question: string }[] = [];
  let reservationIntent = 0;
  let th = 0;

  for (const l of logs) {
    byDay[l.day] = (byDay[l.day] || 0) + 1;
    if (l.reservationIntent) reservationIntent += 1;
    if (l.lang === 'th') th += 1;
    for (const d of l.dishes || []) dishCount[d] = (dishCount[d] || 0) + 1;
    if (l.flag) flagged.push({ ts: l.ts, question: l.question });
  }

  const topRecommendedDishes = Object.entries(dishCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  return Response.json(
    {
      total: logs.length,
      languages: { th, en: logs.length - th },
      reservationIntent,
      byDay,
      topRecommendedDishes,
      flaggedCount: flagged.length,
      flagged: flagged.slice(-25),
      recent: logs.slice(-10),
    },
    { headers: { 'cache-control': 'no-store' } },
  );
}
