"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "../supabase"

function EditCrewmate() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [color, setColor] = useState("")
  const [specialty, setSpecialty] = useState("")

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

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data: crewmate, error } = await supabase
          .from("crewmates")
          .select("*")
          .eq("id", id)
          .single()

        if (error || !crewmate) {
          console.error("Error fetching crewmate:", error)
          navigate("/crewmates")
          return
        }

        setName(crewmate.name)
        setRole(crewmate.role)
        setColor(crewmate.color)
        setSpecialty(crewmate.specialty)
      } catch (error) {
        console.error("Error fetching crewmate:", error)
        navigate("/crewmates")
      } finally {
        setLoading(false)
      }
    }

    fetchCrewmate()
  }, [id, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      alert("Please enter a name for your crewmate")
      return
    }

    const { error } = await supabase
      .from("crewmates")
      .update({
        name,
        role,
        color,
        specialty,
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating crewmate:", error)
      alert("Failed to update crewmate.")
      return
    }

    navigate(`/crewmates/${id}`)
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      const { error } = await supabase
        .from("crewmates")
        .delete()
        .eq("id", id)

      if (error) {
        console.error("Error deleting crewmate:", error)
        alert("Failed to delete crewmate.")
        return
      }

      navigate("/crewmates")
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmate data...</div>
  }

  return (
    <div className="edit-crewmate">
      <h2>Edit Crewmate</h2>
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

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Update Crewmate
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Delete Crewmate
          </button>
          <Link to={`/crewmates/${id}`} className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}

export default EditCrewmate
