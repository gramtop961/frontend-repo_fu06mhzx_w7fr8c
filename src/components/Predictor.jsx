import React, { useState } from 'react'

function Predictor() {
  const [homeTeam, setHomeTeam] = useState('Home FC')
  const [awayTeam, setAwayTeam] = useState('Away United')
  const [minute, setMinute] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [isNeutral, setIsNeutral] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const predict = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ home_team: homeTeam, away_team: awayTeam, minute: Number(minute), home_score: Number(homeScore), away_score: Number(awayScore), is_neutral: isNeutral })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: 'Prediction failed' })
    } finally {
      setLoading(false)
    }
  }

  const pct = (x) => `${Math.round((x || 0)*100)}%`

  return (
    <div className="bg-slate-800/50 border border-blue-500/20 rounded-2xl p-6">
      <h3 className="text-white text-xl font-semibold mb-4">Live Match Predictor</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input value={homeTeam} onChange={e=>setHomeTeam(e.target.value)} className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" placeholder="Home team" />
            <input value={awayTeam} onChange={e=>setAwayTeam(e.target.value)} className="bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" placeholder="Away team" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-blue-200 text-sm">Minute</label>
              <input type="number" value={minute} onChange={e=>setMinute(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            </div>
            <div>
              <label className="text-blue-200 text-sm">Home</label>
              <input type="number" value={homeScore} onChange={e=>setHomeScore(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            </div>
            <div>
              <label className="text-blue-200 text-sm">Away</label>
              <input type="number" value={awayScore} onChange={e=>setAwayScore(e.target.value)} className="w-full bg-slate-900 text-white rounded px-3 py-2 border border-slate-700" />
            </div>
          </div>
          <label className="inline-flex items-center gap-2 text-blue-200 text-sm">
            <input type="checkbox" checked={isNeutral} onChange={e=>setIsNeutral(e.target.checked)} /> Neutral venue
          </label>
          <button onClick={predict} className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2">{loading ? 'Predicting...' : 'Predict'}</button>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700">
          {result ? (
            result.error ? (
              <p className="text-red-300">{result.error}</p>
            ) : (
              <div>
                <p className="text-blue-200 text-sm">Effective rating diff: <span className="font-mono">{result.effective_diff}</span></p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-white">
                    <span>Home Win</span>
                    <span className="font-semibold">{pct(result.p_home)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-green-500 rounded" style={{ width: pct(result.p_home) }} />
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>Draw</span>
                    <span className="font-semibold">{pct(result.p_draw)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-yellow-500 rounded" style={{ width: pct(result.p_draw) }} />
                  </div>
                  <div className="flex items-center justify-between text-white">
                    <span>Away Win</span>
                    <span className="font-semibold">{pct(result.p_away)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded">
                    <div className="h-2 bg-red-500 rounded" style={{ width: pct(result.p_away) }} />
                  </div>
                </div>
              </div>
            )
          ) : (
            <p className="text-blue-200">Enter details and click Predict to see probabilities.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Predictor
