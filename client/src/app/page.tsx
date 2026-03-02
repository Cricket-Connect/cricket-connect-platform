'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import MatchCard from '@/components/MatchCard';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // NEW: Error state

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Attempt to connect to your Node.js server
        const res = await fetch('https://congenial-space-tribble-r4pp554jvr6535xvx-5000.app.github.dev/api/v1/matches');
        
        if (!res.ok) throw new Error("Backend is unreachable");

        const data = await res.json();
        if (data.success) {
          setMatches(data.data);
          setError(null);
        }
      } catch (err) {
        // This catches the 'Failed to fetch' error from your screenshot
        console.error("Connection Error:", err);
        setError("Backend Server Offline (Port 5000)");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      {/* --- ELITE HEADER --- */}
      <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tighter">
            CRICKET CONNECT
          </h1>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Verification Engine v1.0</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/leaderboard" className="text-slate-400 hover:text-white text-sm font-semibold transition-colors">
            Leaderboard
          </Link>
          <Link href="/matches/create" className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
            + Host a Match
          </Link>
          <div className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 text-sm font-medium">
            Lead Dev: <span className="text-emerald-400">Anuj Kumar</span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              Live & Upcoming
            </h2>
            <p className="text-slate-500 text-sm mt-1">Real-time matches verified by AI scoring engine</p>
          </div>
          <span className="text-xs text-slate-600 font-mono">NODE_ENV: production_ready</span>
        </div>

        {/* --- DYNAMIC LOADING / ERROR / CONTENT STATES --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-500 font-medium">Syncing with PostgreSQL...</p>
          </div>
        ) : error ? (
          /* --- ERROR STATE: Shown if Port 5000 is down --- */
          <div className="text-center py-20 bg-rose-900/10 border border-rose-900/30 rounded-3xl">
            <p className="text-rose-400 font-bold mb-2">⚠️ {error}</p>
            <p className="text-slate-500 text-sm">Please ensure 'node src/app.js' is running in Terminal 1.</p>
          </div>
        ) : matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {matches.map((m: any) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="text-center py-24 bg-slate-800/50 rounded-3xl border border-slate-800">
            <p className="text-5xl mb-6">🏏</p>
            <h3 className="text-xl font-bold mb-2">No active matches found</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Be the first to host a match on the platform and test the AI reliability verification.
            </p>
            <Link href="/matches/create" className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all">
              Create First Match
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}