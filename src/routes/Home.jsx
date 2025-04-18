import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to Cosmic Crew Creator</h1>
        <p>Build your dream space team by creating custom crewmates!</p>
        <div className="hero-buttons">
          <Link to="/create" className="btn btn-primary">
            Create Crewmate
          </Link>
          <Link to="/crewmates" className="btn btn-secondary">
            View Your Crew
          </Link>
        </div>
      </div>
      <div className="features">
        <div className="feature">
          <div className="feature-icon">🚀</div>
          <h3>Create</h3>
          <p>Design unique crewmates with custom attributes</p>
        </div>
        <div className="feature">
          <div className="feature-icon">👨‍🚀</div>
          <h3>Customize</h3>
          <p>Choose colors, roles, and specialties</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🌌</div>
          <h3>Collect</h3>
          <p>Build your ultimate space exploration team</p>
        </div>
      </div>
    </div>
  )
}

export default Home
