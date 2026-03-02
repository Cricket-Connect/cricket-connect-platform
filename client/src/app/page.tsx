'use client';
import { useEffect, useState } from 'react';
import MatchCard from '@/components/MatchCard';

export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/matches')
      .then(res => res.json())
      .then(res => {
        if (res.success) setMatches(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Cricket Connect
        </h1>
        <div className="px-4 py-2 bg-slate-800 rounded-full border border-slate-700 text-sm">
          Lead Dev: <span className="text-emerald-400">Anuj Kumar</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Live & Upcoming Matches
        </h2>

        {loading ? (
          <p className="text-slate-500">Loading your matches...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((m: any) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}