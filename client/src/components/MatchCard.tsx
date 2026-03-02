interface MatchProps {
  match: {
    id: string;
    match_date: string;
    status: string;
    team_a_score: number;
    team_b_score: number;
  }
}

export default function MatchCard({ match }: MatchProps) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl hover:border-emerald-500 transition-all">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded uppercase tracking-wider">
          {match.status}
        </span>
        <span className="text-slate-400 text-sm">{match.match_date}</span>
      </div>
      <div className="flex justify-between items-center gap-8">
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase">Team A</p>
          <p className="text-2xl font-bold text-white">{match.team_a_score}</p>
        </div>
        <div className="text-slate-600 font-bold">VS</div>
        <div className="text-center">
          <p className="text-slate-400 text-xs mb-1 uppercase">Team B</p>
          <p className="text-2xl font-bold text-white">{match.team_b_score}</p>
        </div>
      </div>
      <button className="w-full mt-6 py-2 bg-slate-700 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors">
        View Details
      </button>
    </div>
  );
}