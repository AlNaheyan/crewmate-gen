"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "../supabase"

function CrewmateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCrewmate = async () => {
      try {
        const { data: foundCrewmate, error } = await supabase
          .from("crewmates")
          .select("*")
          .eq("id", id)
          .single()

        if (error || !foundCrewmate) {
          console.error("Error fetching crewmate:", error)
          navigate("/crewmates")
          return
        }

        setCrewmate(foundCrewmate)
      } catch (error) {
        console.error("Error fetching crewmate:", error)
        navigate("/crewmates")
      } finally {
        setLoading(false)
      }
    }

    fetchCrewmate()
  }, [id, navigate])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this crewmate?")) {
      const { error } = await supabase.from("crewmates").delete().eq("id", id)

      if (error) {
        console.error("Error deleting crewmate:", error)
        alert("Failed to delete crewmate.")
        return
      }

      navigate("/crewmates")
    }
  }

  if (loading) {
    return <div className="loading">Loading crewmate details...</div>
  }

  if (!crewmate) {
    return <div className="error">Crewmate not found</div>
  }

  return (
    <div className="crewmate-detail">
      <div className="detail-header">
        <h2>{crewmate.name}</h2>
        <div className="detail-actions">
          <Link to={`/crewmates/${id}/edit`} className="btn btn-secondary">
            Edit Crewmate
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete Crewmate
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-avatar" style={{ backgroundColor: crewmate.color }}>
          {crewmate.name.charAt(0)}
        </div>

        <div className="detail-info">
          <div className="info-item">
            <h3>Role</h3>
            <p>{crewmate.role}</p>
          </div>

          <div className="info-item">
            <h3>Specialty</h3>
            <p>{crewmate.specialty}</p>
          </div>

          <div className="info-item">
            <h3>Color</h3>
            <div className="color-display" style={{ backgroundColor: crewmate.color }}>
              {crewmate.color}
            </div>
          </div>

          <div className="info-item">
            <h3>Created</h3>
            <p>{new Date(crewmate.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="detail-footer">
        <Link to="/crewmates" className="btn btn-text">
          Back to Crew List
        </Link>
      </div>
    </div>
  )
}

export default CrewmateDetail
