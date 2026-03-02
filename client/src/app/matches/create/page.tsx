'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateMatch() {
  const [formData, setFormData] = useState({ ground_id: '2be885d5-a78f-4ce2-b6b2-797295676432', match_date: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      // CODESPACES FIX: Using the forwarded address instead of localhost
      const res = await fetch('https://congenial-space-tribble-r4pp554jvr6535xvx-5000.app.github.dev/api/v1/matches/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Redirect back to the dashboard to see your new match card
        router.push('/'); 
      } else {
        alert("Server responded with an error. Ensure you are logged in.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Failed to connect to the backend. Please check your Ports tab.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-emerald-400">Host a Match 🏏</h2>
        
        <label className="block text-sm font-medium mb-2 text-slate-400">Select Ground ID</label>
        <input 
          type="text" 
          placeholder="e.g. G1"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4 focus:border-emerald-500 outline-none"
          onChange={(e) => setFormData({...formData, ground_id: e.target.value})}
          required
        />

        <label className="block text-sm font-medium mb-2 text-slate-400">Match Date</label>
        <input 
          type="date" 
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mb-6 focus:border-emerald-500 outline-none text-white"
          onChange={(e) => setFormData({...formData, match_date: e.target.value})}
          required
        />

        <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95">
          Create Match
        </button>
      </form>
    </main>
  );
}