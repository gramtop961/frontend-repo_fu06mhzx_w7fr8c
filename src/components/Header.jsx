import React from 'react'

function Header() {
  return (
    <header className="text-center mb-10">
      <div className="inline-flex items-center justify-center mb-4">
        <img src="/flame-icon.svg" alt="Flames" className="w-16 h-16" />
      </div>
      <h1 className="text-4xl font-bold text-white tracking-tight">Soccer Win Predictor</h1>
      <p className="text-blue-200 mt-2">Estimate who is most likely to win using live game state and team strength</p>
    </header>
  )
}

export default Header
