import React, { useState } from 'react'

function RatingManager({ onSaved }) {
  const [teamName, setTeamName] = useState('')
  const [rating, setRating] = useState(1500)
  const [status, setStatus] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const save = async (e) => {
    e.preventDefault()
    setStatus('Saving...')
    try {
      const res = await fetch(`${baseUrl}/api/teams/rating`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ team_name: teamName, rating: Number(rating) })
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setStatus(`Saved: ${data.status}`)
      onSaved && onSaved()
    } catch (e) {
      setStatus('Error saving rating')
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Set/Update Team Rating</h3>
      <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="Team name"
               className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" required />
        <input type="number" value={rating} onChange={e=>setRating(e.target.value)} placeholder="Rating (Elo)"
               className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" required />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4">Save</button>
      </form>
      {status && <p className="text-blue-200 text-sm mt-2">{status}</p>}
    </div>
  )
}

export default RatingManager
