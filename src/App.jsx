import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabase';

import Home from './routes/Home';
import CreateCrewmate from './routes/createCrew';
import CrewmateList from './routes/crewList';
import CrewmateDetail from './routes/crewDetail';
import EditCrewmate from './routes/editCrew';
import Navbar from "./components/Navbar"
import "./App.css"

function App() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCrewmates()
  }, [])

  const fetchCrewmates = async () => {
    try {
      const { data } = await supabase.from("crewmates").select().order("created_at", { ascending: false })

      setCrewmates(data || [])
    } catch (error) {
      console.error("Error fetching crewmates:", error)
    } finally {
      setLoading(false)
    }
  }

  const addCrewmate = async (newCrewmate) => {
    try {
      await supabase.from("crewmates").insert(newCrewmate)

      fetchCrewmates()
    } catch (error) {
      console.error("Error adding crewmate:", error)
    }
  }

  const updateCrewmate = async (id, updatedCrewmate) => {
    try {
      await supabase.from("crewmates").update(updatedCrewmate).eq("id", id)

      fetchCrewmates()
    } catch (error) {
      console.error("Error updating crewmate:", error)
    }
  }

  const deleteCrewmate = async (id) => {
    try {
      await supabase.from("crewmates").delete().eq("id", id)

      fetchCrewmates()
    } catch (error) {
      console.error("Error deleting crewmate:", error)
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate addCrewmate={addCrewmate} />} />
            <Route path="/crewmates" element={<CrewmateList crewmates={crewmates} loading={loading} />} />
            <Route path="/crewmates/:id" element={<CrewmateDetail deleteCrewmate={deleteCrewmate} />} />
            <Route path="/crewmates/:id/edit" element={<EditCrewmate updateCrewmate={updateCrewmate} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
