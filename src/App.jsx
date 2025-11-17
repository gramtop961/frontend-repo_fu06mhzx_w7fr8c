import React from 'react'
import Header from './components/Header'
import Predictor from './components/Predictor'
import RatingManager from './components/RatingManager'
import LinkIngest from './components/LinkIngest'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.07),transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto p-6 md:p-10">
        <Header />

        <div className="grid grid-cols-1 gap-6">
          <Predictor />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RatingManager />
            <LinkIngest />
          </div>
        </div>

        <p className="text-center text-blue-200/80 text-sm mt-8">
          Tip: Set team ratings once, then enter the live state to see win/draw/lose chances.
        </p>
      </div>
    </div>
  )
}

export default App
