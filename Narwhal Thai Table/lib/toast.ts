/* Shared Toast Standard API helper — used by /api/toast/office and AI agents.
   Returns today's aggregated sales / covers / labor, or { connected:false }
   when credentials are absent. Env vars: see virtual-ai-office/TOAST-SETUP.md
     TOAST_HOSTNAME (default ws-api.toasttab.com), TOAST_CLIENT_ID,
     TOAST_CLIENT_SECRET, TOAST_RESTAURANT_GUID */

const HOST = process.env.TOAST_HOSTNAME || 'ws-api.toasttab.com';

export function bizDate(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const da = String(d.getDate()).padStart(2, '0');
  return `${y}${m}${da}`;
}

async function getToken(): Promise<string> {
  const r = await fetch(`https://${HOST}/authentication/v1/authentication/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      clientId: process.env.TOAST_CLIENT_ID,
      clientSecret: process.env.TOAST_CLIENT_SECRET,
      userAccessType: 'TOAST_MACHINE_CLIENT',
    }),
  });
  if (!r.ok) throw new Error(`auth ${r.status}`);
  const j = await r.json();
  return j?.token?.accessToken ?? j?.accessToken;
}

async function toastGet(path: string, tok: string): Promise<unknown> {
  const r = await fetch(`https://${HOST}${path}`, {
    headers: {
      Authorization: `Bearer ${tok}`,
      'Toast-Restaurant-External-ID': process.env.TOAST_RESTAURANT_GUID ?? '',
    },
  });
  if (!r.ok) throw new Error(`toast ${r.status} ${path}`);
  return r.json();
}

export type ToastToday = {
  connected: boolean;
  ts?: number;
  businessDate?: string;
  today?: { sales: number; orders: number; covers: number; laborCost: number; laborHours: number; laborPct: number };
  byHour?: number[];
  recent?: { time: string; amount: number }[];
  error?: string;
};

export async function getToastToday(): Promise<ToastToday> {
  if (!process.env.TOAST_CLIENT_ID || !process.env.TOAST_RESTAURANT_GUID) return { connected: false };
  try {
    const tok = await getToken();
    const bd = bizDate();
    const orders = (await toastGet(`/orders/v2/ordersBulk?businessDate=${bd}&pageSize=100`, tok)) as any[];

    let sales = 0, covers = 0, count = 0;
    const recent: { time: string; amount: number }[] = [];
    const byHour: number[] = Array(24).fill(0);
    for (const o of Array.isArray(orders) ? orders : []) {
      count++;
      covers += o?.numberOfGuests ?? 0;
      const opened: string = o?.openedDate ?? o?.createdDate ?? '';
      let oAmt = 0;
      for (const c of o?.checks ?? []) oAmt += (c?.totalAmount ?? 0) - (c?.taxAmount ?? 0);
      sales += oAmt;
      if (opened) { const h = new Date(opened).getHours(); if (h >= 0 && h < 24) byHour[h] += oAmt; }
      recent.push({ time: opened, amount: Math.round(oAmt) });
    }
    recent.sort((a, b) => (a.time < b.time ? 1 : -1));

    let laborCost = 0, laborHours = 0;
    try {
      const te = (await toastGet(`/labor/v1/timeEntries?businessDate=${bd}`, tok)) as any[];
      for (const e of Array.isArray(te) ? te : []) {
        const hrs = (e?.regularHours ?? 0) + (e?.overtimeHours ?? 0);
        laborHours += hrs;
        if (e?.hourlyWage) laborCost += e.hourlyWage * hrs;
      }
    } catch { /* labor optional */ }

    const laborPct = sales > 0 ? laborCost / sales : 0;
    return {
      connected: true,
      ts: Date.now(),
      businessDate: bd,
      today: {
        sales: Math.round(sales),
        orders: count,
        covers,
        laborCost: Math.round(laborCost),
        laborHours: Math.round(laborHours * 10) / 10,
        laborPct,
      },
      byHour,
      recent: recent.slice(0, 12),
    };
  } catch (e) {
    return { connected: false, error: String((e as Error).message ?? e) };
  }
}
