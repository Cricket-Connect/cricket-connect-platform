import React from "react";
import { useNavigate } from "react-router-dom";
import { joinMatch } from "../services/api";
import "../styles/cards.css";

export default function MatchCard({ match }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleJoin = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await joinMatch(match._id);
      window.location.reload();
    } catch (error) {
      console.error("Error joining match:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMatch = () => {
    navigate(`/match/${match._id}`);
  };

  return (
    <div className="card match-card" onClick={handleViewMatch}>
      <h3>{match.title}</h3>
      <p>Location: {match.location}</p>
      <p>Date: {new Date(match.dateTime).toLocaleDateString()}</p>
      <p>
        Players: {match.playersJoined?.length || 0} / {match.maxPlayers}
      </p>
      <p className="status">Status: {match.status}</p>
      <button onClick={handleJoin} disabled={loading} className="join-btn">
        {loading ? "Joining..." : "Join Match"}
      </button>
    </div>
  );
}
