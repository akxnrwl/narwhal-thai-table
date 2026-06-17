'use client';

import { useCallback, useEffect, useState } from 'react';

/* Owner profit & Owner-Draw calculator at /cal — gated by the SAME owner
   password as /stats (the nwh_owner session). When signed in we embed the
   calculator (served by /api/owner/cal) in a full-height iframe so its
   vanilla HTML/JS runs untouched. */

const NAVY = 'var(--navy, #0B1F33)';
const BRASS = 'var(--brass, #B08D3C)';
const BRASSL = 'var(--brass-light, #D4B36A)';
const OFF = 'var(--off-white, #F5F0E6)';
const LINE = 'rgba(200,162,78,0.20)';

const card: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid ' + LINE,
  borderRadius: 14,
  padding: '18px 20px',
};
const label: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'rgba(245,240,230,0.55)',
};

export default function CalPage() {
  const [pw, setPw] = useState('');
  const [authed, setAuthed] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [booted, setBooted] = useState(false);

  const check = useCallback(async (): Promise<boolean> => {
    const r = await fetch('/api/owner/me', { credentials: 'same-origin', cache: 'no-store' });
    if (r.ok) {
      setAuthed(true);
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await check();
      } catch {
        /* not logged in */
      } finally {
        setBooted(true);
      }
    })();
  }, [check]);

  async function login(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!pw.trim()) return;
    setLoading(true);
    setErr('');
    try {
      const r = await fetch('/api/owner/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ password: pw.trim() }),
      });
      if (!r.ok) {
        setErr('รหัสไม่ถูกต้อง');
      } else {
        setPw('');
        setAuthed(true);
      }
    } catch {
      setErr('เข้าสู่ระบบไม่ได้ ลองอีกครั้ง');
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch('/api/owner/logout', { method: 'POST', credentials: 'same-origin' });
    } catch {
      /* ignore */
    }
    setAuthed(false);
  }

  if (authed) {
    return (
      <section style={{ padding: '14px 16px 40px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 1180,
            margin: '0 auto 12px',
          }}
        >
          <span style={{ ...label, color: BRASSL }}>Owner · เครื่องคิดเลขกำไร &amp; Draw</span>
          <button
            onClick={logout}
            style={{
              padding: '7px 15px',
              borderRadius: 999,
              background: 'transparent',
              border: '1px solid ' + LINE,
              color: 'rgba(245,240,230,0.7)',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            ออกจากระบบ
          </button>
        </div>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <iframe
            src="/api/owner/cal"
            title="Narwhal Profit Calculator"
            style={{
              width: '100%',
              height: 'calc(100vh - 90px)',
              minHeight: 760,
              border: '1px solid ' + LINE,
              borderRadius: 14,
              background: NAVY,
            }}
          />
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '40px 22px 80px', minHeight: '70vh' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto' }}>
        <span style={{ ...label, color: BRASSL }}>Owner · เครื่องคิดเลขกำไร &amp; Draw</span>
        <h1
          style={{
            fontFamily: 'var(--font-display, serif)',
            color: OFF,
            fontSize: 30,
            margin: '6px 0 4px',
          }}
        >
          ห้องคำนวณของ <em style={{ color: BRASSL }}>เจ้าของร้าน</em>
        </h1>
        <p style={{ color: 'rgba(245,240,230,0.6)', fontSize: 14, marginBottom: 28 }}>
          ปรับยอดขาย ต้นทุน คน และ owner draw แล้วดูผลทันที — ล็อกด้วยรหัสเจ้าของเดียวกับหน้า /stats
        </p>

        {!booted ? (
          <div style={{ color: 'rgba(245,240,230,0.5)', fontSize: 14 }}>กำลังโหลด…</div>
        ) : (
          <form onSubmit={login} style={{ ...card, maxWidth: 380 }}>
            <div style={label}>รหัสผ่านเจ้าของร้าน</div>
            <input
              type="password"
              value={pw}
              onChange={(ev) => setPw(ev.target.value)}
              placeholder="ใส่รหัสผ่าน"
              autoComplete="current-password"
              style={{
                width: '100%',
                marginTop: 10,
                padding: '11px 14px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid ' + LINE,
                color: OFF,
                fontSize: 15,
                outline: 'none',
              }}
            />
            {err && <div style={{ color: '#e0907a', fontSize: 13, marginTop: 10 }}>{err}</div>}
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 14,
                width: '100%',
                padding: '11px 18px',
                borderRadius: 999,
                background: BRASS,
                color: NAVY,
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
