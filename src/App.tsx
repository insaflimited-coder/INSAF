import React from "react";
import * as XLSX from "xlsx";
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Check,
  Download,
  Filter,
  FileText,
  Menu,
  MessageSquareText,
  Moon,
  Phone,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Send,
  Sun,
  UserCheck,
  Users,
  FileUp,
  Zap,
  X,
  Bot,
} from "lucide-react";

// Types
type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  project: ProjectKey;
  status: "new" | "contacted" | "qualified" | "visit" | "negotiation" | "won" | "lost";
  source: "facebook" | "referral" | "website" | "walkin" | "broker";
  tags: string[];
  lastContact: string;
  notes: string;
  temperature: "hot" | "warm" | "cold";
  budget?: string;
  assignedTo: string;
  createdAt: string;
};

type Campaign = {
  id: string;
  name: string;
  project: ProjectKey;
  status: "draft" | "scheduled" | "sending" | "sent" | "paused";
  audience: number;
  sent: number;
  delivered: number;
  read: number;
  replied: number;
  template: string;
  scheduledAt?: string;
  createdAt: string;
  createdBy: string;
};

type Template = {
  id: string;
  name: string;
  category: "welcome" | "followup" | "offer" | "event" | "emi";
  body: string;
  variables: string[];
  project?: ProjectKey;
};

type ProjectKey = "Muktar Plaza";
type NavKey = "dashboard" | "leads" | "campaigns" | "templates" | "analytics" | "team";

const PROJECTS: ProjectKey[] = ["Muktar Plaza"];

// Seed Data
const LEADS: Lead[] = [
  {
    id: "LD-10293",
    name: "আশিকুর রহমান",
    phone: "+8801712345678",
    email: "ashik@example.com",
    project: "Muktar Plaza",
    status: "qualified",
    source: "facebook",
    tags: ["৩ বেড", "লোনে আগ্রহী"],
    lastContact: "2026-03-28T14:22:00+06:00",
    notes: "শুক্রবার ভিজিট করতে চান। স্ত্রী ও বাবা-মাকে সঙ্গে আনবেন।",
    temperature: "hot",
    budget: "৳ 1.2–1.5 কোটি",
    assignedTo: "সাব্বির",
    createdAt: "2026-03-24T10:15:00+06:00",
  },
  {
    id: "LD-10291",
    name: "তানিয়া হক",
    phone: "+8801811223344",
    project: "Muktar Plaza",
    status: "contacted",
    source: "website",
    tags: ["ইএমআই"],
    lastContact: "2026-03-27T11:05:00+06:00",
    notes: "ইএমআই ক্যালকুলেশন চেয়েছেন, ব্রোশিউর পাঠিয়েছি।",
    temperature: "warm",
    budget: "৳ 90 লাখ",
    assignedTo: "মাহিন",
    createdAt: "2026-03-23T09:40:00+06:00",
  },
  {
    id: "LD-10288",
    name: "সালমান খান",
    phone: "+8801919988776",
    project: "Muktar Plaza",
    status: "visit",
    source: "referral",
    tags: ["৪ বেড", "কর্নার প্লট"],
    lastContact: "2026-03-26T17:40:00+06:00",
    notes: "গতকাল সাইট ভিজিট হয়েছে, ফিডব্যাক পজিটিভ।",
    temperature: "hot",
    budget: "৳ 2 কোটি+",
    assignedTo: "রাকিব",
    createdAt: "2026-03-20T16:10:00+06:00",
  },
  {
    id: "LD-10282",
    name: "ফারহানা ইসলাম",
    phone: "+8801677889900",
    project: "Muktar Plaza",
    status: "new",
    source: "facebook",
    tags: ["২ বেড", "রেডি ফ্ল্যাট"],
    lastContact: "2026-03-29T09:12:00+06:00",
    notes: "প্রথম মেসেজ পাঠিয়েছি, রিপ্লাইয়ের অপেক্ষায়।",
    temperature: "cold",
    assignedTo: "সাব্বির",
    createdAt: "2026-03-29T09:10:00+06:00",
  },
  {
    id: "LD-10279",
    name: "জাহিদ হাসান",
    phone: "+8801555666777",
    project: "Muktar Plaza",
    status: "negotiation",
    source: "broker",
    tags: ["ডুপ্লেক্স"],
    lastContact: "2026-03-25T13:30:00+06:00",
    notes: "দাম নিয়ে আলোচনা চলছে, কিস্তি সুবিধা চেয়েছেন।",
    temperature: "warm",
    budget: "৳ 1.8 কোটি",
    assignedTo: "মাহিন",
    createdAt: "2026-03-18T12:00:00+06:00",
  },
  {
    id: "LD-10274",
    name: "নুসরাত জাহান",
    phone: "+8801333444555",
    project: "Muktar Plaza",
    status: "won",
    source: "walkin",
    tags: ["৩ বেড", "ফার্স্ট ফ্লোর"],
    lastContact: "2026-03-22T10:00:00+06:00",
    notes: "বুকিং নিশ্চিত, চুক্তি সই হয়েছে।",
    temperature: "hot",
    budget: "৳ 1.05 কোটি",
    assignedTo: "রাকিব",
    createdAt: "2026-03-10T10:20:00+06:00",
  },
  {
    id: "LD-10271",
    name: "মাহবুব আলম",
    phone: "+8801888123456",
    project: "Muktar Plaza",
    status: "lost",
    source: "facebook",
    tags: ["বাজেট কম"],
    lastContact: "2026-03-20T16:55:00+06:00",
    notes: "বাজেট মেলেনি, ভবিষ্যতে জানাবে।",
    temperature: "cold",
    assignedTo: "সাব্বির",
    createdAt: "2026-03-12T15:30:00+06:00",
  },
];

const TEMPLATES: Template[] = [
  {
    id: "tpl-welcome",
    name: "প্রথম স্বাগত বার্তা",
    category: "welcome",
    variables: ["name", "project", "agent"],
    body: `আসসালামু আলাইকুম {{name}},
ইনসাফ রিয়েল এস্টেট থেকে বলছি। আমাদের {{project}} প্রজেক্টে আপনার আগ্রহের জন্য ধন্যবাদ।
আপনার সুবিধামতো একটি সাইট ভিজিট শিডিউল করতে পারি। কোন দিন/সময় ভালো হবে?

শুভেচ্ছান্তে,
{{agent}} — ইনসাফ WA PRO`,
  },
  {
    id: "tpl-followup-emi",
    name: "ইএমআই/কিস্তি ফলোআপ",
    category: "emi",
    variables: ["name", "project", "emi", "tenure"],
    body: `হ্যালো {{name}},
{{project}}-এ ইএমআই সুবিধা নিয়ে বিস্তারিত পাঠালাম। প্রস্তাবিত কিস্তি: {{emi}}/মাস, মেয়াদ: {{tenure}}।
আপনার বাজেট ও পছন্দ অনুযায়ী ফ্লোর প্ল্যান শেয়ার করতে পারি।

আর কিছু জানতে চান?`,
  },
  {
    id: "tpl-offer",
    name: "সীমিত সময় অফার",
    category: "offer",
    variables: ["name", "project", "discount", "validTill"],
    body: `প্রিয় {{name}},
{{project}}-এ এই সপ্তাহে বিশেষ ছাড় {{discount}} চলছে, অফার {{validTill}} পর্যন্ত। 
বুকিং নিশ্চিত করতে চাইলে দ্রুত যোগাযোগ করুন।`,
  },
  {
    id: "tpl-event",
    name: "সাইট ভিজিট ইনভাইট",
    category: "event",
    variables: ["name", "project", "date", "time", "location"],
    body: `আসসালামু আলাইকুম {{name}},
{{date}}, {{time}}-এ {{project}}-এর সাইট ভিজিট থাকবে ({{location}})।
আপনার আসন কনফার্ম করবো?`,
  },
];

const CAMPAIGNS: Campaign[] = [
  {
    id: "CMP-3105",
    name: "Green Valley – হট লিড ফলোআপ",
    project: "Muktar Plaza",
    status: "sent",
    audience: 184,
    sent: 184,
    delivered: 182,
    read: 151,
    replied: 42,
    template: "tpl-followup-emi",
    createdAt: "2026-03-20T09:00:00+06:00",
    createdBy: "সাব্বির",
  },
  {
    id: "CMP-3112",
    name: "Purbachal Pride – নতুন অফার",
    project: "Muktar Plaza",
    status: "sending",
    audience: 320,
    sent: 178,
    delivered: 175,
    read: 98,
    replied: 18,
    template: "tpl-offer",
    createdAt: "2026-03-28T10:30:00+06:00",
    createdBy: "মাহিন",
  },
  {
    id: "CMP-3116",
    name: "Riverside – সাইট ভিজিট ইনভাইট",
    project: "Muktar Plaza",
    status: "scheduled",
    audience: 95,
    sent: 0,
    delivered: 0,
    read: 0,
    replied: 0,
    template: "tpl-event",
    scheduledAt: "2026-03-30T10:00:00+06:00",
    createdAt: "2026-03-27T15:20:00+06:00",
    createdBy: "রাকিব",
  },
  {
    id: "CMP-3098",
    name: "Lake View – স্বাগত বার্তা",
    project: "Muktar Plaza",
    status: "draft",
    audience: 240,
    sent: 0,
    delivered: 0,
    read: 0,
    replied: 0,
    template: "tpl-welcome",
    createdAt: "2026-03-18T09:10:00+06:00",
    createdBy: "সাব্বির",
  },
];

// Utilities
const fmtNumberBN = (n: number) => new Intl.NumberFormat("bn-BD").format(n);
const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("bn-BD", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

function classNames(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = React.useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });
  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState] as const;
}

// ----------------------------
// Import helpers (CSV/XLSX)
// ----------------------------
function normalizeHeaderKey(key: string) {
  return key.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");
}

function toIsoString(value: unknown): string {
  if (value === null || value === undefined || value === "") return new Date().toISOString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "number") {
    // Excel serial date (rough conversion; time portion is ignored).
    // https://docs.sheetjs.com/docs/api/utilities#ssf
    const parsed = XLSX.SSF.parse_date_code(value);
    const date = new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
    return date.toISOString();
  }
  return String(value).trim();
}

