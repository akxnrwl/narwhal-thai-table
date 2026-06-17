import { verifyLogin } from '@/lib/tenants';
import { createSession, sessionCookie } from '@/lib/session';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* Owner sign-in. POST { password, tenantId? } -> sets a signed HttpOnly
   session cookie. No token ever travels in the URL. */
export async function POST(req: Request) {
  let body: { password?: string; tenantId?: string };
  try {
    body = (await req.json()) as { password?: string; tenantId?: string };
  } catch {
    return Response.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const tenant = await verifyLogin(body.password ?? '', body.tenantId);
  if (!tenant) return Response.json({ ok: false, error: 'invalid' }, { status: 401 });

  return new Response(JSON.stringify({ ok: true, tenant: { id: tenant.id, name: tenant.name } }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'set-cookie': sessionCookie(createSession(tenant.id)),
      'cache-control': 'no-store',
    },
  });
}
