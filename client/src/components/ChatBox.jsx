import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { getMessages } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/chatBox.css";

export default function ChatBox({ roomId }) {
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial messages
    fetchMessages();

    // Initialize socket with dynamic URL
    let socketURL = "http://localhost:5000";
    if (typeof window !== "undefined") {
      const protocol = window.location.protocol; // 'https:' or 'http:'
      const hostname = window.location.hostname;
      
      // Check if we're on GitHub Codespaces
      if (hostname.includes(".app.github.dev")) {
        // Replace the port number in the subdomain
        const backendHost = hostname.replace(
          /-\d+\.app\.github\.dev$/,
          "-5000.app.github.dev"
        );
        // Use HTTPS for Codespaces
        socketURL = `https://${backendHost}`;
      } else if (hostname.includes(".amazonaws.com")) {
        socketURL = `https://${hostname}:5000`;
      } else if (hostname.includes("vercel.app") || hostname.includes("netlify.app")) {
        socketURL = `https://${hostname}`;
      }
    }

    console.log("Socket URL:", socketURL);

    const newSocket = io(socketURL, {
      auth: {
        token,
      },
      secure: socketURL.startsWith("https"),
      rejectUnauthorized: false,
    });

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("join_room", { roomId });
    });

    newSocket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, token]);

  const fetchMessages = async () => {
    try {
      const response = await getMessages(roomId);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    socket.emit("send_message", {
      roomId,
      content: input,
    });

    setInput("");
  };

  if (loading) return <div className="chat-box">Loading messages...</div>;

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h2>Team Chat</h2>
      </div>

      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${
                msg.senderId._id === user?.id ? "own" : "other"
              }`}
            >
              <span className="sender">{msg.senderId.name}</span>
              <p>{msg.content}</p>
              <span className="time">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet</p>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-form">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
