/* The Narwhal agent roster — the single source of truth for "what each agent
   does", straight from the owner's spec. Used by /api/agents (directory) and
   the AI Office. Adding an agent = add a row here + a route under app/api/agents.

   Approval model: agents NEVER act on the outside world by themselves.
   - read-only agents (Insights, Planner) just summarize for the owner.
   - draft agents (Reviewer, Social) produce drafts that the owner must approve;
     actually posting also needs the relevant integration (Google/Yelp/IG),
     which is a later step. */

export type AgentSpec = {
  id: string;
  title: string;
  trigger: string; // cadence
  data: string; // what it reads
  action: string; // what it does
  risk: string; // safety posture
  endpoint: string;
  needsApproval: boolean; // draft -> owner approves -> (later) posts
  toast: boolean; // upgrades to real numbers once Toast is connected
};

export const AGENT_MANIFEST: AgentSpec[] = [
  {
    id: 'insights',
    title: 'Insights — ที่ปรึกษาประจำวัน',
    trigger: 'รายวัน (หลังต่อ Toast)',
    data: 'ยอดขาย / labor / เมนู',
    action: 'สรุป "วันนี้ควรทำอะไร" โชว์ในห้อง',
    risk: 'read-only · ปลอดภัย',
    endpoint: '/api/agents/insights',
    needsApproval: false,
    toast: true,
  },
  {
    id: 'reviews',
    title: 'Reviewer — เฝ้ารีวิว',
    trigger: 'รายวัน',
    data: 'รีวิว Google / Yelp ใหม่',
    action: 'ร่างคำตอบ → คุณอนุมัติ → โพสต์',
    risk: 'ร่างเท่านั้น · รออนุมัติ',
    endpoint: '/api/agents/reviews',
    needsApproval: true,
    toast: false,
  },
  {
    id: 'social',
    title: 'Social — คอนเทนต์เปิดตัว',
    trigger: 'รายสัปดาห์',
    data: 'เมนู / อีเวนต์',
    action: 'ร่างโพสต์ IG / FB → คุณอนุมัติ',
    risk: 'ร่างเท่านั้น · รออนุมัติ',
    endpoint: '/api/agents/social',
    needsApproval: true,
    toast: false,
  },
  {
    id: 'planner',
    title: 'Planner — แผนงานเจ้าของ',
    trigger: 'ทุกเช้า',
    data: 'เช็กลิสต์ / งานค้าง',
    action: 'สรุป + แจ้งเตือนเจ้าของ',
    risk: 'read-only · ปลอดภัย',
    endpoint: '/api/agents/planner',
    needsApproval: false,
    toast: false,
  },
];