function parseTagsCell(value: unknown): string[] {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value.map(v => String(v).trim()).filter(Boolean);
  const s = String(value).trim();
  if (!s) return [];

  // Try JSON array first.
  if ((s.startsWith("[") && s.endsWith("]")) || (s.startsWith('"') && s.endsWith('"'))) {
    try {
      const parsed = JSON.parse(s) as unknown;
      if (Array.isArray(parsed)) return parsed.map(v => String(v).trim()).filter(Boolean);
    } catch {
      // fallthrough
    }
  }

  // Common separators.
  return s
    .split(/[,\u007c;]+/g)
    .map(t => t.trim())
    .filter(Boolean);
}

function csvSplitRow(row: string, delimiter: string) {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      const next = row[i + 1];
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (!inQuotes && ch === delimiter) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map(s => s.trim());
}

function parseDelimitedLeadsFromText(text: string, defaults: { project: ProjectKey; assignedTo: string }) {
  const lines = text
    .split(/\r?\n/g)
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length < 2) return { leads: [] as Lead[], warnings: ["Paste at least 2 rows (header + data)."] };

  const headerLine = lines[0];
  const delimiter = headerLine.includes("\t") ? "\t" : headerLine.includes(";") ? ";" : ","; // guess
  const headers = csvSplitRow(headerLine, delimiter).map(h => h.trim()).filter(Boolean);
  if (headers.length === 0) return { leads: [] as Lead[], warnings: ["Could not detect headers."] };

  const headerKeys = headers.map(h => normalizeHeaderKey(h));
  const warnings: string[] = [];
  const leads: Lead[] = [];

  for (let rowIdx = 1; rowIdx < lines.length; rowIdx++) {
    const row = lines[rowIdx];
    const cells = csvSplitRow(row, delimiter);
    const dict: Record<string, string> = {};
    for (let i = 0; i < headerKeys.length; i++) dict[headerKeys[i]] = cells[i] ?? "";

    const idRaw = dict["id"] || dict["leadid"] || dict["lead_id"] || dict["lead"] || "";
    const name = String(dict["name"] || dict["leadname"] || "Unknown Lead").trim();
    const phone = String(dict["phone"] || dict["phonenumber"] || dict["mobile"] || "").trim();
    const emailRaw = String(dict["email"] || "").trim();

    const statusRaw = String(dict["status"] || "").trim();
    const status = (() => {
      const s = statusRaw.toLowerCase();
      if (s === "new") return "new";
      if (s === "contacted") return "contacted";
      if (s === "qualified" || s === "interested") return "qualified";
      if (s === "visit") return "visit";
      if (s === "negotiation" || s === "negotiations") return "negotiation";
      if (s === "won" || s === "converted" || s === "booked") return "won";
      if (s === "lost") return "lost";
      return "new";
    })();

    const sourceRaw = String(dict["source"] || "").trim();
    const source = (() => {
      const s = sourceRaw.toLowerCase();
      if (s === "facebook") return "facebook";
      if (s === "referral") return "referral";
      if (s === "website" || s === "web") return "website";
      if (s === "walkin" || s === "walk-in" || s === "walk in") return "walkin";
      if (s === "broker") return "broker";
      if (s === "google") return "website";
      return "website";
    })();

    const projectRaw = String(dict["project"] || dict["projectname"] || dict["leadproject"] || "").trim();
    const project = (() => {
      if (projectRaw) {
        const match = PROJECTS.find(p => p.toLowerCase() === projectRaw.toLowerCase());
        if (match) return match;
      }
      return defaults.project;
    })();

    const tags = parseTagsCell(dict["tags"] || dict["tag"] || "");

    const lastContact = toIsoString(dict["lastcontact"] || dict["lastcontactat"] || dict["last_contact"] || "");
    const createdAt = toIsoString(dict["createdat"] || dict["created_at"] || "");

    const temperatureRaw = String(dict["temperature"] || dict["temp"] || "").trim().toLowerCase();
    const temperature = temperatureRaw === "hot" || temperatureRaw === "warm" || temperatureRaw === "cold"
      ? (temperatureRaw as Lead["temperature"])
      : temperatureRaw === "h"
        ? "hot"
        : temperatureRaw === "w"
          ? "warm"
          : "cold";

    const notes = String(dict["notes"] || dict["note"] || "").trim();
    const budget = String(dict["budget"] || "").trim();
    const assignedToRaw = String(dict["assignedto"] || dict["assigned_to"] || dict["assignee"] || "").trim();

    const created = createdAt || lastContact;
    const last = lastContact || created;

    const id =
      idRaw ||
      (phone ? `LD-${phone.replace(/\\D/g, "").slice(-8)}` : `LD-${Date.now()}-${rowIdx}`);

    leads.push({
      id,
      name,
      phone,
      email: emailRaw ? emailRaw : undefined,
      project,
      status,
      source,
      tags,
      lastContact: last,
      notes,
      temperature,
      budget: budget ? budget : undefined,
      assignedTo: assignedToRaw || defaults.assignedTo,
      createdAt: created,
    });

    if (!phone) warnings.push(`Row ${rowIdx + 1}: missing phone.`);
    if (!name) warnings.push(`Row ${rowIdx + 1}: missing name.`);
  }

  return { leads, warnings };
}

async function parseLeadsFromFile(file: File, defaults: { project: ProjectKey; assignedTo: string }) {
  const lower = file.name.toLowerCase();

  if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

    const warnings: string[] = [];
    const leads: Lead[] = [];

    rows.forEach((row, idx) => {
      const normalized: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(row)) normalized[normalizeHeaderKey(k)] = v;

      const idRaw = String(normalized["id"] ?? normalized["leadid"] ?? normalized["lead"] ?? "").trim();
      const name = String(normalized["name"] ?? normalized["leadname"] ?? "Unknown Lead").trim();
      const phone = String(normalized["phone"] ?? normalized["phonenumber"] ?? normalized["mobile"] ?? "").trim();
      const emailRaw = String(normalized["email"] ?? "").trim();

      const statusRaw = String(normalized["status"] ?? "").trim();
      const status = (() => {
        const s = statusRaw.toLowerCase();
        if (s === "new") return "new";
        if (s === "contacted") return "contacted";
        if (s === "qualified" || s === "interested") return "qualified";
        if (s === "visit") return "visit";
        if (s === "negotiation" || s === "negotiations") return "negotiation";
        if (s === "won" || s === "converted" || s === "booked") return "won";
        if (s === "lost") return "lost";
        return "new";
      })();

      const sourceRaw = String(normalized["source"] ?? "").trim();
      const source = (() => {
        const s = sourceRaw.toLowerCase();
        if (s === "facebook") return "facebook";
        if (s === "referral") return "referral";
        if (s === "website" || s === "web") return "website";
        if (s === "walkin" || s === "walk-in" || s === "walk in") return "walkin";
        if (s === "broker") return "broker";
        if (s === "google") return "website";
        return "website";
      })();

      const projectRaw = String(normalized["project"] ?? normalized["projectname"] ?? normalized["leadproject"] ?? "").trim();
      const project = (() => {
        if (projectRaw) {
          const match = PROJECTS.find(p => p.toLowerCase() === projectRaw.toLowerCase());
          if (match) return match;
        }
        return defaults.project;
      })();

      const tags = parseTagsCell(normalized["tags"] ?? normalized["tag"] ?? "");
      const lastContact = toIsoString(normalized["lastcontact"] ?? normalized["last_contact"] ?? "");
      const createdAt = toIsoString(normalized["createdat"] ?? normalized["created_at"] ?? "");

      const temperatureRaw = String(normalized["temperature"] ?? normalized["temp"] ?? "").trim().toLowerCase();
      const temperature: Lead["temperature"] =
        temperatureRaw === "hot" || temperatureRaw === "warm" || temperatureRaw === "cold"
          ? (temperatureRaw as Lead["temperature"])
          : temperatureRaw === "h"
            ? "hot"
            : temperatureRaw === "w"
              ? "warm"
              : "cold";

      const notes = String(normalized["notes"] ?? normalized["note"] ?? "").trim();
      const budget = String(normalized["budget"] ?? "").trim();
      const assignedToRaw = String(normalized["assignedto"] ?? normalized["assigned_to"] ?? normalized["assignee"] ?? "").trim();

      const created = createdAt || lastContact;
      const last = lastContact || created;

      const id = idRaw || (phone ? `LD-${phone.replace(/\\D/g, "").slice(-8)}` : `LD-${Date.now()}-${idx}`);

      if (!phone) warnings.push(`Row ${idx + 1}: missing phone.`);

      leads.push({
        id,
        name,
        phone,
        email: emailRaw ? emailRaw : undefined,
        project,
        status,
        source,
        tags,
        lastContact: last,
        notes,
        temperature,
        budget: budget ? budget : undefined,
        assignedTo: assignedToRaw || defaults.assignedTo,
        createdAt: created,
      });
    });

    return { leads, warnings };
  }

  // Fallback: treat as CSV/TSV text.
  const text = await file.text();
  return parseDelimitedLeadsFromText(text, defaults);
}

// ----------------------------
// Smart Bulk (Phone filter) helpers
// ----------------------------
function normalizePhoneCandidate(phone: string) {
  // Keep leading '+' if present; remove other non-digit characters.
  const trimmed = String(phone ?? "").trim();
  if (!trimmed) return "";
  const hasPlus = trimmed.startsWith("+");
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (!digitsOnly) return "";
  return hasPlus ? `+${digitsOnly}` : digitsOnly;
}

function extractPhoneCandidatesFromText(text: string) {
  // Match long digit sequences with optional '+' prefix.
  const raw = text.match(/(\+?\d[\d\s-]{6,}\d)/g) ?? [];
  const normalized = raw
    .map(s => normalizePhoneCandidate(s))
    .filter(s => s.length >= 10);
  return Array.from(new Set(normalized));
}

function simulateWhatsAppAccountActivity(phoneNormalized: string) {
  const digits = phoneNormalized.replace(/\D/g, "");
  const sum = Array.from(digits).reduce((a, ch) => a + Number(ch), 0);
  // Deterministic pseudo "scan" so repeated scans look stable.
  const active = sum % 3 !== 0;
  return {
    active,
    reason: active ? "Active WhatsApp" : "Inactive / unreachable",
  };
}

