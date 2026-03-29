const SUPABASE_URL = "https://xtlvhdtmocshycbunoki.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_mY1y5Sju44l-M4prPHvajQ_n_UznjaD";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const STORAGE_KEY = "ruya_user";

function moneyLevel(score) {
  if (score >= 80) return "advanced";
  if (score >= 50) return "intermediate";
  return "beginner";
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function normalizeCourse(course) {
  return String(course || "").trim().toLowerCase();
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}

function setSession(user) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEY);
}

async function tryInsert(tableNames, payload) {
  const names = Array.isArray(tableNames) ? tableNames : [tableNames];
  let lastErr = null;
  for (const table of names) {
    const res = await sb.from(table).insert(payload).select().maybeSingle();
    if (!res.error) return res.data;
    lastErr = res.error;
  }
  throw lastErr || new Error("Insert failed");
}

async function tryUpdate(tableNames, match, changes) {
  const names = Array.isArray(tableNames) ? tableNames : [tableNames];
  let lastErr = null;
  for (const table of names) {
    let q = sb.from(table).update(changes);
    for (const [k,v] of Object.entries(match)) q = q.eq(k, v);
    const res = await q.select();
    if (!res.error) return res.data;
    lastErr = res.error;
  }
  throw lastErr || new Error("Update failed");
}

async function tryFetch(tableNames, opts={}) {
  const names = Array.isArray(tableNames) ? tableNames : [tableNames];
  let lastErr = null;
  for (const table of names) {
    let q = sb.from(table).select(opts.columns || "*");
    if (opts.orderBy) q = q.order(opts.orderBy, { ascending: opts.ascending ?? false });
    if (opts.limit) q = q.limit(opts.limit);
    if (opts.eq) for (const [k,v] of Object.entries(opts.eq)) q = q.eq(k, v);
    const res = await q;
    if (!res.error) return res.data || [];
    lastErr = res.error;
  }
  throw lastErr || new Error("Fetch failed");
}

function qs(id) { return document.getElementById(id); }
function show(el, on=true) { if (el) el.classList.toggle("hidden", !on); }
function formatDate(value) { if (!value) return "—"; try { return new Date(value).toLocaleString(); } catch { return String(value); } }
function courseLabel(course) {
  const map = {
    "data collection": "Data Collection with Kobo",
    "excel": "Excel for Data Analysis",
    "dashboard": "Dashboards & Visualization",
    "meal": "MEAL Systems",
    "leadership": "Leadership & Management",
    "ai": "AI Basics for Work",
  };
  const key = normalizeCourse(course);
  for (const [k,v] of Object.entries(map)) if (key.includes(k)) return v;
  return course || "General Course";
}
function nowIso() { return new Date().toISOString(); }

window.Ruya = {
  sb, getSession, setSession, clearSession, tryInsert, tryUpdate, tryFetch,
  moneyLevel, escapeHtml, normalizeCourse, qs, show, formatDate, courseLabel, nowIso
};
