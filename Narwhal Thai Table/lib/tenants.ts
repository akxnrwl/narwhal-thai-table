import { getStore } from '@netlify/blobs';
import { createHash, timingSafeEqual } from 'crypto';

/* Multi-tenant registry for the owner Control Room.
   Narwhal is tenant #1 — the SaaS runs here first. Its data stays in the
   original (un-namespaced) blob keys so all existing Aileen/booking history
   keeps showing up unchanged. New tenants (added later via onboarding) are
   namespaced by id inside the same stores. */

export type Tenant = { id: string; name: string; tokenHash: string };
export type DataLoc = { store: string; key: string };
export type TenantData = { chat: DataLoc; reservations: DataLoc; messages: DataLoc };

const REGISTRY_STORE = 'narwhal-os';
const REGISTRY_KEY = 'tenants';
const NARWHAL_ID = 'narwhal-hb';

export const sha256 = (s: string): string => createHash('sha256').update(s).digest('hex');

function safeEqualHex(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

// Built-in pilot tenant, derived from the existing STATS_TOKEN env var.
function defaultTenants(): Tenant[] {
  const token = process.env.STATS_TOKEN || '';
  return token ? [{ id: NARWHAL_ID, name: 'Narwhal Thai Table', tokenHash: sha256(token) }] : [];
}

// Tenants created by the (future) onboarding flow live in a blob store.
async function registryTenants(): Promise<Tenant[]> {
  try {
    const store = getStore({ name: REGISTRY_STORE, consistency: 'strong' });
    const arr = await store.get(REGISTRY_KEY, { type: 'json' });
    if (!Array.isArray(arr)) return [];
    const out: Tenant[] = [];
    for (const t of arr as unknown[]) {
      if (t && typeof t === 'object') {
        const o = t as Record<string, unknown>;
        if (typeof o.id === 'string' && typeof o.name === 'string' && typeof o.tokenHash === 'string') {
          out.push({ id: o.id, name: o.name, tokenHash: o.tokenHash });
        }
      }
    }
    return out;
  } catch {
    return [];
  }
}

export async function getTenants(): Promise<Tenant[]> {
  const byId = new Map<string, Tenant>();
  for (const t of defaultTenants()) byId.set(t.id, t);
  for (const t of await registryTenants()) byId.set(t.id, t); // registry overrides defaults
  return [...byId.values()];
}

export async function getTenant(id: string): Promise<Tenant | null> {
  return (await getTenants()).find((t) => t.id === id) ?? null;
}

/* Verify a login. If tenantId is given, only that tenant is checked; otherwise
   the password is matched against every tenant (lets an owner sign in with just
   a password). Returns the matched tenant, or null. */
export async function verifyLogin(password: string, tenantId?: string): Promise<Tenant | null> {
  const pw = (password || '').trim();
  if (!pw) return null;
  const hash = sha256(pw);
  const tenants = await getTenants();
  const pool = tenantId ? tenants.filter((t) => t.id === tenantId) : tenants;
  for (const t of pool) if (safeEqualHex(hash, t.tokenHash)) return t;
  return null;
}

export function dataFor(tenantId: string): TenantData {
  if (tenantId === NARWHAL_ID) {
    // Legacy un-namespaced keys (the existing pilot data).
    return {
      chat: { store: 'aileen-chat-logs', key: 'logs' },
      reservations: { store: 'aileen-reservations', key: 'list' },
      messages: { store: 'aileen-messages', key: 'list' },
    };
  }
  // New tenants are namespaced by id within the shared stores.
  return {
    chat: { store: 'aileen-chat-logs', key: `logs:${tenantId}` },
    reservations: { store: 'aileen-reservations', key: `list:${tenantId}` },
    messages: { store: 'aileen-messages', key: `list:${tenantId}` },
  };
}

export const TENANT_NARWHAL_ID = NARWHAL_ID;