// Icons (lucide-react)
const Icon = {
  menu: <Menu className="h-5 w-5" />,
  close: <X className="h-5 w-5" />,
  search: <Search className="h-5 w-5" />,
  filter: <Filter className="h-5 w-5" />,
  plus: <Plus className="h-5 w-5" />,
  check: <Check className="h-4 w-4" />,
  zap: <Zap className="h-4 w-4" />,
  phone: <Phone className="h-4 w-4" />,
  message: <MessageSquareText className="h-4 w-4" />,
  calendar: <Calendar className="h-4 w-4" />,
  chart: <BarChart3 className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
  file: <FileText className="h-4 w-4" />,
  chevron: <ChevronRight className="h-4 w-4" />,
  sun: <Sun className="h-5 w-5" />,
  moon: <Moon className="h-5 w-5" />,
  download: <Download className="h-4 w-4" />,
  refresh: <RotateCcw className="h-4 w-4" />,
};

// Badge component
const Badge: React.FC<{ color: "green" | "blue" | "orange" | "slate" | "red" | "emerald" | "amber"; children: React.ReactNode; dot?: boolean }> = ({ color, children, dot }) => {
  const map = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    orange: "bg-orange-50 text-orange-700 ring-orange-200",
    slate: "bg-slate-100 text-slate-700 ring-slate-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
  } as const;
  return (
    <span className={classNames("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1", map[color])}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
};

// Status pill
const StatusPill: React.FC<{ status: Lead["status"] }> = ({ status }) => {
  const map: Record<
    Lead["status"],
    { label: string; color: "slate" | "blue" | "emerald" | "amber" | "orange" | "green" | "red" }
  > = {
    new: { label: "নতুন", color: "slate" },
    contacted: { label: "যোগাযোগ হয়েছে", color: "blue" },
    qualified: { label: "যোগ্য লিড", color: "emerald" },
    visit: { label: "ভিজিট", color: "amber" },
    negotiation: { label: "দর কষাকষি", color: "orange" },
    won: { label: "বুকড", color: "green" },
    lost: { label: "হারানো", color: "red" },
  };
  const c = map[status];
  return <Badge color={c.color}>{c.label}</Badge>;
};

