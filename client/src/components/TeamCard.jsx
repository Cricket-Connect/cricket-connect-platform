import React from "react";
import { useNavigate } from "react-router-dom";
import { joinTeam } from "../services/api";
import "../styles/cards.css";

export default function TeamCard({ team }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleJoin = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await joinTeam(team._id);
      window.location.reload();
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTeam = () => {
    navigate(`/team/${team._id}`);
  };

  return (
    <div className="card team-card" onClick={handleViewTeam}>
      <h3>{team.name}</h3>
      <p>Captain: {team.captainId?.name}</p>
      <p>Members: {team.members?.length || 0}</p>
      <button onClick={handleJoin} disabled={loading} className="join-btn">
        {loading ? "Joining..." : "Join Team"}
      </button>
    </div>
  );
}
