import { getStore } from '@netlify/blobs';
import { readCookie, readSession } from '@/lib/session';
import { dataFor, getTenant } from '@/lib/tenants';
import { aggregateChatLogs } from '@/lib/statsAggregate';
import type { LogEntry } from '@/lib/chatLog';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* Scoped owner data: chat stats + reservations + messages for the logged-in
   tenant only. Each tenant reads only its own blob keys (see dataFor). */

async function readArray<T>(storeName: string, key: string): Promise<T[]> {
  try {
    const store = getStore({ name: storeName, consistency: 'strong' });
    const arr = await store.get(key, { type: 'json' });
    return Array.isArray(arr) ? (arr as T[]) : [];
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const sess = readSession(readCookie(req));
  if (!sess) return Response.json({ ok: false }, { status: 401 });
  const tenant = await getTenant(sess.tenantId);
  if (!tenant) return Response.json({ ok: false }, { status: 401 });

  const loc = dataFor(tenant.id);
  const [logs, reservations, messages] = await Promise.all([
    readArray<LogEntry>(loc.chat.store, loc.chat.key),
    readArray<Record<string, unknown>>(loc.reservations.store, loc.reservations.key),
    readArray<Record<string, unknown>>(loc.messages.store, loc.messages.key),
  ]);

  return Response.json(
    {
      ok: true,
      tenant: { id: tenant.id, name: tenant.name },
      stats: aggregateChatLogs(logs),
      reservations: reservations.slice(-50).reverse(),
      messages: messages.slice(-50).reverse(),
    },
    { headers: { 'cache-control': 'no-store' } },
  );
}
