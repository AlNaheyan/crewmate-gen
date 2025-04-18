"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateCrewmate({ addCrewmate }) {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [role, setRole] = useState("Captain")
  const [color, setColor] = useState("blue")
  const [specialty, setSpecialty] = useState("Navigation")

  const colorOptions = ["blue", "red", "green", "yellow", "purple", "orange", "pink", "cyan", "lime", "brown"]

  const roleOptions = ["Captain", "Engineer", "Scientist", "Pilot", "Doctor", "Security", "Communications", "Botanist"]

  const specialtyOptions = [
    "Navigation",
    "Repairs",
    "Research",
    "Combat",
    "Medicine",
    "Diplomacy",
    "Exploration",
    "Botany",
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a name for your crewmate")
      return
    }

    const newCrewmate = {
      name,
      role,
      color,
      specialty,
    }

    await addCrewmate(newCrewmate)
    navigate("/crewmates")
  }

  return (
    <div className="create-crewmate">
      <h2>Create New Crewmate</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate name"
            required
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <div className="option-buttons">
            {roleOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`option-button ${role === option ? "selected" : ""}`}
                onClick={() => setRole(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Color:</label>
          <div className="color-options">
            {colorOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`color-button ${color === option ? "selected" : ""}`}
                style={{ backgroundColor: option }}
                onClick={() => setColor(option)}
                aria-label={option}
              />
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Specialty:</label>
          <div className="option-buttons">
            {specialtyOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`option-button ${specialty === option ? "selected" : ""}`}
                onClick={() => setSpecialty(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="preview">
          <h3>Preview:</h3>
          <div className="crewmate-preview">
            <div className="crewmate-avatar" style={{ backgroundColor: color }}>
              {name.charAt(0) || "?"}
            </div>
            <div className="crewmate-info">
              <h4>{name || "Unnamed Crewmate"}</h4>
              <p>
                {role} • {specialty}
              </p>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Create Crewmate
        </button>
      </form>
    </div>
  )
}

export default CreateCrewmate
