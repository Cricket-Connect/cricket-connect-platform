import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTeam, getMessages } from "../services/api";
import ChatBox from "../components/ChatBox";
import "../styles/teamPage.css";

export default function TeamPage() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, [id]);

  const fetchTeam = async () => {
    try {
      const response = await getTeam(id);
      setTeam(response.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="team-page">Loading...</div>;
  if (!team) return <div className="team-page">Team not found</div>;

  return (
    <div className="team-page">
      <div className="team-info">
        <h1>{team.name}</h1>
        <p>Members: {team.members?.length || 0}</p>
        <div className="members-list">
          <h3>Team Members</h3>
          {team.members?.map((member) => (
            <div key={member._id} className="member">
              {member.name} ({member.email})
            </div>
          ))}
        </div>
      </div>

      <ChatBox roomId={id} />
    </div>
  );
}