// Main App
export default function App() {
  const [nav, setNav] = useLocalStorage<NavKey>("insaf_nav", "dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [dark, setDark] = useLocalStorage<boolean>("insaf_dark", false);
  const [query, setQuery] = React.useState("");
  const [projectFilter, setProjectFilter] = useLocalStorage<ProjectKey | "all">("insaf_project", "all");
  const [leads, setLeads] = useLocalStorage<Lead[]>("insaf_leads", LEADS);
  const [campaigns, setCampaigns] = useLocalStorage<Campaign[]>("insaf_campaigns", CAMPAIGNS);
  const [selectedLeads, setSelectedLeads] = React.useState<Set<string>>(new Set());
  const [showComposer, setShowComposer] = React.useState(false);
  const [composerTemplate, setComposerTemplate] = React.useState<Template>(TEMPLATES[0]);
  const [composerProject, setComposerProject] = React.useState<ProjectKey>("Muktar Plaza");
  const [composerVars, setComposerVars] = React.useState<Record<string, string>>({
    name: "{{প্রতিটি লিডের নাম}}",
    project: "Muktar Plaza",
    agent: "সাব্বির",
    emi: "৳ ৭৫,০০০",
    tenure: "১২০ মাস",
    discount: "৫%",
    validTill: "৭ এপ্রিল",
    date: "৪ এপ্রিল, শুক্রবার",
    time: "বিকাল ৪টা",
    location: "প্রজেক্ট সাইট",
  });
  const [toast, setToast] = React.useState<string | null>(null);
  const [activeLead, setActiveLead] = React.useState<Lead | null>(null);
  const [connectOpen, setConnectOpen] = React.useState(false);
  const [importOpen, setImportOpen] = React.useState(false);
  const [importProjectDefault, setImportProjectDefault] = React.useState<ProjectKey>("Muktar Plaza");
  const [pasteLeadsText, setPasteLeadsText] = React.useState("");
  const [importError, setImportError] = React.useState<string | null>(null);
  const [importLoading, setImportLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // derived stats
  const totalLeads = leads.length;
  const messagesSent = campaigns.reduce((a, c) => a + c.sent, 0);
  const activeCampaigns = campaigns.filter(c => c.status === "sending" || c.status === "scheduled").length;
  const replyRate = (() => {
    const sent = campaigns.reduce((a, c) => a + c.sent, 0);
    const replied = campaigns.reduce((a, c) => a + c.replied, 0);
    return sent ? Math.round((replied / sent) * 100) : 0;
  })();

  // Mock live feed (replace with real webhook ingestion later)
  const incomingMessages = React.useMemo(
    () => [
      {
        id: "msg-1",
        ts: "Just now",
        fromName: "Farhan",
        fromPhone: "+8801•••••678",
        message: "Bro Muktar Plaza te কি 3 বেড ফ্ল্যাট আছে?",
        interest: "flat" as const,
      },
      {
        id: "msg-2",
        ts: "2 min ago",
        fromName: "Sadia",
        fromPhone: "+8801•••••334",
        message: "দোকানের স্পেস পাওয়া যাবে? কত বর্গফুট?",
        interest: "shop" as const,
      },
      {
        id: "msg-3",
        ts: "7 min ago",
        fromName: "Rafi",
        fromPhone: "+8801•••••556",
        message: "Price details please",
        interest: "unknown" as const,
      },
    ],
    []
  );

  // ----------------------------
  // Smart Bulk Messaging & Filter
  // ----------------------------
  type ScanRow = { phone: string; active: boolean; reason: string };
  type MediaItem = { file: File; url: string };

  const [scanRows, setScanRows] = React.useState<ScanRow[]>([]);
  const [scanView, setScanView] = React.useState<"all" | "active" | "inactive">("active");
  const [scanLoading, setScanLoading] = React.useState(false);
  const [scanFileName, setScanFileName] = React.useState<string | null>(null);

  const activePhones = React.useMemo(
    () => scanRows.filter(r => r.active).map(r => r.phone),
    [scanRows]
  );

  const [campaignMessage, setCampaignMessage] = React.useState<string>(
    `আসসালামু আলাইকুম {{name}} 👋\n\nMuktar Plaza (Rayerbag, Jatrabari) এ Flat/Shop নিয়ে আপনার আগ্রহ পেয়েছি।\nআপনি কোন সাইজ পছন্দ করেন (2/3 bed বা shop size) এবং আপনার বাজেট কত?\n\nআমি আপনার জন্য সেরা অপশন সাজেস্ট করবো।`
  );

  const [imageMedia, setImageMedia] = React.useState<MediaItem[]>([]);
  const [videoMedia, setVideoMedia] = React.useState<MediaItem[]>([]);

  const [campaignRunning, setCampaignRunning] = React.useState(false);
  const [campaignProgress, setCampaignProgress] = React.useState({ sent: 0, total: 0, delivered: 0 });
  const [deliveredTotal, setDeliveredTotal] = React.useState(0);
  const campaignTimerRef = React.useRef<number | null>(null);

  const clearCampaignTimer = () => {
    if (campaignTimerRef.current) {
      window.clearInterval(campaignTimerRef.current);
      campaignTimerRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => {
      clearCampaignTimer();
      for (const m of imageMedia) URL.revokeObjectURL(m.url);
      for (const m of videoMedia) URL.revokeObjectURL(m.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScanFile = async (file: File) => {
    if (campaignRunning) {
      clearCampaignTimer();
      setCampaignRunning(false);
    }

    setScanLoading(true);
    setScanFileName(file.name);
    setScanRows([]);
    setDeliveredTotal(0);
    setCampaignProgress({ sent: 0, total: 0, delivered: 0 });

    try {
      const lower = file.name.toLowerCase();
      let candidates: string[] = [];

      if (lower.endsWith(".xlsx") || lower.endsWith(".xls")) {
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "" });

        const text = rows
          .map(r => Object.values(r).map(v => String(v)).join(" "))
          .join("\n");
        candidates = extractPhoneCandidatesFromText(text);
      } else {
        const text = await file.text();
        candidates = extractPhoneCandidatesFromText(text);
      }

      await new Promise(res => setTimeout(res, 700)); // simulate scanning latency

      const scanned: ScanRow[] = candidates.map(phone => {
        const sim = simulateWhatsAppAccountActivity(phone);
        return { phone, active: sim.active, reason: sim.reason };
      });

      setScanRows(scanned);
      setToast(`Scan complete ✅ — ${fmtNumberBN(candidates.length)} numbers processed`);
    } catch {
      setToast("Scan failed — please upload a valid CSV/XLSX file.");
    } finally {
      setScanLoading(false);
    }
  };

  const removeImage = (url: string) => {
    setImageMedia(prev => {
      const found = prev.find(p => p.url === url);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter(p => p.url !== url);
    });
  };

  const removeVideo = (url: string) => {
    setVideoMedia(prev => {
      const found = prev.find(p => p.url === url);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter(p => p.url !== url);
    });
  };

  const startSmartCampaign = () => {
    if (campaignRunning) return;

    const total = activePhones.length;
    if (total === 0) {
      setToast("Please scan and find active WhatsApp numbers first.");
      return;
    }

    clearCampaignTimer();
    setDeliveredTotal(0);
    setCampaignProgress({ sent: 0, total, delivered: 0 });
    setCampaignRunning(true);

    let sent = 0;
    const deliveredRate = 0.93; // mock delivery rate

    campaignTimerRef.current = window.setInterval(() => {
      sent += 1;
      const delivered = Math.floor(sent * deliveredRate);
      setCampaignProgress({ sent, total, delivered });

      if (sent >= total) {
        clearCampaignTimer();
        setCampaignRunning(false);
        setDeliveredTotal(delivered);
        setToast(`Campaign completed ✅ — Delivered: ${fmtNumberBN(delivered)}/${fmtNumberBN(total)}`);
      }
    }, 260);
  };

  // filters
  const filteredLeads = React.useMemo(() => {
    return leads.filter(l => {
      const matchesProject = projectFilter === "all" ? true : l.project === projectFilter;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q
        ? true
        : l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.id.toLowerCase().includes(q) ||
          l.tags.some(t => t.toLowerCase().includes(q));
      return matchesProject && matchesQuery;
    });
  }, [leads, projectFilter, query]);

  // template preview
  const previewText = React.useMemo(() => {
    let t = composerTemplate.body;
    for (const k of composerTemplate.variables) {
      const v = composerVars[k] ?? `{{${k}}}`;
      t = t.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, "g"), v);
    }
    return t;
  }, [composerTemplate, composerVars]);

  // toasts
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(id);
  }, [toast]);

  // keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowComposer(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const mergeImportedLeads = (incoming: Lead[]) => {
    if (incoming.length === 0) return;
    setLeads(prev => {
      const byId = new Map(prev.map(l => [l.id, l] as const));
      for (const lead of incoming) byId.set(lead.id, lead);
      return Array.from(byId.values());
    });
  };

  const handleImportFromFile = async (file: File) => {
    setImportLoading(true);
    setImportError(null);
    try {
      const { leads: imported, warnings } = await parseLeadsFromFile(file, {
        project: importProjectDefault,
        assignedTo: "অপারেশন টিম",
      });

      if (imported.length === 0) {
        setImportError("No valid leads found in the file. Make sure headers are present.");
        return;
      }

      mergeImportedLeads(imported);
      setSelectedLeads(new Set());
      setToast(`ইমপোর্ট সম্পন্ন ✅ — ${fmtNumberBN(imported.length)} টি লিড`);
      setPasteLeadsText("");
      if (warnings.length) {
        // Keep the import panel open so the user can see the warning.
        setImportError(`নোট: ${warnings[0]}`);
      } else {
        setImportOpen(false);
      }
    } catch {
      setImportError("Failed to import file. Please verify the format and try again.");
    } finally {
      setImportLoading(false);
    }
  };

  const handleImportFromPaste = async () => {
    setImportLoading(true);
    setImportError(null);
    try {
      const { leads: imported, warnings } = parseDelimitedLeadsFromText(pasteLeadsText, {
        project: importProjectDefault,
        assignedTo: "অপারেশন টিম",
      });

      if (imported.length === 0) {
        setImportError("Paste data is empty or invalid. Please include header + at least one row.");
        return;
      }

      mergeImportedLeads(imported);
      setSelectedLeads(new Set());
      setToast(`ইমপোর্ট সম্পন্ন ✅ — ${fmtNumberBN(imported.length)} টি লিড`);
      setPasteLeadsText("");
      if (warnings.length) setImportError(`নোট: ${warnings[0]}`);
      else setImportOpen(false);
    } catch {
      setImportError("Failed to import pasted data. Please check delimiter and headers.");
    } finally {
      setImportLoading(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedLeads(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const sendBulk = () => {
    const count = selectedLeads.size || filteredLeads.filter(l => projectFilter === "all" || l.project === composerProject).length;
    if (count === 0) {
      setToast("প্রথমে কিছু লিড সিলেক্ট করুন!");
      return;
    }
    // simulate campaign
    const newCamp: Campaign = {
      id: `CMP-${Math.floor(3000 + Math.random() * 1000)}`,
      name: `${composerProject} – কাস্টম বাল্ক মেসেজ`,
      project: composerProject,
      status: "sending",
      audience: count,
      sent: 0,
      delivered: 0,
      read: 0,
      replied: 0,
      template: composerTemplate.id,
      createdAt: new Date().toISOString(),
      createdBy: "আপনি",
    };
    setCampaigns(c => [newCamp, ...c]);
    setShowComposer(false);
    setToast(`বাল্ক মেসেজ শুরু হয়েছে — ${fmtNumberBN(count)} জন প্রাপক`);

    // simulate progress
    let sent = 0;
    const total = count;
    const tick = () => {
      sent += Math.min(Math.ceil(total * 0.08), total - sent);
      setCampaigns(cs =>
        cs.map(cm =>
          cm.id === newCamp.id
            ? {
                ...cm,
                sent,
                delivered: Math.round(sent * 0.98),
                read: Math.round(sent * 0.76),
                replied: Math.round(sent * 0.18),
                status: sent >= total ? "sent" : "sending",
              }
            : cm
        )
      );
      if (sent < total) setTimeout(tick, 420);
      else setToast("ক্যাম্পেইন সম্পন্ন ✅");
    };
    setTimeout(tick, 600);
    setSelectedLeads(new Set());
  };

  return (
    <div className={classNames("min-h-screen font-[Inter] antialiased selection:bg-blue-600/20 selection:text-blue-900", dark ? "dark bg-[#0b1220]" : "bg-slate-50")}>
      <style>{`
        :root { --radius: 14px; }
        .font-display { font-family: 'Plus Jakarta Sans', Inter, system-ui, sans-serif; }
        .card { border-radius: var(--radius); }
        .shadow-soft { box-shadow: 0 10px 30px -12px rgba(2,6,23,0.2), 0 1px 2px rgba(2,6,23,0.06); }
        .shadow-hover { transition: box-shadow .25s ease, transform .25s ease; }
        .shadow-hover:hover { box-shadow: 0 16px 40px -10px rgba(2,6,23,0.25), 0 2px 4px rgba(2,6,23,0.08); transform: translateY(-1px); }
        .ring-focus:focus { outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.35); }
        .scroll-thin::-webkit-scrollbar { height: 8px; width: 8px; }
        .scroll-thin::-webkit-scrollbar-thumb { background: rgba(100,116,139,.35); border-radius: 8px; }
        .scroll-thin::-webkit-scrollbar-thumb:hover { background: rgba(100,116,139,.55); }
        .bg-grid { background-image: linear-gradient(rgba(2,6,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(2,6,23,0.04) 1px, transparent 1px); background-size: 18px 18px; }
        .dark .bg-grid { background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px); }
        .progress-striped { background-image: linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%, rgba(255,255,255,.15) 75%, transparent 75%, transparent); background-size: 24px 24px; }
      `}</style>

      {/* App Shell */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className={classNames(
          "fixed z-40 inset-y-0 left-0 w-[280px] transform bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 shadow-soft",
          "transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center gap-3 px-6 h-[72px] border-b border-slate-200 dark:border-slate-800">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 grid place-items-center text-white shadow-soft">
              <span className="font-display font-extrabold">IW</span>
            </div>
            <div>
              <p className="font-display font-extrabold tracking-tight text-[18px] text-slate-900 dark:text-white leading-5">INSAF WA PRO</p>
              <p className="text-[11px] uppercase tracking-widest text-slate-500">Marketing Control</p>
            </div>
          </div>

          <nav className="p-3">
            {[
              { k: "dashboard", label: "Dashboard Overview", icon: Icon.chart },
              { k: "analytics", label: "WhatsApp API Status", icon: Icon.zap },
              { k: "templates", label: "Auto-Replies (Chatbot)", icon: Icon.message },
              { k: "leads", label: "Lead Management", icon: Icon.users },
              { k: "campaigns", label: "Bulk Messaging Cloud", icon: Icon.file },
            ].map(item => (
              <button
                key={item.k}
                onClick={() => { setNav(item.k as NavKey); setSidebarOpen(false); }}
                className={classNames(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm transition",
                  nav === item.k ? "bg-blue-600 text-white shadow-soft" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <span className={classNames("p-2 rounded-lg", nav === item.k ? "bg-white/15" : "bg-slate-100 dark:bg-slate-800")}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                <span className="ml-auto opacity-60">{Icon.chevron}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-800">
            <div className="card bg-slate-50 dark:bg-slate-900 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">WhatsApp API</p>
                <Badge color="green" dot>Online ✅</Badge>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-slate-500">Rate limit</span>
                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] bg-gradient-to-r from-blue-500 to-indigo-500" />
                </div>
                <span className="font-medium text-slate-700 dark:text-slate-200">68%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-30 bg-white/80 dark:bg-[#0b1220]/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 h-[72px] flex items-center gap-3">
              <button onClick={() => setSidebarOpen(v => !v)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                {sidebarOpen ? Icon.close : Icon.menu}
              </button>

              <div className="hidden lg:flex items-center gap-2 text-slate-500">
                <span className="text-sm font-medium">কন্ট্রোল সেন্টার</span>
                <span>·</span>
                <span className="text-sm">
                  {{
                    dashboard: "Dashboard Overview",
                    leads: "Lead Management",
                    campaigns: "Bulk Messaging Cloud",
                    templates: "Auto-Replies (Chatbot)",
                    analytics: "WhatsApp API Status",
                    team: "Team",
                  }[nav]}
                </span>
              </div>

              <div className="flex-1" />

              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="সার্চ করুন (নাম, ফোন, ID)…"
                  className="w-[300px] xl:w-[380px] h-10 pl-10 pr-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{Icon.search}</div>
                <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200">⌘K</kbd>
              </div>

              {/* Project filter */}
              <div className="hidden md:flex items-center gap-2">
                <div className="text-slate-500">{Icon.filter}</div>
                <select
                  value={projectFilter}
                  onChange={e => setProjectFilter(e.target.value as ProjectKey | "all")}
                  className="h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 text-sm ring-focus"
                >
                  <option value="all">সব প্রজেক্ট</option>
                  {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <button onClick={() => setDark(d => !d)} className="h-10 w-10 grid place-items-center rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800">
                {dark ? Icon.sun : Icon.moon}
              </button>

              <div className="h-10 flex items-center gap-3 rounded-xl px-3 border border-slate-200 dark:border-slate-700">
                <img className="h-7 w-7 rounded-full object-cover" src="https://i.pravatar.cc/100?img=12" alt="user" />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-4">অপারেশনস ম্যানেজার</p>
                  <p className="text-[11px] text-slate-500">insaf.pro@demo</p>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 bg-grid">
            <div className="max-w-[1400px] mx-auto p-4 lg:p-8">
              {/* Page header */}
              <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <h1 className="font-display text-[28px] lg:text-[34px] font-extrabold tracking-tight text-slate-900 dark:text-white">WhatsApp Marketing SaaS Dashboard</h1>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">
                    Insaf Building Design & Consultant Ltd. • Focus: <span className="font-semibold text-slate-900 dark:text-white">Muktar Plaza</span> (Rayerbag, Jatrabari)
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConnectOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 h-11 rounded-xl font-semibold shadow-soft ring-focus"
                  >
                    {Icon.phone} Connect WhatsApp Business
                  </button>
                  <button
                    type="button"
                    onClick={() => setToast("প্রজেক্ট ডিটেইলস: Muktar Plaza (Rayerbag, Jatrabari)") }
                    className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white px-5 h-11 rounded-xl font-semibold shadow-soft ring-focus"
                  >
                    {Icon.file} View Project Details (Muktar Plaza)
                  </button>
                </div>
              </div>

              {/* Stats */}
              {nav === "dashboard" && (
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "মোট লিড (Leads)", value: fmtNumberBN(totalLeads), sub: "+১২ এই সপ্তাহে", color: "border-l-blue-500", icon: Icon.users },
                    { label: "মেসেজ পাঠানো হয়েছে", value: fmtNumberBN(messagesSent), sub: "গত ৩০ দিনে", color: "border-l-emerald-500", icon: Icon.message },
                    { label: "সক্রিয় ক্যাম্পেইন", value: fmtNumberBN(activeCampaigns), sub: "লাইভ/সিডিউল", color: "border-l-amber-500", icon: Icon.zap },
                    { label: "রিপ্লাই রেট", value: `${fmtNumberBN(replyRate)}%`, sub: "গড় রেসপন্স", color: "border-l-indigo-500", icon: Icon.chart },
                  ].map(card => (
                    <div key={card.label} className={classNames("card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft shadow-hover border-l-4", card.color)}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.label}</p>
                          <p className="mt-2 font-display text-[40px] leading-none font-extrabold tracking-tight text-slate-900 dark:text-white">{card.value}</p>
                          <p className="mt-2 text-xs text-slate-500">{card.sub}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-200">
                          {card.icon}
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[70%] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 progress-striped animate-[slide_1.5s_linear_infinite]" />
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {/* Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto scroll-thin">
                {[
                  { k: "dashboard", label: "Overview" },
                  { k: "analytics", label: "API Status" },
                  { k: "templates", label: "Auto-Replies" },
                  { k: "leads", label: "Leads" },
                  { k: "campaigns", label: "Bulk Cloud" },
                ].map(t => (
                  <button
                    key={t.k}
                    onClick={() => setNav(t.k as NavKey)}
                    className={classNames(
                      "px-4 h-10 text-sm rounded-t-xl border-b-2 transition",
                      nav === t.k ? "border-blue-600 text-slate-900 dark:text-white font-semibold" : "border-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* DASHBOARD */}
              {nav === "dashboard" && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* System Status + Incoming Messages */}
                  <div className="xl:col-span-3 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <div className="flex flex-col lg:flex-row gap-5">
                      <div className="lg:w-[360px] w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                          <h3 className="font-semibold text-slate-900 dark:text-white">System Status</h3>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3">
                            <span className="h-8 w-8 rounded-lg bg-emerald-50 ring-1 ring-emerald-100 grid place-items-center">
                              <span className="h-3 w-3 rounded-full bg-emerald-600" />
                            </span>
                            <div>
                              <div className="text-xs text-slate-500 font-semibold">Server</div>
                              <div className="text-sm font-extrabold text-slate-900 dark:text-white">Active</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3">
                            <span className="h-8 w-8 rounded-lg bg-blue-50 ring-1 ring-blue-100 grid place-items-center">
                              <span className="h-3 w-3 rounded-full bg-blue-600" />
                            </span>
                            <div>
                              <div className="text-xs text-slate-500 font-semibold">Webhook</div>
                              <div className="text-sm font-extrabold text-slate-900 dark:text-white">Connected</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-100 p-3 text-sm text-blue-900 dark:text-blue-200">
                          Incoming WhatsApp messages will appear in the live feed (mocked here).
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-semibold text-slate-900 dark:text-white">Incoming Messages (Mock)</h3>
                          <Badge color="blue">Live</Badge>
                        </div>

                        <div className="mt-4 space-y-3">
                          {incomingMessages.map(m => {
                            const pill =
                              m.interest === "flat"
                                ? "bg-blue-50 text-blue-900 ring-blue-100"
                                : m.interest === "shop"
                                  ? "bg-indigo-50 text-indigo-900 ring-indigo-100"
                                  : "bg-slate-50 text-slate-900 ring-slate-200";
                            const label = m.interest === "flat" ? "Flat" : m.interest === "shop" ? "Shop" : "Unknown";

                            return (
                              <div key={m.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <div className="truncate text-sm font-bold text-slate-900 dark:text-white">{m.fromName}</div>
                                    <div className="text-xs text-slate-500">{m.fromPhone} • {m.ts}</div>
                                  </div>
                                  <span className={classNames("rounded-full px-3 py-1 text-xs font-bold ring-1", pill)}>
                                    {label}
                                  </span>
                                </div>
                                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-200">{m.message}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent campaigns */}
                  <div className="xl:col-span-2 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">সাম্প্রতিক ক্যাম্পেইন</h3>
                      <div className="flex items-center gap-2">
                        <button className="h-9 px-3 rounded-lg border border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-800">রিফ্রেশ {Icon.refresh}</button>
                        <button className="h-9 px-3 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-semibold">ক্যাম্পেইন তৈরি</button>
                      </div>
                    </div>

                    <div className="overflow-x-auto scroll-thin">
                      <table className="w-full text-sm">
                        <thead className="text-left text-slate-500">
                          <tr className="border-b border-slate-200 dark:border-slate-800">
                            <th className="py-3 font-medium">ক্যাম্পেইন</th>
                            <th className="py-3 font-medium">প্রজেক্ট</th>
                            <th className="py-3 font-medium">স্ট্যাটাস</th>
                            <th className="py-3 font-medium">অডিয়েন্স</th>
                            <th className="py-3 font-medium">ডেলিভারি</th>
                            <th className="py-3 font-medium">রিড</th>
                            <th className="py-3 font-medium">রিপ্লাই</th>
                            <th className="py-3 font-medium text-right">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {campaigns.slice(0, 6).map(c => {
                            const pct = c.audience ? Math.round((c.sent / c.audience) * 100) : 0;
                            return (
                              <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/60 dark:hover:bg-slate-800/60">
                                <td className="py-3 pr-4">
                                  <div className="font-medium text-slate-900 dark:text-white">{c.name}</div>
                                  <div className="text-xs text-slate-500">{fmtDate(c.createdAt)} • by {c.createdBy}</div>
                                </td>
                                <td className="py-3"><Badge color="slate">{c.project}</Badge></td>
                                <td className="py-3">
                                  {c.status === "sent" && <Badge color="green" dot>Sent</Badge>}
                                  {c.status === "sending" && <Badge color="blue" dot>Sending</Badge>}
                                  {c.status === "scheduled" && <Badge color="amber" dot>Scheduled</Badge>}
                                  {c.status === "draft" && <Badge color="slate">Draft</Badge>}
                                  {c.status === "paused" && <Badge color="red">Paused</Badge>}
                                </td>
                                <td className="py-3">{fmtNumberBN(c.audience)}</td>
                                <td className="py-3">
                                  <div className="w-[140px]">
                                    <div className="flex justify-between text-xs mb-1"><span>{fmtNumberBN(c.sent)}/{fmtNumberBN(c.audience)}</span><span>{fmtNumberBN(pct)}%</span></div>
                                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${pct}%` }} />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3">{fmtNumberBN(c.read)}</td>
                                <td className="py-3">{fmtNumberBN(c.replied)}</td>
                                <td className="py-3">
                                  <div className="flex justify-end gap-2">
                                    <button className="px-3 h-8 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs">বিস্তারিত</button>
                                    <button className="px-3 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold" onClick={() => setShowComposer(true)}>ডুপ্লিকেট</button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick actions / pipeline */}
                  <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">কুইক অ্যাকশন</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "নতুন লিড যুক্ত করুন", icon: Icon.plus, action: () => setNav("leads") },
                        { label: "টেমপ্লেট তৈরি", icon: Icon.file, action: () => setNav("templates") },
                        { label: "ফলোআপ শিডিউল", icon: Icon.calendar, action: () => setToast("শিডিউলার খুলছে…") },
                        { label: "রিপোর্ট ডাউনলোড", icon: Icon.download, action: () => setToast("রিপোর্ট তৈরি হচ্ছে…") },
                      ].map(a => (
                        <button key={a.label} onClick={a.action} className="card border border-slate-200 dark:border-slate-800 p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-hover">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">{a.icon}</div>
                            <span className="font-medium text-slate-800 dark:text-slate-100">{a.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">পাইপলাইন</h4>
                      <div className="space-y-3">
                        {[
                          { k: "new", label: "নতুন", count: leads.filter(l => l.status === "new").length },
                          { k: "contacted", label: "যোগাযোগ", count: leads.filter(l => l.status === "contacted").length },
                          { k: "qualified", label: "যোগ্য", count: leads.filter(l => l.status === "qualified").length },
                          { k: "visit", label: "ভিজিট", count: leads.filter(l => l.status === "visit").length },
                          { k: "won", label: "বুকড", count: leads.filter(l => l.status === "won").length },
                        ].map(row => (
                          <div key={row.k}>
                            <div className="flex justify-between text-xs mb-1 text-slate-600 dark:text-slate-300">
                              <span>{row.label}</span><span>{fmtNumberBN(row.count)}</span>
                            </div>
                            <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${Math.min(100, row.count * 12 + 10)}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hot leads */}
                  <div className="xl:col-span-3 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">হট লিডস</h3>
                      <div className="flex items-center gap-2">
                        <select value={projectFilter} onChange={e => setProjectFilter(e.target.value as ProjectKey | "all")} className="h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm">
                          <option value="all">সব প্রজেক্ট</option>
                          {PROJECTS.map(p => <option key={p}>{p}</option>)}
                        </select>
                        <button onClick={() => setNav("leads")} className="h-9 px-3 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-semibold">সব দেখুন</button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {leads.filter(l => l.temperature === "hot").slice(0, 6).map(l => (
                        <div key={l.id} className="card border border-slate-200 dark:border-slate-800 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-hover">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">{l.name}</p>
                              <p className="text-xs text-slate-500">{l.id} • {l.project}</p>
                            </div>
                            <StatusPill status={l.status} />
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {l.tags.map(t => <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">{t}</span>)}
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">{Icon.phone}<span>{l.phone}</span></div>
                            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">{Icon.calendar}<span>{fmtDate(l.lastContact)}</span></div>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-xs text-slate-500 line-clamp-2">{l.notes}</p>
                            <button onClick={() => setActiveLead(l)} className="ml-3 px-3 h-8 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs">ডিটেইলস</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* LEADS */}
              {nav === "leads" && (
                <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0 shadow-soft overflow-hidden">
                  <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-slate-900 dark:text-white text-lg">লিড ম্যানেজমেন্ট</h3>
                      <Badge color="blue">{fmtNumberBN(filteredLeads.length)} রেজাল্ট</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="relative">
                        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="সার্চ…" className="h-10 pl-9 pr-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm" />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{Icon.search}</div>
                      </div>
                      <select value={projectFilter} onChange={e => setProjectFilter(e.target.value as ProjectKey | "all")} className="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm">
                        <option value="all">সব প্রজেক্ট</option>
                        {PROJECTS.map(p => <option key={p}>{p}</option>)}
                      </select>
                      <button
                        type="button"
                        onClick={() => setImportOpen(v => !v)}
                        className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                      >
                        {Icon.file} ইমপোর্ট
                      </button>
                      <button onClick={() => setShowComposer(true)} className="h-10 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">বাল্ক মেসেজ</button>
                    </div>
                  </div>

                  {importOpen && (
                    <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40">
                      <div className="flex flex-col lg:flex-row gap-5">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">Excel/CSV Upload</h4>
                              <p className="text-xs text-slate-500 mt-1">সমর্থিত: `.xlsx`, `.xls`, `.csv` (headers সহ)</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-500">Default Project</p>
                              <select
                                value={importProjectDefault}
                                onChange={e => setImportProjectDefault(e.target.value as ProjectKey)}
                                className="mt-1 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-3 text-sm w-[220px]"
                              >
                                {PROJECTS.map(p => <option key={p} value={p}>{p}</option>)}
                              </select>
                            </div>
                          </div>

                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".xlsx,.xls,.csv,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) handleImportFromFile(file);
                              e.currentTarget.value = "";
                            }}
                          />

                          <div className="mt-4 card border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
                              <div className="text-sm text-slate-600 dark:text-slate-300">
                                ফাইল সিলেক্ট করুন অথবা ড্র্যাগ করে দিন (ডেমো UI)
                              </div>
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                disabled={importLoading}
                                className="h-10 px-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black disabled:opacity-60"
                              >
                                {importLoading ? "ইমপোর্ট…" : "Upload File"}
                              </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-2">
                              Columns suggestion: `id,name,phone,email?,project,status,source,tags,lastContact,notes,temperature,budget?,assignedTo,createdAt`
                            </p>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white">Copy/Paste Leads</h4>
                          <p className="text-xs text-slate-500 mt-1">CSV/TSV দিন (header + rows)</p>

                          <textarea
                            value={pasteLeadsText}
                            onChange={e => setPasteLeadsText(e.target.value)}
                            placeholder={`id,name,phone,email,project,status,source,tags,lastContact,notes,temperature,budget,assignedTo,createdAt\nLD-2001,Example Lead,+8801...,lead@example.com,Muktar Plaza,new,website,৩ বেড;রেডি ফ্ল্যাট,2026-03-30T12:00:00+06:00,প্রথম মেসেজ পাঠানো হয়েছে,hot,৳ 1.2 কোটি,সাব্বির,2026-03-29T10:00:00+06:00`}
                            className="mt-3 w-full min-h-[170px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm font-mono text-slate-800 dark:text-slate-100"
                          />

                          <button
                            type="button"
                            onClick={handleImportFromPaste}
                            disabled={importLoading || !pasteLeadsText.trim()}
                            className="mt-3 w-full h-11 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                          >
                            {importLoading ? "ইমপোর্ট…" : "Import from Paste"}
                          </button>
                        </div>
                      </div>

                      {importError && (
                        <div className="mt-4 text-sm text-rose-600 dark:text-rose-400">
                          {importError}
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setImportOpen(false);
                            setImportError(null);
                            setPasteLeadsText("");
                          }}
                          className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto scroll-thin">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                        <tr className="text-left border-b border-slate-200 dark:border-slate-800">
                          <th className="py-3 pl-5 pr-3 w-12">
                            <input type="checkbox" onChange={e => {
                              if (e.target.checked) setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
                              else setSelectedLeads(new Set());
                            }} checked={filteredLeads.length > 0 && selectedLeads.size === filteredLeads.length} />
                          </th>
                          <th className="py-3 font-medium">লিড</th>
                          <th className="py-3 font-medium">যোগাযোগ</th>
                          <th className="py-3 font-medium">প্রজেক্ট</th>
                          <th className="py-3 font-medium">স্ট্যাটাস</th>
                          <th className="py-3 font-medium">ট্যাগ</th>
                          <th className="py-3 font-medium">এসাইন</th>
                          <th className="py-3 font-medium">লাস্ট কনট্যাক্ট</th>
                          <th className="py-3 font-medium text-right pr-5">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLeads.map(l => (
                          <tr key={l.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                            <td className="py-3 pl-5">
                              <input type="checkbox" checked={selectedLeads.has(l.id)} onChange={() => toggleSelect(l.id)} />
                            </td>
                            <td className="py-3">
                              <div className="font-medium text-slate-900 dark:text-white">{l.name}</div>
                              <div className="text-xs text-slate-500">{l.id}</div>
                            </td>
                            <td className="py-3">
                              <div className="flex flex-col">
                                <span className="inline-flex items-center gap-2">{Icon.phone}<span className="font-medium">{l.phone}</span></span>
                                {l.email && <span className="text-xs text-slate-500 mt-1">{l.email}</span>}
                              </div>
                            </td>
                            <td className="py-3"><Badge color="slate">{l.project}</Badge></td>
                            <td className="py-3"><StatusPill status={l.status} /></td>
                            <td className="py-3">
                              <div className="flex flex-wrap gap-1">
                                {l.tags.map(t => <span key={t} className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px]">{t}</span>)}
                              </div>
                            </td>
                            <td className="py-3">{l.assignedTo}</td>
                            <td className="py-3">{fmtDate(l.lastContact)}</td>
                            <td className="py-3">
                              <div className="flex justify-end gap-2 pr-5">
                                <button onClick={() => setActiveLead(l)} className="px-3 h-8 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs">ডিটেইলস</button>
                                <button onClick={() => { setComposerProject(l.project); setShowComposer(true); setSelectedLeads(new Set([l.id])); }} className="px-3 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold">মেসেজ</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-4 flex items-center justify-between text-xs text-slate-500">
                    <span>দেখানো হচ্ছে {fmtNumberBN(filteredLeads.length)} টি লিড</span>
                    <div className="flex items-center gap-2">
                      <button className="px-3 h-8 rounded-lg border border-slate-200 dark:border-slate-700">আগের</button>
                      <button className="px-3 h-8 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold">১</button>
                      <button className="px-3 h-8 rounded-lg border border-slate-200 dark:border-slate-700">পরের</button>
                    </div>
                  </div>
                </div>
              )}

              {/* CAMPAIGNS */}
              {nav === "campaigns" && (
                <div className="grid xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Smart Bulk Messaging & Filter</h3>
                        <p className="text-xs text-slate-500 mt-1">Scan numbers, target Active WhatsApp only, then send with media + Meta-approved template.</p>
                      </div>
                    </div>

                    {/* Summary cards */}
                    <div className="grid md:grid-cols-3 gap-4 mb-5">
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Total Leads</div>
                            <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{fmtNumberBN(scanRows.length)}</div>
                          </div>
                          <FileUp className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        </div>
                        <div className="mt-2 text-xs text-slate-500">From uploaded CSV/XLSX</div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Active WhatsApp Numbers</div>
                            <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{fmtNumberBN(activePhones.length)}</div>
                          </div>
                          <UserCheck className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                        </div>
                        <div className="mt-2 text-xs text-slate-500">Simulated account scan</div>
                      </div>

                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Messages Delivered</div>
                            <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                              {campaignRunning ? fmtNumberBN(campaignProgress.delivered) : fmtNumberBN(deliveredTotal)}
                            </div>
                          </div>
                          <Send className="h-5 w-5 text-indigo-700 dark:text-indigo-300" />
                        </div>
                        <div className="mt-2 text-xs text-slate-500">Mock delivery rate</div>
                      </div>
                    </div>

                    {/* Lead Filter + Composer */}
                    <div className="grid gap-4 lg:grid-cols-2">
                      {/* Lead Filter */}
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <FileUp className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                            <h4 className="font-semibold text-slate-900 dark:text-white">Lead Filter</h4>
                          </div>
                          <Badge color="blue">Active vs Inactive</Badge>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Upload phone numbers (CSV/XLSX)
                          </label>
                          <input
                            type="file"
                            accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            className="mt-2 w-full text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:text-white file:hover:bg-blue-700"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) handleScanFile(file);
                              e.currentTarget.value = "";
                            }}
                            disabled={scanLoading}
                          />
                          <div className="mt-2 text-xs text-slate-500">
                            {scanFileName ? `Selected: ${scanFileName}` : "Tip: Put phones in a single column (or any column)."}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (!scanFileName) {
                              setToast("Upload a file first, then scan.");
                              return;
                            }
                            setToast("Auto scan runs on file upload in this demo.");
                          }}
                          disabled={scanLoading}
                          className="mt-3 h-11 w-full rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                        >
                          {scanLoading ? "Scanning…" : "Scan WhatsApp Accounts"}
                        </button>

                        {/* View toggles */}
                        <div className="mt-4 flex items-center gap-2">
                          {(["active", "inactive", "all"] as const).map(v => (
                            <button
                              key={v}
                              type="button"
                              onClick={() => setScanView(v)}
                              className={[
                                "h-8 px-3 rounded-xl border text-xs font-semibold transition",
                                scanView === v
                                  ? "bg-slate-900 text-white border-slate-900"
                                  : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800",
                              ].join(" ")}
                            >
                              {v === "active" ? "Active" : v === "inactive" ? "Inactive" : "All"}
                            </button>
                          ))}
                        </div>

                        <div className="mt-4 overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="text-left text-slate-500">
                              <tr>
                                <th className="py-2">Phone</th>
                                <th className="py-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {scanRows
                                .filter(r => (scanView === "all" ? true : scanView === "active" ? r.active : !r.active))
                                .slice(0, 10)
                                .map(r => (
                                  <tr key={r.phone} className="border-t border-slate-100 dark:border-slate-700">
                                    <td className="py-2 pr-2 text-slate-700 dark:text-slate-200">{r.phone}</td>
                                    <td className="py-2">
                                      <Badge color={r.active ? "emerald" : "slate"}>{r.active ? "Active" : "Inactive"}</Badge>
                                    </td>
                                  </tr>
                                ))}
                              {scanRows.length === 0 && (
                                <tr>
                                  <td className="py-4 text-slate-500" colSpan={2}>
                                    Upload a file to scan.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Campaign Composer */}
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                            <h4 className="font-semibold text-slate-900 dark:text-white">Campaign Composer</h4>
                          </div>
                          <Badge color="blue">Meta Approved Template</Badge>
                        </div>

                        <div className="mt-4">
                          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                            Message (Muktar Plaza Flat/Shop)
                          </label>
                          <textarea
                            value={campaignMessage}
                            onChange={e => setCampaignMessage(e.target.value)}
                            className="mt-2 w-full min-h-[140px] rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/30"
                          />
                        </div>

                        <div className="mt-4">
                          <div className="text-xs font-semibold text-slate-500">Attachments (optional)</div>

                          <div className="mt-2 grid gap-3 sm:grid-cols-2">
                            <div>
                              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Images</div>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="mt-2 w-full text-sm"
                                onChange={e => {
                                  const files = Array.from(e.target.files ?? []);
                                  const items = files.map(file => ({ file, url: URL.createObjectURL(file) }));
                                  setImageMedia(prev => [...prev, ...items]);
                                  e.currentTarget.value = "";
                                }}
                              />

                              {imageMedia.length > 0 && (
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                  {imageMedia.slice(0, 6).map(m => (
                                    <div key={m.url} className="relative">
                                      <img src={m.url} alt="" className="h-16 w-full rounded-lg object-cover" />
                                      <button
                                        type="button"
                                        onClick={() => removeImage(m.url)}
                                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-slate-900 text-white text-xs font-bold grid place-items-center hover:bg-black"
                                      >
                                        X
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>

                            <div>
                              <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Videos</div>
                              <input
                                type="file"
                                accept="video/*"
                                multiple
                                className="mt-2 w-full text-sm"
                                onChange={e => {
                                  const files = Array.from(e.target.files ?? []);
                                  const items = files.map(file => ({ file, url: URL.createObjectURL(file) }));
                                  setVideoMedia(prev => [...prev, ...items]);
                                  e.currentTarget.value = "";
                                }}
                              />

                              {videoMedia.length > 0 && (
                                <div className="mt-2 space-y-2">
                                  {videoMedia.slice(0, 2).map(m => (
                                    <div key={m.url} className="relative">
                                      <video src={m.url} className="h-24 w-full rounded-lg object-cover" controls />
                                      <button
                                        type="button"
                                        onClick={() => removeVideo(m.url)}
                                        className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-slate-900 text-white text-xs font-bold grid place-items-center hover:bg-black"
                                      >
                                        X
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <div className="text-xs font-semibold text-slate-500">Targeting</div>
                              <div className="text-sm font-extrabold text-slate-900">Only Active WhatsApp Numbers</div>
                            </div>
                            <Badge color="emerald">{fmtNumberBN(activePhones.length)} Active</Badge>
                          </div>

                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={startSmartCampaign}
                              disabled={campaignRunning || activePhones.length === 0}
                              className="w-full h-11 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                            >
                              <span className="inline-flex items-center justify-center gap-2">
                                <Send className="h-4 w-4" />
                                {campaignRunning ? "Sending…" : "Start Campaign"}
                              </span>
                            </button>

                            {campaignProgress.total > 0 && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
                                  <span>
                                    Sending... {fmtNumberBN(campaignProgress.sent)}/{fmtNumberBN(campaignProgress.total)}
                                  </span>
                                  <span>Delivered: {fmtNumberBN(campaignProgress.delivered)}</span>
                                </div>
                                <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                                    style={{ width: `${campaignProgress.total ? Math.round((campaignProgress.sent / campaignProgress.total) * 100) : 0}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Campaign History (Mock) */}
                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                      {campaigns.map(c => (
                        <div key={c.id} className="card border border-slate-200 dark:border-slate-800 p-4 shadow-hover">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">{c.name}</p>
                              <p className="text-xs text-slate-500">{c.id} • {c.project}</p>
                            </div>
                            {c.status === "sent" && <Badge color="green" dot>Sent</Badge>}
                            {c.status === "sending" && <Badge color="blue" dot>Sending</Badge>}
                            {c.status === "scheduled" && <Badge color="amber" dot>Scheduled</Badge>}
                            {c.status === "draft" && <Badge color="slate">Draft</Badge>}
                          </div>
                          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                            {[
                              { label: "Sent", val: c.sent },
                              { label: "Read", val: c.read },
                              { label: "Reply", val: c.replied },
                            ].map(m => (
                              <div key={m.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                                <p className="text-[11px] uppercase tracking-wide text-slate-500">{m.label}</p>
                                <p className="font-display text-xl font-extrabold text-slate-900 dark:text-white">{fmtNumberBN(m.val)}</p>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" style={{ width: `${c.audience ? Math.round((c.sent / c.audience) * 100) : 0}%` }} />
                          </div>
                          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                            <span>অডিয়েন্স {fmtNumberBN(c.audience)}</span>
                            <span>তৈরি {fmtDate(c.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">পারফরম্যান্স</h3>
                    <div className="space-y-4">
                      {[
                        { label: "ডেলিভারি রেট", value: 96 },
                        { label: "রিড রেট", value: 78 },
                        { label: "রিপ্লাই রেট", value: 21 },
                        { label: "অপ্ট-আউট", value: 2 },
                      ].map(s => (
                        <div key={s.label}>
                          <div className="flex justify-between text-sm mb-1"><span className="text-slate-600 dark:text-slate-300">{s.label}</span><span className="font-semibold">{fmtNumberBN(s.value)}%</span></div>
                          <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600" style={{ width: `${s.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <p className="text-sm font-medium mb-2">সাজেশন</p>
                      <ul className="text-sm text-slate-600 dark:text-slate-300 list-disc pl-5 space-y-1">
                        <li>হট লিডদের ২৪ ঘন্টার মধ্যে ফলোআপ দিন।</li>
                        <li>ইএমআই/কিস্তি তথ্যসহ টেমপ্লেট ব্যবহার করুন।</li>
                        <li>শুক্রবার বিকালে বাল্ক মেসেজ ভালো রেসপন্স দেয়।</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATES */}
              {nav === "templates" && (
                <div className="grid xl:grid-cols-3 gap-6">
                  <div className="xl:col-span-2 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Bot className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        <h3 className="font-semibold text-slate-900 dark:text-white">Automated Auto-Replies (Chatbot)</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setToast("শীঘ্রই: Auto-reply builder (backend-driven). এখন এটি UI প্রিভিউ।")}
                        className="h-10 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold"
                      >
                        Edit Rules
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Badge color="blue">Flat</Badge>
                              <span className="text-xs text-slate-500 font-semibold">Intent match</span>
                            </div>
                            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Trigger: flat / apartment / bed / price</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                          হ্যালো {`{{name}}`}! 👋{"\n"}{"\n"}আপনি জানতে চেয়েছেন <span className="font-semibold">{PROJECTS[0]}</span> এর Flat বিষয়ে।{"\n"}{"\n"}আপনি ২-বেড না ৩-বেড চান? আপনার বাজেট রেঞ্জ লিখলে আমি দ্রুত অপশন পাঠাবো।
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Badge color="emerald">Shop</Badge>
                              <span className="text-xs text-slate-500 font-semibold">Intent match</span>
                            </div>
                            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Trigger: shop / space / sqft / retail</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                          হ্যালো {`{{name}}`}! 👋{"\n"}{"\n"}আপনি জানতে চেয়েছেন <span className="font-semibold">{PROJECTS[0]}</span> এর Shop/Commercial Space।{"\n"}{"\n"}আপনার পছন্দের লোকেশন এবং কত sqft প্রয়োজন? বাজেট জানালে আমি সেরা অপশন সাজেস্ট করবো।
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white dark:bg-slate-900 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Badge color="slate">Fallback</Badge>
                              <span className="text-xs text-slate-500 font-semibold">No clear intent</span>
                            </div>
                            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">Trigger: anything else</p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-700 dark:text-slate-200 whitespace-pre-wrap rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                          হ্যালো {`{{name}}`}! আপনার মেসেজ পেয়েছি।{"\n"}{"\n"}আপনি Flat খুঁজছেন নাকি Shop/Commercial Space? পছন্দ/বাজেট জানালে আমি দ্রুত বিস্তারিত জানিয়ে দেব।
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-3">How it works</h3>
                    <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-700 dark:text-blue-300 mt-0.5" />
                        <div>
                          Incoming messages hit your webhook.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Bot className="h-4 w-4 text-blue-700 dark:text-blue-300 mt-0.5" />
                        <div>
                          The chatbot classifies intent: <span className="font-semibold">Flat</span>, <span className="font-semibold">Shop</span>, or <span className="font-semibold">Fallback</span>.
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="h-4 w-4 mt-0.5 rounded bg-emerald-50 ring-1 ring-emerald-100" />
                        <div>
                          It sends the best reply and logs the outcome.
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-blue-50/70 border border-blue-100 p-4 text-sm text-blue-900 dark:text-blue-200">
                      Tip: later, we’ll bind these rules to your Meta WhatsApp sending endpoint (server-side).
                    </div>

                    <button onClick={() => setNav("leads")} className="mt-5 w-full h-11 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black">
                      Test with Leads
                    </button>
                  </div>
                </div>
              )}

              {/* ANALYTICS */}
              {nav === "analytics" && (
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-slate-900 dark:text-white">WhatsApp API Connection Status</h3>
                      <Badge color="emerald">Operational</Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Meta API</div>
                            <div className="text-sm font-extrabold text-slate-900 dark:text-white">Connected</div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                          Outgoing messages can be sent and incoming events can be received via Meta’s WhatsApp Cloud API.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
                        <div className="flex items-center gap-3">
                          <ShieldCheck className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                          <div>
                            <div className="text-xs font-semibold text-slate-500">Webhook</div>
                            <div className="text-sm font-extrabold text-slate-900 dark:text-white">Active</div>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                          Your webhook endpoint receives POST events and updates this dashboard logs.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-blue-50/70 border border-blue-100 p-4 text-sm text-blue-900 dark:text-blue-200">
                      Tip: Later, we can connect this page to <span className="font-semibold">GET /api/status</span> so “Connected/Active” becomes real-time.
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Webhook Events (Mock)</h3>
                    <div className="space-y-3">
                      {incomingMessages.map(m => (
                        <div key={m.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-sm font-bold text-slate-900 dark:text-white">{m.fromName}</div>
                              <div className="text-xs text-slate-500">{m.ts}</div>
                            </div>
                            <Badge color={m.interest === "flat" ? "blue" : m.interest === "shop" ? "emerald" : "slate"}>
                              {m.interest === "flat" ? "Flat" : m.interest === "shop" ? "Shop" : "Unknown"}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm text-slate-700 dark:text-slate-200 line-clamp-2">{m.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEAM */}
              {nav === "team" && (
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">টিম মেম্বার</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { name: "সাব্বির", role: "সিনিয়র সেলস এক্সিকিউটিভ", leads: 142, conversion: 18 },
                        { name: "মাহিন", role: "সেলস এক্সিকিউটিভ", leads: 118, conversion: 14 },
                        { name: "রাকিব", role: "ক্লোজার", leads: 96, conversion: 22 },
                        { name: "নিশাত", role: "মার্কেটিং", leads: 0, conversion: 0 },
                      ].map(m => (
                        <div key={m.name} className="card border border-slate-200 dark:border-slate-800 p-4">
                          <div className="flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/100?u=${m.name}`} className="h-10 w-10 rounded-full" alt="" />
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-white">{m.name}</p>
                              <p className="text-xs text-slate-500">{m.role}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-2 text-xs">
                              <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800">লিড {fmtNumberBN(m.leads)}</span>
                              <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700">CR {fmtNumberBN(m.conversion)}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-soft">
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-4">পারমিশন ও রোল</h3>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center justify-between"><span>বাল্ক মেসেজ পাঠানো</span><span className="text-emerald-600">অনুমোদিত</span></li>
                      <li className="flex items-center justify-between"><span>টেমপ্লেট এডিট</span><span className="text-emerald-600">অনুমোদিত</span></li>
                      <li className="flex items-center justify-between"><span>ডেটা এক্সপোর্ট</span><span className="text-amber-600">সীমিত</span></li>
                      <li className="flex items-center justify-between"><span>API কনফিগ</span><span className="text-rose-600">অ্যাডমিন</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Connect WhatsApp Business Modal */}
      {connectOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setConnectOpen(false)} />
          <div className="relative w-full lg:max-w-[920px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">
                  {Icon.phone}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Connect WhatsApp Business</p>
                  <p className="text-xs text-slate-500">UI placeholder. Real OAuth must be handled on your backend.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setConnectOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close connect modal"
              >
                {Icon.close}
              </button>
            </div>

            <div className="p-5 grid lg:grid-cols-2 gap-5">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <ShieldCheck className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                  System Status
                </div>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3">
                    <span className="h-8 w-8 rounded-lg bg-emerald-50 ring-1 ring-emerald-100 grid place-items-center">
                      <span className="h-3 w-3 rounded-full bg-emerald-600" />
                    </span>
                    <div>
                      <div className="text-xs text-slate-500 font-semibold">Server</div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3">
                    <span className="h-8 w-8 rounded-lg bg-blue-50 ring-1 ring-blue-100 grid place-items-center">
                      <span className="h-3 w-3 rounded-full bg-blue-600" />
                    </span>
                    <div>
                      <div className="text-xs text-slate-500 font-semibold">Webhook</div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">Connected</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">Next steps</div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300 list-disc pl-5">
                  <li>Keep `WhatsApp Token`, `Phone Number ID`, and `Webhook Verification Token` on the server.</li>
                  <li>Implement OAuth connect flow (Meta OAuth) on the backend.</li>
                  <li>Expose a server endpoint like `POST /api/connect` and `GET /api/status` to populate this UI.</li>
                </ul>

                <div className="mt-4 rounded-xl bg-blue-50/70 border border-blue-100 p-4 text-sm text-blue-900 dark:text-blue-200">
                  Tip: when your `/api/webhook/route.ts` receives messages, we can render real-time logs in the “Incoming Messages” panel.
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row gap-2 justify-end">
              <button
                type="button"
                onClick={() => setConnectOpen(false)}
                className="h-11 px-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Later
              </button>
              <button
                type="button"
                onClick={() => {
                  setConnectOpen(false);
                  setToast("Webhook is ready. Next: wire connect/status endpoints to show live status.");
                }}
                className="h-11 px-5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-soft"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowComposer(false)} />
          <div className="relative w-full lg:max-w-[980px] bg-white dark:bg-slate-900 rounded-t-2xl lg:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-600 text-white">{Icon.message}</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">বাল্ক মেসেজ কম্পোজার</p>
                  <p className="text-xs text-slate-500">টেমপ্লেট বেছে নিন, ভেরিয়েবল দিন, অডিয়েন্স কনফার্ম করে পাঠান।</p>
                </div>
              </div>
              <button onClick={() => setShowComposer(false)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">{Icon.close}</button>
            </div>

            <div className="p-5 grid lg:grid-cols-3 gap-5">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-300">প্রজেক্ট</label>
                    <select value={composerProject} onChange={e => setComposerProject(e.target.value as ProjectKey)} className="mt-1 w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3">
                      {PROJECTS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 dark:text-slate-300">টেমপ্লেট</label>
                    <select value={composerTemplate.id} onChange={e => setComposerTemplate(TEMPLATES.find(t => t.id === e.target.value)!)} className="mt-1 w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3">
                      {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-600 dark:text-slate-300">মেসেজ</label>
                  <textarea value={composerTemplate.body} readOnly className="mt-1 w-full min-h-[140px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm" />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {composerTemplate.variables.map(k => (
                    <div key={k}>
                      <label className="text-sm text-slate-600 dark:text-slate-300">{k}</label>
                      <input value={composerVars[k] ?? ""} onChange={e => setComposerVars(s => ({ ...s, [k]: e.target.value }))} className="mt-1 w-full h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="card border border-slate-200 dark:border-slate-800 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-2">প্রিভিউ</p>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800 p-4 text-sm leading-6">{previewText}</div>
                </div>
                <div className="card border border-slate-200 dark:border-slate-800 p-4">
                  <p className="font-medium mb-2">অডিয়েন্স</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge color="slate">{projectFilter === "all" ? "সব প্রজেক্ট" : projectFilter}</Badge>
                    <Badge color="blue">{fmtNumberBN(selectedLeads.size || filteredLeads.length)} প্রাপক</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">টিপ: লিড টেবিলে সিলেক্ট করে নির্দিষ্ট লিস্টে পাঠান।</p>
                </div>
                <button onClick={sendBulk} className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-soft">এখনই পাঠান</button>
                <button onClick={() => setToast("সিডিউল সেভ হয়েছে")} className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800">শিডিউল করুন</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lead Drawer */}
      {activeLead && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setActiveLead(null)} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[440px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 p-5 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-500">লিড ডিটেইলস</p>
                <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">{activeLead.name}</h3>
                <p className="text-sm text-slate-500">{activeLead.id} • {activeLead.project}</p>
              </div>
              <button onClick={() => setActiveLead(null)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">{Icon.close}</button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="card border border-slate-200 dark:border-slate-800 p-3">
                <p className="text-xs text-slate-500">ফোন</p>
                <p className="font-medium">{activeLead.phone}</p>
              </div>
              <div className="card border border-slate-200 dark:border-slate-800 p-3">
                <p className="text-xs text-slate-500">স্ট্যাটাস</p>
                <StatusPill status={activeLead.status} />
              </div>
              <div className="card border border-slate-200 dark:border-slate-800 p-3">
                <p className="text-xs text-slate-500">সোর্স</p>
                <p className="font-medium capitalize">{activeLead.source}</p>
              </div>
              <div className="card border border-slate-200 dark:border-slate-800 p-3">
                <p className="text-xs text-slate-500">তাপমাত্রা</p>
                <p className="font-medium capitalize">{activeLead.temperature}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">ট্যাগ</p>
              <div className="flex flex-wrap gap-2">
                {activeLead.tags.map(t => <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs">{t}</span>)}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">নোট</p>
              <div className="card border border-slate-200 dark:border-slate-800 p-3 text-sm leading-6">{activeLead.notes}</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="h-11 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold" onClick={() => { setComposerProject(activeLead.project); setShowComposer(true); setSelectedLeads(new Set([activeLead.id])); }}>মেসেজ পাঠান</button>
              <button className="h-11 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold" onClick={() => setToast("কল লগ যোগ করা হয়েছে")}>কল লগ</button>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">অ্যাক্টিভিটি</p>
              <div className="space-y-3">
                {[
                  { t: "SMS পাঠানো হয়েছে", d: "2026-03-28 14:22" },
                  { t: "সাইট ভিজিট শিডিউল", d: "2026-03-26 17:40" },
                  { t: "প্রথম কন্ট্যাক্ট", d: "2026-03-24 10:15" },
                ].map(a => (
                  <div key={a.t} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    <div>
                      <p className="text-sm">{a.t}</p>
                      <p className="text-xs text-slate-500">{a.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 px-4 h-11 rounded-xl bg-slate-900 text-white shadow-soft">
            <span className="grid place-items-center h-6 w-6 rounded-full bg-emerald-500">{Icon.check}</span>
            <span className="text-sm font-medium">{toast}</span>
          </div>
        </div>
      )}

      <style>{`@keyframes slide { from { background-position: 0 0; } to { background-position: 24px 0; } }`}</style>
    </div>
  );
}