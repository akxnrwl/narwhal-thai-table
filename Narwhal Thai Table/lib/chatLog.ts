import { getStore } from '@netlify/blobs';
import { DISHES } from './dishes';

/* Phase-1 pilot analytics for Aileen. Each chat turn is appended to a single
   JSON array in Netlify Blobs (free tier). No extra AI cost — this runs AFTER
   Claude has already replied. Trimmed to the last MAX entries (auto-cleanup). */

export type LogEntry = {
  ts: string;
  day: string;
  lang: 'th' | 'en';
  question: string;
  reply: string;
  dishes: string[];
  reservationIntent: boolean;
  flag: boolean;
};

const STORE = 'aileen-chat-logs';
const KEY = 'logs';
const MAX = 1500;

const COMPLAINT = [
  'แย่', 'ไม่อร่อย', 'ไม่ดี', 'ช้ามาก', 'ผิดออเดอร์', 'ร้องเรียน', 'ผิดหวัง',
  'ไม่พอใจ', 'หยาบคาย', 'เย็นชืด', 'โกง', 'ห่วย', 'แย่มาก', 'ไม่สะอาด',
  'bad', 'terrible', 'awful', 'too slow', 'wrong order', 'rude', 'cold food',
  'refund', 'complain', 'disappoint', 'worst', 'horrible', 'overpriced', 'dirty',
];
const RESERVE = ['/contact/reservation', 'reservation', 'จอง', 'book a table', 'save a seat'];

const hasThai = (s: string) => /[฀-๿]/.test(s);

export async function logChat(userMsg: string, reply: string): Promise<void> {
  try {
    const r = reply.toLowerCase();
    const u = userMsg.toLowerCase();
    const now = new Date();
    const entry: LogEntry = {
      ts: now.toISOString(),
      day: now.toISOString().slice(0, 10),
      lang: hasThai(userMsg) ? 'th' : 'en',
      question: userMsg.slice(0, 300),
      reply: reply.slice(0, 400),
      dishes: DISHES.filter((d) => r.includes(d.name.toLowerCase())).map((d) => d.name),
      reservationIntent: RESERVE.some((h) => r.includes(h.toLowerCase())),
      flag: COMPLAINT.some((w) => u.includes(w.toLowerCase())),
    };
    const store = getStore({ name: STORE, consistency: 'strong' });
    const existing = await store.get(KEY, { type: 'json' });
    const arr: LogEntry[] = Array.isArray(existing) ? (existing as LogEntry[]) : [];
    arr.push(entry);
    const trimmed = arr.length > MAX ? arr.slice(arr.length - MAX) : arr;
    await store.setJSON(KEY, trimmed);
  } catch (e) {
    // Logging must NEVER break the chat.
    console.error('chat log failed', e);
  }
}

export const STATS_STORE = STORE;
export const STATS_KEY = KEY;
