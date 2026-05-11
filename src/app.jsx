import React from 'react';
// لو فيه مكتبات تانية زي lucide-react حطيها هنا

function App() {
  return (
    <div className="dashboard-container">
      {/* هنا تحطي كل كود الـ HTML/JSX بتاع الداشبورد اللي كلودي عملته
import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, FolderOpen, Newspaper, BookOpen,
  Trophy, Search, Bell, ChevronRight, Plus, Upload,
  Filter, Star, Calendar, Globe, Cpu, Code2, Bot,
  Zap, Award, GraduationCap, Users, FileCode, X,
  ExternalLink, RefreshCw, Menu, Loader2, ChevronDown,
  Rocket, Microscope, CircuitBoard, BrainCircuit
} from "lucide-react";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const TAVILY_API_KEY = "YOUR_TAVILY_API_KEY"; // Replace with your key
const SUPABASE_URL   = "YOUR_SUPABASE_URL";   // Replace with your Supabase URL
const SUPABASE_KEY   = "YOUR_SUPABASE_ANON_KEY"; // Replace with your key

// ─── TAVILY NEWS FETCH ────────────────────────────────────────────────────────
async function fetchICTNews(query) {
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query,
      search_depth: "basic",
      include_answer: false,
      max_results: 5,
    }),
  });
  if (!response.ok) throw new Error("Tavily fetch failed");
  const data = await response.json();
  return data.results || [];
}

// ─── SUPABASE HELPERS ─────────────────────────────────────────────────────────
async function supabaseFetch(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.statusText}`);
  return res.json();
}

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const MOCK_PROJECTS = [
  { id: 1, title: "Smart Irrigation Bot", student: "Nour Ahmed", grade: 7, type: "Python", date: "2025-05-01", stars: 5, desc: "Arduino + Python system automating farm water usage." },
  { id: 2, title: "Scratch Maze Adventure", student: "Youssef Salem", grade: 4, type: "Scratch", date: "2025-05-03", stars: 4, desc: "Interactive maze game built in Scratch 3.0." },
  { id: 3, title: "AI Face Filter", student: "Layla Hassan", grade: 11, type: "AI", date: "2025-04-28", stars: 5, desc: "Real-time face detection using TensorFlow.js." },
  { id: 4, title: "Weather Predictor", student: "Omar Farouk", grade: 9, type: "Python", date: "2025-04-22", stars: 4, desc: "ML model predicting Minya temperatures." },
  { id: 5, title: "Scratch Story Teller", student: "Mariam Saad", grade: 5, type: "Scratch", date: "2025-05-06", stars: 3, desc: "Animated Scratch story about ancient Egypt." },
  { id: 6, title: "Chatbot Tutor", student: "Ahmed Wael", grade: 11, type: "AI", date: "2025-05-08", stars: 5, desc: "GPT-powered math tutoring chatbot." },
  { id: 7, title: "Snake Game", student: "Salma Ramy", grade: 6, type: "Python", date: "2025-04-15", stars: 3, desc: "Classic snake built with Pygame." },
  { id: 8, title: "Digital Art Creator", student: "Karim Taha", grade: 8, type: "Scratch", date: "2025-05-02", stars: 4, desc: "Generative art tool using Scratch pen blocks." },
];

const COMPETITIONS = [
  { id: 1, name: "ISEF 2025", date: "2025-05-15", daysLeft: 4, color: "emerald", icon: Microscope, location: "Los Angeles, USA", category: "Science & Engineering" },
  { id: 2, name: "WRO Robotics 2025", date: "2025-11-01", daysLeft: 174, color: "blue", icon: CircuitBoard, location: "Turkey", category: "Robotics" },
  { id: 3, name: "Google Science Fair", date: "2025-09-10", daysLeft: 122, color: "amber", icon: BrainCircuit, location: "Online", category: "AI & Science" },
  { id: 4, name: "Egypt ICT Olympiad", date: "2025-06-20", daysLeft: 40, color: "purple", icon: Rocket, location: "Cairo, Egypt", category: "ICT" },
];

const WEEKLY_STATS = [
  { label: "Projects Submitted", value: 12, icon: FileCode, color: "blue" },
  { label: "Active Students", value: 89, icon: Users, color: "emerald" },
  { label: "Competitions Ahead", value: 4, icon: Trophy, color: "amber" },
  { label: "Grades Covered", value: 8, icon: GraduationCap, color: "purple" },
];

const MAGAZINE_HIGHLIGHTS = [
  { title: "AI in Egyptian Classrooms", tag: "Feature", emoji: "🤖", desc: "How schools in Cairo are integrating AI tools into daily lessons and what it means for the future of education.", color: "blue" },
  { title: "Student Spotlight: Nour's Irrigation Bot", tag: "Story", emoji: "🌱", desc: "Grade 7 student Nour Ahmed wins regional prize for her smart irrigation system built with Arduino and Python.", color: "emerald" },
  { title: "Japan-Egypt EdTech Exchange", tag: "Global", emoji: "🌏", desc: "A new partnership between Japanese and Egyptian schools brings robotics curriculum to 50 public schools.", color: "purple" },
  { title: "Top 5 Python Projects of April", tag: "Roundup", emoji: "🐍", desc: "From weather apps to game engines — the most impressive student Python projects submitted this month.", color: "amber" },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const TYPE_COLORS = { Python: "blue", Scratch: "orange", AI: "purple" };
const TYPE_ICONS  = { Python: Code2, Scratch: Cpu, AI: Bot };
const GRADE_COLORS = {
  4: "slate", 5: "blue", 6: "cyan", 7: "teal",
  8: "emerald", 9: "violet", 10: "fuchsia", 11: "rose"
};

function Badge({ color = "blue", children, small }) {
  const map = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    cyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
    teal: "bg-teal-100 text-teal-700 border-teal-200",
    violet: "bg-violet-100 text-violet-700 border-violet-200",
    fuchsia: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    rose: "bg-rose-100 text-rose-700 border-rose-200",
  };
  return (
    <span className={`inline-flex items-center border rounded-full font-semibold ${small ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-xs"} ${map[color] || map.blue}`}>
      {children}
    </span>
  );
}

function Stars({ n }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} className={i <= n ? "fill-amber-400 text-amber-400" : "text-slate-200"} />
      ))}
    </span>
  );
}

// ─── DASHBOARD SECTION ────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-800 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-200 text-sm font-medium tracking-widest uppercase mb-2">Week of May 11, 2026</p>
              <h1 className="text-3xl font-bold mb-1">Good morning, Teacher! 👋</h1>
              <p className="text-blue-100 text-lg">Your ICT classes are buzzing with innovation this week.</p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-2">
              <Badge color="emerald">Grades 4–11 Active</Badge>
              <span className="text-blue-200 text-sm">12 projects pending review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {WEEKLY_STATS.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              color === "blue" ? "bg-blue-100" : color === "emerald" ? "bg-emerald-100" : color === "amber" ? "bg-amber-100" : "bg-purple-100"
            }`}>
              <Icon size={20} className={
                color === "blue" ? "text-blue-600" : color === "emerald" ? "text-emerald-600" : color === "amber" ? "text-amber-600" : "text-purple-600"
              } />
            </div>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
            <p className="text-slate-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Competitions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={20} className="text-amber-500" />
          <h2 className="text-lg font-bold text-slate-800">Competition Reminders</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMPETITIONS.map(({ id, name, daysLeft, icon: Icon, location, category, color }) => (
            <div key={id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 bg-white hover:shadow-md transition-all ${
              daysLeft <= 7 ? "border-red-300 bg-red-50" : "border-slate-100"
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                color === "emerald" ? "bg-emerald-100" : color === "blue" ? "bg-blue-100" : color === "amber" ? "bg-amber-100" : "bg-purple-100"
              }`}>
                <Icon size={22} className={
                  color === "emerald" ? "text-emerald-600" : color === "blue" ? "text-blue-600" : color === "amber" ? "text-amber-600" : "text-purple-600"
                } />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-slate-800 text-sm">{name}</p>
                  {daysLeft <= 7 && <Badge color="rose" small>Urgent!</Badge>}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{location} · {category}</p>
              </div>
              <div className={`text-right flex-shrink-0`}>
                <p className={`text-xl font-black ${daysLeft <= 7 ? "text-red-500" : "text-blue-700"}`}>{daysLeft}d</p>
                <p className="text-xs text-slate-400">left</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent projects snippet */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Latest Submissions</h2>
          <span className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">View all →</span>
        </div>
        <div className="space-y-2">
          {MOCK_PROJECTS.slice(0, 4).map(p => {
            const Icon = TYPE_ICONS[p.type] || Code2;
            return (
              <div key={p.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-sm transition-all">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  p.type === "Python" ? "bg-blue-100" : p.type === "Scratch" ? "bg-orange-100" : "bg-purple-100"
                }`}>
                  <Icon size={16} className={
                    p.type === "Python" ? "text-blue-600" : p.type === "Scratch" ? "text-orange-600" : "text-purple-600"
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm truncate">{p.title}</p>
                  <p className="text-xs text-slate-500">{p.student} · Grade {p.grade}</p>
                </div>
                <Stars n={p.stars} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── PROJECT ARCHIVE SECTION ──────────────────────────────────────────────────
function ProjectArchive() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);
  const [gradeFilter, setGradeFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [newProject, setNewProject] = useState({ title: "", student: "", grade: 7, type: "Python", desc: "" });
  const [saving, setSaving] = useState(false);

  const grades = ["All", "4","5","6","7","8","9","10","11"];
  const types  = ["All", "Python", "Scratch", "AI"];

  const filtered = projects.filter(p => {
    const gOk = gradeFilter === "All" || String(p.grade) === gradeFilter;
    const tOk = typeFilter  === "All" || p.type === typeFilter;
    const sOk = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.student.toLowerCase().includes(search.toLowerCase());
    return gOk && tOk && sOk;
  });

  async function handleSave() {
    setSaving(true);
    try {
      // Attempt Supabase insert
      await supabaseFetch("/projects", {
        method: "POST",
        body: JSON.stringify({ ...newProject, grade: Number(newProject.grade), date: new Date().toISOString().slice(0,10), stars: 3 }),
      });
    } catch {
      // Fallback: add locally
    }
    setProjects(prev => [...prev, { ...newProject, id: Date.now(), grade: Number(newProject.grade), date: new Date().toISOString().slice(0,10), stars: 3 }]);
    setShowUpload(false);
    setNewProject({ title: "", student: "", grade: 7, type: "Python", desc: "" });
    setSaving(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Project Archive</h2>
          <p className="text-slate-500 text-sm">{filtered.length} of {projects.length} projects</p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition-colors shadow-md">
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search projects or students…"
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={15} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Grade:</span>
          {grades.map(g => (
            <button key={g} onClick={() => setGradeFilter(g)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${gradeFilter === g ? "bg-blue-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {g}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Type:</span>
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${typeFilter === t ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => {
          const Icon = TYPE_ICONS[p.type] || Code2;
          const tc   = TYPE_COLORS[p.type] || "blue";
          const gc   = GRADE_COLORS[p.grade] || "slate";
          return (
            <div key={p.id} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:border-blue-200 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tc === "blue" ? "bg-blue-100" : tc === "orange" ? "bg-orange-100" : "bg-purple-100"
                }`}>
                  <Icon size={20} className={tc === "blue" ? "text-blue-600" : tc === "orange" ? "text-orange-600" : "text-purple-600"} />
                </div>
                <div className="flex gap-1.5">
                  <Badge color={gc} small>G{p.grade}</Badge>
                  <Badge color={tc === "orange" ? "amber" : tc} small>{p.type}</Badge>
                </div>
              </div>
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">{p.title}</h3>
              <p className="text-slate-500 text-xs mb-3 leading-relaxed">{p.desc}</p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                <div>
                  <p className="text-xs font-semibold text-slate-700">{p.student}</p>
                  <p className="text-xs text-slate-400">{p.date}</p>
                </div>
                <Stars n={p.stars} />
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-slate-400">
            <FolderOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No projects match your filters</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-800">Add New Project</h3>
              <button onClick={() => setShowUpload(false)} className="text-slate-400 hover:text-slate-600"><X size={22} /></button>
            </div>
            <div className="space-y-4">
              {[["title","Project Title"],["student","Student Name"],["desc","Description"]].map(([k,label]) => (
                <div key={k}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                  {k === "desc"
                    ? <textarea value={newProject[k]} onChange={e => setNewProject(p => ({...p,[k]:e.target.value}))} rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none" />
                    : <input value={newProject[k]} onChange={e => setNewProject(p => ({...p,[k]:e.target.value}))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300" />
                  }
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Grade</label>
                  <select value={newProject.grade} onChange={e => setNewProject(p => ({...p,grade:e.target.value}))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    {[4,5,6,7,8,9,10,11].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type</label>
                  <select value={newProject.type} onChange={e => setNewProject(p => ({...p,type:e.target.value}))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
                    {["Python","Scratch","AI"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving || !newProject.title}
                className="flex-1 py-2.5 rounded-xl bg-blue-900 text-white font-semibold hover:bg-blue-800 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {saving ? "Saving…" : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── NEWS RADAR SECTION ───────────────────────────────────────────────────────
function NewsRadar() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [activeQuery, setActiveQuery] = useState(null);

  const QUERIES = [
    { label: "🇯🇵 Japan MoE", query: "Japan Ministry of Education ICT technology 2025" },
    { label: "🇪🇬 Egypt MoE", query: "Egypt Ministry of Education technology 2025" },
    { label: "🌐 EdTech Global", query: "educational technology AI schools 2025" },
    { label: "🤖 AI & Schools", query: "artificial intelligence classroom learning 2025" },
  ];

  const fetchNews = useCallback(async (q) => {
    setLoading(true);
    setError("");
    setActiveQuery(q.label);
    try {
      const results = await fetchICTNews(q.query);
      setArticles(results);
    } catch {
      setError("Could not fetch news. Check your Tavily API key or network connection.");
      // Show mock articles for demo
      setArticles([
        { title: "Japan Launches AI-First Curriculum for All Public Schools", url: "#", content: "Japan's Ministry of Education announces a sweeping update to school curricula, integrating artificial intelligence and computational thinking from Grade 1.", published_date: "2025-05-10", source: "EdTech Japan" },
        { title: "Egypt's Smart Classrooms Initiative Reaches 500 Schools", url: "#", content: "The Egyptian Ministry of Education's digital transformation program has now equipped over 500 schools with smart boards and high-speed internet.", published_date: "2025-05-08", source: "Egypt Today" },
        { title: "Scratch 4.0 Beta: What Teachers Need to Know", url: "#", content: "MIT Media Lab releases Scratch 4.0 beta with AI extensions and collaborative features, enabling students to build AI models visually.", published_date: "2025-05-05", source: "EdSurge" },
      ]);
    }
    setLoading(false);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">ICT News Radar</h2>
          <p className="text-slate-500 text-sm">Live news from global education ministries via Tavily</p>
        </div>
        {activeQuery && (
          <button onClick={() => fetchNews(QUERIES.find(q => q.label === activeQuery))}
            className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline">
            <RefreshCw size={14} /> Refresh
          </button>
        )}
      </div>

      {/* Query buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUERIES.map(q => (
          <button key={q.label} onClick={() => fetchNews(q)}
            className={`p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md ${
              activeQuery === q.label ? "border-blue-600 bg-blue-50" : "border-slate-100 bg-white hover:border-blue-200"
            }`}>
            <p className="font-bold text-slate-800 text-sm">{q.label}</p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{q.query}</p>
          </button>
        ))}
      </div>

      {!activeQuery && !loading && (
        <div className="text-center py-20 text-slate-400">
          <Globe size={48} className="mx-auto mb-4 opacity-30" />
          <p className="font-semibold text-lg">Select a news source above</p>
          <p className="text-sm">Results are fetched live from the web via Tavily</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-20">
          <Loader2 size={40} className="mx-auto animate-spin text-blue-500 mb-4" />
          <p className="text-slate-500 font-medium">Fetching latest news…</p>
        </div>
      )}

      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 text-sm">
          ⚠️ {error} — Showing demo articles below.
        </div>
      )}

      {articles.length > 0 && !loading && (
        <div className="space-y-4">
          {articles.map((a, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:border-blue-200 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Newspaper size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <a href={a.url} target="_blank" rel="noopener noreferrer"
                    className="font-bold text-slate-800 hover:text-blue-700 transition-colors flex items-start gap-1.5 group">
                    <span>{a.title}</span>
                    <ExternalLink size={13} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-3">{a.content}</p>
                  <div className="flex items-center gap-3 mt-3">
                    {a.source && <Badge color="blue" small>{a.source}</Badge>}
                    {a.published_date && <span className="text-xs text-slate-400">{a.published_date}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAGAZINE SECTION ─────────────────────────────────────────────────────────
function Magazine() {
  return (
    <div className="space-y-8">
      {/* Cover */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-700 p-8 text-white min-h-[220px] flex flex-col justify-end shadow-2xl">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="absolute top-6 right-6 opacity-20">
          <BookOpen size={80} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge color="emerald">Monthly Edition</Badge>
            <span className="text-blue-200 text-sm">May 2026</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight leading-none mb-2">ICT PULSE</h1>
          <p className="text-blue-100 text-lg">The monthly digest for innovative ICT education</p>
        </div>
      </div>

      {/* Featured articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MAGAZINE_HIGHLIGHTS.map((item, i) => (
          <div key={i} className={`rounded-2xl p-6 border-2 hover:shadow-lg transition-all cursor-pointer ${
            item.color === "blue"    ? "bg-blue-50 border-blue-100 hover:border-blue-300" :
            item.color === "emerald" ? "bg-emerald-50 border-emerald-100 hover:border-emerald-300" :
            item.color === "purple"  ? "bg-purple-50 border-purple-100 hover:border-purple-300" :
                                       "bg-amber-50 border-amber-100 hover:border-amber-300"
          } ${i === 0 ? "md:col-span-2" : ""}`}>
            <div className="flex items-start gap-4">
              <span className="text-4xl">{item.emoji}</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge color={item.color} small>{item.tag}</Badge>
                </div>
                <h3 className={`font-black text-slate-800 mb-2 ${i === 0 ? "text-xl" : "text-base"}`}>{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <div className="bg-gradient-to-r from-blue-900 to-emerald-800 rounded-2xl p-6 text-white">
        <h3 className="font-bold text-lg mb-5 text-blue-100">May 2026 in Numbers</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[["47", "Projects Submitted"],["3","Competitions Won"],["8","Grades Active"],["2","New Partnerships"]].map(([n,l]) => (
            <div key={l} className="text-center">
              <p className="text-4xl font-black text-white">{n}</p>
              <p className="text-blue-200 text-xs mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", label: "Dashboard",       icon: LayoutDashboard },
  { id: "archive",   label: "Project Archive", icon: FolderOpen },
  { id: "news",      label: "ICT News Radar",  icon: Newspaper },
  { id: "magazine",  label: "Monthly Magazine",icon: BookOpen },
];

function Sidebar({ active, setActive, open, setOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-950 to-blue-900 text-white z-40 flex flex-col transition-transform duration-300 shadow-2xl
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:h-auto lg:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="font-black text-white text-lg leading-none">ICT Agent</p>
              <p className="text-blue-300 text-xs mt-0.5">Teacher Dashboard</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActive(id); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                active === id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40"
                  : "text-blue-200 hover:bg-blue-800 hover:text-white"
              }`}>
              <Icon size={18} />
              {label}
              {active === id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>

        {/* Competition Alert */}
        <div className="p-4">
          <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={14} className="text-red-300" />
              <span className="text-red-200 text-xs font-bold uppercase tracking-wide">Urgent</span>
            </div>
            <p className="text-white text-xs font-semibold">ISEF 2025 in <span className="text-red-300 font-black">4 days!</span></p>
            <p className="text-blue-300 text-xs mt-0.5">Finalize student submissions</p>
          </div>
        </div>

        {/* Teacher info */}
        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">T</div>
            <div>
              <p className="text-white text-sm font-semibold">ICT Teacher</p>
              <p className="text-blue-300 text-xs">Grades 4–11 · Minya</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SECTIONS = { dashboard: Dashboard, archive: ProjectArchive, news: NewsRadar, magazine: Magazine };
  const Section = SECTIONS[active] || Dashboard;

  return (
    <div className="min-h-screen bg-slate-50 flex" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      <Sidebar active={active} setActive={setActive} open={sidebarOpen} setOpen={setSidebarOpen} />

      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 bg-white/80 backdrop-blur border-b border-slate-100 z-20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-800">
              <Menu size={22} />
            </button>
            <div>
              <h1 className="text-slate-800 font-bold">{NAV.find(n => n.id === active)?.label}</h1>
              <p className="text-slate-400 text-xs hidden sm:block">Monday, May 11, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-slate-500 hover:text-slate-800 p-2">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-sm">T</div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 max-w-5xl w-full mx-auto">
          <Section />
        </div>
      </main>
    </div>
  );
}
 */}
      <h1>ICT Agent Dashboard Is Ready!</h1>
    </div>
  );
}

export default App;
