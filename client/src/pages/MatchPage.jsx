import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMatch, joinMatch } from "../services/api";
import "../styles/matchPage.css";

export default function MatchPage() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const fetchMatch = async () => {
    try {
      const response = await getMatch(id);
      setMatch(response.data);
    } catch (error) {
      console.error("Error fetching match:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMatch = async () => {
    setJoining(true);
    try {
      await joinMatch(id);
      fetchMatch();
    } catch (error) {
      console.error("Error joining match:", error);
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <div className="match-page">Loading...</div>;
  if (!match) return <div className="match-page">Match not found</div>;

  return (
    <div className="match-page">
      <div className="match-info">
        <h1>{match.title}</h1>
        <p>Location: {match.location}</p>
        <p>Date & Time: {new Date(match.dateTime).toLocaleString()}</p>
        <p>
          Players: {match.playersJoined?.length || 0} / {match.maxPlayers}
        </p>
        <p>Status: {match.status}</p>

        <button
          onClick={handleJoinMatch}
          disabled={joining || match.status === "full"}
          className="join-btn"
        >
          {joining ? "Joining..." : "Join Match"}
        </button>

        <div className="players-list">
          <h3>Players Joined</h3>
          {match.playersJoined?.map((player) => (
            <div key={player._id} className="player">
              {player.name} ({player.email})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
