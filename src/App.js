import React, { useState } from 'react'
// import HomeScreen from './pages/HomeScreen'
import GamePlay from './pages/GamePlay'
import Layout from './components/Layout'
import Button from './components/Button'
import GreedyHunter from './components/GreedyHunter'
// import GamePlay from './pages/GamePlay'
// import Fix from './pages/Fix'
function App() {
  const [value, setValue] = useState(0)
  const [grid, setGrid] = useState(0)

  const handleInputChange = (e) => {
    const selectedValue = e.target.value
    setValue(selectedValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setGrid(value)
  }

  if (grid.length) {
    return (
      <div className="App">
        <GamePlay grid={grid} />
      </div>
    )
  }

  return (
    <div className="App">
      <Layout>
        <div className="game-banner">
          <GreedyHunter />
          <h3 className="game--title">Greedy Hunter</h3>
          <p>The aim is to eat all the food in record time</p>
          <p>
            Confiure your game grid below{' '}
            <span role="img" aria-label="">
              👇🏼
            </span>
          </p>
          <div className="grid">
            <span className="border">Game grid</span>
            <form onSubmit={handleSubmit} className="d-inline">
              <input
                type="text"
                name="name"
                // value={state}
                onChange={handleInputChange}
              />

              <Button />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default App
