import type { LogEntry } from './chatLog';

/* Shared aggregation for Aileen chat logs — used by the owner Control Room
   (/api/owner/data). Mirrors the original /api/chat-stats output shape. */

export type ChatStats = {
  total: number;
  languages: { th: number; en: number };
  reservationIntent: number;
  byDay: Record<string, number>;
  topRecommendedDishes: { name: string; count: number }[];
  flaggedCount: number;
  flagged: { ts: string; question: string }[];
  recent: LogEntry[];
};

export function aggregateChatLogs(logs: LogEntry[]): ChatStats {
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

  return {
    total: logs.length,
    languages: { th, en: logs.length - th },
    reservationIntent,
    byDay,
    topRecommendedDishes,
    flaggedCount: flagged.length,
    flagged: flagged.slice(-25),
    recent: logs.slice(-10),
  };
}
