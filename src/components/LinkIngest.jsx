import React, { useState } from 'react'

function LinkIngest() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState('')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch(`${baseUrl}/api/match-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })
      const data = await res.json()
      setStatus(`Received link`) // keep simple
    } catch (e) {
      setStatus('Failed to send link')
    }
  }

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-3">Link a live match page</h3>
      <form onSubmit={submit} className="flex gap-3">
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste rezultati/flashscore link"
               className="flex-1 bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4">Send</button>
      </form>
      {status && <p className="text-blue-200 text-sm mt-2">{status}</p>}
    </div>
  )
}

export default LinkIngest
