'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function ScoringConsole() {
  const { id } = useParams();
  const router = useRouter();
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Update Score Function
  const updateScore = async (runs: number) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    const res = await fetch(`http://localhost:5000/api/v1/matches/${id}/score`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ team_a_score: (match.team_a_score || 0) + runs }),
    });

    const data = await res.json();
    if (data.success) setMatch(data.data);
    setLoading(false);
  };

  // Finalize Match
  const finishMatch = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/v1/matches/${id}/finish`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) router.push('/');
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-emerald-400">Live Scoring Console 🏏</h1>
        
        <div className="flex justify-around items-center py-10 bg-slate-900 rounded-2xl mb-8 border border-slate-800">
          <div className="text-center">
            <p className="text-slate-500 uppercase text-xs tracking-widest mb-2">Team A Score</p>
            <p className="text-6xl font-black">{match?.team_a_score || 0}</p>
          </div>
          <div className="h-16 w-[2px] bg-slate-800"></div>
          <div className="text-center">
            <p className="text-slate-500 uppercase text-xs tracking-widest mb-2">AI Reliability</p>
            <p className={`text-2xl font-bold ${match?.reliability_score > 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {match?.reliability_score || 100}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3, 4, 6].map((run) => (
            <button key={run} onClick={() => updateScore(run)} disabled={loading}
              className="py-6 bg-slate-700 hover:bg-emerald-600 rounded-xl text-2xl font-bold transition-all active:scale-95">
              +{run}
            </button>
          ))}
          <button className="py-6 bg-rose-900/30 text-rose-400 border border-rose-900/50 rounded-xl text-2xl font-bold">W</button>
        </div>

        <button onClick={finishMatch} className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-lg shadow-lg">
          Complete Match & Verify
        </button>
      </div>
    </main>
  );
}