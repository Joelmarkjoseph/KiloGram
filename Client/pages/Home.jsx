import React from "react";
import { FaUsers, FaConnectdevelop, FaHandshake } from "react-icons/fa";
import "./Home.css"; // Add styles for creativity

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to KiloGram</h1>
        <p>Connecting people, building relationships, sharing moments.</p>
      </header>

      <section className="networking-section">
        <div className="networking-card">
          <FaUsers className="icon" />
          <h2>Join the Community</h2>
          <p>Connect with millions of people across the globe.</p>
        </div>

        <div className="networking-card">
          <FaConnectdevelop className="icon" />
          <h2>Build Networks</h2>
          <p>Expand your professional and personal circles with ease.</p>
        </div>

        <div className="networking-card">
          <FaHandshake className="icon" />
          <h2>Collaborate & Grow</h2>
          <p>Share knowledge, work together, and grow stronger.</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>Start your journey with KiloGram today!</p>
      </footer>
    </div>
  );
}

export default Home;
