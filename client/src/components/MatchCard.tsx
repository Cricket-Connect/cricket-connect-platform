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
    <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-xl">
      {/* ... keep existing score display ... */}

      {match.status === 'VERIFIED' && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            Blockchain Verified
          </div>
          <p className="text-[10px] text-slate-500 truncate mt-1">Hash: {match.blockchain_tx_hash}</p>
        </div>
      )}
      
      {match.status !== 'VERIFIED' && (
        <a href={`/matches/${match.id}/score`} className="block text-center w-full mt-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm">
          Open Scorer
        </a>
      )}
    </div>
  );
}