"use client"

import { useNavigate } from "react-router-dom"

function CrewmateList({ crewmates, loading }) {
  const navigate = useNavigate()

  if (loading) {
    return <div className="loading">Loading crew members...</div>
  }

  return (
    <div className="crewmate-list">
      <h2>Your Cosmic Crew</h2>
      <p className="specialText"> *refresh to see updates*</p>

      {crewmates.length === 0 ? (
        <div className="empty-state">
          <p>You haven't created any crewmates yet!</p>
          <button className="btn btn-primary" onClick={() => navigate("/create")}>
            Create Your First Crewmate
          </button>
        </div>
      ) : (
        <div className="crewmates-grid">
          {crewmates.map((crewmate) => (
            <div
              key={crewmate.id}
              className="crewmate-card"
              onClick={() => navigate(`/crewmates/${crewmate.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className="crewmate-avatar" style={{ backgroundColor: crewmate.color }}>
                {crewmate.name.charAt(0)}
              </div>
              <div className="crewmate-info">
                <h3>{crewmate.name}</h3>
                <p>{crewmate.role}</p>
                <div className="crewmate-actions">
                  <button
                    className="btn btn-small"
                    onClick={(e) => {
                      e.stopPropagation()
                      navigate(`/crewmates/${crewmate.id}/edit`)
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CrewmateList
