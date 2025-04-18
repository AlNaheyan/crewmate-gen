import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Cosmic Crew Creator</span>
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Create Crewmate
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/crewmates" className="nav-link">
              View Crew
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
