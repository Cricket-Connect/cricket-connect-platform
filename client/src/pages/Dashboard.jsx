import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllTeams,
  createTeam,
  getAllMatches,
  createMatch,
} from "../services/api";
import { useAuth } from "../context/AuthContext";
import TeamCard from "../components/TeamCard";
import MatchCard from "../components/MatchCard";
import "../styles/dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [showTeamForm, setShowTeamForm] = useState(false);
  const [showMatchForm, setShowMatchForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [matchData, setMatchData] = useState({
    title: "",
    maxPlayers: "",
    location: "",
    dateTime: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teamsRes = await getAllTeams();
      const matchesRes = await getAllMatches();
      setTeams(teamsRes.data);
      setMatches(matchesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await createTeam({ name: teamName });
      setTeamName("");
      setShowTeamForm(false);
      fetchData();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleCreateMatch = async (e) => {
    e.preventDefault();
    try {
      await createMatch(matchData);
      setMatchData({
        title: "",
        maxPlayers: "",
        location: "",
        dateTime: "",
      });
      setShowMatchForm(false);
      fetchData();
    } catch (error) {
      console.error("Error creating match:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="dashboard">Loading...</div>;

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h1>Cricket Connect</h1>
        <div>
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <section className="section">
          <div className="section-header">
            <h2>Teams</h2>
            <button onClick={() => setShowTeamForm(!showTeamForm)}>
              {showTeamForm ? "Cancel" : "Create Team"}
            </button>
          </div>

          {showTeamForm && (
            <form onSubmit={handleCreateTeam} className="form">
              <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
              <button type="submit">Create</button>
            </form>
          )}

          <div className="cards-grid">
            {teams.length > 0 ? (
              teams.map((team) => <TeamCard key={team._id} team={team} />)
            ) : (
              <p>No teams available</p>
            )}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <h2>Matches</h2>
            <button onClick={() => setShowMatchForm(!showMatchForm)}>
              {showMatchForm ? "Cancel" : "Create Match"}
            </button>
          </div>

          {showMatchForm && (
            <form onSubmit={handleCreateMatch} className="form">
              <input
                type="text"
                placeholder="Match Title"
                value={matchData.title}
                onChange={(e) =>
                  setMatchData({ ...matchData, title: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Max Players"
                value={matchData.maxPlayers}
                onChange={(e) =>
                  setMatchData({ ...matchData, maxPlayers: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={matchData.location}
                onChange={(e) =>
                  setMatchData({ ...matchData, location: e.target.value })
                }
                required
              />
              <input
                type="datetime-local"
                value={matchData.dateTime}
                onChange={(e) =>
                  setMatchData({ ...matchData, dateTime: e.target.value })
                }
                required
              />
              <button type="submit">Create</button>
            </form>
          )}

          <div className="cards-grid">
            {matches.length > 0 ? (
              matches.map((match) => <MatchCard key={match._id} match={match} />)
            ) : (
              <p>No matches available</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
